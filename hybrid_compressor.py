import re
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
import networkx as nx
from collections import Counter, defaultdict
import argparse

class HybridCodeCompressor:
    """Compresor híbrido para bases de código grandes."""
    
    def __init__(self, max_features=1000, n_components=50,
                critical_files_pct=0.2, min_critical_files=3):
        """
        Inicializa el compresor híbrido.
        
        Args:
            max_features (int): Número máximo de términos en el vocabulario
            n_components (int): Dimensiones de los vectores reducidos
            critical_files_pct (float): Porcentaje de archivos a considerar críticos
            min_critical_files (int): Mínimo número de archivos críticos
        """
        self.max_features = max_features
        self.n_components = n_components
        self.critical_files_pct = critical_files_pct
        self.min_critical_files = min_critical_files
        
        # Inicializar vectorizador y reductor
        self.vectorizer = TfidfVectorizer(max_features=max_features)
        self.svd = TruncatedSVD(n_components=n_components)
        
        # Almacenamiento para resultados
        self.files_info = []
        self.critical_files = []
        self.secondary_files = []
        self.architecture = {}
        self.patterns = {}
        
    def extract_files(self, combined_js):
        """
        Extrae archivos individuales del archivo combinado.
        
        Args:
            combined_js (str): Contenido del archivo combinado
            
        Returns:
            list: Lista de diccionarios con información de archivos
        """
        # Patrón para encontrar los separadores de archivos
        file_pattern = re.compile(r'==+\s*\nFile:\s*([^\n]+)\s*\n==+\s*\n', re.MULTILINE)
        
        # Encontrar todas las coincidencias
        matches = list(file_pattern.finditer(combined_js))
        
        files_info = []
        
        # Procesar cada archivo
        for i, match in enumerate(matches):
            file_name = match.group(1).strip()
            file_content_start = match.end()
            
            # Determinar dónde termina el contenido de este archivo
            if i < len(matches) - 1:
                file_content_end = matches[i + 1].start()
            else:
                file_content_end = len(combined_js)
            
            # Extraer contenido del archivo
            file_content = combined_js[file_content_start:file_content_end].strip()
            
            # Determinar lenguaje y extraer más información
            ext = self._get_file_extension(file_name)
            language = self._get_language_from_extension(ext)
            
            # Extraer información adicional
            line_count = file_content.count('\n') + 1
            imports = self._extract_imports(file_content, language)
            exports = self._extract_exports(file_content, language) if language in ['JavaScript', 'TypeScript', 'React', 'React TypeScript'] else []
            
            files_info.append({
                "path": file_name,
                "content": file_content,
                "language": language,
                "size": len(file_content),
                "line_count": line_count,
                "imports": imports,
                "exports": exports
            })
        
        self.files_info = files_info
        return files_info
    
    def identify_critical_files(self):
        """
        Identifica los archivos críticos en base a dependencias y tamaño.
        
        Returns:
            list: Lista de archivos críticos
        """
        if not self.files_info:
            raise ValueError("No hay archivos para analizar. Ejecuta extract_files primero.")
        
        # Construir grafo de dependencias
        G = nx.DiGraph()
        
        # Añadir nodos para cada archivo
        path_to_index = {file['path']: i for i, file in enumerate(self.files_info)}
        
        for i, file in enumerate(self.files_info):
            G.add_node(i, path=file['path'], size=file['size'], line_count=file['line_count'])
            
            # Añadir aristas basadas en importaciones
            for imp in file['imports']:
                # Intentar encontrar archivo que coincida con la importación
                for potential_path, idx in path_to_index.items():
                    if potential_path.endswith(imp) or imp in potential_path:
                        G.add_edge(i, idx)
        
        # Calcular centralidad
        centrality = nx.betweenness_centrality(G)
        
        # Calcular puntuación combinada (centralidad + tamaño + complejidad)
        scores = []
        for i, file in enumerate(self.files_info):
            complexity = self._estimate_complexity(file['content'])
            score = centrality.get(i, 0) * 0.5 + (file['size'] / 10000) * 0.3 + complexity * 0.2
            scores.append((i, score))
        
        # Ordenar por puntuación
        scores.sort(key=lambda x: x[1], reverse=True)
        
        # Seleccionar archivos críticos
        num_critical = max(self.min_critical_files, int(len(self.files_info) * self.critical_files_pct))
        critical_indices = [idx for idx, _ in scores[:num_critical]]
        
        # Guardar archivos críticos y secundarios
        self.critical_files = [self.files_info[i] for i in critical_indices]
        self.secondary_files = [file for i, file in enumerate(self.files_info) if i not in critical_indices]
        
        return self.critical_files
    
    def vectorize_secondary_files(self):
        """
        Vectoriza los archivos secundarios.
        
        Returns:
            dict: Vectores de los archivos secundarios
        """
        if not self.secondary_files:
            raise ValueError("No hay archivos secundarios. Ejecuta identify_critical_files primero.")
        
        # Extraer contenido
        contents = [file['content'] for file in self.secondary_files]
        
        # Vectorizar
        tfidf_matrix = self.vectorizer.fit_transform(contents)
        
        # Reducir dimensionalidad
        vectors = self.svd.fit_transform(tfidf_matrix)
        
        # Crear resultado
        vectorized_files = []
        for i, file in enumerate(self.secondary_files):
            vectorized_files.append({
                "path": file['path'],
                "vector": vectors[i].tolist(),
                "size": file['size'],
                "line_count": file['line_count'],
                "language": file['language']
            })
        
        return vectorized_files
    
    def generate_architecture_summary(self):
        """
        Genera un resumen de la arquitectura del proyecto.
        
        Returns:
            dict: Resumen de la arquitectura
        """
        if not self.files_info:
            raise ValueError("No hay archivos para analizar. Ejecuta extract_files primero.")
        
        # Analizar estructura de directorios
        dir_structure = defaultdict(list)
        for file in self.files_info:
            path = file['path']
            parts = path.split('/')
            
            # Registrar archivos por directorio
            if len(parts) > 1:
                dir_structure[parts[0]].append(path)
                if len(parts) > 2:
                    dir_structure[parts[0] + '/' + parts[1]].append(path)
        
        # Determinar tipo de proyecto
        project_type = self._determine_project_type()
        
        # Identificar patrones arquitectónicos
        architecture_patterns = self._identify_architecture_patterns(dir_structure)
        
        # Crear resumen arquitectural
        self.architecture = {
            "project_type": project_type,
            "architecture_patterns": architecture_patterns,
            "directory_structure": dict(dir_structure),
            "file_count": len(self.files_info),
            "languages": Counter([file['language'] for file in self.files_info]),
            "main_entry_points": self._identify_entry_points()
        }
        
        return self.architecture
    
    def extract_patterns(self):
        """
        Extrae patrones comunes de código.
        
        Returns:
            dict: Patrones de código identificados
        """
        if not self.files_info:
            raise ValueError("No hay archivos para analizar. Ejecuta extract_files primero.")
        
        # Extraer patrones de nomenclatura
        naming_patterns = self._extract_naming_patterns()
        
        # Extraer patrones de estructura
        structural_patterns = self._extract_structural_patterns()
        
        # Extraer patrones de código
        code_patterns = self._extract_code_patterns()
        
        self.patterns = {
            "naming_conventions": naming_patterns,
            "structural_patterns": structural_patterns,
            "code_patterns": code_patterns
        }
        
        return self.patterns
    
    def create_hybrid_summary(self):
        """
        Crea un resumen híbrido del proyecto.
        
        Returns:
            dict: Resumen híbrido del proyecto
        """
        if not self.critical_files or not self.secondary_files:
            self.identify_critical_files()
        
        vectorized_files = self.vectorize_secondary_files()
        
        if not self.architecture:
            self.generate_architecture_summary()
        
        if not self.patterns:
            self.extract_patterns()
        
        # Crear resumen híbrido
        hybrid_summary = {
            "architecture": self.architecture,
            "critical_files": [{
                "path": file['path'],
                "content": file['content'],
                "language": file['language'],
                "size": file['size'],
                "line_count": file['line_count']
            } for file in self.critical_files],
            "vectorized_files": vectorized_files,
            "patterns": self.patterns,
            "decompression_instructions": self._generate_decompression_instructions()
        }
        
        return hybrid_summary
    
    def compress_project(self, combined_js, output_file=None):
        """
        Comprime todo el proyecto en un solo paso.
        
        Args:
            combined_js (str): Contenido del archivo combinado
            output_file (str): Ruta del archivo de salida (opcional)
            
        Returns:
            str: Formato para LLM del proyecto comprimido
        """
        print("Extrayendo archivos...")
        self.extract_files(combined_js)
        
        print("Identificando componentes críticos...")
        self.identify_critical_files()
        
        print("Generando resumen arquitectural...")
        self.generate_architecture_summary()
        
        print("Vectorizando archivos secundarios...")
        vectorized_files = self.vectorize_secondary_files()
        
        print("Extrayendo patrones...")
        self.extract_patterns()
        
        print("Creando resumen híbrido...")
        hybrid_summary = self.create_hybrid_summary()
        
        # Convertir a formato para LLM
        llm_format = self._format_for_llm(hybrid_summary)
        
        # Guardar si se especificó archivo de salida
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                if output_file.endswith('.json'):
                    json.dump(hybrid_summary, f, indent=2)
                    print(f"Resumen híbrido guardado en {output_file}")
                else:
                    f.write(llm_format)
                    print(f"Formato para LLM guardado en {output_file}")
        
        # Calcular métricas de compresión
        original_size = sum(file['size'] for file in self.files_info)
        compressed_size = len(llm_format)
        ratio = original_size / compressed_size if compressed_size > 0 else 0
        
        print(f"Compresión completada:")
        print(f"- Tamaño original: {original_size:,} caracteres")
        print(f"- Tamaño comprimido: {compressed_size:,} caracteres")
        print(f"- Ratio de compresión: {ratio:.2f}x")
        print(f"- Archivos críticos: {len(self.critical_files)} de {len(self.files_info)}")
        
        return llm_format
    
    def _get_file_extension(self, path):
        """Obtiene la extensión del archivo."""
        parts = path.split('.')
        if len(parts) > 1:
            return '.' + parts[-1]
        return ''
    
    def _get_language_from_extension(self, ext):
        """Obtiene el lenguaje a partir de la extensión del archivo."""
        language_map = {
            '.js': 'JavaScript',
            '.jsx': 'React',
            '.ts': 'TypeScript',
            '.tsx': 'React TypeScript',
            '.py': 'Python',
            '.html': 'HTML',
            '.css': 'CSS',
            '.json': 'JSON',
            '.md': 'Markdown',
            '.svg': 'SVG'
        }
        return language_map.get(ext.lower(), 'Unknown')
    
    def _extract_imports(self, content, language):
        """Extrae importaciones del archivo."""
        imports = []
        
        if language in ['JavaScript', 'TypeScript', 'React', 'React TypeScript']:
            # Patrón para import en JS/TS
            import_pattern = re.compile(r'import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+[\'"]([^\'"]+)[\'"]', re.MULTILINE)
            for match in import_pattern.finditer(content):
                imports.append(match.group(1))
        
        elif language == 'Python':
            # Patrón para import en Python
            import_pattern = re.compile(r'(?:from\s+([^\s]+)\s+import|import\s+([^\s]+))', re.MULTILINE)
            for match in import_pattern.finditer(content):
                module = match.group(1) if match.group(1) else match.group(2)
                imports.append(module)
        
        return imports
    
    def _extract_exports(self, content, language):
        """Extrae exportaciones en JS/TS."""
        exports = []
        
        # Patrón para export default
        export_default = re.compile(r'export\s+default\s+(?:class|function)?\s*(\w+)', re.MULTILINE)
        for match in export_default.finditer(content):
            exports.append({"name": match.group(1), "type": "default"})
        
        # Patrón para export const/let/var
        export_named = re.compile(r'export\s+(?:const|let|var)\s+(\w+)', re.MULTILINE)
        for match in export_named.finditer(content):
            exports.append({"name": match.group(1), "type": "named"})
        
        return exports
    
    def _estimate_complexity(self, content):
        """Estima la complejidad del código."""
        # Contar estructuras de control
        control_structures = len(re.findall(r'\b(if|for|while|switch|try|catch)\b', content))
        
        # Contar funciones
        functions = len(re.findall(r'\bfunction\b|\=\>\s*[\{\(]', content))
        
        # Contar clases
        classes = len(re.findall(r'\bclass\b', content))
        
        # Normalizar puntuación de complejidad
        complexity = (control_structures + functions * 2 + classes * 3) / 100
        return min(complexity, 1.0)  # Máximo 1.0
    
    def _determine_project_type(self):
        """Determina el tipo de proyecto."""
        languages = Counter([file['language'] for file in self.files_info])
        
        # Buscar archivos clave
        has_package_json = any('package.json' in file['path'] for file in self.files_info)
        has_tsconfig = any('tsconfig.json' in file['path'] for file in self.files_info)
        has_react = any(file['language'] in ['React', 'React TypeScript'] for file in self.files_info)
        has_app_tsx = any('App.tsx' in file['path'] for file in self.files_info)
        
        if has_react and has_tsconfig:
            if 'components/auth' in str(self.files_info):
                return "React TypeScript application with authentication"
            return "React TypeScript application"
        elif has_react:
            return "React application"
        elif has_package_json and languages.get('TypeScript', 0) > 0:
            return "TypeScript application"
        elif has_package_json:
            return "JavaScript application"
        elif languages.get('Python', 0) > 0:
            return "Python application"
        else:
            return "Unknown project type"
    
    def _identify_architecture_patterns(self, dir_structure):
        """Identifica patrones arquitectónicos."""
        patterns = []
        
        # Comprobar patrón de componentes
        if 'components' in dir_structure:
            patterns.append("Component-based architecture")
        
        # Comprobar patrón MVC
        if all(x in dir_structure for x in ['models', 'views', 'controllers']):
            patterns.append("Model-View-Controller (MVC)")
        
        # Comprobar contexto de React
        if 'context' in dir_structure:
            patterns.append("React Context API for state management")
        
        # Comprobar hooks personalizados
        if 'hooks' in dir_structure:
            patterns.append("Custom React Hooks")
        
        # Comprobar patrón de páginas
        if 'pages' in dir_structure:
            patterns.append("Page-based routing")
        
        # Comprobar servicios de API
        if 'api' in dir_structure or 'services' in dir_structure:
            patterns.append("Service/API layer")
        
        return patterns or ["No specific architecture pattern identified"]
    
    def _identify_entry_points(self):
        """Identifica puntos de entrada principales."""
        entry_points = []
        
        # Buscar archivos comunes de punto de entrada
        entry_file_names = ['index.tsx', 'index.ts', 'index.js', 'App.tsx', 'App.js', 'main.tsx', 'main.js']
        
        for file in self.files_info:
            if any(file['path'].endswith(entry) for entry in entry_file_names):
                entry_points.append(file['path'])
        
        return entry_points[:3]  # Limitar a los 3 más probables
    
    def _extract_naming_patterns(self):
        """Extrae patrones de nomenclatura."""
        patterns = {}
        
        # Analizar nombres de archivo
        file_prefixes = []
        for file in self.files_info:
            name = file['path'].split('/')[-1].split('.')[0]
            if name.startswith('use') and file['language'] in ['JavaScript', 'TypeScript', 'React', 'React TypeScript']:
                file_prefixes.append('use (React Hook)')
            elif name[0].isupper() and file['language'] in ['React', 'React TypeScript']:
                file_prefixes.append('PascalCase (React Component)')
        
        patterns['file_naming'] = Counter(file_prefixes).most_common(3)
        
        return patterns
    
    def _extract_structural_patterns(self):
        """Extrae patrones estructurales."""
        patterns = {}
        
        # Analizar estructura de directorios
        dir_counts = Counter()
        for file in self.files_info:
            parts = file['path'].split('/')
            if len(parts) > 1:
                dir_counts[parts[0]] += 1
        
        patterns['top_level_dirs'] = dir_counts.most_common(5)
        
        return patterns
    
    def _extract_code_patterns(self):
        """Extrae patrones de código."""
        patterns = {}
        
        # Buscar patrones comunes en React
        react_patterns = []
        for file in self.files_info:
            if file['language'] in ['React', 'React TypeScript']:
                if 'useState' in file['content']:
                    react_patterns.append('useState Hook')
                if 'useEffect' in file['content']:
                    react_patterns.append('useEffect Hook')
                if 'useContext' in file['content']:
                    react_patterns.append('Context API')
                if 'createContext' in file['content']:
                    react_patterns.append('Context Provider')
        
        patterns['react_patterns'] = Counter(react_patterns).most_common(5)
        
        return patterns
    
    def _generate_decompression_instructions(self):
        """Genera instrucciones para descomprimir el contexto."""
        return """
INSTRUCCIONES PARA DESCOMPRIMIR ESTE CONTEXTO HÍBRIDO:

Este contexto de proyecto ha sido comprimido utilizando un enfoque híbrido que combina:
1. Resumen arquitectural del proyecto completo
2. Código completo de los archivos críticos
3. Representación vectorial de archivos secundarios
4. Patrones de código identificados

Para utilizar eficazmente este contexto:

PASO 1: COMPRENDE LA ARQUITECTURA
- Examina el tipo de proyecto y patrones arquitectónicos
- Identifica los puntos de entrada principales
- Analiza la estructura de directorios

PASO 2: ESTUDIA LOS ARCHIVOS CRÍTICOS
- Los archivos críticos se incluyen completos
- Estos archivos contienen la lógica central del proyecto
- Concéntrate primero en estos para entender el funcionamiento principal

PASO 3: UTILIZA LOS VECTORES PARA ARCHIVOS SECUNDARIOS
- Cada vector captura la semántica de un archivo secundario
- Utiliza los nombres de archivos y sus vectores para inferir su propósito
- Las dimensiones de cada vector representan conceptos semánticos

PASO 4: APLICA LOS PATRONES IDENTIFICADOS
- Los patrones te ayudan a entender las convenciones del proyecto
- Utilízalos para inferir la estructura de archivos no críticos
- Comprende las relaciones entre componentes

Al responder preguntas:
- Basa tus respuestas principalmente en los archivos críticos
- Complementa tu conocimiento con la información arquitectural
- Utiliza los vectores para inferir el propósito de archivos secundarios
- Indica claramente cuando estés haciendo suposiciones basadas en el contexto comprimido

NOTA: Los archivos secundarios están representados como vectores y no contienen el código exacto, por lo que ciertos detalles específicos de implementación pueden no estar disponibles.
"""
    
    def _format_for_llm(self, hybrid_summary):
        """
        Formatea el resumen híbrido para un modelo de lenguaje.
        
        Args:
            hybrid_summary (dict): Resumen híbrido del proyecto
            
        Returns:
            str: Formato para LLM
        """
        arch = hybrid_summary["architecture"]
        critical_files = hybrid_summary["critical_files"]
        vectorized_files = hybrid_summary["vectorized_files"]
        patterns = hybrid_summary["patterns"]
        
        # Comenzar con instrucciones de descompresión
        output = f"""# CONTEXTO HÍBRIDO DEL PROYECTO

{hybrid_summary["decompression_instructions"]}

## 1. ARQUITECTURA DEL PROYECTO

Tipo: {arch["project_type"]}

Patrones arquitectónicos:
{chr(10).join(f"- {pattern}" for pattern in arch["architecture_patterns"])}

Puntos de entrada principales:
{chr(10).join(f"- {entry}" for entry in arch["main_entry_points"])}

Estructura de directorios principales:
"""
        
        # Incluir estructura de directorios principales (limitados para ahorrar espacio)
        top_dirs = sorted([(k, len(v)) for k, v in arch["directory_structure"].items() if '/' not in k], 
                         key=lambda x: x[1], reverse=True)[:10]
        
        for dir_name, file_count in top_dirs:
            output += f"- {dir_name}/ ({file_count} archivos)\n"
        
        # Añadir información sobre patrones
        output += f"""
## 2. PATRONES IDENTIFICADOS

Convenciones de nomenclatura:
{chr(10).join(f"- {name}: {count} ocurrencias" for name, count in patterns["naming_conventions"].get("file_naming", []))}

Patrones comunes en React:
{chr(10).join(f"- {pattern}: {count} ocurrencias" for pattern, count in patterns["code_patterns"].get("react_patterns", []))}

## 3. ARCHIVOS CRÍTICOS (CÓDIGO COMPLETO)

A continuación se incluye el código completo de los {len(critical_files)} archivos más importantes.
"""
        
        # Incluir archivos críticos completos
        for file in critical_files:
            output += f"""
### {file["path"]} ({file["language"]}, {file["line_count"]} líneas)

```{file["language"].lower()}
{file["content"]}
```
"""
        
        # Incluir archivos vectorizados
        output += f"""
## 4. ARCHIVOS SECUNDARIOS (VECTORIZADOS)

Los siguientes {len(vectorized_files)} archivos están representados mediante vectores semánticos.
"""
        
        # Incluir archivos vectorizados (limitando la longitud de los vectores mostrados)
        for file in vectorized_files:
            vector_preview = str(file["vector"][:5])[:-1] + ", ...]"
            output += f"- **{file['path']}** ({file['language']}, {file['line_count']} líneas)\n  Vector: {vector_preview}\n\n"
        
        return output

def main():
    parser = argparse.ArgumentParser(description="Compresor Híbrido para Aplicaciones")
    
    parser.add_argument('--input', '-i', required=True, help='Archivo combined.js de entrada')
    parser.add_argument('--output', '-o', default='compressed_context.txt', help='Archivo de salida')
    parser.add_argument('--critical', '-c', type=float, default=0.2, help='Porcentaje de archivos críticos (default: 0.2)')
    parser.add_argument('--dimensions', '-d', type=int, default=50, help='Dimensiones de los vectores (default: 50)')
    
    args = parser.parse_args()
    
    try:
        # Leer archivo de entrada
        with open(args.input, 'r', encoding='utf-8') as f:
            combined_js = f.read()
        
        # Inicializar compresor
        compressor = HybridCodeCompressor(
            critical_files_pct=args.critical,
            n_components=args.dimensions
        )
        
        # Comprimir proyecto
        result = compressor.compress_project(combined_js, args.output)
        
        print(f"Compresión híbrida completada. Resultado guardado en {args.output}")
    
    except Exception as e:
        print(f"Error durante la compresión: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()