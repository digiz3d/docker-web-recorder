FROM node:20-bullseye-slim

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    pulseaudio \
    xvfb \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libxkbcommon0 \
    ffmpeg \
    chromium \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

ENV DISPLAY=":99.0"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
COPY . .

USER node
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["node", "-r", "ts-node/register", "./src/index.ts"]