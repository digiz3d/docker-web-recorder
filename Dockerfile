FROM node:20.1.0-alpine3.17

RUN apk update && apk upgrade --available && apk add --no-cache \
    pulseaudio \
    xvfb \
    ffmpeg \
    chromium \
    font-noto-emoji

ENV DISPLAY=":99.0"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
COPY . .

USER node
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD ["node", "-r", "ts-node/register", "./src/index.ts"]