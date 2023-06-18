FROM node:20.2.0-alpine3.18

RUN apk update && apk upgrade --available && apk add --no-cache \
    pulseaudio \
    xvfb \
    ffmpeg \
    chromium \
    font-noto-emoji

ENV DISPLAY=":99.0"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile
COPY docker-entrypoint.sh /usr/local/bin/
COPY src src
RUN yarn build && rm -rf src && yarn install --frozen-lockfile --prod && yarn cache clean && mkdir recordings && chmod 777 recordings

USER node
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD ["node", "./dist/index.js"]