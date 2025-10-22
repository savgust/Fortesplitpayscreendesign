import { useState } from "react";
import { OrderScreen } from "./components/OrderScreen";
import { ParticipantsScreen } from "./components/ParticipantsScreen";
import { SplitMethodScreen } from "./components/SplitMethodScreen";
import { WaitingScreen } from "./components/WaitingScreen";
import { SuccessScreenUpdated } from "./components/SuccessScreenUpdated";
import { ErrorScreen } from "./components/ErrorScreen";
import { SinglePaymentScreen } from "./components/SinglePaymentScreen";
import { GroupPaymentScreen } from "./components/GroupPaymentScreen";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";

type Screen =
  | "menu"
  | "order"
  | "participants"
  | "split-method"
  | "waiting"
  | "success"
  | "error-insufficient"
  | "error-network"
  | "single-payment"
  | "group-payment";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("menu");
  const [paidAmount, setPaidAmount] = useState(4913);

  const renderScreen = () => {
    switch (currentScreen) {
      // NEW: Single Payment Flow
      case "single-payment":
        return (
          <SinglePaymentScreen
            onBack={() => setCurrentScreen("menu")}
            onPay={() => {
              setPaidAmount(14740);
              setCurrentScreen("success");
            }}
          />
        );

      // NEW: Group Payment Flow (Combined Screen)
      case "group-payment":
        return (
          <GroupPaymentScreen
            onBack={() => setCurrentScreen("menu")}
            onContinue={(mode, amount, excludedItems) => {
              setPaidAmount(amount);
              setCurrentScreen("waiting");
            }}
          />
        );

      // OLD FLOWS (for demo purposes)
      case "order":
        return (
          <OrderScreen
            onBack={() => setCurrentScreen("menu")}
            onShare={() => setCurrentScreen("participants")}
          />
        );

      case "participants":
        return (
          <ParticipantsScreen
            onBack={() => setCurrentScreen("order")}
            onContinue={() => setCurrentScreen("split-method")}
          />
        );

      case "split-method":
        return (
          <SplitMethodScreen
            onBack={() => setCurrentScreen("participants")}
            onConfirm={(amount) => {
              setPaidAmount(amount);
              setCurrentScreen("waiting");
            }}
          />
        );

      case "waiting":
        return (
          <WaitingScreen
            onBack={() => setCurrentScreen("group-payment")}
            onComplete={() => setCurrentScreen("success")}
          />
        );

      case "success":
        return (
          <SuccessScreenUpdated
            onBack={() => setCurrentScreen("menu")}
            onTip={() => alert("Функция чаевых в разработке")}
            amount={paidAmount}
          />
        );

      case "error-insufficient":
        return (
          <ErrorScreen
            type="insufficient"
            onChangeCard={() =>
              alert("Выбор карты в разработке")
            }
            onBack={() => setCurrentScreen("group-payment")}
          />
        );

      case "error-network":
        return (
          <ErrorScreen
            type="network"
            onRetry={() => setCurrentScreen("waiting")}
            onBack={() => setCurrentScreen("group-payment")}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {/* Hero Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#8B004F] to-[#6B0039] rounded-full mb-6 shadow-2xl">
                  <span className="text-5xl">💳</span>
                </div>
                <h1 className="text-[#8B004F] mb-3">
                  Forte Split Pay
                </h1>
                <p className="text-[#666] mb-2">
                  Делите счета легко и удобно
                </p>
              </div>

              {/* NEW Payment Flows */}
              <Card className="mb-6 p-6 shadow-md border-none bg-gradient-to-br from-[#8B004F] to-[#6B0039] rounded-3xl">
                <div className="space-y-3">
                  <Button
                    onClick={() =>
                      setCurrentScreen("single-payment")
                    }
                    className="w-full h-16 bg-white hover:bg-[#F5F5F7] text-[#8B004F] rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-2xl">👤</span>
                    <div className="text-left">
                      <p>Одиночная оплата</p>
                      <p className="text-xs opacity-70">
                        Платите сам за себя
                      </p>
                    </div>
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentScreen("group-payment")
                    }
                    className="w-full h-16 bg-white hover:bg-[#F5F5F7] text-[#8B004F] rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-2xl">👥</span>
                    <div className="text-left">
                      <p>Групповая оплата</p>
                      <p className="text-xs opacity-70">
                        Делите счёт с друзьями
                      </p>
                    </div>
                  </Button>
                </div>
              </Card>

              {/* Main Screens Navigation */}
              <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
                <h3 className="mb-5 text-[#8B004F]">
                  Отдельные экраны (демо)
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => setCurrentScreen("order")}
                    className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">1️⃣</span>
                    Экран «Оплата счёта»
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentScreen("participants")
                    }
                    className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">2️⃣</span>
                    Экран «Участники оплаты»
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentScreen("split-method")
                    }
                    className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">3️⃣</span>
                    Экран «Выбор способа деления»
                  </Button>
                  <Button
                    onClick={() => setCurrentScreen("waiting")}
                    className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">4️⃣</span>
                    Экран «Ожидание оплаты»
                  </Button>
                  <Button
                    onClick={() => setCurrentScreen("success")}
                    className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">5️⃣</span>
                    Экран «Успешная оплата»
                  </Button>
                </div>
              </Card>

              {/* Error Screens Navigation */}
              <Card className="mb-6 p-6 shadow-md border-none bg-white rounded-3xl">
                <h3 className="mb-5 text-[#8B004F]">
                  Экраны ошибок
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() =>
                      setCurrentScreen("error-insufficient")
                    }
                    className="w-full h-14 bg-[#DC2626] hover:bg-[#991B1B] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">⚠️</span>
                    Недостаточно средств
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentScreen("error-network")
                    }
                    className="w-full h-14 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-2xl justify-start px-6"
                  >
                    <span className="mr-3 text-xl">🌐</span>
                    Нет соединения
                  </Button>
                </div>
              </Card>

              {/* Features */}
              <Card className="p-6 shadow-md border-none bg-gradient-to-br from-white to-[#FFF5F8] rounded-3xl">
                <h4 className="mb-4 text-[#8B004F]">
                  Преимущества Split Pay
                </h4>
                <div className="space-y-3 text-sm text-[#666]">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <p>Деление счёта по QR-коду или ссылке</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <p>Поровну или выбор конкретных блюд</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <p>Кэшбэк +1% за групповую оплату</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <p>
                      Автоматический расчёт сервисного сбора
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <p>Возможность оставить чаевые</p>
                  </div>
                </div>
              </Card>

              <p className="text-center text-sm text-[#999] mt-6">
                Forte Bank © 2025 · Split Pay v1.0
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderScreen()}
      <Toaster />
    </>
  );
}