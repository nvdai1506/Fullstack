ARG REDIS_HOST=redis
ARG REDIS_PORT=6379
ARG ACCESSTOKEN_SECRET_KEY=nVdai1506
ARG ACCESSTOKEN_EXPIRES_IN=1d
ARG MONGODB_URI=mongodb+srv://ochimot:Vandai1506@cluster0.bhpjcf9.mongodb.net/onlineShop
ARG WEBPUSH_PUBLIC_KEY=BGA6DWy9kcp3ExfMLsRJX4XdfqU89KZenuIJy9zShBNFzb2B2aBRlFUOGLgRatB5T9xCRbGQYsUboERR7oZj1xY
ARG WEBPUSH_PRIVATE_KEY=6LA-TnI2PMQ9FLUMyWsIeGt5PEJfgTFEYCwfwGnfHLA
FROM redis
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "--bind", "redis", "--port", "6379"]
FROM node:16-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]