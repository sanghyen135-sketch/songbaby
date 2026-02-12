import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, RotateCcw } from "lucide-react";
import { useFinanceData } from "@/hooks/useFinanceData";
import AccountCards from "@/components/finance/AccountCards";
import MoneyFlowChart from "@/components/finance/MoneyFlowChart";
import TransactionList from "@/components/finance/TransactionList";
import AddTransactionModal from "@/components/finance/AddTransactionModal";

const Finance = () => {
  const navigate = useNavigate();
  const { transactions, addTransaction, deleteTransaction, resetToDefault, getBalance, monthlyStats } =
    useFinanceData();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="text-center py-10 px-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> 홈으로
        </button>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
          💰 가계부
          <span className="text-primary"> 대시보드</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          맞벌이 부부의 중앙 집중형 자금 관리
        </p>
        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
          >
            <Plus size={14} /> 거래 추가
          </button>
          <button
            onClick={() => {
              if (window.confirm("모든 거래 데이터를 초기화할까요?")) resetToDefault();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-muted text-muted-foreground hover:bg-border transition-colors"
          >
            <RotateCcw size={14} /> 초기화
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20 space-y-6">
        <AccountCards getBalance={getBalance} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoneyFlowChart
            totalIncome={monthlyStats.totalIncome}
            fixedExpenses={monthlyStats.fixedExpenses}
            savings={monthlyStats.savings}
            allowances={monthlyStats.allowances}
          />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </main>

      {showAdd && (
        <AddTransactionModal
          onSave={(t) => {
            addTransaction(t);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
};

export default Finance;
