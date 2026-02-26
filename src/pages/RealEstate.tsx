import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, RefreshCw, Trash2, Search } from "lucide-react";
import { useRealEstateData } from "@/hooks/useRealEstateData";
import { REGION_CODES } from "@/types/realestate";

const fmt = (n: number) =>
  new Intl.NumberFormat("ko-KR").format(n);

const RealEstate = () => {
  const navigate = useNavigate();
  const { apartments, transactions, loading, fetching, addApartment, deleteApartment, fetchTransactions } =
    useRealEstateData();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [searchYm, setSearchYm] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const handleAdd = async () => {
    if (!newName || !newRegion) return;
    await addApartment({
      name: newName,
      region_code: newRegion,
      address: newAddress || undefined,
    });
    setNewName("");
    setNewRegion("");
    setNewAddress("");
    setShowAdd(false);
  };

  const handleFetchAll = async () => {
    const ym = searchYm.replace("-", "");
    for (const apt of apartments) {
      await fetchTransactions(apt, ym);
    }
  };

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
          🏠 부동산
          <span className="text-secondary"> 추적기</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          관심 아파트 실거래가 한눈에 보기
        </p>
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-md"
          >
            <Plus size={14} /> 아파트 추가
          </button>
          <div className="flex items-center gap-2">
            <input
              type="month"
              value={searchYm}
              onChange={(e) => setSearchYm(e.target.value)}
              className="px-3 py-2 rounded-full text-sm border bg-card"
            />
            <button
              onClick={handleFetchAll}
              disabled={fetching || apartments.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              <Search size={14} /> {fetching ? "조회중..." : "실거래가 조회"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20 space-y-6">
        {loading ? (
          <div className="text-center py-10 text-muted-foreground">불러오는 중...</div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🏢</span>
            <p className="text-muted-foreground">
              관심 아파트를 추가해보세요!
              <br />
              실거래가를 자동으로 조회할 수 있어요.
            </p>
          </div>
        ) : (
          apartments.map((apt) => {
            const txList = transactions[apt.id] || [];
            return (
              <div key={apt.id} className="rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                      🏢 {apt.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {REGION_CODES.find((r) => r.code === apt.region_code)?.name || apt.region_code}
                      {apt.address && ` · ${apt.address}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const ym = searchYm.replace("-", "");
                        fetchTransactions(apt, ym);
                      }}
                      disabled={fetching}
                      className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                      title="새로고침"
                    >
                      <RefreshCw size={16} className={fetching ? "animate-spin" : ""} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`"${apt.name}" 추적을 삭제할까요?`))
                          deleteApartment(apt.id);
                      }}
                      className="p-2 rounded-full hover:bg-destructive/10 transition-colors text-destructive"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {txList.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    거래 데이터가 없습니다. 실거래가 조회 버튼을 눌러보세요.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground text-left">
                          <th className="py-2 pr-4 font-medium">거래일</th>
                          <th className="py-2 pr-4 font-medium">면적(㎡)</th>
                          <th className="py-2 pr-4 font-medium">층</th>
                          <th className="py-2 font-medium text-right">거래금액(만원)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {txList.map((tx) => (
                          <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-2 pr-4">
                              {tx.deal_year}.{tx.deal_month.padStart(2, "0")}.{tx.deal_day.padStart(2, "0")}
                            </td>
                            <td className="py-2 pr-4">{tx.area ?? "-"}</td>
                            <td className="py-2 pr-4">{tx.floor || "-"}층</td>
                            <td className="py-2 text-right font-black text-secondary">
                              {fmt(parseInt(tx.deal_amount.replace(/,/g, "")) || 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {txList.length > 0 && (
                  <div className="mt-3 pt-3 border-t flex justify-between text-xs text-muted-foreground">
                    <span>총 {txList.length}건</span>
                    <span>
                      최고가:{" "}
                      <span className="font-black text-secondary">
                        {fmt(
                          Math.max(
                            ...txList.map((t) => parseInt(t.deal_amount.replace(/,/g, "")) || 0)
                          )
                        )}
                        만원
                      </span>
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </main>

      {/* 아파트 추가 모달 */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-black text-foreground">🏢 관심 아파트 추가</h3>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">
                아파트명 *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="예: 래미안 퍼스티지"
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">
                지역(시군구) *
              </label>
              <select
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              >
                <option value="">선택하세요</option>
                {REGION_CODES.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">
                주소 (선택)
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="예: 서초구 반포동 1-1"
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2 rounded-lg text-sm font-bold bg-muted text-muted-foreground hover:bg-border transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                disabled={!newName || !newRegion}
                className="flex-1 py-2 rounded-lg text-sm font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstate;
