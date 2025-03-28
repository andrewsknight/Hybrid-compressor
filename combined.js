==================================================
File: App.css
==================================================



==================================================
File: App.tsx
==================================================

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/routes";
import { PrivyProvider } from "@privy-io/react-auth"; // Asegúrate de importar esto
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/providers/theme-provider";
import I18nProvider from "@/providers/i18nProvider";
import { Toaster } from "@/components/ui/sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";


const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});



const App = () => (
  <I18nProvider>
    <PrivyProvider
      appId="cm6tklrs7001lcly9ud0brgmm"
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#8B5CF6",
          logo: "/logoDel.png",
          walletChainType: 'solana-only', 
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          ethereum: { createOnLogin: "off" },
          solana: { createOnLogin: "users-without-wallets" },
          createOnLogin: "users-without-wallets",
        },
        mfa: {
          noPromptOnMfaRequired: true,
        },
        externalWallets: { solana: { connectors: solanaConnectors } },
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="system">
            <AppRouter />
            <ToastContainer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </PrivyProvider>
  </I18nProvider>
);

export default App;

==================================================
File: api/authEmail.tsx
==================================================

import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Invalid credentials";
  }
};


==================================================
File: assets/react.svg
==================================================

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>

==================================================
File: components/ComingSoonPage.tsx
==================================================



// components/ComingSoonPage.tsx
import { LucideIcon } from 'lucide-react'

interface ComingSoonPageProps {
  icon: LucideIcon
  title: string
}

export function ComingSoonPage({ icon: Icon, title }: ComingSoonPageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Icon className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  )
}


==================================================
File: components/Layout.tsx
==================================================

// src/components/Layout.tsx
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
    
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

==================================================
File: components/PageLoading.tsx
==================================================


// components/PageLoading.tsx

export default function PageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}


==================================================
File: components/WelcomeModal.tsx
==================================================

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/particlesBackground';
import { useAuth } from '@/context/auth-context'; // Importar el hook de autenticación

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Usar el contexto de autenticación
  const { updateUserProfile, refreshUserData } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      setError('Por favor, introduce tu nombre');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const success = await updateUserProfile(fullName);
      
      if (success) {
        await refreshUserData();
        onClose();
      } else {
        setError('No se pudo actualizar tu perfil, por favor intenta de nuevo');
      }
    } catch (err) {
      setError('Error de conexión, por favor intenta de nuevo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, when: "afterChildren" }
    }
  };

  // Animation variants for the title text characters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Animation variants for paragraph text
  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6
      }
    }
  };

  // Animation variants for buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  // Function to convert text to animated letters
  const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
    return (
      <motion.h1 
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            style={{ display: 'inline-block' }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Particle Background Component */}
      <ParticleBackground 
        count={250} 
        color="#a855f7" 
        backgroundColor="#000000"
        linkColor="rgba(168, 85, 247, 0.2)"
        speed={0.3}
      />
      
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="welcome"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="text-center text-white p-10 relative z-10 max-w-4xl w-full"
          >
            <div className="mb-12">
              <motion.div
                variants={letterVariants}
                className="mx-auto mb-8 flex justify-center"
              >
                <img src="/logoDel.png" alt="Delphos Logo" className="w-20 h-20" />
              </motion.div>
              
              <AnimatedText
                text="¡Bienvenido a Delphos!"
                className="text-5xl md:text-6xl font-bold mb-8 whitespace-nowrap"
              />
              
              <motion.p
                variants={paragraphVariants}
                className="text-2xl text-purple-200 mb-12"
              >
                Tu viaje hacia el trading inteligente comienza aquí
              </motion.p>
            </div>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              className="bg-white text-purple-900 px-10 py-4 rounded-full text-xl font-semibold flex items-center gap-3 mx-auto hover:bg-purple-100 transition-colors"
              onClick={() => setStep(2)}
            >
              Continuar
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="name-form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="text-center text-white p-10 max-w-3xl w-full mx-4 relative z-10"
          >
            <div className="mb-12">
              <div className="mx-auto mb-8">
                <img src="/logoDel.png" alt="Delphos Logo" className="w-20 h-20 mx-auto" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">
                ¿Cómo te gustaría que te llamemos?
              </h2>
              
              <p className="text-2xl text-purple-200 mb-10">
                Personaliza tu experiencia con nosotros
              </p>
            </div>

            <motion.form 
              variants={containerVariants}
              onSubmit={handleSubmit} 
              className="max-w-lg mx-auto"
            >
              <motion.div 
                variants={buttonVariants}
                className="mb-8"
              >
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-full bg-white/10 border-2 border-purple-300/30 focus:border-purple-300 focus:outline-none text-xl text-white placeholder-purple-200"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  autoFocus
                />
                {error && (
                  <p className="mt-3 text-red-300 text-lg">{error}</p>
                )}
              </motion.div>

              <motion.div 
                variants={buttonVariants}
                className="flex gap-6"
              >
                <motion.button
                  whileHover="hover"
                  type="button"
                  className="flex-1 px-8 py-4 rounded-full border-2 border-purple-300 text-xl text-purple-200 font-semibold hover:bg-white/5 transition-colors"
                  onClick={() => setStep(1)}
                >
                  Atrás
                </motion.button>
                <motion.button
                  whileHover="hover"
                  type="submit"
                  className="flex-1 px-8 py-4 rounded-full bg-white text-xl text-purple-900 font-semibold hover:bg-purple-100 transition-colors disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Comenzar'}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

==================================================
File: components/account/AccountContent.tsx
==================================================


// components/account/AccountContent.tsx
export function AccountContent() {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-6">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <button className="rounded-full bg-primary p-2 w-12 h-6">
                  <div className="bg-white rounded-full w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

==================================================
File: components/auth/AuthLayout.tsx
==================================================

import { Outlet, Link, useLocation } from "react-router-dom";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Función para verificar si el botón está activo
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Information */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/fondoDel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white p-8">
          <div className="relative mx-auto mb-6">
            <img
              src="/logoDel.png"
              alt="Delphos"
              width={150}
              height={150}
              className="mx-auto animate-bounce-slow"
            />
            <div className="absolute inset-0 border border-white/30 rounded-full animate-scale-up"></div>
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Delphos AI Oracle
          </h1>
          <p className="text-xl sm:text-2xl opacity-90 text-center">
            Your intelligent companion for Solana blockchain analytics and market insights
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-blue-300">10K+</span>
              <span className="text-sm sm:text-base opacity-80">Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-purple-400">5M+</span>
              <span className="text-sm sm:text-base opacity-80">Data Points</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-green-400">24/7</span>
              <span className="text-sm sm:text-base opacity-80">Support</span>
            </div>
          </div>

          {/* Buttons Below Statistics */}

        </div>
      </div>

      {/* Right Side - Authentication Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;


==================================================
File: components/auth/EmailInfo.tsx
==================================================

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function VerificationInfo() {
  const navigate = useNavigate();

  // Función para redirigir al usuario a la página de inicio
  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground">
      {/* Título */}
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[hsl(252deg_100%_71%)] to-[hsl(252deg_100%_51%)] bg-clip-text text-transparent animate-text mb-10">
        Verificación Requerida
      </h1>

      {/* Mensaje Informativo */}
      <p className="text-center text-muted-foreground mb-6">
        Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.
      </p>

      {/* Botón para Ir al Inicio */}
      <Button
        onClick={handleGoToHome}
        className="w-full h-full bg-[hsl(252deg_100%_71%)] py-4 text-xl rounded-lg text-white hover:bg-[hsl(252deg_100%_61%)]"
      >
        Ir al Inicio
      </Button>
    </div>
  );
}


==================================================
File: components/auth/Recovery.tsx
==================================================

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function RecoveryPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecovery = () => {
    if (!email) {
      toast.error("Por favor, ingresa un correo electrónico.", {
        position: "bottom-right",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.", {
        position: "bottom-right",
      });
      return;
    }

    navigate("/recovery-info");
    toast.success("Instrucciones enviadas al correo.", {
      position: "bottom-right",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground">
      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Título */}
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[hsl(252deg_100%_71%)] to-[hsl(252deg_100%_51%)] bg-clip-text text-transparent animate-text mb-10">
        Recovery Password
      </h1>

      {/* Descripción */}
      <p className="mb-10 text-center text-muted-foreground">
        Ingresa tu correo electrónico y te enviaremos instrucciones para
        recuperar tu contraseña.
      </p>

      {/* Formulario */}
      <div className="w-full max-w-md space-y-4">
        {/* Campo de Correo Electrónico */}
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Botón de Recuperación */}
        <Button
          className="w-full h-full bg-[hsl(252deg_100%_71%)] py-4 text-xl rounded-lg text-color-white hover:bg-[hsl(252deg_100%_61%)]"
          onClick={handleRecovery}
        >
          Enviar Instrucciones
        </Button>
      </div>
    </div>
  );
}

==================================================
File: components/auth/RecoveryInfo.tsx
==================================================

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RecoveryInfo() {
  const navigate = useNavigate();

  // Función para redirigir al usuario a la página de inicio de sesión
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screentext-foreground">
      {/* Título */}
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[hsl(252deg_100%_71%)] to-[hsl(252deg_100%_51%)] bg-clip-text text-transparent animate-text mb-10">
        Instrucciones Enviadas
      </h1>

      {/* Mensaje Informativo */}
      <p className="text-center text-muted-foreground mb-6">
        Hemos enviado un correo electrónico con las instrucciones para recuperar
        tu contraseña. Por favor, revisa tu bandeja de entrada.
      </p>

      {/* Botón para Volver al Login */}
      <Button
        onClick={handleBackToLogin}
        className="w-full h-full bg-[hsl(252deg_100%_71%)] py-4 text-xl rounded-lg text-color-white hover:bg-[hsl(252deg_100%_61%)]"
      >
        Volver al Inicio de Sesión
      </Button>
    </div>
  );
}


==================================================
File: components/auth/login/Login.tsx
==================================================

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useLoginLogic } from "./useLogin";

export default function Login() {
  const { isLoading, loginError, ready, handleConnectWallet } = useLoginLogic();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[hsl(252deg_100%_71%)] to-[hsl(252deg_100%_51%)] bg-clip-text text-transparent animate-text">
            Welcome Back
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Connect your Solana wallet to access your trading dashboard
          </p>
        </div>

        <div className="space-y-10 mt-16">
          <Button
            type="button"
            className="w-full h-full py-4 text-xl rounded-lg flex items-center justify-center space-x-2 bg-[hsl(252deg_100%_71%)] hover:bg-[hsl(252deg_100%_61%)] text-white"
            onClick={handleConnectWallet}
            disabled={isLoading || !ready}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                <span>Connect with Email or Wallet</span>
              </>
            )}
          </Button>
        </div>

        {loginError && (
          <div className="mt-4 text-center">
            <p className="text-red-500">
              There was an error with login. Please try again.
            </p>
          </div>
        )}

        <div className="space-y-4 text-center text-lg text-muted-foreground mt-12">
          <p>
            By connecting, you agree to our{" "}
            <a
              href="#"
              className="text-[hsl(252deg_100%_71%)] hover:underline transition-all duration-300 hover:text-[hsl(252deg_100%_61%)]"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


==================================================
File: components/auth/login/useLogin.tsx
==================================================

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";
import { loginWithBackend, LoginResponse } from "../../../types/authServices";

