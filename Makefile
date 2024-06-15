all: build execute

build:
	docker build --no-cache -f docker/base-x86_64.Dockerfile -t executor_bin .
	docker build --no-cache -f docker/base-arm64.Dockerfile -t executor_bin_arm .
	docker build --no-cache -f docker/app.Dockerfile -t executor .

execute:
	docker compose up -d --build