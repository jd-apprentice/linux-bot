all: build execute

user ?= dyallo
binary_name ?= executor_arm64
server ?= node01.local

build_command ?= bun run build
build_command_arm ?= bun run build:arm
docker_build_command ?= docker build --network host --no-cache -f
docker_compose_args ?= up -d --build
docker_compose_command ?= docker compose $(docker_compose_args)

dockerfile-x86_64 ?= docker/base-x86_64.Dockerfile
dockerfile-arm64 ?= docker/base-arm64.Dockerfile
dockerfile-app ?= docker/app.Dockerfile

docker_image_name ?= executor_bin
docker_image_name_arm ?= executor_bin_arm
app_name ?= executor

args ?= -t
arquitecture ?= x86_64
raspberry ?= :arm

build: $(dockerfile-x86_64) $(dockerfile-arm64) $(dockerfile-app)
	$(build_command)
	$(build_command)$(raspberry)
	$(docker_build_command) $(dockerfile-x86_64) $(args) $(docker_image_name) .
	$(docker_build_command) $(dockerfile-arm64) $(args) $(docker_image_name_arm) .
	$(docker_build_command) $(dockerfile-app) $(args) $(app_name) .

build-app: $(dockerfile-app)
	$(build_command)
	$(docker_build_command) $(dockerfile-app) $(args) $(app_name) .

execute:
	$(docker_compose_command)

run:
	$(build_command_arm)
	scp lib/$(binary_name) $(user)@$(server):/home/$(user)/apps/$(binary_name)
	ssh $(user)@$(server) /home/$(user)/apps/$(binary_name) &

.PHONY: build execute run