import { FileCheck, Leaf, FileText, Shield, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

export const DocumentChecklist = ({ documents = [] }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "fitosanitario":
        return <Leaf className="w-4 h-4" />;
      case "no_fitosanitario":
        return <Shield className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "fitosanitario":
        return "doc-badge-cyber fitosanitario";
      case "no_fitosanitario":
        return "doc-badge-cyber no_fitosanitario";
      default:
        return "doc-badge-cyber aduanero";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "fitosanitario":
        return "Fito";
      case "no_fitosanitario":
        return "No Fito";
      default:
        return "Aduanero";
    }
  };

  return (
    <div className="cyber-card p-6 h-full">
      <h3 className="label-cyber mb-4 flex items-center gap-2">
        <FileCheck className="w-4 h-4" />
        Documentos Requeridos
      </h3>
      
      {documents.length > 0 ? (
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border transition-colors ${
                doc.required 
                  ? "bg-red-500/10 border-red-500/30" 
                  : "bg-[#0a0f1a] border-[rgba(0,212,255,0.1)]"
              }`}
              data-testid={`document-${index}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {doc.required ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                    <span className="font-medium text-sm">
                      {doc.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    {doc.description}
                  </p>
                </div>
                <span className={getTypeBadgeClass(doc.type)}>
                  {getTypeIcon(doc.type)}
                  {getTypeLabel(doc.type)}
                </span>
              </div>
              
              {doc.official_link && (
                <a
                  href={doc.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 ml-6 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Más información
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FileCheck className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No se requieren documentos especiales
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-[rgba(0,212,255,0.1)]">
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Leyenda:</p>
        <div className="flex flex-wrap gap-2">
          <span className="doc-badge-cyber fitosanitario">
            <Leaf className="w-3 h-3" />
            Fito
          </span>
          <span className="doc-badge-cyber no_fitosanitario">
            <Shield className="w-3 h-3" />
            No Fito
          </span>
          <span className="doc-badge-cyber aduanero">
            <FileText className="w-3 h-3" />
            Aduanero
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentChecklist;
