import { ACCOUNT_META, AccountType } from "@/types/finance";

interface Props {
  getBalance: (account: AccountType) => number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

const AccountCards = ({ getBalance }: Props) => {
  const accounts: AccountType[] = ["kb-hub", "husband-allowance", "wife-allowance"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {accounts.map((id) => {
        const meta = ACCOUNT_META[id];
        const balance = getBalance(id);
        return (
          <div
            key={id}
            className={`rounded-2xl border bg-card p-5 shadow-sm ${
              id === "kb-hub" ? "md:col-span-1 ring-2 ring-primary/30" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{meta.emoji}</span>
              <span className={`font-bold ${meta.colorClass}`}>{meta.name}</span>
              {id === "kb-hub" && (
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  MAIN HUB
                </span>
              )}
            </div>
            <p className={`text-2xl font-black ${balance >= 0 ? "text-money-in" : "text-money-out"}`}>
              {fmt(balance)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">현재 잔액</p>
          </div>
        );
      })}
    </div>
  );
};

export default AccountCards;
