"use client";

import { useState, useEffect, useRef } from "react";

type Food = {
  id: number;
  name: string;
  type: string;
  color: string;
  textColor: string;
};

// 自訂動畫
const addAnimations = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
`;

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  // 控制是否啟用轉換效果
  const [enableTransition, setEnableTransition] = useState(false);

  // 將自訂動畫添加到頁面
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = addAnimations;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // 修正：重新設定食物選項的順序，確保與轉盤顯示一致
  const foodOptions: Food[] = [
    {
      id: 1,
      name: "牛肉麵",
      type: "中式",
      color: "bg-red-500",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "壽司",
      type: "日式",
      color: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      id: 3,
      name: "漢堡",
      type: "西式",
      color: "bg-orange-500",
      textColor: "text-white",
    },
    {
      id: 4,
      name: "泰式\n炒河粉",
      type: "泰式",
      color: "bg-green-500",
      textColor: "text-white",
    },
    {
      id: 5,
      name: "披薩",
      type: "義式",
      color: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: 6,
      name: "炒飯",
      type: "中式",
      color: "bg-amber-400",
      textColor: "text-black",
    },
    {
      id: 7,
      name: "沙拉",
      type: "輕食",
      color: "bg-emerald-500",
      textColor: "text-white",
    },
    {
      id: 8,
      name: "烤肉飯",
      type: "台式",
      color: "bg-rose-500",
      textColor: "text-white",
    },
  ];

  const handleDecideClick = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);

    // 禁用CSS轉換效果
    setEnableTransition(false);

    // 重置轉盤位置（不會有動畫）
    setRotationAngle(0);

    // 隨機選擇一個食物
    const randomIndex = Math.floor(Math.random() * foodOptions.length);
    // 每個區段的角度
    const segmentAngle = 360 / foodOptions.length;

    // 計算目標食物的角度位置
    const foodAngle = randomIndex * segmentAngle + segmentAngle / 2;
    // 計算需要旋轉的角度（5圈 + 目標角度）
    const spinAmount = 5 * 360 + (360 - foodAngle);

    // 強制重繪DOM，確保角度重置已生效
    setTimeout(() => {
      // 啟用CSS轉換效果
      setEnableTransition(true);

      // 設置新的旋轉角度（會有平滑動畫）
      setRotationAngle(spinAmount);

      // 記錄選擇的食物
      console.log(
        `要選中的食物: ${foodOptions[randomIndex].name}, 索引: ${randomIndex}`
      );

      // 旋轉結束後顯示結果
      setTimeout(() => {
        setSelectedFood(foodOptions[randomIndex]);
        setIsSpinning(false);
      }, 3100);
    }, 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleDecideClick();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-slate-100 dark:bg-slate-900">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          今天午餐吃什麼？
        </h1>

        <button
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-bold text-lg mb-10 hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-lg"
          onClick={handleDecideClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="決定今天午餐"
          disabled={isSpinning}
        >
          幫我決定！
        </button>

        <div className="mt-8 min-h-[400px] w-full max-w-md flex flex-col items-center justify-center relative">
          {/* 輪盤容器 */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* 轉盤外框 - 增加深色邊框效果 */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-600 dark:border-gray-400 opacity-50 z-10"></div>

            {/* 輪盤指針 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-20">
              <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-red-600 filter drop-shadow-lg"></div>
            </div>

            {/* 轉盤 */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full relative overflow-hidden shadow-xl"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: enableTransition
                  ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
                  : "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* 開發調試用指示線 */}
              {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-red-500 z-30"></div> */}

              {foodOptions.map((food, index) => {
                // 食物區塊對應的扇形參數計算
                const segmentAngle = 360 / foodOptions.length;
                const rotation = index * segmentAngle;
                const nextAngle = rotation + segmentAngle;

                // 計算扇形的角度（弧度）
                const startAngle = (rotation * Math.PI) / 180;
                const endAngle = (nextAngle * Math.PI) / 180;

                // 生成扇形邊緣的點 - 使用固定點數，並轉換成固定小數位
                const points = [`50% 50%`]; // 圓心

                // 第一個點（扇形起始邊緣）
                const p1x = (50 + 50 * Math.sin(startAngle)).toFixed(0);
                const p1y = (50 - 50 * Math.cos(startAngle)).toFixed(0);
                points.push(`${p1x}% ${p1y}%`);

                // 添加弧形邊緣的額外點
                const numPoints = 5; // 減少點數，避免精度問題
                for (let i = 1; i < numPoints; i++) {
                  const angle =
                    startAngle + (endAngle - startAngle) * (i / numPoints);
                  const px = (50 + 50 * Math.sin(angle)).toFixed(0);
                  const py = (50 - 50 * Math.cos(angle)).toFixed(0);
                  points.push(`${px}% ${py}%`);
                }

                // 最後一個點（扇形結束邊緣）
                const p2x = (50 + 50 * Math.sin(endAngle)).toFixed(0);
                const p2y = (50 - 50 * Math.cos(endAngle)).toFixed(0);
                points.push(`${p2x}% ${p2y}%`);

                // 計算文字放置的位置 (在扇形中間)
                const midAngle = (startAngle + endAngle) / 2;

                // 根據文字長度和是否含有換行符動態調整
                const hasNewline = food.name.includes("\n");
                // 只調整半徑，不再調整字體大小
                const textRadius = hasNewline ? 28 : 33;
                const textX = (50 + textRadius * Math.sin(midAngle)).toFixed(0);
                const textY = (50 - textRadius * Math.cos(midAngle)).toFixed(0);

                return (
                  <div
                    key={food.id}
                    className={`absolute top-0 left-0 w-full h-full ${food.color} ${food.textColor} flex items-center justify-center`}
                    style={{
                      clipPath: `polygon(${points.join(", ")})`,
                    }}
                  >
                    <div
                      className="absolute text-center font-bold"
                      style={{
                        left: `${textX}%`,
                        top: `${textY}%`,
                        transform: `translate(-50%, -50%) rotate(${Math.round(
                          90 + rotation + segmentAngle / 2
                        )}deg)`,
                        maxWidth: hasNewline ? "55px" : "60px",
                        whiteSpace: "pre-line",
                        fontSize: "14px",
                        lineHeight: "1.2",
                        padding: "2px",
                      }}
                    >
                      <span className="wheel-text text-stroke inline-block px-1">
                        {food.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 結果顯示 */}
          <div className="mt-10">
            {selectedFood && !isSpinning && (
              <div className="text-center animate-fade-in">
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
                  {selectedFood.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  類型：{selectedFood.type}
                </p>
                <p className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                  今天就吃這個吧！
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
