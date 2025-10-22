import { ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SplitPayEqualShareProps {
  onBack?: () => void;
  onPay?: () => void;
}

export function SplitPayEqualShare({ onBack, onPay }: SplitPayEqualShareProps) {
  const orderItems = [
    { emoji: "🍕", name: "Маргарита", price: 3500 },
    { emoji: "☕", name: "Чай", price: 1200 },
    { emoji: "🍰", name: "Тирамису", price: 2500 },
    { emoji: "🍝", name: "Паста", price: 4200 },
  ];

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);
  const participants = [
    { name: "Вы", initials: "ВЫ", color: "#8B004F" },
    { name: "Айгерим", initials: "АЙ", color: "#A0206F" },
    { name: "Данияр", initials: "ДА", color: "#B0408F" },
  ];

  const perPerson = Math.round(total / participants.length);

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
          <h1 className="text-[#8B004F] mb-1">Split Pay — Оплата счёта</h1>
          <p className="text-[#666]">Кафе «Bon Appetit»</p>
        </div>

        {/* Order Card */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white">
          <h3 className="mb-4 text-[#8B004F]">Ваш заказ</h3>
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-[#333]">{item.name}</span>
                </div>
                <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
              </div>
            ))}
            <div className="border-t border-[#E5E5E5] pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-[#8B004F]">Итого:</span>
                <span className="text-[#8B004F]">{total.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Participants */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white">
          <h3 className="mb-4 text-[#8B004F]">Участники оплаты</h3>
          <div className="flex gap-3 mb-4">
            {participants.map((participant, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Avatar className="w-14 h-14" style={{ backgroundColor: participant.color }}>
                  <AvatarFallback className="text-white bg-transparent">
                    {participant.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#666]">{participant.name}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#666]">
              <span>Оплачено 0 / {participants.length} участников</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2 bg-[#E5E5E5]" />
          </div>
        </Card>

        {/* Split Method */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white">
          <h3 className="mb-4 text-[#8B004F]">Способ деления</h3>
          <div className="bg-[#F9F9F9] rounded-xl p-1 flex">
            <button className="flex-1 py-3 rounded-lg bg-[#8B004F] text-white transition-all">
              🔘 Поровну
            </button>
            <button className="flex-1 py-3 rounded-lg text-[#666] transition-all hover:bg-white">
              ⚙️ Выбрать блюда
            </button>
          </div>
          <div className="mt-4 p-4 bg-[#FFF5F8] rounded-lg border border-[#FFE5ED]">
            <p className="text-sm text-[#8B004F]">
              Счёт будет разделён поровну между всеми участниками
            </p>
          </div>
        </Card>

        {/* Payment Button */}
        <div className="space-y-3">
          <Button 
            onClick={onPay}
            className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-xl shadow-lg"
          >
            Оплатить {perPerson.toLocaleString()} ₸
          </Button>
          <p className="text-center text-sm text-[#999]">
            После оплаты появится анимация и кэшбэк
          </p>
        </div>
      </div>
    </div>
  );
}
