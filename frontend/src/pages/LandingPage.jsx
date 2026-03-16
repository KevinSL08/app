import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { Button } from "../components/ui/button";
import { 
  Search, 
  FileCheck, 
  Calculator, 
  Globe, 
  Shield, 
  ArrowRight,
  Container,
  Ship,
  FileText,
  CheckCircle2,
  ChevronRight,
  Zap,
  BarChart3,
  Clock,
  Users,
  Leaf,
  LogIn
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const fullText = "94% PRECISION TARIC";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "CLASIFICACION IA",
      description: "Clasificación automática de mercancías en el sistema TARIC con 94% de precisión a nivel de código completo (10 dígitos).",
      stats: [
        { label: "PRECISION", value: "94%" },
        { label: "CODIGOS", value: "16.4k" }
      ]
    },
    {
      icon: Calculator,
      title: "ARANCELES EN TIEMPO REAL",
      description: "Cálculo instantáneo de derechos de importación, IVA, tasas especiales y preferencias arancelarias por país de origen.",
      stats: [
        { label: "PAISES", value: "184+" },
        { label: "ACUERDOS", value: "40+" }
      ]
    },
    {
      icon: Shield,
      title: "COMPLIANCE PROACTIVO",
      description: "Alertas automáticas sobre anti-dumping, sanciones, restricciones fitosanitarias y cambios regulatorios.",
      badge: "COMPLIANCE SHIELD"
    },
    {
      icon: FileText,
      title: "DOCUMENTACION AUTOMATICA",
      description: "DUA, EUR.1, certificados de origen, T2L y checklists generados automáticamente.",
      link: "EXPLORAR"
    }
  ];

  const stats = [
    { number: "16,457", label: "CODIGOS TARIC" },
    { number: "94%", label: "PRECISION" },
    { number: "184+", label: "PAISES" },
    { number: "24/7", label: "DISPONIBLE" }
  ];

  const examples = [
    "Aceite de oliva virgen extra en bot...",
    "Camiseta de algodón 100% para hombr...",
    "Tornillos de acero inoxidable M8",
    "Vino tinto Rioja reserva 2019"
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] grid-bg">
      {/* Header */}
      <header className="glass-dark fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-[#0d1424] border border-[rgba(0,212,255,0.3)] rounded-lg flex items-center justify-center">
              <Container className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-heading font-bold text-xl">
              Taric<span className="text-cyan-400">AI</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Producto
            </a>
            <a href="#demo" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Demo
            </a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider">
              Precios
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Button 
                onClick={() => navigate("/dashboard")}
                className="btn-cyber h-10 px-5 text-sm"
                data-testid="dashboard-btn"
              >
                Dashboard
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Link to="/login">
                <Button 
                  className="btn-cyber-outline h-10 px-5 text-sm flex items-center gap-2"
                  data-testid="login-btn"
                >
                  <LogIn className="w-4 h-4" />
                  ACCESO
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0a0f1a] to-[#0d1424]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  Clasificación Inteligente v1.0
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up stagger-1" data-testid="hero-title">
                CLASIFICA
                <br />
                <span className="text-cyan-400">CON IA</span>
              </h1>
              
              <div className="flex items-center gap-3 mb-6 animate-fade-in-up stagger-2">
                <div className="w-12 h-[2px] bg-cyan-400" />
                <span className="text-cyan-400 text-sm font-semibold tracking-wider">
                  {typedText}<span className="animate-pulse">|</span>
                </span>
              </div>
              
              <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed animate-fade-in-up stagger-3">
                El primer agente de IA que clasifica mercancías en el sistema TARIC, 
                calcula aranceles y genera documentación aduanera de forma autónoma.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
                <Button 
                  onClick={() => navigate(user ? "/dashboard" : "/register")}
                  className="btn-cyber h-14 px-8 text-base"
                  data-testid="cta-primary"
                >
                  CLASIFICAR AHORA
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-cyber-outline h-14 px-8 text-base"
                  data-testid="cta-secondary"
                >
                  VER DEMO
                </Button>
              </div>
            </div>

            {/* Right - Monitor Display */}
            <div className="hidden lg:block animate-fade-in-up stagger-5">
              <div className="monitor-display">
                <div className="monitor-header">
                  <div className="monitor-dots">
                    <div className="monitor-dot red" />
                    <div className="monitor-dot yellow" />
                    <div className="monitor-dot green" />
                  </div>
                  <span className="text-cyan-400 text-xs uppercase tracking-wider ml-auto">
                    Live Classification Monitor
                  </span>
                </div>
                
                {/* Wave Graph SVG */}
                <div className="h-32 mb-6 relative overflow-hidden">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,50 Q50,30 100,50 T200,50 T300,50 T400,50"
                      stroke="#00d4ff"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                    <path
                      d="M0,50 Q50,30 100,50 T200,50 T300,50 T400,50 V100 H0 Z"
                      fill="url(#waveGradient)"
                    />
                  </svg>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="label-cyber block mb-1">Precision</span>
                    <span className="text-3xl font-bold text-cyan-400 font-mono">94.0%</span>
                  </div>
                  <div>
                    <span className="label-cyber block mb-1">Codigos TARIC</span>
                    <span className="text-3xl font-bold text-cyan-400 font-mono">16,457</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="label-cyber mb-4 block">CAPACIDADES PRINCIPALES</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Todo lo que Necesitas
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tecnología diseñada para automatizar y optimizar el despacho aduanero.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`cyber-card p-6 animate-fade-in-up ${feature.badge ? 'lg:col-span-1' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`feature-card-${index}`}
              >
                {feature.badge && (
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full mb-4">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>
                )}
                
                <div className="icon-box mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                {feature.stats && (
                  <div className="flex gap-6 pt-4 border-t border-[rgba(0,212,255,0.1)]">
                    {feature.stats.map((stat, i) => (
                      <div key={i}>
                        <span className="label-cyber block text-[10px] mb-1">{stat.label}</span>
                        <span className="text-xl font-bold text-white font-mono">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {feature.link && (
                  <a href="#" className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-4 hover:gap-3 transition-all">
                    {feature.link}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}

            {/* Additional cards */}
            <div className="cyber-card p-6 flex flex-col justify-center items-center text-center">
              <Globe className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 uppercase">Cobertura Global</h3>
              <span className="text-4xl font-bold text-cyan-400 font-mono">184</span>
              <span className="text-gray-400 text-sm">PAISES</span>
            </div>

            <div className="cyber-card p-6 flex flex-col justify-center items-center text-center">
              <Leaf className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 uppercase">Fitosanitario</h3>
              <span className="text-2xl font-bold text-green-400 font-mono">MAPA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-[#0d1424]/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="label-cyber mb-4 block">DEMO EN VIVO</span>
            <h2 className="text-4xl font-bold mb-4">Clasificador TARIC</h2>
            <div className="inline-flex items-center gap-2">
              <span className="text-gray-400 text-sm">Status</span>
              <div className="status-dot" />
              <span className="text-green-400 text-sm font-semibold uppercase">OPERATIVO</span>
            </div>
          </div>

          <div className="cyber-card p-8">
            <div className="relative mb-6">
              <textarea
                className="input-cyber min-h-[120px] resize-none"
                placeholder="Describe la mercancía a clasificar... Ej: Aceite de oliva virgen extra en botella de vidrio"
                data-testid="demo-input"
              />
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
                <ArrowRight className="w-5 h-5 text-cyan-400 rotate-[-45deg]" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500 text-sm mr-2">EJEMPLOS:</span>
              {examples.map((example, index) => (
                <button
                  key={index}
                  className="example-tag"
                  data-testid={`example-${index}`}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Ship className="w-16 h-16 text-cyan-400 mx-auto mb-8 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Optimización con TaricAI
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Nuestra IA analiza la nomenclatura combinada TARIC, acuerdos preferenciales 
            y medidas vigentes para encontrar la clasificación más precisa y el menor 
            coste arancelario legal.
          </p>
          <Button 
            onClick={() => navigate(user ? "/dashboard" : "/register")}
            className="btn-cyber h-14 px-10 text-base"
            data-testid="cta-bottom"
          >
            PROBAR CLASIFICADOR
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[rgba(0,212,255,0.1)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0d1424] border border-[rgba(0,212,255,0.3)] rounded-lg flex items-center justify-center">
                <Container className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-heading font-bold">
                Taric<span className="text-cyan-400">AI</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <a href="https://ec.europa.eu/taxation_customs/dds2/taric/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                TARIC UE
              </a>
              <a href="https://www.agenciatributaria.es/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                Agencia Tributaria
              </a>
            </div>
            
            <p className="text-gray-600 text-sm">
              © 2024 TaricAI. Datos de fuentes oficiales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
