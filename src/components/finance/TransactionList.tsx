import { Transaction, ACCOUNT_META, CATEGORY_META } from "@/types/finance";
import { Trash2 } from "lucide-react";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(Math.abs(n));

const TransactionList = ({ transactions, onDelete }: Props) => {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date) || Number(b.id) - Number(a.id));

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-bold text-foreground">📋 거래 내역</h3>
      </div>
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {sorted.map((t) => {
          const catMeta = CATEGORY_META[t.category];
          const accMeta = ACCOUNT_META[t.account];
          const isIncome = t.amount > 0;
          return (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
              <span className="text-xl">{catMeta.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">
                  {t.date} · {accMeta.emoji} {accMeta.name}
                </p>
              </div>
              <span className={`font-black text-sm ${isIncome ? "text-money-in" : "text-money-out"}`}>
                {isIncome ? "+" : "-"}₩{fmt(t.amount)}
              </span>
              <button
                onClick={() => {
                  if (window.confirm("이 거래를 삭제할까요?")) onDelete(t.id);
                }}
                className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
        {sorted.length === 0 && (
          <p className="text-center py-8 text-muted-foreground text-sm">거래 내역이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
