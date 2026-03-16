import { Calculator, TrendingUp } from "lucide-react";

export const DutyCalculatorCard = ({ tariffs = [], totalEstimate, vatRate }) => {
  return (
    <div className="cyber-card p-6 h-full">
      <h3 className="label-cyber mb-4 flex items-center gap-2">
        <Calculator className="w-4 h-4" />
        Desglose de Aranceles y Tributos
      </h3>
      
      <div className="bg-[#0a0f1a] rounded-lg border border-[rgba(0,212,255,0.1)] overflow-hidden">
        {tariffs.length > 0 ? (
          <>
            {tariffs.map((tariff, index) => (
              <div key={index} className="duty-line" data-testid={`tariff-line-${index}`}>
                <div>
                  <p className="font-medium text-sm">{tariff.duty_type}</p>
                  <p className="text-xs text-gray-500">{tariff.description}</p>
                </div>
                <span className="font-mono font-semibold text-cyan-400">
                  {tariff.rate}
                </span>
              </div>
            ))}
            
            {/* Total */}
            <div className="duty-line duty-total">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">Estimación Total</span>
              </div>
              <span className="font-mono font-bold text-lg" data-testid="total-estimate">
                {totalEstimate}
              </span>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-gray-500 text-sm">
            No se encontraron aranceles específicos
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <p className="text-xs text-amber-400">
          <strong>Nota:</strong> Las tasas mostradas son orientativas. 
          Los aranceles finales pueden variar según acuerdos comerciales y regulaciones específicas.
        </p>
      </div>
    </div>
  );
};

export default DutyCalculatorCard;
