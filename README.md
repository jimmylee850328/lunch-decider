# 午餐決定器

一個簡單的 Next.js 應用程式，幫助你決定午餐吃什麼。

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

然後在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看結果。

## 使用 Docker 構建和運行

### 構建 Docker 映像檔

```bash
docker build -t lunch-decider .
```

### 運行 Docker 容器

```bash
docker run -p 3000:3000 lunch-decider
```

然後在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 即可訪問應用程式。
