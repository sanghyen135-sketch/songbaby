import { useState } from "react";
import { AccountType, TransactionCategory, ACCOUNT_META, CATEGORY_META } from "@/types/finance";

interface Props {
  onSave: (t: {
    date: string;
    description: string;
    amount: number;
    account: AccountType;
    category: TransactionCategory;
  }) => void;
  onClose: () => void;
}

const AddTransactionModal = ({ onSave, onClose }: Props) => {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [account, setAccount] = useState<AccountType>("kb-hub");
  const [category, setCategory] = useState<TransactionCategory>("fixed-expense");

  const handleSubmit = () => {
    if (!description || !amount) return;
    const numAmount = Math.abs(Number(amount));
    onSave({
      date,
      description,
      amount: isExpense ? -numAmount : numAmount,
      account,
      category,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-black text-foreground">💳 거래 추가</h2>

        {/* Type toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpense(false)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              !isExpense ? "bg-money-in text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            + 수입
          </button>
          <button
            onClick={() => setIsExpense(true)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              isExpense ? "bg-money-out text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            - 지출
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground">설명</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="예: 주택 대출이자"
            className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground">금액 (원)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500000"
            className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground">통장</label>
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value as AccountType)}
            className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm"
          >
            {(Object.keys(ACCOUNT_META) as AccountType[]).map((k) => (
              <option key={k} value={k}>
                {ACCOUNT_META[k].emoji} {ACCOUNT_META[k].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="w-full mt-1 px-3 py-2 rounded-xl border bg-background text-sm"
          >
            {(Object.keys(CATEGORY_META) as TransactionCategory[]).map((k) => (
              <option key={k} value={k}>
                {CATEGORY_META[k].emoji} {CATEGORY_META[k].label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-muted text-muted-foreground hover:bg-border transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
