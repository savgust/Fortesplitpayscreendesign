import { ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface SplitPaySelectItemsProps {
  onBack?: () => void;
  onPay?: () => void;
}

export function SplitPaySelectItems({ onBack, onPay }: SplitPaySelectItemsProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [teaForAll, setTeaForAll] = useState<string>("no");

  const orderItems = [
    { emoji: "🍕", name: "Маргарита", price: 3500, shared: false },
    { emoji: "☕", name: "Чай", price: 1200, shared: true },
    { emoji: "🍰", name: "Тирамису", price: 2500, shared: false },
    { emoji: "🍝", name: "Паста", price: 4200, shared: false },
  ];

  const participants = [
    { name: "Вы", initials: "ВЫ", color: "#8B004F" },
    { name: "Айгерим", initials: "АЙ", color: "#A0206F" },
    { name: "Данияр", initials: "ДА", color: "#B0408F" },
  ];

  const toggleItem = (index: number) => {
    setSelectedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach(index => {
      total += orderItems[index].price;
    });
    // Add tea if shared
    if (teaForAll === "yes") {
      const teaIndex = orderItems.findIndex(item => item.name === "Чай");
      if (teaIndex !== -1) {
        total += Math.round(orderItems[teaIndex].price / participants.length);
      }
    }
    return total;
  };

  const myTotal = calculateTotal();

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

        {/* Order Card with Checkboxes */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white">
          <h3 className="mb-4 text-[#8B004F]">Выберите ваши блюда</h3>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index}>
                {!item.shared ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedItems.includes(index)}
                        onCheckedChange={() => toggleItem(index)}
                        className="border-[#8B004F] data-[state=checked]:bg-[#8B004F]"
                      />
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-[#333]">{item.name}</span>
                    </div>
                    <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
                  </div>
                ) : (
                  <div className="p-4 bg-[#FFF9F0] rounded-lg border border-[#FFE5B8]">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-[#333]">{item.name}</span>
                      </div>
                      <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B004F] mb-2">Чай на всех?</p>
                      <RadioGroup value={teaForAll} onValueChange={setTeaForAll}>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="yes" id="tea-yes" className="border-[#8B004F] text-[#8B004F]" />
                            <Label htmlFor="tea-yes" className="cursor-pointer text-sm">✅ Да</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id="tea-no" className="border-[#8B004F] text-[#8B004F]" />
                            <Label htmlFor="tea-no" className="cursor-pointer text-sm">🚫 Нет</Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {teaForAll === "yes" && (
                        <p className="text-xs text-[#999] mt-2">
                          Ваша часть: {Math.round(item.price / participants.length).toLocaleString()} ₸
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
            <button className="flex-1 py-3 rounded-lg text-[#666] transition-all hover:bg-white">
              🔘 Поровну
            </button>
            <button className="flex-1 py-3 rounded-lg bg-[#8B004F] text-white transition-all">
              ⚙️ Выбрать блюда
            </button>
          </div>
        </Card>

        {/* Payment Button */}
        <div className="space-y-3">
          <Button 
            onClick={onPay}
            disabled={myTotal === 0}
            className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {myTotal > 0 ? `Оплатить ${myTotal.toLocaleString()} ₸` : "Выберите блюда"}
          </Button>
          <p className="text-center text-sm text-[#999]">
            После оплаты появится анимация и кэшбэк
          </p>
        </div>
      </div>
    </div>
  );
}
