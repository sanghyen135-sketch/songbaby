import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
          👨‍👩‍👦 우리 가족
          <span className="text-primary"> 로드맵</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          👨‍✈️ 아빠(코레일) & 👩‍🏫 엄마(교사) 맞벌이 부부의
          <br />
          <strong className="text-foreground">생존 가이드 모음집</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* 임신 로드맵 */}
        <button
          onClick={() => navigate("/pregnancy")}
          className="group relative rounded-2xl bg-card border border-border p-8 text-left shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <span className="text-5xl mb-4 block">🤰</span>
            <h2 className="text-xl font-black text-foreground mb-2">임신 로드맵</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              2026년 임신 성공 대장정
              <br />
              목표: 10월 임신 → 2027년 여름아기
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/15 text-accent font-semibold">🏥 검사</span>
              <span className="text-xs px-2 py-1 rounded-full bg-money-in/15 text-money-in font-semibold">💊 영양제</span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/15 text-secondary font-semibold">📋 할 일</span>
            </div>
          </div>
        </button>

        {/* 육아 로드맵 */}
        <button
          onClick={() => navigate("/childcare")}
          className="group relative rounded-2xl bg-card border border-border p-8 text-left shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <span className="text-5xl mb-4 block">👶</span>
            <h2 className="text-xl font-black text-foreground mb-2">육아 로드맵</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              0~9세 10년 육아 생존 가이드
              <br />
              지원금, 지출, 부모 할 일 총정리
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-money-in/15 text-money-in font-semibold">💰 지원금</span>
              <span className="text-xs px-2 py-1 rounded-full bg-money-out/15 text-money-out font-semibold">💸 지출</span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/15 text-secondary font-semibold">👨‍👩‍👦 할 일</span>
            </div>
          </div>
        </button>

        {/* 가계부 */}
        <button
          onClick={() => navigate("/finance")}
          className="group relative rounded-2xl bg-card border border-border p-8 text-left shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-money-in/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <span className="text-5xl mb-4 block">💰</span>
            <h2 className="text-xl font-black text-foreground mb-2">가계부</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              맞벌이 부부 중앙 집중형 자금 관리
              <br />
              KB허브 → 용돈 배분 흐름 한눈에
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-money-in/15 text-money-in font-semibold">💰 수입</span>
              <span className="text-xs px-2 py-1 rounded-full bg-money-out/15 text-money-out font-semibold">💸 지출</span>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary font-semibold">🏦 통장</span>
            </div>
          </div>
        </button>
      </div>

      <footer className="mt-16 text-xs text-muted-foreground">
        화이팅! 우리 가족의 행복한 미래를 위해 🌱
      </footer>
    </div>
  );
};

export default Home;
