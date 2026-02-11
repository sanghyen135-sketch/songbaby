import { pregnancyData } from "@/data/pregnancyData";
import PregnancyCard from "@/components/PregnancyCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Pregnancy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="text-center py-12 md:py-16 px-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> 홈으로
        </button>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
          🤰 임신 로드맵
          <span className="text-accent"> 2026</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          👨‍✈️ 코레일 남편 & 👩‍🏫 교사 아내의
          <br className="hidden md:block" />
          <strong className="text-foreground"> 임신 성공 대장정</strong>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          🎯 목표: 10월 임신 성공 → 2027년 7월 여름아기
        </p>
        <div className="flex justify-center gap-4 mt-6 text-xs font-semibold flex-wrap">
          <span className="px-3 py-1.5 rounded-full bg-accent/15 text-accent">🏥 검사/의료</span>
          <span className="px-3 py-1.5 rounded-full bg-money-in/15 text-money-in">💊 영양제</span>
          <span className="px-3 py-1.5 rounded-full bg-secondary/15 text-secondary">👨‍✈️ 남편 할 일</span>
          <span className="px-3 py-1.5 rounded-full bg-tip/15 text-foreground">✅ 꿀팁</span>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 pb-20">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        <div className="md:hidden absolute left-[1.5rem] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8 md:space-y-12">
          {pregnancyData.map((entry, i) => (
            <PregnancyCard key={entry.month} entry={entry} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12 ml-[1.5rem] md:ml-0">
          <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl shadow-lg border-4 border-background">
            🤱
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        10월의 기적을 기다리며! 🌟
      </footer>
    </div>
  );
};

export default Pregnancy;
