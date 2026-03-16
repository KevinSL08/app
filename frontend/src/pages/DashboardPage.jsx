import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, API } from "../App";
import axios from "axios";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import {
  Search,
  Container,
  History,
  LogOut,
  User,
  Loader2,
  FileText,
  Trash2,
  Clock,
  Globe,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import TaricCodeDisplay from "../components/TaricCodeDisplay";
import DutyCalculatorCard from "../components/DutyCalculatorCard";
import DocumentChecklist from "../components/DocumentChecklist";

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [activeTab, setActiveTab] = useState("search");

  const countries = [
    { code: "CN", name: "China" },
    { code: "US", name: "Estados Unidos" },
    { code: "MX", name: "México" },
    { code: "BR", name: "Brasil" },
    { code: "IN", name: "India" },
    { code: "JP", name: "Japón" },
    { code: "KR", name: "Corea del Sur" },
    { code: "TW", name: "Taiwán" },
    { code: "VN", name: "Vietnam" },
    { code: "TH", name: "Tailandia" },
    { code: "TR", name: "Turquía" },
    { code: "GB", name: "Reino Unido" },
    { code: "CL", name: "Chile" },
    { code: "AR", name: "Argentina" },
    { code: "OTHER", name: "Otro país" }
  ];

  const examples = [
    "Aceite de oliva virgen extra en botella",
    "Camiseta de algodón 100%",
    "Tornillos de acero inoxidable M8",
    "Vino tinto Rioja reserva"
  ];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API}/taric/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Por favor describe el producto que quieres clasificar");
      return;
    }

    setSearching(true);
    setSearchResult(null);
    
    try {
      const response = await axios.post(
        `${API}/taric/search`,
        {
          product_description: searchQuery,
          origin_country: originCountry || null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSearchResult(response.data);
      fetchHistory();
      toast.success("Análisis completado");
    } catch (error) {
      const message = error.response?.data?.detail || "Error al realizar la búsqueda";
      toast.error(message);
    } finally {
      setSearching(false);
    }
  };

  const loadFromHistory = async (resultId) => {
    try {
      const response = await axios.get(`${API}/taric/result/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResult(response.data);
      setSearchQuery(response.data.product_description);
      setOriginCountry(response.data.origin_country || "");
      setActiveTab("search");
    } catch (error) {
      toast.error("Error al cargar el resultado");
    }
  };

  const deleteFromHistory = async (resultId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API}/taric/history/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(prev => prev.filter(item => item.id !== resultId));
      toast.success("Búsqueda eliminada");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const setExampleSearch = (example) => {
    setSearchQuery(example);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] grid-bg">
      {/* Header */}
      <header className="glass-dark fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0d1424] border border-cyan-500/30 rounded-lg flex items-center justify-center">
              <Container className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-heading font-bold text-xl">
              Taric<span className="text-cyan-400">AI</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-xs text-green-400 uppercase tracking-wider hidden sm:inline">Operativo</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition-colors"
              data-testid="logout-btn"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "search" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" 
                  : "bg-[#0d1424] text-gray-400 border border-[rgba(0,212,255,0.1)] hover:border-cyan-500/30"
              }`}
              data-testid="tab-search"
            >
              <Zap className="w-4 h-4" />
              Clasificar
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "history" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" 
                  : "bg-[#0d1424] text-gray-400 border border-[rgba(0,212,255,0.1)] hover:border-cyan-500/30"
              }`}
              data-testid="tab-history"
            >
              <History className="w-4 h-4" />
              Historial ({history.length})
            </button>
          </div>

          {activeTab === "search" && (
            <div className="space-y-8">
              {/* Search Form */}
              <div className="cyber-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Search className="w-6 h-6 text-cyan-400" />
                    Clasificador TARIC
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Status</span>
                    <div className="status-dot" />
                    <span className="text-xs text-green-400 uppercase font-semibold">OPERATIVO</span>
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    <textarea
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Describe la mercancía a clasificar... Ej: Aceite de oliva virgen extra en botella de vidrio"
                      className="input-cyber min-h-[120px] resize-none pr-16"
                      data-testid="search-input"
                    />
                    <button
                      type="submit"
                      disabled={searching}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                      data-testid="search-submit-icon"
                    >
                      {searching ? (
                        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-cyan-400 rotate-[-45deg]" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-500 text-sm mr-2 uppercase tracking-wider">Ejemplos:</span>
                    {examples.map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setExampleSearch(example)}
                        className="example-tag"
                        data-testid={`example-${index}`}
                      >
                        {example}
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[rgba(0,212,255,0.1)]">
                    <div>
                      <label className="label-cyber block mb-2">
                        País de origen (opcional)
                      </label>
                      <Select value={originCountry} onValueChange={(val) => setOriginCountry(val === "NONE" ? "" : val)}>
                        <SelectTrigger className="input-cyber h-12" data-testid="country-select">
                          <SelectValue placeholder="Seleccionar país (opcional)" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d1424] border-cyan-500/30">
                          <SelectItem value="NONE" className="text-gray-400">Sin especificar</SelectItem>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="text-white hover:bg-cyan-500/10">
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        type="submit"
                        className="btn-cyber w-full h-12"
                        disabled={searching}
                        data-testid="search-submit"
                      >
                        {searching ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            ANALIZANDO...
                          </>
                        ) : (
                          <>
                            <Search className="w-5 h-5 mr-2" />
                            CLASIFICAR
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Search Result */}
              {searchResult && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* TARIC Code */}
                  <div className="cyber-card p-6">
                    <h3 className="label-cyber mb-4">Código TARIC Sugerido</h3>
                    <TaricCodeDisplay 
                      code={searchResult.taric_code}
                      chapter={searchResult.chapter}
                      heading={searchResult.heading}
                      subheading={searchResult.subheading}
                      description={searchResult.taric_description}
                    />
                  </div>

                  {/* AI Explanation */}
                  {searchResult.ai_explanation && (
                    <div className="cyber-card p-6 border-l-4 border-l-cyan-400">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="label-cyber mb-2">Análisis de la IA</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {searchResult.ai_explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bento Grid */}
                  <div className="bento-grid">
                    {/* Duties */}
                    <div className="bento-wide">
                      <DutyCalculatorCard 
                        tariffs={searchResult.tariffs}
                        totalEstimate={searchResult.total_duty_estimate}
                        vatRate={searchResult.vat_rate}
                      />
                    </div>

                    {/* Documents */}
                    <div>
                      <DocumentChecklist documents={searchResult.documents} />
                    </div>

                    {/* Official Sources */}
                    <div className="cyber-card p-6">
                      <h3 className="label-cyber mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Fuentes Oficiales
                      </h3>
                      <div className="space-y-3">
                        {searchResult.official_sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 bg-[#0a0f1a] rounded-lg border border-[rgba(0,212,255,0.1)] hover:border-cyan-500/50 transition-colors group"
                            data-testid={`source-link-${index}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {source.name}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {source.description}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="cyber-card p-6">
              <h3 className="label-cyber mb-6 flex items-center gap-2">
                <History className="w-4 h-4" />
                Historial de Búsquedas
              </h3>
              
              {loadingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <div className="spinner-cyber" />
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No tienes búsquedas anteriores
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setActiveTab("search")}
                    className="text-cyan-400 mt-2"
                  >
                    Realizar primera búsqueda
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => loadFromHistory(item.id)}
                      className="flex items-center justify-between p-4 bg-[#0a0f1a] rounded-lg border border-[rgba(0,212,255,0.1)] hover:border-cyan-500/50 cursor-pointer transition-all group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      data-testid={`history-item-${index}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {item.product_description}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="font-mono text-sm text-cyan-400">
                            {item.taric_code}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {new Date(item.created_at).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => deleteFromHistory(item.id, e)}
                          className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                          data-testid={`delete-history-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
