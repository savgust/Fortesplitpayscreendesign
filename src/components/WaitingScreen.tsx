import { ArrowLeft, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "motion/react";

interface WaitingScreenProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export function WaitingScreen({ onBack, onComplete }: WaitingScreenProps) {
  const participants = [
    { name: "Вы", initials: "ВЫ", color: "#8B004F", status: "paid", amount: 4913 },
    { name: "Айгерим", initials: "АЙ", color: "#A0206F", status: "waiting", amount: 4913 },
    { name: "Данияр", initials: "ДА", color: "#B0408F", status: "unpaid", amount: 4914 },
  ];

  const paidCount = participants.filter(p => p.status === "paid").length;
  const progress = (paidCount / participants.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="text-[#32CD32]">✅</span>;
      case "waiting":
        return <span className="text-[#FFA500]">⏳</span>;
      case "unpaid":
        return <span className="text-[#DC2626]">❌</span>;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "оплатил";
      case "waiting":
        return "ожидает";
      case "unpaid":
        return "не оплатил";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-[#8B004F] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={24} />
            <span>Назад</span>
          </button>
          <h1 className="text-[#8B004F] mb-1">Ожидаем оплату всех участников</h1>
          <p className="text-[#666]">Кафе «Bon Appetit»</p>
        </div>

        {/* Progress Card */}
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#8B004F] to-[#B0408F] flex items-center justify-center"
            >
              <Clock size={40} className="text-white" />
            </motion.div>
          </div>

          <div className="text-center mb-6">
            <p className="text-[#666] mb-2">Прогресс оплаты</p>
            <p className="text-[#8B004F] mb-4">
              {paidCount} из {participants.length} участников
            </p>
            <Progress value={progress} className="h-3 bg-[#E5E5E5]" />
          </div>
        </Card>

        {/* Participants Status */}
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-5 text-[#8B004F]">Статус участников</h3>
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${
                  participant.status === "paid"
                    ? "bg-[#F0FDF4] border border-[#BBF7D0]"
                    : participant.status === "waiting"
                    ? "bg-[#FFF9F0] border border-[#FFE5B8]"
                    : "bg-[#FEF2F2] border border-[#FECACA]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12" style={{ backgroundColor: participant.color }}>
                    <AvatarFallback className="text-white bg-transparent">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[#333]">{participant.name}</p>
                    <p className="text-sm text-[#666]">{participant.amount.toLocaleString()} ₸</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(participant.status)}
                  <span className="text-sm text-[#666]">{getStatusText(participant.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mb-6 p-5 shadow-md border-none bg-gradient-to-br from-[#F0F9FF] to-white rounded-3xl">
          <div className="flex gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="text-[#0369A1] mb-1">Информация</h4>
              <p className="text-sm text-[#666]">
                Оплата завершится, когда все участники внесут свою часть. Кафе получит полную сумму только после этого.
              </p>
            </div>
          </div>
        </Card>

        {/* Complete Button */}
        <Button 
          onClick={onComplete}
          disabled={progress < 100}
          className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {progress === 100 ? "Завершить оплату" : "Ожидание участников..."}
        </Button>

        {progress < 100 && (
          <p className="text-center text-sm text-[#999] mt-4">
            Мы отправим уведомление, когда все оплатят
          </p>
        )}
      </div>
    </div>
  );
}