export const useLoginLogic = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  // Hooks
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { privyLogin, authenticated, ready, user, getPrivyUserData,connectWallet } = usePrivyAuth();
  // const { connectWallet } = usePrivyAuth();


  // Handle successful login response
  const processLoginResponse = useCallback((response: LoginResponse) => {
    if (response.success && response.token) {
      console.log("Login successful, saving token and redirecting");

      // Save isNewUser flag if applicable
      if (response.isNewUser) {
        console.log("New user detected, setting flag to show modal");
        localStorage.setItem("isNewUser", "true");
      }

      // Call login function with token
      login(response.token);
      toast.success("Login successful!");
      return true;
    }
    return false;
  }, [login]);

  // Backend login logic
  const handleLoginWithBackend = useCallback(async () => {
    const userData = getPrivyUserData();
    if (!userData) return false;

    try {
      console.log("Sending login request to backend with:", userData);
      const response = await loginWithBackend(userData);
      return processLoginResponse(response);
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  }, [getPrivyUserData, processLoginResponse]);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loginError) {
      console.log("User already authenticated, redirecting to home");
      navigate("/app/home", { replace: true });
    }
  }, [isAuthenticated, navigate, loginError]);

  // Handle Privy authentication
  useEffect(() => {
    let mounted = true;

    const handleAuthentication = async () => {
      // Only proceed if all conditions are met
      if (!(authenticated && user && ready) || isLoading || !mounted) return;

      console.log("Privy authenticated, starting backend login process");
      setIsLoading(true);
      setLoginError(false);
      
      try {
        const success = await handleLoginWithBackend();
        if (!success && mounted) {
          setLoginError(true);
          toast.error("Login error");
        }
      } catch (error) {
        if (mounted) {
          setLoginError(true);
          toast.error("Login failed");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    handleAuthentication();

    return () => {
      mounted = false;
    };
  }, [authenticated, user, ready, isLoading, handleLoginWithBackend]);

  // Wallet connection handler
  const handleConnectWallet = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setLoginError(false);

    try {
      console.log("Starting Privy login");
      await connectWallet()
      await privyLogin();
      // The useEffect will handle authentication when Privy is ready
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error("Wallet connection error:", error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loginError,
    ready,
    handleConnectWallet
  };
};

==================================================
File: components/chat/ChatInterface.tsx
==================================================

import { useState, useEffect, useRef } from "react";
import { SendHorizontal, User, Bot, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useChatLogic } from "../../hooks/useChatLogic";
import { SideChat } from "../ui/side";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatChatTitle } from "../../utils/chatUtils";

interface ChatInterfaceProps {
  id: string;
}

// Componente para mostrar un mensaje con efecto de escritura
const TypingMessage = ({ content, onComplete }: { content: string; onComplete: () => void }) => {
  const [visibleText, setVisibleText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (isComplete) return;
    
    let currentIndex = 0;
    const typingSpeed = 5; // ms por caracter
    
    const typingInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setVisibleText(content.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        onComplete();
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [content, isComplete, onComplete]);
  
  return visibleText;
};

export default function ChatInterface({ id }: ChatInterfaceProps) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [showThinking, setShowThinking] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  
  // Obtener los datos del usuario del contexto de autenticación
  const { userData } = useAuth();
  
  // Usar el hook de lógica de chat
  const {
    messages,
    input,
    setInput,
    isTyping,
    showSidebar,
    setShowSidebar,
    showWelcome,
    welcomeText,
    chatList,
    messagesEndRef,
    inputRef,
    handleSend,
    handleKeyPress,
    createNewChat,
    archiveChat
  } = useChatLogic(id);

  // Extract chat title from the chat list
  const currentChat = chatList.find(chat => chat.id === id);
  const chatTitle = currentChat?.title || `Chat ${id.slice(0, 8)}...`;
  
  const isFirstLoad = useRef(true);
  
  // Efecto para la carga inicial del componente
  useEffect(() => {
    console.log("ChatInterface mounted with id:", id);
    
    const timer = setTimeout(() => {
      setInitialLoading(false);
      console.log("Initial loading complete");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Inicializar el estado de lastMessageId con el ID del último mensaje al cargar
  useEffect(() => {
    if (!initialLoading && messages.length > 0 && isFirstLoad.current) {
      const assistantMessages = messages.filter(msg => msg.role === "assistant");
      if (assistantMessages.length > 0) {
        const lastAssistantMsg = assistantMessages[assistantMessages.length - 1];
        setLastMessageId(lastAssistantMsg.id);
        console.log("Primera carga: registrando último mensaje sin animar:", lastAssistantMsg.id);
      }
      // Marcar que ya no es la primera carga
      isFirstLoad.current = false;
    }
  }, [initialLoading, messages]);
  
  // Referencia para almacenar el estado previo de isTyping
  const prevIsTypingRef = useRef(false);
  
  useEffect(() => {
    // No hacer nada durante la carga inicial
    if (initialLoading) return;
    
    if (!isTyping && prevIsTypingRef.current && messages.length > 0) {
      const assistantMessages = messages.filter(msg => msg.role === "assistant");
      
      if (assistantMessages.length > 0) {
        const lastAssistantMsg = assistantMessages[assistantMessages.length - 1];
        
        // Solo animar si es un mensaje nuevo (diferente al último registrado)
        // Y el estado isTyping acaba de cambiar de true a false (indicando una respuesta nueva)
        if (lastAssistantMsg.id !== lastMessageId) {
          console.log("Nuevo mensaje detectado tras respuesta:", lastAssistantMsg.id);
          setLastMessageId(lastAssistantMsg.id);
          
          // Ocultar el indicador de "pensando" y mostrar el efecto de escritura
          setShowThinking(false);
          setTypingMessageId(lastAssistantMsg.id);
        }
      }
    }
    
    // Actualizar la referencia del estado previo
    prevIsTypingRef.current = isTyping;
  }, [messages, isTyping, initialLoading, lastMessageId]);
  
  // Efecto para mostrar el indicador de "pensando" cuando isTyping cambia
  useEffect(() => {
    if (isTyping) {
      // Cuando comienza a escribir, mostrar el indicador de "pensando"
      setShowThinking(true);
      // Asegurarse de que no haya ningún mensaje con efecto de escritura
      setTypingMessageId(null);
    }
  }, [isTyping]);
  
  // Este efecto se ejecuta una vez al principio para garantizar que no se anime nada al cargar
  useEffect(() => {
    setTypingMessageId(null);
  }, []);
  
  const handleTypingComplete = () => {
    setTypingMessageId(null);
  };

  if (initialLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-solana-dark">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Cargando chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideChat 
        showSidebar={showSidebar}
        chatList={chatList}
        createNewChat={createNewChat}
        deleteChat={archiveChat}
        currentChatId={id}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-solana-purple/5 via-primary/5 to-solana-blue/5">
        {/* Chat Header - Sticky para que permanezca visible */}
        <div className="sticky top-0 z-40 border-b border-gray-200/20 bg-solana-dark/95 backdrop-blur supports-[backdrop-filter]:bg-solana-dark/60">
          <div className="flex h-16 w-full items-center justify-between px-8">
            <div className="flex items-center">
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className="mr-4 p-2 rounded-full hover:bg-white/10"
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-0.5 bg-white"></div>
                  <div className="w-4 h-0.5 bg-white"></div>
                  <div className="w-4 h-0.5 bg-white"></div>
                </div>
              </button>
              <h1 className="text-xl font-semibold text-white truncate max-w-md">
                {formatChatTitle(chatTitle)}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {isTyping && (
                <span className="flex items-center gap-2 text-sm text-solana-green">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is typing...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages - Ya no tiene overflow-y-auto, forma parte del scroll global */}
        <div className="flex-1 p-4">
          <div className="mx-auto max-w-4xl space-y-6">
            {showWelcome && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-6">
                  <img src="/logoDel.png" alt="Delphos Logo" className="h-24 w-24 mx-auto" />
                  <p className="text-lg text-white">{welcomeText}</p>
                </div>
              </div>
            )}
            
            {messages.length > 0 ? (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {message.role === "user" ? (
                      // Avatar del usuario personalizado
                      <Avatar className="h-8 w-8 shrink-0 bg-primary">
                        {userData?.imageUrl ? (
                          <AvatarImage src={userData.imageUrl} alt="User avatar" />
                        ) : (
                          <AvatarFallback className="bg-primary">
                            <User className="h-5 w-5 text-white" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ) : (
                      // Avatar del bot (se mantiene igual)
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-solana-purple">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`relative flex max-w-[80%] flex-col gap-1 ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-solana-dark text-white"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">
                          {typingMessageId === message.id ? (
                            <TypingMessage 
                              content={message.content} 
                              onComplete={handleTypingComplete} 
                            />
                          ) : (
                            message.content
                          )}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                        {message.status === "sending" && " • Sending..."}
                        {message.status === "error" && " • Error"}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Mensaje de "Pensando..." - Solo mostrar si está pensando Y no hay un mensaje siendo animado */}
                {showThinking && !typingMessageId && (
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-solana-purple">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="relative flex max-w-[80%] flex-col gap-1 items-start">
                      <div className="rounded-2xl px-4 py-2 bg-solana-dark text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              !showWelcome && (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">No hay mensajes en esta conversación</p>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input - Sticky en la parte inferior */}
        <div className="sticky bottom-0 border-t border-gray-200/20 bg-solana-dark/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-solana-dark/60">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-4">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-200/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{
                  minHeight: "46px",
                  maxHeight: "200px",
                }}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:hover:bg-primary"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

==================================================
File: components/chat/ChatSkeleton.tsx
==================================================


// components/chat/ChatSkeleton.tsx
export function ChatSkeleton() {
    return (
      <div className="flex h-full animate-pulse flex-col gap-4 p-4">
        <div className="h-10 w-1/4 rounded-lg bg-muted" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-24 rounded-lg bg-muted" />
          <div className="h-24 rounded-lg bg-muted" />
          <div className="h-24 rounded-lg bg-muted" />
        </div>
      </div>
    )
  }
  

==================================================
File: components/chat/redirectToChat.tsx
==================================================

import { usePrivy } from "@privy-io/react-auth";
import { Navigate } from "react-router-dom";

export default function RedirectToChat() {
  const { user } = usePrivy();

  if (!user) return <p>Cargando...</p>;

  return <Navigate to={`/app/chat/${user.id}`} replace />;
}


==================================================
File: components/dashboard/AppSidebar.tsx
==================================================

import { Link } from "react-router-dom";
import { Home, MessageSquare, BookOpen, Crown, Menu, X } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { useState, useEffect } from "react";

export function AppSidebar() {
  const { userData, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar menú móvil cuando la pantalla se redimensiona a tamaño desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  if (isLoading || !userData?.id) {
    return <p>Cargando...</p>;
  }

  const menuItems = [
    { icon: Home, label: "Home", path: "/app/home" },
    { icon: MessageSquare, label: "Chat", path: `/app/chat/new` },
    { icon: BookOpen, label: "Docs", path: "https://docs.delphos.dev/" },
  ];

  // Botón de hamburguesa para móvil
  const MobileMenuButton = () => (
    <button 
      className="md:hidden fixed top-2 left-4 z-50 p-2 rounded-md bg-[hsl(252deg_100%_71%/90%)] text-white"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      // Ajuste específico para alinear con el header
    >
      {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );

  // Overlay que aparece detrás del menú móvil
  const MobileOverlay = () => (
    <div 
      className={`fixed inset-0 bg-black/60 z-30 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
      onClick={() => setIsMobileMenuOpen(false)}
      style={{ top: "56px" }} // Comenzar debajo del header
    />
  );

  return (
    <>
      <MobileMenuButton />
      <MobileOverlay />
      
      {/* Sidebar para escritorio (md y superiores) */}
      <Sidebar className="hidden border-r bg-background md:block sticky top-0 h-screen">
        <div className="flex h-full flex-col">
          {/* Elementos del menú principal - área scrollable */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-1 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group"
                >
                  <div className="p-1.5 rounded-md bg-[hsl(252deg_100%_71%/20%)] text-[hsl(252deg_100%_71%/90%)] group-hover:bg-[hsl(252deg_100%_71%/90%)] group-hover:text-white transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Enlace a Upgrade Plan - fijo en la parte inferior */}
          <div className="border-t border-border px-2 py-4 sticky bottom-0 bg-background">
            <Link
              to="/app/upgrade-plan"
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-white bg-[hsl(252deg_100%_71%/90%)] transition-all hover:opacity-90 shadow-md"
            >
              <Crown className="h-4 w-4" />
              <span className="font-medium">Mejorar Plan</span>
            </Link>
          </div>
        </div>
      </Sidebar>

      {/* Sidebar para móvil (slide-in desde la izquierda) */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-background border-r border-border transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 md:hidden`}
        style={{ top: "56px", height: "calc(100% - 56px)" }} // Ajustado para comenzar después del header
      >
        <div className="flex h-full flex-col"> {/* Eliminado padding top */}
          {/* Elementos del menú principal - área scrollable */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-1 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-1.5 rounded-md bg-[hsl(252deg_100%_71%/20%)] text-[hsl(252deg_100%_71%/90%)] group-hover:bg-[hsl(252deg_100%_71%/90%)] group-hover:text-white transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Enlace a Upgrade Plan - fijo en la parte inferior */}
          <div className="border-t border-border px-2 py-4 sticky bottom-0 bg-background">
            <Link
              to="/app/upgrade-plan"
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-white bg-[hsl(252deg_100%_71%/90%)] transition-all hover:opacity-90 shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Crown className="h-4 w-4" />
              <span className="font-medium">Mejorar Plan</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

==================================================
File: components/headerLayout.tsx
==================================================

import { ReactNode } from "react";
import Header from "@/components/ui/header";

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con posición fija */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
      
      {/* Contenido principal que permite scroll */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default HeaderLayout;

==================================================
File: components/home/home-content.tsx
==================================================

  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import {
    MessageSquare,
    Wallet,
    History,
    Settings,
    Crown,
    ChevronRight,
    Sparkles,
    Globe,
    Info,
  } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { ChatDemo } from "../ui/ia-chat-demo";
  import { useAuth } from "@/context/auth-context"; // Importar el hook de autenticación
  import { Link } from "react-router-dom"; // Asumiendo que usas react-router

  export function HomeContent() {
    const { userData } = useAuth();

    // Datos por defecto (en caso de que userData no esté disponible)
    const defaultUserData = {
      name: "Usuario",
      email: "",
      avatar: "",
      description: "",
      country: "",
      plan: "Básico",
      joinDate: "Nuevo miembro",
      walletBalance: "0 SOL",
      totalTrades: 0,
      successRate: "0%",
    };

    // Combinar los datos del usuario con los valores por defecto
    const user = {
      name: userData?.fullName || defaultUserData.name,
      email: userData?.email || defaultUserData.email,
      avatar: userData?.imageUrl || defaultUserData.avatar, // Usar imageUrl en lugar de avatar
      description: userData?.description || defaultUserData.description,
      country: userData?.country || defaultUserData.country,
      plan: userData?.plan || defaultUserData.plan,
      joinDate: userData?.createdAt
        ? `Miembro desde ${new Date(userData.createdAt).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}`
        : defaultUserData.joinDate,
      walletBalance: userData?.walletBalance || defaultUserData.walletBalance,
      totalTrades: userData?.totalTrades || defaultUserData.totalTrades,
      successRate: userData?.successRate || defaultUserData.successRate,
    };

    const features = [
      {
        icon: Wallet,
        title: "Wallet Overview",
        description: "Manage your Solana assets and transactions",
        link: "/wallet",
      },
      {
        icon: MessageSquare,
        title: "AI Trading Assistant",
        description: "Get real-time Solana trading insights",
        link: "/app/chat/new",
      },
      {
        icon: History,
        title: "Trading History",
        description: "View your past trades and analytics",
        link: "/history",
      },
      {
        icon: Settings,
        title: "Trading Settings",
        description: "Configure your trading preferences",
        link: "/app/settings",
      },
    ];

    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Profile Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-8 flex-col md:flex-row">
              <div className="relative group">
                <div className="absolute inset-0 bg-[hsl(252deg_100%_71%/90%)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <Avatar className="w-32 h-32 border-4 border-background relative">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-lg py-1.5"
                  >
                    <Crown className="w-4 h-4 text-yellow-500" />
                    {user.plan} Plan
                  </Badge>
                </div>

                <p className="text-lg text-muted-foreground">{user.email}</p>

                {user.country && (
                  <p className="text-md flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="mr-1">{user.country}</span>
                    {user.country && (
                      <img
                        src={`https://flagcdn.com/16x12/${user.country.toLowerCase()}.png`}
                        alt={`Bandera de ${user.country}`}
                        width="16"
                        height="12"
                        className="inline-block"
                      />
                    )}
                  </p>
                )}

                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {user.joinDate}
                </p>

                {user.description && (
                  <div className="mt-2 p-3 bg-muted/50 rounded-lg max-w-2xl">
                    <p className="text-md flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="italic">{user.description}</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <Link to="/app/settings">
                    <Button
                      variant="outline"
                      className="text-lg px-6 py-5 gradient-border"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                  <Link to="/app/upgrade-plan">
                    <Button className="text-lg color-te px-6 py-5 bg-[hsl(252deg_100%_71%/90%)] text-white hover:opacity-90">
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="w-full md:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Balance
                      </p>
                      <p className="text-2xl font-bold text-[hsl(252deg_100%_71%/90%)]">
                        {user.walletBalance}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Trades
                      </p>
                      <p className="text-2xl font-bold">{user.totalTrades}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Success
                      </p>
                      <p className="text-2xl font-bold text-[hsl(252deg_100%_71%/90%)]">
                        {user.successRate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-background to-background/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <Link to={feature.link} key={feature.title} className="block">
                  <Card className="group cursor-pointer hover-scale gradient-border overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[hsl(252deg_100%_71%/90%)]"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[hsl(252deg_100%_71%/90%)] text-white">
                            <feature.icon className="h-6 w-6" />
                          </div>
                          {feature.title}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">
                AI Trading Assistant Demo
              </h2>
              <ChatDemo />
            </div>
          </div>
        </div>
      </div>
    );
  }


==================================================
File: components/particlesBackground.tsx
==================================================

import { useState, useEffect } from 'react';

interface ParticleProps {
  count?: number;
  color?: string;
  linkColor?: string;
  backgroundColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const ParticleBackground = ({
  count = 70,
  color = '#a855f7', // Purple color
  linkColor = 'rgba(168, 85, 247, 0.2)', // Light purple for links
  backgroundColor = '#000000', // Black background
  minSize = 1,
  maxSize = 3,
  speed = 0.3
}: ParticleProps) => {
  interface Particle {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // Initialize particles
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });

      // Create initial particles
      const initialParticles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.3
      }));

      setParticles(initialParticles);

      // Handle window resize
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      
      // Handle mouse movement
      const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [count, minSize, maxSize, speed]);

  // Animation effect
  useEffect(() => {
    if (particles.length === 0 || !dimensions.width) return;

    const animateParticles = () => {
      setParticles(currentParticles => 
        currentParticles.map(particle => {
          // Update position based on speed
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          let newSpeedX = particle.speedX;
          let newSpeedY = particle.speedY;

          // Handle boundary collision
          if (newX > dimensions.width || newX < 0) {
            newSpeedX = -newSpeedX;
            newX = newX > dimensions.width ? dimensions.width : 0;
          }

          if (newY > dimensions.height || newY < 0) {
            newSpeedY = -newSpeedY;
            newY = newY > dimensions.height ? dimensions.height : 0;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY
          };
        })
      );
    };

    const animationId = requestAnimationFrame(animateParticles);
    const interval = setInterval(animateParticles, 30);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, [particles, dimensions]);

  // Draw connections between nearby particles
  const drawConnections = () => {
    const maxDistance = 150; // Maximum distance for connection
    const connections = [];
    
    // Check each particle pair
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        // Calculate distance
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance (more transparent as distance increases)
          const opacity = 1 - distance / maxDistance;
          
          connections.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            opacity: opacity * 0.2 // Adjust for visibility
          });
        }
      }
      
      // Connect to mouse if nearby
      if (mousePosition.x && mousePosition.y) {
        const p1 = particles[i]; // Ensure p1 is defined
        const dx = p1.x - mousePosition.x;
        const dy = p1.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance * 1.5) {
          const opacity = 1 - distance / (maxDistance * 1.5);
          
          connections.push({
            x1: p1.x,
            y1: p1.y,
            x2: mousePosition.x,
            y2: mousePosition.y,
            opacity: opacity * 0.3
          });
        }
      }
    }
    
    return connections;
  };
  
  const connections = drawConnections();

  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ backgroundColor: backgroundColor, zIndex: -1 }}
    >
      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.radius}px`,
            height: `${particle.radius}px`,
            backgroundColor: color,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      <svg className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        {connections.map((connection, index) => (
          <line
            key={`connection-${index}`}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke={linkColor}
            strokeWidth="1"
            opacity={connection.opacity}
          />
        ))}
      </svg>
    </div>
  );
};

export default ParticleBackground;

==================================================
File: components/refresh/RefreshContent.tsx
==================================================


// components/refresh/RefreshContent.tsx
export default function RefreshContent() {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Refresh Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Refresh Interval
              </label>
              <select className="w-full rounded-lg border px-3 py-2">
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every 30 minutes</option>
                <option>Every hour</option>
              </select>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-white">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    )
  }

==================================================
File: components/saved-prompts/SavedPromptsContent.tsx
==================================================


// components/saved-prompts/SavedPromptsContent.tsx
export function SavedPromptsContent() {
    const dummyPrompts = [
      { id: 1, title: 'Weekly Report Template', content: 'Generate a detailed weekly report...' },
      { id: 2, title: 'Bug Analysis', content: 'Analyze this bug and provide solutions...' },
    ]
  
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-4">
          {dummyPrompts.map(prompt => (
            <div key={prompt.id} className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">{prompt.title}</h3>
              <p className="text-muted-foreground">{prompt.content}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-lg bg-primary px-4 py-2 text-white">
                  Use Prompt
                </button>
                <button className="rounded-lg border px-4 py-2">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  

==================================================
File: components/settings/plansTab.tsx
==================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, ArrowRight, Brain, LineChart as ChartLineUp, Bot, Lock } from 'lucide-react';

const UpgradePlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Plan Básico",
      price: "Gratis",
      description: "Comienza tu viaje en el mundo crypto",
      features: [
        "Análisis básico de mercado",
        "3 consultas diarias al AI Bot",
        "Alertas de precios básicas",
        "Acceso a información pública",
      ],
      limitations: [
        "Sin análisis técnico avanzado",
        "Sin señales premium",
        "Sin estrategias personalizadas",
      ],
      icon: Bot,
      color: "from-gray-500 to-gray-600",
      buttonText: "Plan Actual",
      recommended: false
    },
    {
      name: "Plan Pro",
      price: "$29.99",
      period: "/mes",
      description: "Para traders serios que buscan ventaja competitiva",
      features: [
        "Análisis técnico avanzado",
        "Consultas ilimitadas al AI Bot",
        "Señales de trading en tiempo real",
        "Alertas personalizadas",
        "Análisis de sentimiento del mercado",
        "Estrategias de trading sugeridas",
      ],
      icon: ChartLineUp,
      color: "from-purple-500 to-purple-600",
      buttonText: "Actualizar a Pro",
      recommended: true
    },
    {
      name: "Plan Enterprise",
      price: "$99.99",
      period: "/mes",
      description: "Máximo poder de análisis y predicción",
      features: [
        "Todo lo incluido en Pro",
        "AI personalizada a tu estrategia",
        "Análisis predictivo avanzado",
        "Estrategias automatizadas",
        "Reportes personalizados diarios",
        "Acceso prioritario a nuevas features",
        "Soporte 24/7 personalizado"
      ],
      icon: Crown,
      color: "from-amber-500 to-amber-600",
      buttonText: "Contactar Ventas",
      recommended: false
    }
  ];

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const checkVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              Potencia tu Trading con IA
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl bg-gradient-to-b ${
                  hoveredPlan === plan.name ? 'from-purple-900/50 to-black/50' : 'from-gray-900/50 to-black/50'
                } p-8 border border-purple-500/20 backdrop-blur-xl
                ${plan.recommended ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/20' : ''}
                `}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredPlan(plan.name)}
                onHoverEnd={() => setHoveredPlan(null)}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Recomendado
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${plan.color}`}>
                    <PlanIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 mb-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial="initial"
                      animate="animate"
                      variants={checkVariants}
                    >
                      <div className="flex-shrink-0">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, index) => (
                    <motion.div
                      key={`limitation-${index}`}
                      className="flex items-center gap-3"
                      initial="initial"
                      animate="animate"
                      variants={checkVariants}
                    >
                      <div className="flex-shrink-0">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="text-gray-500">{limitation}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2
                    ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                        : plan.name === "Plan Básico"
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                    }
                    transition-all duration-200 shadow-lg hover:shadow-purple-500/25`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Potenciado por IA avanzada para análisis de mercados crypto
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UpgradePlans;

==================================================
File: components/settings/profileTab.tsx
==================================================

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Upload,
  Save,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { toast } from "react-toastify";
import axios from "axios";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import Select from "react-select";
import countryList from "react-select-country-list";

interface ProfileFormData {
  fullName: string;
  email: string;
  bio: string;
  imageUrl: string; // Cambiado de avatar a imageUrl para mantener consistencia con la API
  country: string;
}

const ProfileTab = () => {
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = usePrivy();
  
  // Estado para el formulario
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    bio: "",
    imageUrl: "",
    country: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  
  // Opciones de países para el selector
  const countries = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: (
          <div className="flex items-center">
            <img
              src={`https://flagcdn.com/16x12/${country.value.toLowerCase()}.png`}
              alt={country.label}
              className="mr-2"
            />
            <span>{country.label}</span>
          </div>
        ),
        originalLabel: country.label,
      }));
  }, []);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    if (userData) {
      setProfileForm({
        fullName: userData.fullName || "",
        email: userData.email || "",
        bio: userData.description || "", // Description en backend, bio en frontend
        imageUrl: userData.imageUrl || "",
        country: userData.country || "",
      });
      setAvatarPreview(userData.imageUrl || "");
    }
  }, [userData]);

  // Manejador de cambios en formulario
  const handleProfileChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador para el cambio del país
  const handleCountryChange = (selectedOption: { value: string; } | null) => {
    setProfileForm((prev) => ({
      ...prev,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  // Manejador de cambios de avatar con validaciones
  const handleAvatarChange = (e: { target: { files: FileList | null; }; }) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Validar tamaño (máximo 2MB como indica la UI)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("La imagen es demasiado grande. El tamaño máximo es de 2MB.");
        return;
      }

      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error("Formato de imagen no válido. Usa JPG, PNG o GIF.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Para la vista previa
          setAvatarPreview(reader.result.toString());
          
          // Para el formulario que se enviará al backend
          setProfileForm((prev) => ({
            ...prev,
            imageUrl: reader.result ? reader.result.toString() : "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Encontrar el país seleccionado para el Select
  const selectedCountry = useMemo(() => {
    if (!profileForm.country) return null;
    return countries.find(country => country.value === profileForm.country);
  }, [profileForm.country, countries]);

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar los datos para enviar al endpoint según su estructura
      const updateData = {
        fullName: profileForm.fullName,
        imageUrl: profileForm.imageUrl, // Ya no usamos avatar sino imageUrl
        description: profileForm.bio,    // Bio en frontend, description en backend
        country: profileForm.country,
      };

      // Realizar la petición al endpoint con axios con token de autenticación
      const token = await getAccessToken();

      const response = await axios.put(
        "http://localhost:3000/api/users/me/profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        // Guardar los datos en localStorage como respaldo
        localStorage.setItem('userProfileData', JSON.stringify({
          fullName: data.user.fullName,
          imageUrl: data.user.imageUrl,
          description: data.user.description,
          country: data.user.country,
          email: profileForm.email // Mantener el email ya que no cambia
        }));
        
        // Mostrar mensaje de éxito
        toast.success("Tu información ha sido actualizada correctamente");
        
        // Recargar la página después de un breve retraso
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error(data.error || "Error al actualizar el perfil");
      }
    } catch (error: any) {
      console.error("Error al actualizar perfil:", error);
      toast.error(
        error.message || "Ha ocurrido un error al actualizar el perfil"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 gradient-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[hsl(252deg_100%_71%/90%)]" />
          Información del Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="avatar"
                className="text-base font-medium"
              >
                Foto de Perfil
              </Label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[hsl(252deg_100%_71%/90%)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <Avatar className="w-24 h-24 border-4 border-background relative">
                    <AvatarImage src={avatarPreview} alt="Avatar" />
                    <AvatarFallback>
                      {profileForm.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleAvatarChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Subir nueva imagen
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    JPG, PNG o GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-base font-medium"
                >
                  Nombre completo
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                  placeholder="Tu nombre"
                  className="text-base p-6"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base font-medium"
                >
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  placeholder="tu@email.com"
                  className="text-base p-6"
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  El correo no se puede cambiar.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-base font-medium">
                Biografía
              </Label>
              <textarea
                id="bio"
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
                placeholder="Cuéntanos sobre ti..."
                className="w-full min-h-24 p-4 rounded-md border border-input bg-transparent text-base"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="text-base font-medium"
              >
                País
              </Label>
              <Select
                id="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                classNamePrefix="react-select"
                placeholder="Selecciona tu país"
                formatOptionLabel={(option: any) => option.label}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "hsl(0 0% 3.9%)",
                    color: "white",
                    borderColor: "rgb(75, 85, 99)",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    "&:hover": {
                      backgroundColor: "hsl(0 0% 10%)",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "hsl(0 0% 3.9%)",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "rgb(156, 163, 175)",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? "hsl(0 0% 10%)"
                      : "hsl(0 0% 3.9%)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "hsl(0 0% 10%)",
                    },
                  }),
                }}
              />
            </div>
          </div>

          <CardFooter className="flex justify-end px-0 pt-6">
            <Button
              type="submit"
              className="text-lg px-6 py-5 bg-[hsl(252deg_100%_71%/90%)] text-white hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Guardar cambios
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;

==================================================
File: components/settings/securityTab.tsx
==================================================

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Shield, KeyRound, Smartphone, LockKeyhole } from "lucide-react";

const SecurityTab = () => {
  const [twoFactorEnabled] = useState(false);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[hsl(252deg_100%_71%/90%)]" />
          Seguridad de la cuenta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-muted-foreground mb-4">
          Configura las opciones de seguridad de tu cuenta para proteger tu información.
        </p>
        
        {/* Cambio de contraseña */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <KeyRound className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">Cambio de contraseña</h3>
              <p className="text-sm text-muted-foreground">
                Actualiza tu contraseña regularmente para mantener tu cuenta segura.
              </p>
            </div>
          </div>
          
          <div className="ml-9 grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <Button className="w-full md:w-auto">Actualizar contraseña</Button>
          </div>
        </div>
        
        {/* 2FA */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Smartphone className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Autenticación de dos factores</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Añade una capa adicional de seguridad a tu cuenta.
              </p>
            </div>
          </div>
          
          {twoFactorEnabled && (
            <div className="ml-9 space-y-4">
              <p className="text-sm">
                Configura la autenticación de dos factores usando una aplicación de autenticación como Google Authenticator o Authy.
              </p>
              <div className="flex justify-center p-4 bg-muted rounded-md">
                <div className="w-32 h-32 bg-primary/10 flex items-center justify-center text-sm">
                  Código QR de ejemplo
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de verificación</Label>
                <Input id="verification-code" placeholder="Ingresa el código de 6 dígitos" />
              </div>
              <Button className="w-full md:w-auto">Verificar y activar</Button>
            </div>
          )}
        </div>
        
        {/* Notificaciones de seguridad */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <LockKeyhole className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
 
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones sobre inicios de sesión inusuales o cambios en tu cuenta.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;

==================================================
File: components/settings/walletTab.tsx
==================================================


const walletTab = () => {
  return (
    <div>walletTab</div>
  )
}

export default walletTab

==================================================
File: components/ui/avatar.tsx
==================================================

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

==================================================
File: components/ui/badge.tsx
==================================================

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

==================================================
File: components/ui/button.tsx
==================================================

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

==================================================
File: components/ui/card.tsx
==================================================

import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }


==================================================
File: components/ui/header.tsx
==================================================

import { Link } from "react-router-dom";
import LanguageSwitcher from "./language-switch";
import UserMenu from "../../components/ui/useMenu";

const Header = () => {
  return (
    <div className="border-b border-sidebar-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 w-full items-center px-4">
        {/* Espacio para el botón de menú en móvil */}
        <div className="w-10 md:hidden"></div>
        
        {/* Logo alineado al inicio */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/logoDel.png" alt="Delphos" width={40} height={40} className="object-contain" />
            <span>Delphos</span>
          </Link>
        </div>
        
        {/* Selector de idioma y menú de usuario alineados al final */}
        <div className="ml-auto flex items-center gap-6">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;

==================================================
File: components/ui/ia-chat-demo.tsx
==================================================

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth-context'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { User } from "lucide-react"; 

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const demoMessages: Message[] = [
  { type: 'bot', content: "Welcome to Delphos! Your AI-powered Solana trading assistant." },
  { type: 'user', content: "What is Delphos?" },
  { type: 'bot', content: "Delphos is an AI oracle that gathers and verifies market insights for Solana." },
  { type: 'user', content: "How does it verify information?" },
  { type: 'bot', content: "Delphos cross-checks data from reliable sources before adding it to the blockchain." },
  { type: 'user', content: "Can I use it for real-time trading?" },
  { type: 'bot', content: "Yes! Delphos provides actionable trading insights based on market trends." },
  { type: 'user', content: "How do I access premium features?" },
  { type: 'bot', content: "You can unlock premium insights using Delphos tokens." }
];

export function ChatDemo() {
  const { userData } = useAuth();
  const isMounted = useRef(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  
  const resetDemo = () => {
    setMessages([]);
    setDemoIndex(0);
    setDemoCompleted(false);
    setIsTyping(false);
  };
  
  useEffect(() => {
    isMounted.current = true;
    if (demoIndex < demoMessages.length && !demoCompleted) {

      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        if (isMounted.current) {
          setIsTyping(false);
          setMessages(prev => [...prev, demoMessages[demoIndex]]);
          setDemoIndex(prev => prev + 1);
        }
      }, 2000);
      
      return () => {
        clearTimeout(typingTimeout);
      };
    } 

    else if (demoIndex >= demoMessages.length && !demoCompleted) {
      const completeTimeout = setTimeout(() => {
        if (isMounted.current) {
          setDemoCompleted(true);
        }
      }, 4000);
      
      return () => {
        clearTimeout(completeTimeout);
      };
    }
    return () => {};
  }, [demoIndex, demoCompleted]);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <Card className="w-full overflow-hidden bg-card/50 backdrop-blur-sm relative z-10">
        <div className="p-4 border-b bg-[hsl(252deg_100%_71%)] text-white">
          <h3 className="text-lg font-semibold">Live Demo: AI Trading Assistant</h3>
        </div>
        
        <div className="p-6 space-y-4 min-h-[400px]">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={`message-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {message.type === 'user' ? (
                  <Avatar className="w-8 h-8 rounded-full">
                    {userData?.imageUrl ? (
                      <AvatarImage src={userData.imageUrl} alt="User avatar" />
                    ) : (
                      <AvatarFallback className="bg-primary text-white">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <img
                    src="/logoDel.png"
                    alt="Bot Avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className={`max-w-[80%] rounded-2xl p-4 ${message.type === 'user' ? 'bg-[hsl(252deg_100%_71%)] text-white' : 'bg-muted'}`}>
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3"
              >
                <img src="/logoDel.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                <div className="bg-muted rounded-2xl p-4">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
      {demoCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-90 z-20"></div>
          <div className="relative z-30 flex flex-col items-center max-w-sm mx-auto text-center px-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[hsl(252deg_100%_71%)] text-white px-8 py-4 rounded-xl shadow-lg cursor-pointer font-bold text-xl w-full"
              onClick={() => window.location.href = "/app/chat/new"} 
            >
              Start Real Conversation
            </motion.button>      
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white mt-4"
            >
              Experience the full power of our AI trading assistant with real-time insights and personalized recommendations.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="mt-6 text-white/80 underline text-sm"
              onClick={resetDemo}
            >
              Watch demo again
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

==================================================
File: components/ui/input.tsx
==================================================

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

==================================================
File: components/ui/label.tsx
==================================================

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

==================================================
File: components/ui/language-switch.tsx
==================================================

"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "es",
    name: "Español",
    flag: "https://flagcdn.com/es.svg",
  },
  // {
  //   code: "fr",
  //   name: "Français",
  //   flag: "https://flagcdn.com/fr.svg",
  // },
  // {
  //   code: "de",
  //   name: "Deutsch",
  //   flag: "https://flagcdn.com/de.svg",
  // },
  // {
  //   code: "ar",
  //   name: "العربية",
  //   flag: "https://flagcdn.com/sa.svg",
  // },
  // {
  //   code: "hi",
  //   name: "हिन्दी",
  //   flag: "https://flagcdn.com/in.svg",
  // },
  // {
  //   code: "zh",
  //   name: "中文",
  //   flag: "https://flagcdn.com/cn.svg",
  // },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Intentamos obtener el idioma actual de i18n
    const currentLang = i18n.language || 'en';
    // Buscamos el idioma en nuestra lista de idiomas soportados
    const matchingLanguage = languages.find(
      (lang) => lang.code === currentLang || currentLang.startsWith(lang.code)
    );
    // Si no encontramos coincidencia, usamos el primer idioma de la lista
    return matchingLanguage || languages[0];
  });

  // Efecto para mantener sincronizado el idioma seleccionado con i18n
  useEffect(() => {
    const currentLang = i18n.language;
    const matchingLanguage = languages.find(
      (lang) => lang.code === currentLang || currentLang.startsWith(lang.code)
    );
    
    if (matchingLanguage && matchingLanguage.code !== selectedLanguage.code) {
      setSelectedLanguage(matchingLanguage);
    }
  }, [i18n.language, selectedLanguage.code]);

  const handleLanguageChange = (language: { code: string; name: string; flag: string; }) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    i18n.changeLanguage(language.code);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/10"
      >
        <div className="relative h-5 w-7 overflow-hidden rounded">
          <img
            src={selectedLanguage.flag}
            alt={selectedLanguage.name}
            className="object-cover"
          />
        </div>
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl"
          >
            <div className="max-h-[280px] overflow-y-auto py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-white/10 ${
                    selectedLanguage.code === language.code ? "bg-white/5" : ""
                  }`}
                >
                  <div className="relative h-5 w-7 overflow-hidden rounded">
                    <img
                      src={language.flag}
                      alt={language.name}
                      className="object-cover"
                    />
                  </div>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

==================================================
File: components/ui/select.tsx
==================================================



==================================================
File: components/ui/side.tsx
==================================================

import { PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { formatChatTitle } from "../../utils/chatUtils";

interface Chat {
  isArchived: any;
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
}

interface SideChatProps {
  showSidebar: boolean;
  chatList: Chat[];
  currentChatId: string;
  createNewChat: () => void;
  deleteChat: (id: string, e: React.MouseEvent) => void;
}

export function SideChat({
  showSidebar,
  chatList,
  currentChatId,
  createNewChat,
  deleteChat,
}: SideChatProps) {
  const navigate = useNavigate();

  const filteredChats = chatList
    .filter((chat) => !chat.isArchived)
    .sort((a, b) => b.timestamp - a.timestamp);

  const handleChatClick = (chatId: string) => {
    console.log("Navigating to chat:", chatId);
    navigate(`/app/chat/${chatId}`);
  };

  return (
    <aside
      className={`bg-solana-dark h-full flex flex-col transition-all duration-300 ${
        showSidebar ? "w-80" : "w-0"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200/10 px-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-white">Chats</h2>
        <Button
          onClick={createNewChat}
          className="flex items-center gap-2 bg-primary/20 text-primary hover:bg-primary/30"
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="overflow-y-auto flex-grow p-3">
        <div className="space-y-2">
          {filteredChats.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No chats yet. Start a new conversation!
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={`flex justify-between items-center rounded-lg p-3 transition-colors hover:bg-white/5 cursor-pointer ${
                  chat.id === currentChatId ? "bg-white/10" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">
                    {formatChatTitle(chat.title)}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {chat.lastMessage || "New conversation"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(chat.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => deleteChat(chat.id, e)}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/5"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

==================================================
File: components/ui/sidebar.tsx
==================================================


// components/ui/sidebar.tsx
import React, { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = false }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

export function Sidebar({ children, className = '' }: SidebarProps) {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('Sidebar must be used within SidebarProvider')
  
  const { isOpen } = context

  return (
    <div className={`${className} w-64 ${isOpen ? 'block' : 'hidden md:block'}`}>
      {children}
    </div>
  )
}

export function SidebarTrigger({ className = '' }: { className?: string }) {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('SidebarTrigger must be used within SidebarProvider')
  
  const { isOpen, setIsOpen } = context

  return (
    <button
      className={`${className} p-2`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  )
}


==================================================
File: components/ui/sonner.tsx
==================================================

"use client"

import { useTheme } from "@/providers/theme-provider"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

==================================================
File: components/ui/tabs.tsx
==================================================

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}

==================================================
File: components/ui/useMenu.tsx
==================================================

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, Crown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  const { userData, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  // Cerrar el menú cuando se hace clic fuera - MOVIDO ANTES DEL RETORNO CONDICIONAL
  useEffect(() => {
    // Solo agregar listeners si el menú está abierto y el usuario está autenticado
    if (!isMenuOpen || !isAuthenticated) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isAuthenticated]);

  // Si el usuario no está autenticado, mostrar botón de login
  if (!isAuthenticated || !userData) {
    return (
      <Button
        variant="ghost"
        className="text-sm flex items-center gap-2 py-2 px-3 hover:bg-[hsl(252deg_100%_71%/10%)]"
        onClick={() => navigate("/login")}
      >
        <LogIn className="h-4 w-4" />
        <span>Login</span>
      </Button>
    );
  }

  // Avatar fallback (primera letra del nombre)
  const getInitial = () => {
    if (userData?.fullName) {
      return userData.fullName.charAt(0).toUpperCase();
    }
    return "U"; // Default para "Usuario"
  };

  return (
    <div className="relative">
      <div
        ref={avatarRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer"
      >
        <Avatar className="h-9 w-9 border-2 border-[hsl(252deg_100%_71%/90%)] hover:border-[hsl(252deg_100%_71%/70%)] transition-all">
          <AvatarImage
            src={userData?.imageUrl}
            alt={userData?.fullName || "Usuario"}
          />
          <AvatarFallback className="bg-[hsl(252deg_100%_71%/90%)] text-white">
            {getInitial()}
          </AvatarFallback>
        </Avatar>
      </div>

      {isMenuOpen && userData && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-card border border-border focus:outline-none z-50 overflow-hidden"
        >
          <div className="bg-[hsl(252deg_100%_71%/10%)] px-4 py-3">
            <p className="text-sm font-medium text-foreground">
              {userData?.fullName || "Usuario"}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-1">
              {userData?.email || ""}
            </p>
          </div>

          <div className="border-t border-border"></div>

          <div className="py-1">
            <Link
              to="/app/settings"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-1.5 rounded-md bg-[hsl(252deg_100%_71%/90%)] text-white mr-3">
                <Settings className="h-4 w-4" />
              </div>
              <span>Ajustes</span>
            </Link>

            <Link
              to="/app/upgrade-plan"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-1.5 rounded-md bg-[hsl(252deg_100%_71%/90%)] text-white mr-3">
                <Crown className="h-4 w-4" />
              </div>
              <span>Mejorar Plan</span>
            </Link>
          </div>

          <div className="border-t border-border"></div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex w-full items-center px-4 py-3 text-sm text-foreground hover:bg-red-100/50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-red-500 text-white mr-3">
                <LogOut className="h-4 w-4" />
              </div>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

==================================================
File: context/auth-context.tsx
==================================================

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";

// Definir el tipo de datos que tendrá el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean; // Nuevo flag para indicar usuario nuevo
  login: (token: string) => void;
  logout: () => void;
  userData: any | null;
  fetchUserData: () => Promise<void>;
  refreshUserData: () => Promise<void>; // Nueva función para refrescar datos del usuario
  updateUserProfile: (fullName: string) => Promise<boolean>; // Función para actualizar el perfil
}

// Duración del token en milisegundos (24 horas)
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

// Crear el contexto con valores iniciales
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false); // Estado para usuario nuevo
  const navigate = useNavigate();
  const location = useLocation();
  const {
    logout: privyLogout,
    getAccessToken,
    authenticated,
    ready,
    user,
  } = usePrivy();

  // Add a function to get the current Privy token
  const getToken = async () => {
    try {
      // Get the token from Privy
      const privyToken = await getAccessToken();
      if (!privyToken) {
        console.error("No se pudo obtener el token de Privy");
        return null;
      }
      return privyToken;
    } catch (error) {
      console.error("Error obteniendo token de Privy:", error);
      return null;
    }
  };

  // Verificar si el token ha expirado
  const isTokenExpired = (): boolean => {
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    if (!tokenTimestamp) return true;

    const timestamp = parseInt(tokenTimestamp, 10);
    const now = Date.now();
    return now - timestamp > TOKEN_EXPIRATION_TIME;
  };

  // Función para obtener datos del usuario
  const fetchUserData = async (): Promise<void> => {
    try {
      const token = await getToken();
      if (!token) {
        // If no token, logout to reset state
        await logout();
        return;
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await logout();
      }
    }
  };

  // Función para refrescar datos del usuario (solo llama a fetchUserData)
  const refreshUserData = async (): Promise<void> => {
    await fetchUserData();
  };

  // Función para actualizar el perfil del usuario después de la bienvenida
  const updateUserProfile = async (fullName: string): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) {
        console.error("No hay token disponible para actualizar el perfil");
        return false;
      }

      const response = await axios.put(
        "http://localhost:3000/api/auth/welcome-completed",
        { fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Actualizar datos del usuario en el estado
        setUserData((prev: any) => ({
          ...prev,
          fullName,
          onboardingCompleted: true,
        }));

        // Actualizar que ya no es un usuario nuevo
        setIsNewUser(false);
        localStorage.removeItem("isNewUser");

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      return false;
    }
  };

  // Verificar estado de autenticación de Privy cuando está listo
  useEffect(() => {
    const checkPrivyAuth = async () => {
      if (ready) {
        if (authenticated && user) {
          // Privy está autenticado, verificar nuestro estado
          const token = localStorage.getItem("authToken");

          if (!token || isTokenExpired()) {
            // No tenemos token válido pero Privy está autenticado
            // Necesitamos autenticar con el backend
            try {
              const privyId = user.id;
              const email = user.email?.address;
              const emailVerified = true;

              const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                  privyId,
                  email,
                  emailVerified,
                }
              );

              if (response.data.success && response.data.token) {
                // Guardar token en localStorage junto con timestamp
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("tokenTimestamp", Date.now().toString());

                // Verificar si es un usuario nuevo
                if (response.data.isNewUser) {
                  setIsNewUser(true);
                  localStorage.setItem("isNewUser", "true");
                }

                setIsAuthenticated(true);

                // Solo redirigir si estamos en la página de login
                if (location.pathname === "/login") {
                  const lastPath =
                    sessionStorage.getItem("lastPath") || "/app/home";
                  navigate(lastPath, { replace: true });
                }
              }
            } catch (error) {
              console.error("Error autenticando con backend:", error);
            }
          } else if (!isAuthenticated) {
            // Tenemos token válido pero el estado no refleja estar autenticado
            setIsAuthenticated(true);

            // Verificar si hay flag de usuario nuevo en localStorage
            if (localStorage.getItem("isNewUser") === "true") {
              setIsNewUser(true);
            }
          }
        } else if (isAuthenticated) {
          // Privy no está autenticado pero nosotros sí, hacer logout
          logout();
        }

        // Actualizar estado de carga
        setIsLoading(false);
      }
    };

    checkPrivyAuth();
  }, [ready, authenticated, user]);

  // Cargar el estado desde localStorage al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const lastPath = sessionStorage.getItem("lastPath");
        const newUserFlag = localStorage.getItem("isNewUser");

        if (token && !isTokenExpired()) {
          setIsAuthenticated(true);

          // Verificar si es un usuario nuevo
          if (newUserFlag === "true") {
            setIsNewUser(true);
          }

          // Verificar si hay una ruta guardada en sessionStorage
          if (lastPath && location.pathname === "/login") {
            navigate(lastPath, { replace: true });
          }
        } else if (token) {
          // Limpiar token expirado
          localStorage.removeItem("authToken");
          localStorage.removeItem("tokenTimestamp");
          localStorage.removeItem("isNewUser");
          setIsAuthenticated(false);
          setIsNewUser(false);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
        setIsNewUser(false);
      } finally {
        if (!ready) {
          // Solo establecer isLoading en false si Privy no está listo
          // De lo contrario, el efecto de Privy lo hará
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, []);

  // Sincronizar estado entre pestañas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken") {
        if (event.newValue) {
          // Token añadido o actualizado en otra pestaña
          setIsAuthenticated(true);

          // Si estamos en la página de login, redirigir
          if (location.pathname === "/login") {
            const lastPath = sessionStorage.getItem("lastPath") || "/app/home";
            navigate(lastPath, { replace: true });
          }
        } else {
          // Token removido en otra pestaña (logout)
          setIsAuthenticated(false);
          setUserData(null);
          setIsNewUser(false);

          // Si no estamos en login, redirigir
          if (!location.pathname.includes("/login")) {
            navigate("/login", { replace: true });
          }
        }
      } else if (event.key === "isNewUser") {
        setIsNewUser(event.newValue === "true");
      }
    };

    // Agregar listener
    window.addEventListener("storage", handleStorageChange);

    // Limpiar listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.pathname, navigate]);

  // Guardar la ruta actual cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && !location.pathname.includes("/login")) {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  // Cargar datos del usuario cuando está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  // Función para iniciar sesión
  const login = (token: string) => {
    // Guardar token en localStorage junto con timestamp
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenTimestamp", Date.now().toString());

    // IMPORTANTE: No eliminar el flag isNewUser aquí
    // Verificar si hay flag de usuario nuevo en localStorage
    const isNewUserFlag = localStorage.getItem("isNewUser");
    if (isNewUserFlag === "true") {
      setIsNewUser(true);
    }

    // Actualizar estado
    setIsAuthenticated(true);

    // Redirigir a la última ruta o a la página principal
    const lastPath = sessionStorage.getItem("lastPath") || "/app/home";
    navigate(lastPath, { replace: true });
  };

  // Función de logout que devuelve una promesa
  const logout = async (): Promise<void> => {
    try {
      // 1. Limpiar datos de autenticación
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("isNewUser");
      sessionStorage.removeItem("lastPath"); // Limpiar también la última ruta

      // 2. Logout de Privy antes de actualizar el estado
      try {
        await privyLogout();
      } catch (privyError) {
        console.error("Error en logout de Privy:", privyError);
        // No detener el proceso si falla Privy
      }

      // 3. Actualizar estado solo después de que Privy haya cerrado sesión
      setIsAuthenticated(false);
      setUserData(null); // Limpiar los datos del usuario al hacer logout
      setIsNewUser(false); // Resetear estado de usuario nuevo
    } catch (error) {
      console.error("Error en logout:", error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  };

  // Verificar expiración del token periódicamente
  useEffect(() => {
    if (isAuthenticated) {
      const checkTokenInterval = setInterval(() => {
        if (isTokenExpired()) {
          logout();
          clearInterval(checkTokenInterval);
        }
      }, 60000); // Verificar cada minuto

      return () => clearInterval(checkTokenInterval);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isNewUser,
        login,
        logout,
        userData,
        fetchUserData,
        refreshUserData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

==================================================
File: context/private-router.tsx
==================================================

import { useAuth } from "./auth-context";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Si está cargando, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Si no está autenticado, guardar la ruta actual y redirigir al login
  if (!isAuthenticated) {
    // Guardar la ruta actual para redireccionar después del login
    sessionStorage.setItem("lastPath", location.pathname);
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderizar los componentes hijos
  return children;
}

==================================================
File: hooks/useChatLogic.tsx
==================================================

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePrivy } from "@privy-io/react-auth";
import { Message } from "../types/chat";
import { useChatStorage } from "./useChatStorage";

// Define message types to match API response format
interface ApiMessage {
  id: string;
  conversationId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  tokens: null;
  createdAt: string;
  marketData: null;
  analysis: null;
}

interface ApiResponse {
  success: boolean;
  data: {
    conversationId: string;
    messages: ApiMessage[];
  };
}

interface ConversationResponse {
  success: boolean;
  data: Array<{
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    lastMessage: string;
    isArchived: boolean;
  }>;
}

export function useChatLogic(chatId: string) {
  const navigate = useNavigate();
  const { messages, setMessages, chatList, setChatList } =
    useChatStorage(chatId);
  const { getAccessToken } = usePrivy();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showWelcome, setShowWelcome] = useState(
    chatId === "new" || messages.length === 0
  );
  const [welcomeText, setWelcomeText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  console.log("useChatLogic initialized with chatId:", chatId);
  console.log("Initial state:", {
    messagesCount: messages.length,
    chatListCount: chatList.length,
    showWelcome,
  });

  // Function to convert API message format to our internal format
  const convertApiMessage = (apiMessage: ApiMessage): Message => {
    return {
      id: apiMessage.id,
      content: apiMessage.content,
      role: apiMessage.role === "USER" ? "user" : "assistant",
      timestamp: new Date(apiMessage.createdAt).getTime(),
      status: "sent",
    };
  };

  // Function to fetch messages for an existing chat
  const fetchChatMessages = async (conversationId: string) => {
    if (conversationId === "new") return;

    console.log("Fetching messages for chat ID:", conversationId);

    try {
      const token = await getAccessToken();

      const response = await axios.get<ApiResponse>(
        `http://localhost:3000/api/chat/conversations/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response for messages:", response.data);

      if (response.data.success && response.data.data.messages) {
        const apiMessages = response.data.data.messages;
        const convertedMessages = apiMessages.map(convertApiMessage);
        console.log("Converted messages:", convertedMessages.length);
        setMessages(convertedMessages);
        setShowWelcome(false);
      } else {
        console.log("No messages found or success is false");
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      // Si hay un error, mostramos un mensaje vacío
      setMessages([]);
      setShowWelcome(true);
    }
  };

  // Fetch user conversations from the API
  const fetchConversations = async () => {
    console.log("Fetching conversations list");

    try {
      const token = await getAccessToken();

      const response = await axios.get<ConversationResponse>(
        "http://localhost:3000/api/chat/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response for conversations:", response.data);

      if (response.data.success && response.data.data) {
        // Convert API format to our chat list format
        const apiConversations = response.data.data;
        const formattedChats = apiConversations.map((conv) => ({
          id: conv.id,
          title: conv.title || `Chat ${conv.id.slice(0, 8)}...`,
          lastMessage: conv.lastMessage || "",
          timestamp: new Date(conv.updatedAt).getTime(),
          isArchived: conv.isArchived || false,
        }));

        // Sort by most recent first
        const sortedChats = formattedChats.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        console.log("Formatted chat list:", sortedChats.length);

        // Update chat list
        setChatList(sortedChats);
        localStorage.setItem("chat-list", JSON.stringify(sortedChats));
      } else {
        console.log("No conversations found or success is false");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // Function to send a message
  const handleSend = async () => {
    if (!input.trim()) return;

    console.log("Sending message:", input.substring(0, 20) + "...");

    // Hide welcome message when user sends first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Guardar el mensaje actual y también los mensajes existentes para no perderlos
    const currentMessages = [...messages];

    const tempId = Date.now().toString();
    const newMessage: Message = {
      id: tempId,
      content: input,
      role: "user",
      timestamp: Date.now(),
      status: "sending",
    };

    // Añadir el nuevo mensaje a los existentes
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Get Privy token
      const token = await getAccessToken();

      // Call the API with the correct format and token
      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/api/chat/message",
        {
          message: input,
          conversationId: chatId !== "new" ? chatId : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Message API response:", response.data);

      if (!response.data.success) {
        throw new Error("API response indicates failure");
      }

      // Get conversation ID from the response
      const serverChatId = response.data.data.conversationId;

      // Update URL if this is a new conversation
      if (
        (chatId === "new" || serverChatId !== chatId) &&
        currentMessages.length === 0
      ) {
        console.log("Updating URL to new conversation:", serverChatId);
        navigate(`/app/chat/${serverChatId}`, { replace: true });
        updateChatInList(serverChatId, input);
      } else if (currentMessages.length === 0) {
        updateChatInList(chatId, input);
      }

      // SOLUCIÓN: Solo extraer la respuesta más reciente del asistente
      const apiMessages = response.data.data.messages;
      let assistantResponse: Message | null = null;

      // Buscar la última respuesta del asistente en los mensajes de la API
      for (let i = apiMessages.length - 1; i >= 0; i--) {
        if (apiMessages[i].role === "ASSISTANT") {
          assistantResponse = convertApiMessage(apiMessages[i]);
          break;
        }
      }

      // Actualizar los mensajes conservando todos los mensajes anteriores
      if (assistantResponse) {
        // Actualizar el estado del mensaje del usuario y añadir la respuesta
        setMessages((prev) => {
          const updatedMessages = prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: "sent" as "sent" } : msg
          );
          return [...updatedMessages, assistantResponse];
        });
      } else {
        // Si no hay respuesta del asistente, al menos actualizar el estado del mensaje del usuario
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: "sent" } : msg
          )
        );
      }

      // Update chat title if this is the first message
      if (currentMessages.length === 0 || currentMessages.length === 1) {
        updateChatTitle(serverChatId || chatId, input);
      }

      // Refresh conversation list
      fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error);

      // Error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, an error occurred while processing your message. Please try again.",
        role: "assistant",
        timestamp: Date.now(),
        status: "error",
      };

      setMessages((prev) => [
        ...prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "error" as "error" } : msg
        ),
        errorMessage,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Update chat in the list with the first message as title
  const updateChatInList = (chatId: string, firstMessage: string) => {
    // Create a title based on the first message (limited to 30 characters)
    const chatTitle =
      firstMessage.length > 30
        ? firstMessage.substring(0, 30) + "..."
        : firstMessage;

    // Check if the chat already exists in the list
    const existingChatIndex = chatList.findIndex((chat) => chat.id === chatId);

    if (existingChatIndex >= 0) {
      const updatedList = [...chatList];
      updatedList[existingChatIndex] = {
        ...updatedList[existingChatIndex],
        title: chatTitle,
        lastMessage: firstMessage,
        timestamp: Date.now(),
      };
      setChatList(updatedList);
      localStorage.setItem("chat-list", JSON.stringify(updatedList));
    } else {
      // Create new chat in the list
      const newChat = {
        id: chatId,
        title: chatTitle,
        lastMessage: firstMessage,
        timestamp: Date.now(),
        isArchived: false,
      };

      const updatedList = [newChat, ...chatList];
      setChatList(updatedList);
      localStorage.setItem("chat-list", JSON.stringify(updatedList));
    }
  };

  // Update chat title based on the first message
  const updateChatTitle = (chatId: string, message: string) => {
    // Create a title based on the message (limited to 30 characters)
    const chatTitle =
      message.length > 30 ? message.substring(0, 30) + "..." : message;

    const updatedList = chatList.map((chat) => {
      if (chat.id === chatId) {
        return { ...chat, title: chatTitle };
      }
      return chat;
    });

    setChatList(updatedList);
    localStorage.setItem("chat-list", JSON.stringify(updatedList));
  };

  // Key press handling
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll management
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Create new chat
  const createNewChat = () => {
    console.log("Creating new chat");
    // Limpiar el estado actual
    setInput("");
    setMessages([]);
    setShowWelcome(true);
    setWelcomeText(""); // Reinicia el texto para que el efecto de escritura se inicie de nuevo

    // Navigate to the special "new" route that will create a new chat when the first message is sent
    navigate(`/app/chat/new`, { replace: true });
  };

  // Delete chat
  // Archivar chat (antes llamado deleteChat)
  const archiveChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentChatId = chatId;

    console.log("Archiving chat:", chatId);

    try {
      // Get token for authorization
      const token = await getAccessToken();

      // Make API call to archive the conversation
      await axios.delete(
        `http://localhost:3000/api/chat/conversations/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Local update regardless of API success
      const updatedList = chatList.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      );

      // Filtramos las conversaciones archivadas para la vista
      const visibleChats = updatedList.filter((chat) => !chat.isArchived);

      setChatList(updatedList);
      localStorage.setItem("chat-list", JSON.stringify(updatedList));

      // Navigate to a different chat or create a new one if current chat is archived
      if (chatId === currentChatId) {
        if (visibleChats.length > 0) {
          navigate(`/app/chat/${visibleChats[0].id}`);
        } else {
          createNewChat();
        }
      }

      console.log("Chat archived successfully");
    } catch (error) {
      console.error("Error archiving chat:", error);

      // Still update the local state even if the API fails
      const updatedList = chatList.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      );
      const visibleChats = updatedList.filter((chat) => !chat.isArchived);

      setChatList(updatedList);
      localStorage.setItem("chat-list", JSON.stringify(updatedList));

      if (chatId === currentChatId) {
        if (visibleChats.length > 0) {
          navigate(`/app/chat/${visibleChats[0].id}`);
        } else {
          createNewChat();
        }
      }
    }
  };

  // Welcome message typing effect
  useEffect(() => {
    if (!showWelcome) return;

    const welcomeMessage =
      "Welcome to Delphos, your AI assistant. How can I help you today?";
    const typingSpeed = 50; // ms per character
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < welcomeMessage.length) {
        setWelcomeText(welcomeMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [showWelcome]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations when component mounts and when chatId changes
  useEffect(() => {
    console.log("Effect triggered for chatId:", chatId);

    // Siempre cargar la lista de conversaciones
    fetchConversations();

    // Si es un chat existente, siempre cargar sus mensajes (incluso si ya tenemos algunos)
    if (chatId !== "new") {
      fetchChatMessages(chatId);
    } else {
      console.log("New chat - resetting messages");
      setMessages([]);
      setShowWelcome(true);
      setWelcomeText(""); // Reinicia para el efecto de escritura
    }
  }, [chatId]);

  return {
    // State
    messages,
    input,
    setInput,
    isTyping,
    showSidebar,
    setShowSidebar,
    showWelcome,
    welcomeText,
    chatList,

    // References
    messagesEndRef,
    inputRef,

    // Functions
    handleSend,
    handleKeyPress,
    createNewChat,
    archiveChat,
  };
}


==================================================
File: hooks/useChatStorage.tsx
==================================================

import { Chat, Message } from '@/types/chat';
import { useState, useEffect } from 'react';

export function useChatStorage(chatId: string) {
  // Función auxiliar para manejar localStorage
  const getStoredValue = <T,>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  // Obtener mensajes del chat actual
  const [messages, setMessages] = useState<Message[]>(() => 
    getStoredValue(`chat-${chatId}`, [])
  );

  // Obtener lista de chats
  const [chatList, setChatList] = useState<Chat[]>(() => {
    const defaultList: Chat[] = getStoredValue('chat-list', []);
    
    // Si el chat actual no existe en la lista, añadirlo
    if (!defaultList.some((chat: Chat) => chat.id === chatId)) {
      defaultList.unshift({
        id: chatId,
        title: `Chat ${chatId}`,
        lastMessage: "Nuevo chat",
        timestamp: Date.now(),
        isArchived: false // Add this property

      });
      localStorage.setItem('chat-list', JSON.stringify(defaultList));
    }
    
    return defaultList;
  });

  // Guardar mensajes cuando cambien
  useEffect(() => {
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
    
    // Actualizar la lista de chats con el último mensaje
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      const updatedList = chatList.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              lastMessage: lastMsg.content.substring(0, 30) + (lastMsg.content.length > 30 ? "..." : ""),
              timestamp: lastMsg.timestamp
            }
          : chat
      );
      
      setChatList(updatedList);
      localStorage.setItem('chat-list', JSON.stringify(updatedList));
    }
  }, [messages, chatId]);

  return {
    messages,
    setMessages,
    chatList,
    setChatList
  };
}

==================================================
File: hooks/usePrivyAuth.tsx
==================================================

import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useCallback, useState, useEffect } from "react";

export const usePrivyAuth = () => {
  const [authError, setAuthError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Usar usePrivy para el estado y useLogin para las funciones de login
  const { 
    logout: privyLogoutBase,
    authenticated, 
    ready, 
    user,
    connectWallet,
  } = usePrivy();

  // Obtener la función de login específica
  const { login: privyLoginBase } = useLogin();

  // Monitorear el estado de autenticación
  useEffect(() => {
    if (ready) {
      console.log(`[Privy] Estado: ready=${ready}, authenticated=${authenticated}`);
      console.log(`[Privy] Usuario:`, user);
      setIsInitializing(false);
    }
  }, [ready, authenticated, user]);

  // Función de login con las opciones correctas según la documentación
  const privyLogin = useCallback(async () => {
    try {
      setAuthError(null);
      console.log("[Privy] Iniciando login con wallet");
      
      // Usar la función de login con los parámetros correctos
      privyLoginBase({
        loginMethods: ['wallet'],
        walletChainType: 'solana-only', // Especificar que queremos solo Solana
        disableSignup: false // Permitir registro de nuevos usuarios
      });
      
      console.log("[Privy] Login iniciado con éxito");
      return true;
    } catch (error) {
      const typedError = error as Error;
      console.error("[Privy] Error durante login:", typedError);
      setAuthError(typedError);
      return false;
    }
  }, [privyLoginBase]);
  
  const privyLogout = useCallback(async () => {
    try {
      console.log("[Privy] Iniciando logout");
      await privyLogoutBase();
      console.log("[Privy] Logout exitoso");
      return true;
    } catch (error) {
      const typedError = error as Error;
      console.error("[Privy] Error durante logout:", typedError);
      return false;
    }
  }, [privyLogoutBase]);

  // Extraer información del usuario con validaciones extensivas
  const getPrivyUserData = useCallback(() => {
    if (!user) return null;

    const privyId = user.id;
    const email = user.email?.address;
    const emailVerified = user.email?.verified ?? false;

    // Búsqueda de wallet
    let walletAddress = null;
    const walletChain = "SOLANA";

    // Verificar la estructura de wallets según la documentación
    if (user.wallet && typeof user.wallet === 'object' && 'address' in user.wallet) {
      walletAddress = user.wallet.address;
    } else if (Array.isArray(user.wallets) && user.wallets.length > 0) {
      const solanaWallet = user.wallets.find(w => 
        w.chainName?.toUpperCase() === 'SOLANA' || 
        w.chain === 'solana'
      );
      
      if (solanaWallet) {
        walletAddress = solanaWallet.address;
      }
    }

    return {
      privyId,
      email,
      emailVerified,
      walletAddress,
      walletChain
    };
  }, [user]);

  return {
    privyLogin,
    privyLogout,
    authenticated,
    ready,
    user,
    getPrivyUserData,
    connectWallet,
    isLoading: !ready || isInitializing,
    authError
  };
};

==================================================
File: index.css
==================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --solana-gradient: linear-gradient(45deg, hsl(252deg 100% 71% / 90%), hsl(183 93% 41%));

    --background: 252 33% 97%;
    --foreground: 252 33% 3%;

    --card: 0 0% 100%;
    --card-foreground: 252 33% 3%;

    --popover: 0 0% 100%;
    --popover-foreground: 252 33% 3%;

    --primary: 252 100% 71%;
    --primary-foreground: 0 0% 100%;

    --secondary: 183 93% 41%;
    --secondary-foreground: 0 0% 100%;

    --muted: 252 33% 95%;
    --muted-foreground: 252 33% 45%;

    --accent: 163 93% 41%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 252 33% 90%;
    --input: 252 33% 90%;
    --ring: 252 100% 71%;

    --radius: 1rem;
  }

  .dark {
    --background: 252 33% 3%;
    --foreground: 252 33% 97%;

    --card: 252 33% 6%;
    --card-foreground: 252 33% 97%;

    --popover: 252 33% 6%;
    --popover-foreground: 252 33% 97%;

    --primary: 252 100% 71%;
    --primary-foreground: 0 0% 100%;

    --secondary: 183 93% 41%;
    --secondary-foreground: 0 0% 100%;

    --muted: 252 33% 10%;
    --muted-foreground: 252 33% 60%;

    --accent: 163 93% 41%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 252 33% 97%;

    --border: 252 33% 15%;
    --input: 252 33% 15%;
    --ring: 252 100% 71%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations and effects */
@layer utilities {
  .gradient-border {
    position: relative;
    border-radius: var(--radius);
  }

  .gradient-border::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: calc(var(--radius) + 2px);
    background: var(--solana-gradient);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .gradient-border:hover::before {
    opacity: 1;
  }

  .hover-scale {
    transition: transform 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.02);
  }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.animate-pulse-slow {
  animation: pulseSlow 4s infinite;
}

@keyframes pulseFast {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
}

.animate-pulse-fast {
  animation: pulseFast 2s infinite;
}

@keyframes pulseMedium {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.animate-pulse-medium {
  animation: pulseMedium 3s infinite;
}

@keyframes scaleUp {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 0; }
}

.animate-scale-up {
  animation: scaleUp 3s infinite;
}

@keyframes counter {
  0% { content: "0"; }
  100% { content: "10K+"; }
}

.animate-counter {
  animation: counter 2s ease-out forwards;
}

==================================================
File: lib/i18n.ts
==================================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, es} from '../locales/index';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en,
      es,
    },
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'], 
      lookupFromPathIndex: 0
    },
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

==================================================
File: lib/utils.ts
==================================================

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * This allows for conditional class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a human-readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Delays execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

==================================================
File: locales/en.ts
==================================================

export const en = {
    translation: {
        WrapTextIcon: "Wrap text",
    }
};

==================================================
File: locales/es.ts
==================================================

export const es = {
    translation: {
        WrapTextIcon: "Ajustar texto",
    }
};

==================================================
File: locales/index.ts
==================================================

export { en } from "./en";
export { es } from "./es";


==================================================
File: main.tsx
==================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


==================================================
File: pages/Account/index.tsx
==================================================

// src/pages/Account/index.tsx
import { AccountContent } from '@/components/account/AccountContent'

export default function Account() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-sidebar-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 w-full items-center px-8">
          <h1 className="text-lg font-medium">Account</h1>
        </div>
      </div>
      <AccountContent />
    </div>
  )
}

==================================================
File: pages/Chat/index.tsx
==================================================

// src/pages/Chat/index.tsx
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ChatInterface from "@/components/chat/ChatInterface";
import { ChatSkeleton } from "@/components/chat/ChatSkeleton";
import { useAuth } from "@/context/auth-context";

export default function Chat() {
  // Obtenemos el parámetro id de la URL
  const { id = "new" } = useParams();
  
  // Accedemos al contexto de autenticación
  const { isLoading, userData } = useAuth();
  
  console.log("Chat component rendering with id:", id);
  console.log("Auth state:", { isLoading, userDataExists: !!userData });
  
  if (isLoading || !userData) {
    return <ChatSkeleton />;
  }

  if (!userData || !userData.id) {
    return <p>Error: No se pudo obtener el ID del usuario</p>;
  }

  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatInterface 
        id={id} // Pasamos el ID de la conversación en lugar del ID del usuario
      />
    </Suspense>
  );
}

==================================================
File: pages/FAQ/index.tsx
==================================================

// src/pages/FAQ/index.tsx
import { ComingSoonPage } from '@/components/ComingSoonPage'
import { Brain } from 'lucide-react'

export default function FAQ() {
  return <ComingSoonPage icon={Brain} title="FAQ" />
}

==================================================
File: pages/Home/index.tsx
==================================================

import { HomeContent } from '@/components/home/home-content'

export default function Home() {
  return <HomeContent />
}

==================================================
File: pages/Login/index.tsx
==================================================

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import Login from "@/components/auth/login/Login";
import Recovery from "@/components/auth/Recovery";
import RecoveryInfo from "@/components/auth/RecoveryInfo";


export default function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }
      >
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="recovery-password" element={<Recovery />} />
        <Route path="recovery-info" element={<RecoveryInfo />} />
        {/* <Route path="email-info" element={<EmailInfo />} /> */}
      </Route>
    </Routes>
  );
}

==================================================
File: pages/Memories/index.tsx
==================================================

// src/pages/Memories/index.tsx
import { ComingSoonPage } from '@/components/ComingSoonPage'
import { Brain } from 'lucide-react'

export default function Memories() {
  return <ComingSoonPage icon={Brain} title="Agent's Personalized Memory" />
}

==================================================
File: pages/Refresh/index.tsx
==================================================

// src/pages/Refresh/index.tsx
import { Suspense } from 'react'
import PageLoading from '@/components/PageLoading'
import RefreshContent from '@/components/refresh/RefreshContent'

export default function Refresh() {
  return (
    <Suspense fallback={<PageLoading />}>
      <RefreshContent />
    </Suspense>
  )
}

==================================================
File: pages/SavedPrompts/index.tsx
==================================================

// src/pages/SavedPrompts/index.tsx
import { SavedPromptsContent } from '@/components/saved-prompts/SavedPromptsContent'

export default function SavedPrompts() {
  return <SavedPromptsContent />
}


==================================================
File: pages/Settings/index.tsx
==================================================

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Wallet, Loader2, Gem  } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import ProfileTab from "../../components/settings/profileTab";
import SecurityTab from "../../components/settings/securityTab";
import UpgradePlans from "../../components/settings/plansTab";
import WalletTab from "../../components/settings/walletTab";

const Settings = () => {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing] = useState(false);

  React.useEffect(() => {
    if (userData) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userData]);

  if (isRefreshing) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-lg font-medium">Actualizando tu información...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-lg font-medium">Cargando datos del perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground mt-1">
            Administra tus preferencias y cuenta
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6 bg-muted/50">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger
                value="plans"
                className="flex items-center gap-2"
              >
                <Gem className="h-4 w-4" />
                Planes
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Seguridad
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Wallet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="plans">
              <UpgradePlans />
            </TabsContent>

            <TabsContent value="wallet">
              <WalletTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;

==================================================
File: pages/welcome/index.tsx
==================================================

// src/components/AppWrapper.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import WelcomeModal from '@/components/WelcomeModal';

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const { isNewUser, isAuthenticated, isLoading } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [appReady, setAppReady] = useState(false);

  // Depuración
  useEffect(() => {
    console.log("AppWrapper estado:", { 
      isNewUser, 
      isAuthenticated, 
      isLoading,
      showWelcomeModal,
      appReady,
      localStorageIsNewUser: localStorage.getItem("isNewUser")
    });
  }, [isNewUser, isAuthenticated, isLoading, showWelcomeModal, appReady]);

  // Determinar si se debe mostrar el modal o la aplicación
  useEffect(() => {
    if (!isLoading) {
      // Verificar también directamente en localStorage por si el estado no se actualizó
      const isNewUserFromStorage = localStorage.getItem("isNewUser") === "true";
      
      if (isAuthenticated && (isNewUser || isNewUserFromStorage)) {
        console.log("Mostrando modal de bienvenida (usuario nuevo)");
        setShowWelcomeModal(true);
        setAppReady(false);
      } else {
        console.log("Mostrando contenido principal (usuario existente)");
        setAppReady(true);
      }
    }
  }, [isAuthenticated, isNewUser, isLoading]);

  // Manejar cierre del modal
  const handleCloseWelcomeModal = () => {
    console.log("Modal de bienvenida cerrado, mostrando contenido principal");
    setShowWelcomeModal(false);
    setAppReady(true);
    // Limpiar el flag de localStorage
    localStorage.removeItem("isNewUser");
  };

  // Mientras carga, mostrar un estado de carga o nada
  if (isLoading) {
    console.log("Mostrando pantalla de carga");
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(252deg_100%_71%)]"></div>
    </div>;
  }

  // Debug render
  console.log("AppWrapper rendering:", { showWelcomeModal, appReady });

  return (
    <>
      {/* Modal de bienvenida (aparece antes del contenido principal) */}
      {showWelcomeModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <WelcomeModal 
            isOpen={showWelcomeModal} 
            onClose={handleCloseWelcomeModal} 
          />
        </>
      )}
      
      {/* Contenido principal (se muestra solo cuando appReady es true) */}
      {appReady ? children : null}
    </>
  );
}

==================================================
File: providers/i18nProvider.tsx
==================================================

'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}


==================================================
File: providers/theme-provider.tsx
==================================================


// src/providers/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'system',
  setTheme: () => null
})

export function ThemeProvider({
  children,
  defaultTheme = 'system'
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

==================================================
File: routes/index.tsx
==================================================

// src/routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import HeaderLayout from "@/components/headerLayout";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Account from "@/pages/Account";
import SavedPrompts from "@/pages/SavedPrompts";
import FAQ from "@/pages/FAQ";
import Settings from "@/pages/Settings";
import Memories from "@/pages/Memories";
import Refresh from "@/pages/Refresh";
import AuthRoutes from "@/pages/Login/index";
import { PrivateRoute } from "@/context/private-router";
import { AppWrapper } from "@/pages/welcome/index";
import UpgradePlan from "@/components/settings/plansTab";

export const AppRouter = () => (
  <HeaderLayout>
    <Routes>
      {/* Rutas públicas (Login y Register) */}
      <Route path="/*" element={<AuthRoutes />} />
      
      {/* Rutas privadas - Envueltas en AppWrapper para manejar modal de bienvenida */}
      <Route
        path="/app/*"
        element={
          <PrivateRoute>
            <AppWrapper>
              <Layout />
            </AppWrapper>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        
        {/* Rutas de chat actualizadas */}
        <Route path="chat" element={<Navigate to="new" replace />} />
        <Route path="chat/:id" element={<Chat />} />
        <Route path="settings" element={<Settings />} />
        <Route path="upgrade-plan" element={<UpgradePlan />} />
        <Route path="account" element={<Account />} />
        <Route path="saved-prompts" element={<SavedPrompts />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="memories" element={<Memories />} />
        <Route path="refresh" element={<Refresh />} />
      </Route>
    </Routes>
  </HeaderLayout>
);

==================================================
File: styles/globals.css
==================================================

@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
 
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
 
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
 
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
 
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --warning: 38 92% 50%;
    --warning-foreground: 48 96% 89%;

    --success: 142 72% 29%;
    --success-foreground: 144 61% 89%;

    --pending: 215 90% 48%;
    --pending-foreground: 210 40% 98%;

    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;

    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;

    --color-1: 215 90% 48%;
    --color-2: 142 72% 29%;
    --color-3: 38 92% 50%;
    --color-4: 0 84% 60%;
    --color-5: 262 83% 58%;

    --favorite: 346 77% 49%;

    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 222.2 84% 4.9%;
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 40% 96.1%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%;
    --sidebar-border: 214.3 31.8% 91.4%;
    --sidebar-ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }
 
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
 
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
 
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
 
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
 
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
 
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
 
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --warning: 48 96% 89%;
    --warning-foreground: 38 92% 50%;

    --success: 144 61% 89%;
    --success-foreground: 142 72% 29%;

    --pending: 210 40% 98%;
    --pending-foreground: 215 90% 48%;
 
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;

    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;

    --color-1: 215 90% 48%;
    --color-2: 142 72% 29%;
    --color-3: 38 92% 50%;
    --color-4: 0 84% 60%;
    --color-5: 262 83% 58%;

    --favorite: 346 77% 49%;

    --sidebar-background: 222.2 84% 4.9%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 210 40% 98%;
    --sidebar-primary-foreground: 222.2 47.4% 11.2%;
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
  }
}

@layer utilities {
  /* Clases para ocultar la barra de desplazamiento pero mantener la funcionalidad */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Estilos para el contenido principal con sidebar fijo */
  .main-content-with-sidebar {
    margin-left: 250px; /* Ajusta al ancho de tu sidebar */
  }
  
  @media (max-width: 768px) {
    .main-content-with-sidebar {
      margin-left: 0;
    }
  }

  .animated-border {
    --border-width: 2px;
    --shiny-width: 50%;
    background-image: linear-gradient(
      var(--angle),
      var(--border-color) 0%,
      var(--border-color) 50%,
      transparent 50%,
      transparent 100%
    );
    animation: rotate var(--duration) linear infinite;
  }

  .shiny-text {
    --shiny-width: 50%;
    background-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    background-repeat: no-repeat;
  }

  .shimmer {
    --speed: 1.5s;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
  }
}

/* Permitir scroll global en la aplicación */
html, body, #root {
  height: 100%;
  overflow: auto; /* Cambiado de 'hidden' a 'auto' para permitir scroll global */
}

/* Estilizar scrollbar global */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(140, 140, 140, 0.5);
  border-radius: 4px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(140, 140, 140, 0.7);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

==================================================
File: styles/phoneInputStyle.tsx
==================================================

export const phoneInputCustomStyles = `
  /* Estilos generales del PhoneInput */
  .react-tel-input .form-control {
    width: 100% !important;
    height: 60px !important;
    background-color: hsl(0 0% 3.9%) !important;
    color: white !important;
    border: 1px solid rgb(75, 85, 99) !important;
    border-radius: 0.5rem !important;
    font-size: 1.25rem !important;
    padding-left: 52px !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    transition: all 0.3s !important;
  }
  .react-tel-input .form-control:hover {
    background-color: hsl(0 0% 10%) !important;
  }

  /* Estilos del dropdown */
  .react-tel-input .flag-dropdown {
    background-color: hsl(0 0% 3.9%) !important;
    border: 1px solid rgb(75, 85, 99) !important;
    border-radius: 0.5rem 0 0 0.5rem !important;
    transition: all 0.3s !important;
  }
  .react-tel-input .flag-dropdown:hover {
    background-color: hsl(0 0% 10%) !important;
  }
  .react-tel-input .flag-dropdown.open {
    background-color: hsl(0 0% 3.9%) !important;
  }
  .react-tel-input .selected-flag {
    background-color: hsl(0 0% 3.9%) !important;
    border-radius: 0.5rem 0 0 0.5rem !important;
  }
  .react-tel-input .selected-flag:hover {
    background-color: hsl(0 0% 10%) !important;
  }

  /* Estilos del menú desplegable */
  .react-tel-input .country-list {
    background-color: hsl(0 0% 3.9%) !important;
    border: 1px solid rgb(75, 85, 99) !important;
    color: white !important;
  }
  .react-tel-input .country-list::-webkit-scrollbar {
    width: 8px;
  }
  .react-tel-input .country-list::-webkit-scrollbar-track {
    background: hsl(0 0% 10%) !important;
  }
  .react-tel-input .country-list::-webkit-scrollbar-thumb {
    background: rgb(75, 85, 99) !important;
    border-radius: 4px;
  }
  .react-tel-input .country-list::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 110, 120) !important;
  }
  .react-tel-input .country-list .country:hover {
    background-color: hsl(0 0% 10%) !important;
  }
  .react-tel-input .country-list .country.highlight {
    background-color: hsl(0 0% 10%) !important;
  }
  .react-tel-input .arrow {
    border-top: 4px solid white !important;
  }

  /* Estilos específicos para el buscador */
  .react-tel-input .search {
    background-color: hsl(0 0% 3.9%) !important; /* Fondo oscuro */
    color: black !important; /* Texto blanco */
    border: none !important; /* Sin borde adicional */
    padding: 0.5rem !important; /* Espaciado interno */
    font-size: 1rem !important; /* Tamaño de fuente */
  }
  .react-tel-input .search::placeholder {
    color: rgb(156, 163, 175) !important; /* Placeholder gris claro */
  }
  .react-tel-input .search:focus {
    outline: none !important; /* Sin resaltado al hacer foco */
    box-shadow: none !important;
  }
`;

==================================================
File: types/authServices.tsx
==================================================

import axios from "axios";

export interface LoginData {
  privyId: string;
  email?: string;
  emailVerified: boolean;
  walletAddress?: string | null;
  walletChain?: string | null;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  isNewUser?: boolean;
  error?: string;
}



export const loginWithBackend = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/login',
      loginData
    );

    return response.data;
  } catch (error) {
    console.error("Error during login API call:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};

==================================================
File: types/chat.tsx
==================================================

// Types for chat messages
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
}

// Types for chat list items
export interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
  isArchived: boolean;
}

// API response types
export interface ApiMessage {
  id: string;
  conversationId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  tokens: null;
  createdAt: string;
  marketData: null;
  analysis: null;
}

export interface ApiResponse {
  success: boolean;
  data: {
    conversationId: string;
    messages: ApiMessage[];
  };
}

export interface ApiChatListResponse {
  success: boolean;
  data: {
    conversations: {
      id: string;
      title: string;
      lastMessage: string;
      updatedAt: string;
    }[];
  };
}

==================================================
File: utils/chatUtils.tsx
==================================================

/**
 * Formatea el título de un chat para su visualización
 * Maneja casos especiales como títulos generados por IA con prefijos y comillas
 * 
 * @param {string} title - El título original del chat
 * @returns {string} - El título formateado
 */
export const formatChatTitle = (title: string): string => {
    if (!title) return "Nueva conversación";
    if (title.includes("Aquí tienes un título para ese mensaje inicial:")) {
      // Para títulos cortados que comienzan con un prefijo específico
      const parts = title.split('\n\n');
      if (parts.length > 1) {
        // Si hay texto después del \n\n, extraerlo y quitar las comillas si existen
        let extractedTitle = parts[1];
        if (extractedTitle.startsWith('"')) {
          extractedTitle = extractedTitle.substring(1);
        }
        if (extractedTitle.endsWith('"')) {
          extractedTitle = extractedTitle.substring(0, extractedTitle.length - 1);
        }
        return extractedTitle;
      }
    }
    
    // Para títulos que comienzan con "Aquí tienes algunos títulos posibles:"
    if (title.includes("Aquí tienes algunos títulos posibles:")) {
      const parts = title.split('\n\n');
      if (parts.length > 1) {
        // Buscar la primera opción que suele ser "1. ..." y extraer solo el texto
        const firstOption = parts[1].split('\n')[0];
        if (firstOption.includes('"')) {
          // Intentar extraer texto entre comillas
          const match = firstOption.match(/\"([^\"]*)/);
          if (match && match[1]) {
            return match[1];
          }
        }
        // Si no hay comillas, extraer el texto después del número
        const withoutNumber = firstOption.replace(/^\d+\.\s*/, '');
        return withoutNumber;
      }
    }
    
    // Para los títulos que ya están entre comillas completas
    const quotedTextPattern = /\"([^\"]*)\"/;
    const match = title.match(quotedTextPattern);
    if (match && match[1]) {
      return match[1];
    }
    
    // Si el título es muy largo, acortarlo
    if (title.length > 40) {
      return title.substring(0, 37) + "...";
    }
    
    return title;
  };
  
  /**
   * Determina si un chat está archivado basado en su propiedad isArchived
   * 
   * @param {Object} chat - El objeto chat
   * @returns {boolean} - true si está archivado, false en caso contrario
   */
  export const isChatArchived = (chat:any) => {
    return chat.isArchived === true;
  };
  
  /**
   * Formatea la fecha del último mensaje para mostrarla de forma amigable
   * 
   * @param {number} timestamp - Timestamp del último mensaje
   * @returns {string} - Fecha formateada
   */
  export const formatLastMessageDate = (timestamp:any) => {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // Si es hoy, mostrar solo la hora
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Si es este año, mostrar día y mes
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
    
    // Si es de años anteriores, mostrar fecha completa
    return date.toLocaleDateString();
  };

==================================================
File: vite-env.d.ts
==================================================

/// <reference types="vite/client" />