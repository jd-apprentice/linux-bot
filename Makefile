user ?= $(shell whoami)

all:
	chmod +x config/build
	chmod +x config/configure
	source /home/$(user)/.bashrc
	./config/configure
	./config/build
