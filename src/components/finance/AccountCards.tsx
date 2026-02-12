import { AccountType } from "@/types/finance";

interface Props {
  getBalance: (account: AccountType) => number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

const BalanceRow = ({ label, emoji, balance }: { label: string; emoji: string; balance: number }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-xs text-muted-foreground">
      {emoji} {label}
    </span>
    <span className={`font-black text-sm ${balance >= 0 ? "text-money-in" : "text-money-out"}`}>
      {fmt(balance)}
    </span>
  </div>
);

const AccountCards = ({ getBalance }: Props) => {
  const hubBalance = getBalance("kb-hub");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* KB 허브통장 */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm ring-2 ring-primary/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏦</span>
          <span className="font-bold text-primary">KB 허브통장</span>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            MAIN HUB
          </span>
        </div>
        <p className={`text-2xl font-black ${hubBalance >= 0 ? "text-money-in" : "text-money-out"}`}>
          {fmt(hubBalance)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">현재 잔액</p>
      </div>

      {/* 상현 (계좌 + 주식) */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">👨‍✈️</span>
          <span className="font-bold text-dad">상현</span>
        </div>
        <div className="divide-y">
          <BalanceRow label="계좌" emoji="💳" balance={getBalance("husband-account")} />
          <BalanceRow label="주식" emoji="📈" balance={getBalance("husband-stock")} />
        </div>
        <div className="mt-2 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">합계</span>
            <span className="font-black text-dad">
              {fmt(getBalance("husband-account") + getBalance("husband-stock"))}
            </span>
          </div>
        </div>
      </div>

      {/* 재아 (계좌 + 주식) */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">👩‍🏫</span>
          <span className="font-bold text-mom">재아</span>
        </div>
        <div className="divide-y">
          <BalanceRow label="계좌" emoji="💳" balance={getBalance("wife-account")} />
          <BalanceRow label="주식" emoji="📈" balance={getBalance("wife-stock")} />
        </div>
        <div className="mt-2 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">합계</span>
            <span className="font-black text-mom">
              {fmt(getBalance("wife-account") + getBalance("wife-stock"))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCards;
