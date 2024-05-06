# Инструкция по деплою.

## 1. Перенос файлов на сервер.

Используя FTP клиент, например (FileZilla) перенесите файлы клиентской и серверной части приложения на сервер.

## 2. Установка.

Установите Докер

`sudo apt-get update`

`sudo apt-get install ca-certificates curl`

`sudo install -m 0755 -d /etc/apt/keyrings`

`sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`

`sudo chmod a+r /etc/apt/keyrings/docker.asc`

### Добавьте репозиторий:
```echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```
sudo apt-get update
```

`sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

## 5.Установка GO.

`wget https://dl.google.com/go/go1.22.2.linux-amd64.tar.gz`

`rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz`

`export PATH=$PATH:/usr/local/go/bin`

Проверка установки

`go version`

## 4. Деплой

В директории с серверной частью приложения создайте файл `Dockerfile` используя команду `touch`

`touch Dockerfile`

Откройте файл и запишите в него следующую конфигурацию

`vim Dockerfile`

```
FROM golang:1.22.2

WORKDIR /app

COPY . .
 
WORKDIR /app/to-do
RUN go mod download

COPY *.go ./

RUN go build -o ./docker-to-do

CMD ["./docker-to-do"]
```

