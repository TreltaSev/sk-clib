# Stops specified docker processes
[working-directory: './']
stop SERVICE="":
    docker compose down {{SERVICE}}

# Starts the docker process in development mode
[working-directory: './']
@dev SERVICE="" *FLAGS:
    docker compose -f compose.yml up --build {{SERVICE}} {{FLAGS}}

[working-directory: './packages/sk-clib']
@package:
    bun run build
    bun link

# Prune all inactive docker files
[working-directory: './']
prune:
    docker system prune -f && docker volume prune -f
    docker rmi $(docker images -a -q)
    docker network prune -f
