import { useState } from "react";
import { TimelineEntry } from "@/data/timelineData";
import { X, Plus, Trash2 } from "lucide-react";

interface EditModalProps {
  entry?: TimelineEntry;
  onSave: (entry: TimelineEntry) => void;
  onClose: () => void;
  isNew?: boolean;
}

const emptyEntry: TimelineEntry = {
  age: "",
  year: "",
  stage: "",
  emoji: "👶",
  moneyIn: [""],
  moneyOut: [""],
  parentTasks: [""],
  tips: [""],
};

const highlightOptions: { value: TimelineEntry["highlight"]; label: string }[] = [
  { value: undefined, label: "없음" },
  { value: "peak", label: "💰 지원금 최고점" },
  { value: "defense", label: "🛡️ 방어 성공" },
  { value: "war", label: "⚔️ 전쟁 시작" },
  { value: "end", label: "😭 지원금 끝" },
];

function ListEditor({ items, onChange, label, color }: {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  color: string;
}) {
  return (
    <div>
      <label className="text-xs font-bold mb-1 block" style={{ color }}>{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-1 mb-1">
          <input
            className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className="p-1 text-muted-foreground hover:text-money-out transition-colors"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
        onClick={() => onChange([...items, ""])}
      >
        <Plus size={12} /> 추가
      </button>
    </div>
  );
}

const EditModal = ({ entry, onSave, onClose, isNew }: EditModalProps) => {
  const [form, setForm] = useState<TimelineEntry>(entry ?? emptyEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty strings
    onSave({
      ...form,
      moneyIn: form.moneyIn.filter(Boolean),
      moneyOut: form.moneyOut.filter(Boolean),
      parentTasks: form.parentTasks.filter(Boolean),
      tips: form.tips.filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card rounded-t-lg">
          <h2 className="text-lg font-bold text-foreground">
            {isNew ? "➕ 새 항목 추가" : "✏️ 항목 수정"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Basic info */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">나이</label>
              <input
                required
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                placeholder="0세"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">연도</label>
              <input
                required
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                placeholder="27년"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">이모지</label>
              <input
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                placeholder="👶"
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">주요 단계</label>
            <input
              required
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
              placeholder="탄생 & 엄마 휴직"
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">하이라이트</label>
            <select
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
              value={form.highlight ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  highlight: (e.target.value || undefined) as TimelineEntry["highlight"],
                })
              }
            >
              {highlightOptions.map((opt) => (
                <option key={opt.label} value={opt.value ?? ""}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <ListEditor
            items={form.moneyIn.length ? form.moneyIn : [""]}
            onChange={(items) => setForm({ ...form, moneyIn: items })}
            label="💰 들어오는 돈"
            color="hsl(152, 60%, 42%)"
          />
          <ListEditor
            items={form.moneyOut.length ? form.moneyOut : [""]}
            onChange={(items) => setForm({ ...form, moneyOut: items })}
            label="💸 나가는 돈"
            color="hsl(0, 70%, 58%)"
          />
          <ListEditor
            items={form.parentTasks.length ? form.parentTasks : [""]}
            onChange={(items) => setForm({ ...form, parentTasks: items })}
            label="👨‍👩‍👦 부모 할 일"
            color="hsl(200, 60%, 50%)"
          />
          <ListEditor
            items={form.tips.length ? form.tips : [""]}
            onChange={(items) => setForm({ ...form, tips: items })}
            label="🔮 꿀팁"
            color="hsl(45, 90%, 40%)"
          />

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              {isNew ? "추가하기" : "저장하기"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
