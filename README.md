# 🐧 Executor

<p align="center">
  <img width="500" height="500" src="assets/logo.png">
</p>

Executor is a discord bot that allows you to execute code in your linux terminal from discord. It is written in javascript and uses the discord.js library.

Intended to be used with the [Turso](https://turso.tech/), [Bun](https://bun.sh/) and ARM64 architecture.

## 🧰 Requirements

- Bun
- Docker
- Turso

## 💾 Instalation

Make sure to complete the `.env` file with the following information:

| Variable | Description |
| --- | --- |
| DISCORD_TOKEN | Discord bot token |
| TURSO_URL | Turso url |
| TURSO_DB_TOKEN | Turso db token |

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

5. Use the binary instead of the docker image

```bash
scp lib/executor_arm64 <user>@<host>:<path>
./executor_arm64 &
```

## 📊 Stats

```shell
ps aux | grep executor

dyallo   2457823  0.3  4.6 74741276 19836 ?      Sl   14:44   0:04 ./executor_arm64
dyallo   2475353  0.0  0.1   6012   644 pts/1    S+   15:07   0:00 grep --color=auto executor
```