import { ArrowLeft, Copy, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";

interface GroupPaymentScreenProps {
  onBack?: () => void;
  onContinue?: (mode: "equal" | "custom", amount: number, excludedItems?: string[]) => void;
}

export function GroupPaymentScreen({ onBack, onContinue }: GroupPaymentScreenProps) {
  const [splitMode, setSplitMode] = useState<"equal" | "custom">("equal");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [excludedItem, setExcludedItem] = useState<string>("");

  const orderItems = [
    { name: "Пицца", price: 4800 },
    { name: "Паста", price: 3200 },
    { name: "Чай", price: 1200 },
    { name: "Десерт", price: 4200 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const participants = [
    { name: "Вы", initials: "ВЫ", color: "#8B004F" },
    { name: "Айгерим", initials: "АЙ", color: "#A0206F" },
    { name: "Данияр", initials: "ДА", color: "#B0408F" },
  ];

  const handleCopyLink = () => {
    toast.success("Ссылка скопирована");
  };

  const toggleItem = (index: number) => {
    setSelectedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const calculateMyTotal = () => {
    if (splitMode === "equal") {
      // Calculate total excluding the excluded item
      let totalForSplit = total;
      if (excludedItem) {
        const excludedItemData = orderItems.find(item => item.name === excludedItem);
        if (excludedItemData) {
          const excludedItemWithFee = excludedItemData.price + Math.round(excludedItemData.price * 0.1);
          totalForSplit = total - excludedItemWithFee;
        }
      }
      return Math.round(totalForSplit / participants.length);
    } else {
      // Custom mode - only pay for selected items
      let mySubtotal = 0;
      selectedItems.forEach(index => {
        mySubtotal += orderItems[index].price;
      });
      const myServiceFee = Math.round((mySubtotal / subtotal) * serviceFee);
      return mySubtotal + myServiceFee;
    }
  };

  const myTotal = calculateMyTotal();

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Share Link */}
        <div className="mb-6 relative">
          <button 
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-[#8B004F] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={24} />
            <span>Назад</span>
          </button>
          
          {/* Share Link in Corner */}
          <button 
            onClick={handleCopyLink}
            className="absolute top-0 right-0 p-2 text-[#999] hover:text-[#8B004F] transition-colors"
          >
            <Copy size={18} />
          </button>

          <h1 className="text-[#8B004F] mb-1">Оплата счёта</h1>
          <p className="text-[#666]">Кафе «Bon Appetit»</p>
        </div>

        {/* Order Card */}
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-5 text-[#8B004F]">Ваш заказ</h3>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-[#333]">{item.name}</span>
                <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
              </div>
            ))}
            
            <div className="border-t border-[#E5E5E5] pt-4 mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#666]">Сумма заказа:</span>
                <span className="text-[#333]">{subtotal.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#666]">Сервисный сбор (10%):</span>
                <span className="text-[#333]">{serviceFee.toLocaleString()} ₸</span>
              </div>
              <div className="border-t border-[#E5E5E5] pt-3 flex justify-between items-center">
                <span className="text-[#8B004F]">Итого:</span>
                <span className="text-[#8B004F]">{total.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Participants Card */}
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#8B004F]">Участники оплаты</h3>
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Users size={16} />
              <span>{participants.length}</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            {participants.map((participant, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Avatar className="w-14 h-14 ring-2 ring-white" style={{ backgroundColor: participant.color }}>
                  <AvatarFallback className="text-white bg-transparent">
                    {participant.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#666]">{participant.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Split Method Toggle */}
        <Card className="mb-6 p-5 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-4 text-[#8B004F]">Способ деления</h3>
          <div className="bg-[#F9F9F9] rounded-2xl p-1 flex mb-5">
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

          {/* Equal Split Mode with Exclusion */}
          {splitMode === "equal" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F8] rounded-2xl border border-[#FFE5ED]">
                <p className="text-sm text-[#8B004F] mb-2">
                  Счёт будет разделён поровну между всеми участниками
                </p>
                <p className="text-xs text-[#999]">
                  {total.toLocaleString()} ₸ ÷ {participants.length} = {Math.round(total / participants.length).toLocaleString()} ₸
                </p>
              </div>

              {/* Exclusion Dropdown */}
              <div>
                <label className="text-sm text-[#666] mb-2 block">
                  Исключение (если кто-то заказал отдельно):
                </label>
                <Select value={excludedItem} onValueChange={setExcludedItem}>
                  <SelectTrigger className="w-full h-12 rounded-2xl border-[#E5E5E5]">
                    <SelectValue placeholder="Нет исключений" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Нет исключений</SelectItem>
                    {orderItems.map((item, index) => (
                      <SelectItem key={index} value={item.name}>
                        {item.name} — {item.price.toLocaleString()} ₸
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {excludedItem && excludedItem !== "none" && (
                  <p className="text-xs text-[#8B004F] mt-2 p-2 bg-[#FFF9F0] rounded-lg">
                    💡 {excludedItem} будет оплачен отдельно тем, кто его съел
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Custom Split Mode */}
          {splitMode === "custom" && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF9F0] rounded-2xl border border-[#FFE5B8]">
                <p className="text-sm text-[#8B004F]">
                  Выберите блюда, которые вы заказали
                </p>
              </div>

              {/* Items Selection */}
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-2xl hover:bg-[#F9F9F9] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedItems.includes(index)}
                        onCheckedChange={() => toggleItem(index)}
                        className="border-[#8B004F] data-[state=checked]:bg-[#8B004F]"
                      />
                      <span className="text-[#333]">{item.name}</span>
                    </div>
                    <span className="text-[#333]">{item.price.toLocaleString()} ₸</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#F0F9FF] rounded-2xl border border-[#BAE6FD]">
                <p className="text-xs text-[#0369A1]">
                  💡 Выбирайте только то, что вы заказали. Каждый участник платит за свой выбор.
                </p>
              </div>
            </div>
          )}
        </Card>

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

        {/* Continue Button */}
        <Button 
          onClick={() => {
            const excludedItems = excludedItem && excludedItem !== "none" ? [excludedItem] : undefined;
            onContinue?.(splitMode, myTotal, excludedItems);
          }}
          disabled={splitMode === "custom" && selectedItems.length === 0}
          className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {splitMode === "custom" && selectedItems.length === 0 
            ? "Выберите хотя бы одно блюдо" 
            : "Продолжить к оплате"}
        </Button>
      </div>
    </div>
  );
}
