interface ImpactData {
    impact: number;
    highRisk: number;
  }
  
  export default function ImpactCard({ data }: { data: ImpactData }) {
    const total = data.impact + data.highRisk;
  
    return (
      <div className="bg-white rounded-2xl border shadow p-6">
        <h3 className="font-serif text-2xl text-amber-800 mb-4">Your Impact</h3>
  
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <div className="text-3xl font-bold">{total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <svg viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="#64c997"
                strokeWidth="25"
                fill="none"
                strokeDasharray={`${(data.impact / total) * 440} 440`}
                transform="rotate(-90 100 100)"
              />
            </svg>
          </div>
        </div>
  
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <span>Impact: <b>{data.impact}</b></span>
          <span>High Risk: <b>{data.highRisk}</b></span>
        </div>
      </div>
    );
  }
  