import { ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface SplitMethodScreenProps {
  onBack?: () => void;
  onConfirm?: (amount: number) => void;
}

export function SplitMethodScreen({ onBack, onConfirm }: SplitMethodScreenProps) {
  const [splitMode, setSplitMode] = useState<"equal" | "custom">("equal");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [teaForAll, setTeaForAll] = useState<string>("no");

  const orderItems = [
    { emoji: "🍕", name: "Пицца", price: 4800, shared: false },
    { emoji: "🍝", name: "Паста", price: 3200, shared: false },
    { emoji: "☕", name: "Чай", price: 1200, shared: true },
    { emoji: "🍰", name: "Десерт", price: 4200, shared: false },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const participants = 3;

  const toggleItem = (index: number) => {
    setSelectedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const calculateMyTotal = () => {
    if (splitMode === "equal") {
      return Math.round(total / participants);
    } else {
      let mySubtotal = 0;
      selectedItems.forEach(index => {
        if (!orderItems[index].shared) {
          mySubtotal += orderItems[index].price;
        }
      });
      
      // Add tea if shared
      if (teaForAll === "yes") {
        const teaIndex = orderItems.findIndex(item => item.shared);
        if (teaIndex !== -1) {
          mySubtotal += Math.round(orderItems[teaIndex].price / participants);
        }
      }
      
      // Add proportional service fee
      const myServiceFee = Math.round((mySubtotal / subtotal) * serviceFee);
      return mySubtotal + myServiceFee;
    }
  };

  const myTotal = calculateMyTotal();

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
          <h1 className="text-[#8B004F] mb-1">Выбор способа деления</h1>
          <p className="text-[#666]">Кафе «Bon Appetit»</p>
        </div>

        {/* Split Method Toggle */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-4 text-[#8B004F]">Способ деления</h3>
          <div className="bg-[#F9F9F9] rounded-2xl p-1 flex mb-4">
            <button
              onClick={() => setSplitMode("equal")}
              className={`flex-1 py-3 rounded-xl transition-all ${
                splitMode === "equal"
                  ? "bg-[#8B004F] text-white shadow-md"
                  : "text-[#666] hover:bg-white"
              }`}
            >
              🔘 Поровну
            </button>
            <button
              onClick={() => setSplitMode("custom")}
              className={`flex-1 py-3 rounded-xl transition-all ${
                splitMode === "custom"
                  ? "bg-[#8B004F] text-white shadow-md"
                  : "text-[#666] hover:bg-white"
              }`}
            >
              ⚙️ Выбрать блюда
            </button>
          </div>

          {splitMode === "equal" ? (
            <div className="p-4 bg-[#FFF5F8] rounded-2xl border border-[#FFE5ED]">
              <p className="text-sm text-[#8B004F] mb-2">
                Счёт будет разделён поровну между всеми участниками
              </p>
              <p className="text-xs text-[#999]">
                {total.toLocaleString()} ₸ ÷ {participants} = {Math.round(total / participants).toLocaleString()} ₸ на человека
              </p>
            </div>
          ) : (
            <div className="p-4 bg-[#FFF9F0] rounded-2xl border border-[#FFE5B8]">
              <p className="text-sm text-[#8B004F]">
                Выберите блюда, которые вы заказали
              </p>
            </div>
          )}
        </Card>

        {/* Items Selection (only in custom mode) */}
        {splitMode === "custom" && (
          <Card className="mb-6 p-5 shadow-md border-none bg-white rounded-3xl">
            <h3 className="mb-4 text-[#8B004F]">Выберите ваши блюда</h3>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index}>
                  {!item.shared ? (
                    <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-[#F9F9F9] transition-colors">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.includes(index)}
                          onCheckedChange={() => toggleItem(index)}
                          className="border-[#8B004F] data-[state=checked]:bg-[#8B004F]"
                        />
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-[#333]">{item.name}</span>
                      </div>
                      <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#FFF9F0] rounded-2xl border border-[#FFE5B8]">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="text-[#333]">{item.name}</span>
                        </div>
                        <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
                      </div>
                      <div>
                        <p className="text-sm text-[#8B004F] mb-3">Чай на всех?</p>
                        <RadioGroup value={teaForAll} onValueChange={setTeaForAll}>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="tea-yes" className="border-[#8B004F] text-[#8B004F]" />
                              <Label htmlFor="tea-yes" className="cursor-pointer text-sm">
                                ✅ Да (делим сумму на {participants})
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="no" id="tea-no" className="border-[#8B004F] text-[#8B004F]" />
                              <Label htmlFor="tea-no" className="cursor-pointer text-sm">🚫 Нет</Label>
                            </div>
                          </div>
                        </RadioGroup>
                        {teaForAll === "yes" && (
                          <p className="text-xs text-[#999] mt-3 p-2 bg-white rounded-lg">
                            {item.price.toLocaleString()} ₸ ÷ {participants} = {Math.round(item.price / participants).toLocaleString()} ₸ на человека
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#F0F9FF] rounded-2xl border border-[#BAE6FD]">
              <p className="text-xs text-[#0369A1]">
                💡 Вы можете выбрать только свои блюда. Система не позволяет выбирать за других участников.
              </p>
            </div>
          </Card>
        )}

        {/* Summary */}
        <Card className="mb-6 p-5 shadow-md border-none bg-gradient-to-br from-[#8B004F] to-[#6B0039] text-white rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90 mb-1">Ваша часть</p>
              <p className="text-3xl">{myTotal.toLocaleString()} ₸</p>
            </div>
            <div className="text-5xl">💳</div>
          </div>
        </Card>

        {/* Confirm Button */}
        <Button 
          onClick={() => onConfirm?.(myTotal)}
          disabled={splitMode === "custom" && myTotal === 0}
          className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {myTotal > 0 ? "Подтвердить выбор" : "Выберите хотя бы одно блюдо"}
        </Button>

        {splitMode === "custom" && myTotal > 0 && (
          <p className="text-center text-sm text-[#999] mt-4">
            Ожидание других участников...
          </p>
        )}
      </div>
    </div>
  );
}
