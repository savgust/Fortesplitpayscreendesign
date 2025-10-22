import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { AlertCircle, WifiOff, CreditCard, RefreshCw } from "lucide-react";

interface ErrorScreenProps {
  type: "insufficient" | "network";
  onRetry?: () => void;
  onChangeCard?: () => void;
  onBack?: () => void;
}

export function ErrorScreen({ type, onRetry, onChangeCard, onBack }: ErrorScreenProps) {
  const isInsufficientFunds = type === "insufficient";

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Error Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.6, times: [0, 0.6, 1] }}
            className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-2xl ${
              isInsufficientFunds
                ? "bg-gradient-to-br from-[#DC2626] to-[#991B1B]"
                : "bg-gradient-to-br from-[#F59E0B] to-[#D97706]"
            }`}
          >
            {isInsufficientFunds ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CreditCard size={56} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <WifiOff size={56} className="text-white" />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <AlertCircle size={24} className={isInsufficientFunds ? "text-[#DC2626]" : "text-[#F59E0B]"} />
            <h1 className={isInsufficientFunds ? "text-[#DC2626]" : "text-[#F59E0B]"}>
              {isInsufficientFunds ? "Недостаточно средств" : "Проблема с подключением"}
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#666]"
          >
            {isInsufficientFunds
              ? "Недостаточно средств на карте"
              : "Проблема с интернетом. Попробуйте снова."}
          </motion.p>
        </motion.div>

        {/* Error Details Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={`mb-6 p-6 shadow-md border-none rounded-3xl ${
            isInsufficientFunds
              ? "bg-gradient-to-br from-[#FEF2F2] to-white border-l-4 border-l-[#DC2626]"
              : "bg-gradient-to-br from-[#FFFBEB] to-white border-l-4 border-l-[#F59E0B]"
          }`}>
            {isInsufficientFunds ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#FECACA]">
                  <span className="text-sm text-[#666]">Необходимо:</span>
                  <span className="text-[#DC2626]">4 913 ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#666]">Доступно:</span>
                  <span className="text-[#DC2626]">2 450 ₸</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#FECACA]">
                  <span className="text-sm text-[#DC2626]">Не хватает:</span>
                  <span className="text-[#DC2626]">2 463 ₸</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="text-[#D97706] mb-2">Что делать?</h4>
                    <ul className="text-sm text-[#666] space-y-1">
                      <li>• Проверьте подключение к интернету</li>
                      <li>• Попробуйте переключиться на Wi-Fi</li>
                      <li>• Повторите попытку через несколько секунд</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {isInsufficientFunds ? (
            <>
              <Button 
                onClick={onChangeCard}
                className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Выбрать другую карту
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="w-full h-14 border-[#8B004F] text-[#8B004F] hover:bg-[#FFF5F8] rounded-3xl"
              >
                Вернуться назад
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={onRetry}
                className="w-full h-16 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-3xl shadow-lg flex items-center justify-center gap-3"
              >
                <RefreshCw size={24} />
                Повторить
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="w-full h-14 border-[#8B004F] text-[#8B004F] hover:bg-[#FFF5F8] rounded-3xl"
              >
                Отменить
              </Button>
            </>
          )}
        </motion.div>

        {/* Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-[#999] mb-2">Нужна помощь?</p>
          <button className="text-sm text-[#8B004F] hover:underline">
            Связаться с поддержкой
          </button>
        </motion.div>
      </div>
    </div>
  );
}
