# 使用 Node.js 官方映像作為基礎
FROM node:22-alpine

# 創建並設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到容器
COPY package*.json ./

# 安裝依賴
RUN npm ci

# 複製所有源代碼到容器
COPY . .

# 關閉 Next.js 遙測
ENV NEXT_TELEMETRY_DISABLED 1

# 構建應用
RUN npm run build

# 設置生產環境
ENV NODE_ENV production

# 暴露 3000 端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]