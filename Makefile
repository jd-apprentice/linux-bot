user ?= $(shell whoami)

all:
	chmod +x config/build
	chmod +x config/configure
	./config/configure
	./config/build
