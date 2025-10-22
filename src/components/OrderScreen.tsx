import { ArrowLeft, Share2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface OrderScreenProps {
  onBack?: () => void;
  onShare?: () => void;
}

export function OrderScreen({ onBack, onShare }: OrderScreenProps) {
  const orderItems = [
    { emoji: "🍕", name: "Пицца", price: 4800 },
    { emoji: "🍝", name: "Паста", price: 3200 },
    { emoji: "☕", name: "Чай", price: 1200 },
    { emoji: "🍰", name: "Десерт", price: 4200 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

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
        <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
          <h3 className="mb-5 text-[#8B004F]">Ваш заказ</h3>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-[#333]">{item.name}</span>
                </div>
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

        {/* Info Card */}
        <Card className="mb-6 p-5 shadow-md border-none bg-gradient-to-br from-[#FFF5F8] to-white rounded-3xl border-l-4 border-l-[#8B004F]">
          <div className="flex gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="text-[#8B004F] mb-1">Как это работает?</h4>
              <p className="text-sm text-[#666]">
                Поделитесь счётом с друзьями, выберите способ деления и оплатите вместе
              </p>
            </div>
          </div>
        </Card>

        {/* Share Button */}
        <Button 
          onClick={onShare}
          className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg flex items-center justify-center gap-3"
        >
          <Share2 size={24} />
          Поделиться оплатой
        </Button>

        <p className="text-center text-sm text-[#999] mt-4">
          Пригласите участников для деления счёта
        </p>
      </div>
    </div>
  );
}
