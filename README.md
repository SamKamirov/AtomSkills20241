# Инструкция по деплою

## 1. Подготовка

### Установка Nginx
Установите пакет `nginx`

```
sudo apt update
sudo apt install nginx
```

Проверьте работу nginx используя команду

```
systemctl status nginx
```

или вписав в поисковой строке браузера адрес `http://ip-адрес-сервера`

### Установка Node

Установите Node.js

```
sudo apt install nodejs npm

node --version
```

### Установка GO

```
wget https://dl.google.com/go/go1.22.2.linux-amd64.tar.gz
```

```
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
```

```
export PATH=$PATH:/usr/local/go/bin
```

Проверка установки

```
go version
```


### Установите Докер

```
sudo apt-get update
```

```
sudo apt-get install ca-certificates curl
```

```
sudo install -m 0755 -d /etc/apt/keyrings
```

```
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

### Добавьте репозиторий:
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```
sudo apt-get update
```

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


## 2. Склонируйте репозиторий

Используя комманду `git clone` скопируйте репозиторий.

```
git clone git@github.com:SamKamirov/AtomSkills2024.git
```

## 3. Деплой

### Перейдите в директорию серверной части приложения

```
cd ~/AtomSkills2024/template/backend
```

Создайте конфигурационный файл Docker

```
touch Dockerfile
```

Откройте файл

```
sudo vim Dockerfile
```

Запишите в него следующую конфигурацию

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

Сохраните файл используя `Shift + :`. Затем введите `q` и нажмите `Enter`.

Соберите образ

```
sudo docker build --tag echo .
```

### Перейдите в директорию серверной части приложения

```
cd ~/AtomSkills2024/template/frontend
```

Создайте конфигурационный файл Docker

```touch Dockerfile```

Откройте файл

```vim Dockerfile```

Запишите в него следующую конфигурацию

```
FROM busybox:1.35

RUN adduser -D static
USER static
WORKDIR app/
COPY . .

CMD ["busybox", "httpd", "-f", "-v", "-p", "8082"]
```

Сохраните файл используя `Shift + :`. Затем введите `q` и нажмите `Enter`.

Соберите образ

```
sudo docker build --tag echo .
```

## 4. Запустите образы

Просмотрите список образов

```
docker image ls
```

```
sudo docker run -it -p 8082:8082 <имя образа клиента>
```

```
sudo docker run -it -p 8080:8080 <имя образа сервера>
```




