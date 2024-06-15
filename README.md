# 🐧 Executor

<p align="center">
  <img width="500" height="500" src="assets/logo.png">
</p>

Executor is a discord bot that allows you to execute code in your linux terminal from discord. It is written in javascript and uses the discord.js library.

## 🧰 Requirements

- Bun
- Docker
- Turso

## 💾 Instalation

Simple way to install is to simply run the following command:

```bash
git clone https://github.com/jd-apprentice/linux-bot && cd linux-bot
make
```

More manual way:

1. Clone the repository

```bash
git clone https://github.com/jd-apprentice/linux-bot && cd linux-bot
```

2. Prepare the binary

```bash
bun install
bun run build ## For x86_64
bun run build:arm ## For arm
```

3. Build the image manually

```bash
docker build -f docker/base-arm64.Dockerfile -t executor_bin .
docker build -f docker/app.Dockerfile -t executor .
docker compose up -d
```

4. Verify that the bot is running

```bash
docker ps  
CONTAINER ID   IMAGE      COMMAND            CREATED          STATUS          PORTS     NAMES
f2cc56458304   executor   "/base/executor"   48 minutes ago   Up 30 minutes             linux-bot-executor-1
```