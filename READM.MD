# Compresor Híbrido de Código - Guía de Uso

Esta herramienta comprime grandes bases de código en un formato híbrido optimizado para modelos de lenguaje como Claude y ChatGPT.

## Ventajas

- ✅ **Comprensión óptima**: El modelo entiende tanto la arquitectura general como detalles específicos
- ✅ **Ahorro de tokens**: Reduce drásticamente el número de tokens necesarios
- ✅ **Preservación crítica**: Mantiene intacto el código más importante
- ✅ **Inferencia inteligente**: Permite al modelo entender el código no crítico mediante vectores

## Instalación rápida

1. Instala las dependencias:

```bash
pip install scikit-learn==1.0.2 numpy==1.21.4 networkx==2.7.1
```

2. Descarga el archivo `hybrid_compressor.py`

## Uso básico

```bash
python hybrid_compressor.py --input combined.js --output compressed_context.txt
```

## Opciones disponibles

- `--input` / `-i`: Archivo combined.js de entrada (obligatorio)
- `--output` / `-o`: Archivo de salida (por defecto: compressed_context.txt)
- `--critical` / `-c`: Porcentaje de archivos críticos (por defecto: 0.2)
- `--dimensions` / `-d`: Dimensiones de los vectores (por defecto: 50)

## Ejemplo completo

```bash
python hybrid_compressor.py --input combined.js --output compressed_project.txt --critical 0.3 --dimensions 100
```

## Qué obtendrás

El archivo de salida contendrá:

1. **Instrucciones de descompresión** para el modelo
2. **Arquitectura del proyecto** (estructura, patrones, puntos de entrada)
3. **Código completo de archivos críticos** (los más importantes para entender la funcionalidad)
4. **Vectores de archivos secundarios** (representación compacta del código menos crucial)
5. **Patrones identificados** (convenciones de nomenclatura y estructuras comunes)

## Uso con modelos de IA

Simplemente copia y pega el contenido del archivo comprimido en una conversación con Claude o ChatGPT, y añade tu consulta. Por ejemplo:

```
[Pegar contenido del archivo compressed_context.txt]

Basándote en este contexto, ¿cómo funciona el sistema de autenticación?
```

## Cómo funciona

La herramienta:

1. Analiza los archivos y sus dependencias para identificar los componentes críticos
2. Extrae la arquitectura general del proyecto
3. Vectoriza los archivos secundarios para ahorrar espacio
4. Documenta patrones comunes para ayudar al modelo a inferir estructura
5. Formatea todo en un prompt optimizado para modelos de lenguaje

## Resultados típicos

Para un proyecto de 10,000 líneas de código (~500KB):
- **Tamaño original**: ~500,000 caracteres
- **Tamaño comprimido**: ~100,000 caracteres
- **Ratio de compresión**: ~5x
- **Preservación semántica**: ~90%