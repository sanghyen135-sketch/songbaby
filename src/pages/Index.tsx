import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimelineData } from "@/hooks/useTimelineData";
import { TimelineEntry } from "@/data/timelineData";
import TimelineCard from "@/components/TimelineCard";
import EditModal from "@/components/EditModal";
import { Pencil, Plus, RotateCcw, ArrowLeft } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { data, addEntry, updateEntry, deleteEntry, moveEntry, resetToDefault } = useTimelineData();
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<{ index: number; entry: TimelineEntry } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="text-center py-12 md:py-16 px-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> 홈으로
        </button>
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

        {/* Edit toggle */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isEditing
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            <Pencil size={14} />
            {isEditing ? "편집 완료" : "편집 모드"}
          </button>
          {isEditing && (
            <>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-money-in/15 text-money-in hover:bg-money-in/25 transition-colors"
              >
                <Plus size={14} /> 새 항목
              </button>
              <button
                onClick={() => {
                  if (window.confirm("모든 수정 사항을 초기화하고 기본 데이터로 돌아갈까요?")) {
                    resetToDefault();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-muted text-muted-foreground hover:bg-border transition-colors"
              >
                <RotateCcw size={14} /> 초기화
              </button>
            </>
          )}
        </div>
      </header>

      {/* Timeline */}
      <main className="relative max-w-4xl mx-auto px-4 pb-20">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        <div className="md:hidden absolute left-[1.5rem] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8 md:space-y-12">
          {data.map((entry, i) => (
            <TimelineCard
              key={`${entry.age}-${i}`}
              entry={entry}
              index={i}
              isEditing={isEditing}
              isFirst={i === 0}
              isLast={i === data.length - 1}
              onEdit={() => setEditTarget({ index: i, entry })}
              onDelete={() => {
                if (window.confirm(`"${entry.age} - ${entry.stage}" 항목을 삭제할까요?`)) {
                  deleteEntry(i);
                }
              }}
              onMove={(dir) => moveEntry(i, dir)}
            />
          ))}
        </div>

        {/* Add button at bottom in edit mode */}
        {isEditing && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-background"
            >
              <Plus size={24} />
            </button>
          </div>
        )}

        {!isEditing && (
          <div className="flex justify-center mt-12 ml-[1.5rem] md:ml-0">
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl shadow-lg border-4 border-background">
              🎉
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        화이팅! 우리 아이와 함께 성장하는 10년 🌱
      </footer>

      {/* Modals */}
      {editTarget && (
        <EditModal
          entry={editTarget.entry}
          onSave={(updated) => {
            updateEntry(editTarget.index, updated);
            setEditTarget(null);
          }}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAddModal && (
        <EditModal
          isNew
          onSave={(newEntry) => {
            addEntry(newEntry);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
