SHELL := /bin/bash

user ?= $(shell whoami)

all: install build

build:
	chmod +x config/build
	source /home/$(user)/.bashrc
	./config/build

install:
	sudo apt-get install -y curl
	curl -fsSL https://bun.sh/install | bash