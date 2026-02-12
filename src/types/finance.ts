export type AccountType = "kb-hub" | "husband-allowance" | "wife-allowance";

export interface Account {
  id: AccountType;
  name: string;
  emoji: string;
  balance: number;
}

export type TransactionCategory =
  | "salary-husband"
  | "salary-wife"
  | "fixed-expense"
  | "savings"
  | "allowance-transfer"
  | "personal-expense"
  | "other";

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number; // positive = income/in, negative = expense/out
  account: AccountType;
  category: TransactionCategory;
  memo?: string;
}

export const ACCOUNT_META: Record<AccountType, { name: string; emoji: string; colorClass: string }> = {
  "kb-hub": { name: "KB 허브통장", emoji: "🏦", colorClass: "text-primary" },
  "husband-allowance": { name: "남편 용돈", emoji: "👨‍✈️", colorClass: "text-dad" },
  "wife-allowance": { name: "아내 용돈", emoji: "👩‍🏫", colorClass: "text-mom" },
};

export const CATEGORY_META: Record<TransactionCategory, { label: string; emoji: string }> = {
  "salary-husband": { label: "남편 월급", emoji: "💰" },
  "salary-wife": { label: "아내 월급", emoji: "💰" },
  "fixed-expense": { label: "고정 지출", emoji: "🏠" },
  savings: { label: "저축", emoji: "🐷" },
  "allowance-transfer": { label: "용돈 이체", emoji: "💸" },
  "personal-expense": { label: "개인 지출", emoji: "🛒" },
  other: { label: "기타", emoji: "📌" },
};
