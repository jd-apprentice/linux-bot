user ?= $(shell whoami)

build:
	bun build ./bot.js --compile --outfile lib/executor

install:
	sudo apt-get install -y curl
	curl -fsSL https://bun.sh/install | bash
	source /home/$(user)/.bashrc