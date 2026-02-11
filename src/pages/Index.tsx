import { timelineData } from "@/data/timelineData";
import TimelineCard from "@/components/TimelineCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="text-center py-12 md:py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
          👶 육아 로드맵
          <span className="text-primary"> 0~9세</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          👨‍✈️ 아빠(코레일) & 👩‍🏫 엄마(교사) 맞벌이 부부의
          <br className="hidden md:block" />
          <strong className="text-foreground"> 10년 육아 생존 가이드</strong>
        </p>
        <div className="flex justify-center gap-4 mt-6 text-xs font-semibold flex-wrap">
          <span className="px-3 py-1.5 rounded-full bg-money-in/15 text-money-in">💰 들어오는 돈</span>
          <span className="px-3 py-1.5 rounded-full bg-money-out/15 text-money-out">💸 나가는 돈</span>
          <span className="px-3 py-1.5 rounded-full bg-secondary/15 text-secondary">👨‍👩‍👦 부모 할 일</span>
          <span className="px-3 py-1.5 rounded-full bg-tip/15 text-foreground">🔮 꿀팁</span>
        </div>
      </header>

      {/* Timeline */}
      <main className="relative max-w-4xl mx-auto px-4 pb-20">
        {/* Vertical line - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        {/* Vertical line - mobile */}
        <div className="md:hidden absolute left-[1.5rem] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8 md:space-y-12">
          {timelineData.map((entry, i) => (
            <TimelineCard key={entry.age} entry={entry} index={i} />
          ))}
        </div>

        {/* End marker */}
        <div className="flex justify-center md:justify-center mt-12 ml-[1.5rem] md:ml-0">
          <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl shadow-lg border-4 border-background">
            🎉
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        화이팅! 우리 아이와 함께 성장하는 10년 🌱
      </footer>
    </div>
  );
};

export default Index;
