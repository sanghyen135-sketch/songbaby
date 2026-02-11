import { TimelineEntry } from "@/data/timelineData";
import { Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface TimelineCardProps {
  entry: TimelineEntry;
  index: number;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
}

const highlightLabels: Record<string, { text: string; className: string }> = {
  peak: { text: "💰 지원금 최고점!", className: "bg-money-in/20 text-money-in border-money-in/30" },
  defense: { text: "🛡️ 방어 성공!", className: "bg-secondary/20 text-secondary border-secondary/30" },
  war: { text: "⚔️ 전쟁 시작!", className: "bg-money-out/20 text-money-out border-money-out/30" },
  end: { text: "😭 지원금 끝!", className: "bg-accent/20 text-accent border-accent/30" },
};

const EditButtons = ({ isFirst, isLast, onEdit, onDelete, onMove }: Pick<TimelineCardProps, "isFirst" | "isLast" | "onEdit" | "onDelete" | "onMove">) => (
  <div className="flex gap-1 mt-2">
    <button onClick={onEdit} className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="수정">
      <Pencil size={14} />
    </button>
    <button onClick={onDelete} className="p-1.5 rounded-md bg-money-out/10 text-money-out hover:bg-money-out/20 transition-colors" title="삭제">
      <Trash2 size={14} />
    </button>
    {!isFirst && (
      <button onClick={() => onMove("up")} className="p-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border transition-colors" title="위로">
        <ArrowUp size={14} />
      </button>
    )}
    {!isLast && (
      <button onClick={() => onMove("down")} className="p-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border transition-colors" title="아래로">
        <ArrowDown size={14} />
      </button>
    )}
  </div>
);

const CardContent = ({ entry, hl, isEditing, isFirst, isLast, onEdit, onDelete, onMove }: {
  entry: TimelineEntry;
  hl: { text: string; className: string } | null;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
}) => (
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

    <div className="mb-3">
      <div className="text-xs font-bold text-money-in mb-1">💰 들어오는 돈</div>
      <ul className="space-y-0.5">
        {entry.moneyIn.map((item, i) => (
          <li key={i} className="text-sm text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-money-in">{item}</li>
        ))}
      </ul>
    </div>

    <div className="mb-3">
      <div className="text-xs font-bold text-money-out mb-1">💸 나가는 돈</div>
      <ul className="space-y-0.5">
        {entry.moneyOut.map((item, i) => (
          <li key={i} className="text-sm text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-money-out">{item}</li>
        ))}
      </ul>
    </div>

    <div className="mb-3">
      <div className="text-xs font-bold text-secondary mb-1">👨‍👩‍👦 부모 할 일</div>
      <ul className="space-y-0.5">
        {entry.parentTasks.map((item, i) => (
          <li key={i} className="text-sm text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-secondary">{item}</li>
        ))}
      </ul>
    </div>

    <div className="bg-tip/10 rounded-md p-3 border border-tip/20">
      <div className="text-xs font-bold text-foreground mb-1">🔮 꿀팁</div>
      {entry.tips.map((item, i) => (
        <p key={i} className="text-sm text-foreground/80">{item}</p>
      ))}
    </div>

    {isEditing && <EditButtons isFirst={isFirst} isLast={isLast} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />}
  </>
);

const TimelineCard = ({ entry, index, isEditing, isFirst, isLast, onEdit, onDelete, onMove }: TimelineCardProps) => {
  const isLeft = index % 2 === 0;
  const hl = entry.highlight ? highlightLabels[entry.highlight] : null;
  const contentProps = { entry, hl, isEditing, isFirst, isLast, onEdit, onDelete, onMove };

  return (
    <div className="relative flex items-start gap-4 md:gap-8">
      {/* Desktop */}
      <div className={`hidden md:flex w-full items-start gap-8 ${isLeft ? "" : "flex-row-reverse"}`}>
        <div className="w-[calc(50%-2rem)] animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className={`rounded-lg bg-card p-5 shadow-md border hover:shadow-lg transition-shadow ${isEditing ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}>
            <CardContent {...contentProps} />
          </div>
        </div>
        <div className="flex flex-col items-center z-10 shrink-0" style={{ width: 0 }}>
          <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center font-black text-sm shadow-lg border-4 border-background">
            <span>{entry.age}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1">{entry.year}</span>
        </div>
        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <div className="flex flex-col items-center shrink-0 z-10">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center font-black text-xs shadow-lg border-4 border-background">
            <span>{entry.age}</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium mt-1">{entry.year}</span>
        </div>
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className={`rounded-lg bg-card p-4 shadow-md border ${isEditing ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}>
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
                <span className="text-xs font-bold text-money-in">💰 들어오는 돈</span>
                <ul>{entry.moneyIn.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-money-in text-xs">{item}</li>)}</ul>
              </div>
              <div>
                <span className="text-xs font-bold text-money-out">💸 나가는 돈</span>
                <ul>{entry.moneyOut.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-money-out text-xs">{item}</li>)}</ul>
              </div>
              <div>
                <span className="text-xs font-bold text-secondary">👨‍👩‍👦 부모 할 일</span>
                <ul>{entry.parentTasks.map((item, i) => <li key={i} className="text-foreground/80 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-secondary text-xs">{item}</li>)}</ul>
              </div>
              <div className="bg-tip/10 rounded-md p-2 border border-tip/20">
                <span className="text-xs font-bold text-foreground">🔮 꿀팁</span>
                {entry.tips.map((item, i) => <p key={i} className="text-xs text-foreground/80">{item}</p>)}
              </div>
            </div>
            {isEditing && <EditButtons isFirst={isFirst} isLast={isLast} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
