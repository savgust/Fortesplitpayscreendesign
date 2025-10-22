import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplitPaySuccessProps {
  onBack?: () => void;
  amount?: number;
}

export function SplitPaySuccess({ onBack, amount = 3800 }: SplitPaySuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = ["#8B004F", "#FFD700", "#FF69B4", "#00CED1", "#FF6347", "#32CD32"];
  
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${piece.x}%`,
                top: "-5%",
                backgroundColor: piece.color,
              }}
              initial={{ y: -50, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 50,
                opacity: [1, 1, 0],
                rotate: piece.rotation,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-md relative z-10">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, times: [0, 0.6, 1] }}
            className="inline-flex items-center justify-center w-24 h-24 bg-[#8B004F] rounded-full mb-4"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-12 h-12"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 25L20 35L40 15"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#8B004F] mb-2"
          >
            Все оплатили! Спасибо 💰
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#666]"
          >
            Кафе «Bon Appetit»
          </motion.p>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mb-6 p-6 shadow-md border-none bg-white">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-[#999] mb-1">Вы оплатили</p>
                <p className="text-[#8B004F]">{amount.toLocaleString()} ₸</p>
              </div>
              
              <div className="border-t border-[#E5E5E5] pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#666]">Кэшбэк</span>
                  <span className="text-[#32CD32]">+ {Math.round(amount * 0.02).toLocaleString()} ₸</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Бонусы</span>
                  <span className="text-[#8B004F]">+ {Math.round(amount * 0.01)} баллов</span>
                </div>
              </div>

              <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
                <p className="text-sm text-[#15803D]">
                  ✅ Все участники успешно оплатили свою часть
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button 
            className="w-full h-14 bg-[#8B004F] hover:bg-[#6B0039] text-white rounded-xl shadow-lg"
          >
            Оставить чаевые
          </Button>
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full h-14 border-[#8B004F] text-[#8B004F] hover:bg-[#FFF5F8] rounded-xl"
          >
            Вернуться на главную
          </Button>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-[#999] mb-3">Оцените ваш опыт</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-2xl transition-transform hover:scale-110"
              >
                ⭐
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
