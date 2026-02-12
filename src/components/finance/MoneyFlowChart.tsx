interface Props {
  totalIncome: number;
  fixedExpenses: number;
  savings: number;
  allowances: number;
}

const fmt = (n: number) => `${(n / 10000).toFixed(0)}만`;

const MoneyFlowChart = ({ totalIncome, fixedExpenses, savings, allowances }: Props) => {
  const remaining = totalIncome - fixedExpenses - savings - allowances;
  const items = [
    { label: "고정 지출", value: fixedExpenses, emoji: "🏠", color: "bg-money-out" },
    { label: "저축", value: savings, emoji: "🐷", color: "bg-secondary" },
    { label: "용돈 배분", value: allowances, emoji: "💸", color: "bg-accent" },
    { label: "잔여", value: Math.max(remaining, 0), emoji: "💰", color: "bg-primary" },
  ];

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="font-bold text-foreground mb-4">💹 이번 달 자금 흐름</h3>

      {/* Income sources */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-xl bg-dad/10 p-3 text-center">
          <p className="text-xs text-muted-foreground">👨‍✈️ 남편 월급</p>
          <p className="font-black text-dad text-lg">{fmt(totalIncome > 0 ? 3500000 : 0)}</p>
        </div>
        <div className="flex-1 rounded-xl bg-mom/10 p-3 text-center">
          <p className="text-xs text-muted-foreground">👩‍🏫 아내 월급</p>
          <p className="font-black text-mom text-lg">{fmt(totalIncome > 0 ? 3200000 : 0)}</p>
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center my-2">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-4 bg-border" />
          <span className="text-lg">⬇️</span>
          <div className="w-0.5 h-2 bg-border" />
        </div>
      </div>

      {/* KB Hub */}
      <div className="rounded-xl ring-2 ring-primary/30 bg-primary/5 p-4 text-center mb-4">
        <p className="text-xs text-muted-foreground">🏦 KB 허브통장 (총 수입)</p>
        <p className="font-black text-primary text-2xl">{fmt(totalIncome)}</p>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center my-2">
        <span className="text-lg">⬇️</span>
      </div>

      {/* Distribution bars */}
      <div className="space-y-2">
        {items.map((item) => {
          const pct = totalIncome > 0 ? (item.value / totalIncome) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>
                  {item.emoji} {item.label}
                </span>
                <span className="font-bold">
                  {fmt(item.value)} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoneyFlowChart;
