import { useState, useEffect, useCallback, useMemo } from "react";
import { Transaction, AccountType } from "@/types/finance";

const STORAGE_KEY = "family-finance-data";

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2026-02-01", description: "남편 월급", amount: 3500000, account: "kb-hub", category: "salary-husband" },
  { id: "2", date: "2026-02-01", description: "아내 월급", amount: 3200000, account: "kb-hub", category: "salary-wife" },
  { id: "3", date: "2026-02-05", description: "주택 대출이자", amount: -850000, account: "kb-hub", category: "fixed-expense" },
  { id: "4", date: "2026-02-05", description: "공과금(전기/가스/수도)", amount: -180000, account: "kb-hub", category: "fixed-expense" },
  { id: "5", date: "2026-02-05", description: "통신비", amount: -120000, account: "kb-hub", category: "fixed-expense" },
  { id: "6", date: "2026-02-05", description: "보험료", amount: -300000, account: "kb-hub", category: "fixed-expense" },
  { id: "7", date: "2026-02-10", description: "적금 이체", amount: -1000000, account: "kb-hub", category: "savings" },
  { id: "8", date: "2026-02-10", description: "남편 용돈 이체", amount: -600000, account: "kb-hub", category: "allowance-transfer" },
  { id: "9", date: "2026-02-10", description: "용돈 입금", amount: 600000, account: "husband-allowance", category: "allowance-transfer" },
  { id: "10", date: "2026-02-10", description: "아내 용돈 이체", amount: -600000, account: "kb-hub", category: "allowance-transfer" },
  { id: "11", date: "2026-02-10", description: "용돈 입금", amount: 600000, account: "wife-allowance", category: "allowance-transfer" },
  { id: "12", date: "2026-02-12", description: "점심 외식", amount: -15000, account: "husband-allowance", category: "personal-expense" },
  { id: "13", date: "2026-02-13", description: "카페", amount: -6500, account: "wife-allowance", category: "personal-expense" },
  { id: "14", date: "2026-02-05", description: "식비(장보기)", amount: -450000, account: "kb-hub", category: "fixed-expense" },
];

function loadData(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_TRANSACTIONS;
  } catch {
    return DEFAULT_TRANSACTIONS;
  }
}

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [...prev, { ...t, id: Date.now().toString() }]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    setTransactions(DEFAULT_TRANSACTIONS);
  }, []);

  const getBalance = useCallback(
    (account: AccountType) => {
      return transactions.filter((t) => t.account === account).reduce((sum, t) => sum + t.amount, 0);
    },
    [transactions],
  );

  const monthlyStats = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const monthTx = transactions.filter((t) => t.date.startsWith(currentMonth));

    const totalIncome = monthTx
      .filter((t) => t.account === "kb-hub" && (t.category === "salary-husband" || t.category === "salary-wife"))
      .reduce((s, t) => s + t.amount, 0);

    const fixedExpenses = monthTx
      .filter((t) => t.account === "kb-hub" && t.category === "fixed-expense")
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    const savings = monthTx
      .filter((t) => t.category === "savings")
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    const allowances = monthTx
      .filter((t) => t.account === "kb-hub" && t.category === "allowance-transfer")
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    return { totalIncome, fixedExpenses, savings, allowances, currentMonth };
  }, [transactions]);

  return { transactions, addTransaction, deleteTransaction, resetToDefault, getBalance, monthlyStats };
}
