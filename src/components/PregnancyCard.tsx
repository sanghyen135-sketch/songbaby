import { PregnancyEntry } from "@/data/pregnancyData";

interface PregnancyCardProps {
  entry: PregnancyEntry;
  index: number;
}

const highlightLabels: Record<string, { text: string; className: string }> = {
  start: { text: "🏗️ 기초공사 시작!", className: "bg-money-in/20 text-money-in border-money-in/30" },
  important: { text: "📊 중요 시기!", className: "bg-secondary/20 text-secondary border-secondary/30" },
  action: { text: "🔥 실전 돌입!", className: "bg-money-out/20 text-money-out border-money-out/30" },
  dday: { text: "🎉 D-Day!", className: "bg-accent/20 text-accent border-accent/30" },
};

const Section = ({ icon, label, items, color }: { icon: string; label: string; items: string[]; color: string }) => (
  <div className="mb-3">
    <div className={`text-xs font-bold mb-1 ${color}`}>{icon} {label}</div>
    <ul className="space-y-0.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground">{item}</li>
      ))}
    </ul>
  </div>
);

const PregnancyCard = ({ entry, index }: PregnancyCardProps) => {
  const isLeft = index % 2 === 0;
  const hl = entry.highlight ? highlightLabels[entry.highlight] : null;

  const content = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{entry.emoji}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{entry.stage}</h3>
          {hl && (
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${hl.className}`}>
              {hl.text}
            </span>
          )}
        </div>
      </div>
      <Section icon="🏥" label="필수 검사 & 의료" items={entry.medical} color="text-accent" />
      <Section icon="💊" label="영양제 & 식단" items={entry.nutrition} color="text-money-in" />
      <Section icon="👨‍✈️" label="남편 (코레일) 할 일" items={entry.husbandTasks} color="text-secondary" />
      <Section icon="👩‍🏫" label="아내 (교사) 할 일" items={entry.wifeTasks} color="text-accent" />
      <div className="bg-tip/10 rounded-md p-3 border border-tip/20">
        <div className="text-xs font-bold text-foreground mb-1">✅ 핵심 꿀팁</div>
        {entry.tips.map((item, i) => (
          <p key={i} className="text-sm text-foreground/80">{item}</p>
        ))}
      </div>
    </>
  );

  return (
    <div className="relative flex items-start gap-4 md:gap-8">
      {/* Desktop */}
      <div className={`hidden md:flex w-full items-start gap-8 ${isLeft ? "" : "flex-row-reverse"}`}>
        <div className="w-[calc(50%-2rem)] animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="rounded-lg bg-card p-5 shadow-md border border-border hover:shadow-lg transition-shadow">
            {content}
          </div>
        </div>
        <div className="flex flex-col items-center z-10 shrink-0" style={{ width: 0 }}>
          <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center font-black text-xs shadow-lg border-4 border-background leading-tight text-center">
            <span>{entry.month}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1">{entry.dDay}</span>
        </div>
        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <div className="flex flex-col items-center shrink-0 z-10">
          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center font-black text-[10px] shadow-lg border-4 border-background leading-tight text-center">
            <span>{entry.month}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1">{entry.dDay}</span>
        </div>
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="rounded-lg bg-card p-4 shadow-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{entry.emoji}</span>
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">{entry.stage}</h3>
                {hl && (
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${hl.className}`}>
                    {hl.text}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-xs font-bold text-accent">🏥 필수 검사 & 의료</span>
                <ul>{entry.medical.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground text-xs">{item}</li>)}</ul>
              </div>
              <div>
                <span className="text-xs font-bold text-money-in">💊 영양제 & 식단</span>
                <ul>{entry.nutrition.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground text-xs">{item}</li>)}</ul>
              </div>
              <div>
                <span className="text-xs font-bold text-secondary">👨‍✈️ 남편 할 일</span>
                <ul>{entry.husbandTasks.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground text-xs">{item}</li>)}</ul>
              </div>
              <div>
                <span className="text-xs font-bold text-accent">👩‍🏫 아내 할 일</span>
                <ul>{entry.wifeTasks.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted-foreground text-xs">{item}</li>)}</ul>
              </div>
              <div className="bg-tip/10 rounded-md p-2 border border-tip/20">
                <span className="text-xs font-bold text-foreground">✅ 핵심 꿀팁</span>
                {entry.tips.map((item, i) => <p key={i} className="text-xs text-foreground/80">{item}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCard;
