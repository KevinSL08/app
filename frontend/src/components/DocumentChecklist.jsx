import { FileCheck, Leaf, FileText, Shield, CheckCircle2, AlertTriangle, ExternalLink, Building } from "lucide-react";

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

  const requiredDocs = documents.filter(d => d.required);
  const optionalDocs = documents.filter(d => !d.required);

  return (
    <div className="cyber-card p-6 h-full">
      <h3 className="label-cyber mb-4 flex items-center gap-2">
        <FileCheck className="w-4 h-4" />
        Documentación Requerida
      </h3>
      
      {documents.length > 0 ? (
        <div className="space-y-4">
          {/* Required documents */}
          {requiredDocs.length > 0 && (
            <div>
              <p className="text-xs text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Obligatorios ({requiredDocs.length})
              </p>
              <div className="space-y-2">
                {requiredDocs.map((doc, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    data-testid={`document-required-${index}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="font-medium text-sm text-white">
                            {doc.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 ml-6">
                          {doc.description}
                        </p>
                        {doc.issuing_authority && (
                          <p className="text-xs text-cyan-400 ml-6 mt-1 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {doc.issuing_authority}
                          </p>
                        )}
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
                        Tramitar en web oficial
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional documents */}
          {optionalDocs.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Opcionales / Según caso ({optionalDocs.length})
              </p>
              <div className="space-y-2">
                {optionalDocs.map((doc, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-[#0a0f1a] border border-[rgba(0,212,255,0.1)] rounded-lg"
                    data-testid={`document-optional-${index}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="font-medium text-sm">
                            {doc.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">
                          {doc.description}
                        </p>
                        {doc.issuing_authority && (
                          <p className="text-xs text-gray-600 ml-6 mt-1 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {doc.issuing_authority}
                          </p>
                        )}
                      </div>
                      <span className={getTypeBadgeClass(doc.type)}>
                        {getTypeIcon(doc.type)}
                        {getTypeLabel(doc.type)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Tipos:</p>
        <div className="flex flex-wrap gap-2">
          <span className="doc-badge-cyber fitosanitario">
            <Leaf className="w-3 h-3" />
            Fitosanitario
          </span>
          <span className="doc-badge-cyber no_fitosanitario">
            <Shield className="w-3 h-3" />
            No Fitosanitario
          </span>
          <span className="doc-badge-cyber aduanero">
            <FileText className="w-3 h-3" />
            Aduanero
          </span>
        </div>
      </div>

      {/* Official sources */}
      <div className="mt-3 text-xs text-gray-500">
        <span>Fuentes: </span>
        <a href="https://www.mapa.gob.es/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">MAPA</a>
        {" · "}
        <a href="https://www.agenciatributaria.es/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">AEAT</a>
      </div>
    </div>
  );
};

export default DocumentChecklist;
