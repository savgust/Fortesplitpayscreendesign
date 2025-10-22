import { ArrowLeft, UserPlus, Copy } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface ParticipantsScreenProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function ParticipantsScreen({ onBack, onContinue }: ParticipantsScreenProps) {
  const participants = [
    { name: "Вы", initials: "ВЫ", color: "#8B004F", paid: false },
    { name: "Айгерим", initials: "АЙ", color: "#A0206F", paid: false },
    { name: "Данияр", initials: "ДА", color: "#B0408F", paid: false },
  ];

  const paidCount = participants.filter(p => p.paid).length;
  const progress = (paidCount / participants.length) * 100;

  const handleCopyLink = () => {
    toast.success("Ссылка скопирована в буфер обмена");
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
          <h1 className="text-[#8B004F] mb-1">Участники оплаты</h1>
          <p className="text-[#666]">Кафе «Bon Appetit»</p>
        </div>

        {/* Participants Card */}
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-5 text-[#8B004F]">Участники ({participants.length})</h3>
          
          {/* Avatar Grid */}
          <div className="flex gap-4 mb-6 justify-center">
            {participants.map((participant, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Avatar className="w-16 h-16 ring-2 ring-white" style={{ backgroundColor: participant.color }}>
                    <AvatarFallback className="text-white bg-transparent">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  {participant.paid && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#32CD32] rounded-full flex items-center justify-center ring-2 ring-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-[#666]">{participant.name}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Оплачено {paidCount} / {participants.length} участников</span>
              <span className="text-[#8B004F]">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-[#E5E5E5]" />
          </div>
        </Card>

        {/* Invitation Card */}
        <Card className="mb-6 p-5 shadow-md border-none bg-gradient-to-br from-[#FFF9F0] to-white rounded-3xl">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-2xl">📱</div>
            <div>
              <h4 className="text-[#8B004F] mb-1">Ссылка для приглашения</h4>
              <p className="text-sm text-[#666] mb-3">
                forte.app/split/abc123xyz
              </p>
            </div>
          </div>
          <Button 
            onClick={handleCopyLink}
            variant="outline"
            className="w-full h-12 border-[#8B004F] text-[#8B004F] hover:bg-[#FFF5F8] rounded-2xl flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            Скопировать ссылку
          </Button>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg flex items-center justify-center gap-3"
          >
            <UserPlus size={24} />
            Отправить приглашение на деление счёта
          </Button>
          
          <Button 
            onClick={onContinue}
            variant="outline"
            className="w-full h-14 border-[#8B004F] text-[#8B004F] hover:bg-[#FFF5F8] rounded-3xl"
          >
            Продолжить без ожидания
          </Button>
        </div>

        <p className="text-center text-sm text-[#999] mt-4">
          Участники могут присоединиться по QR-коду или ссылке
        </p>
      </div>
    </div>
  );
}
