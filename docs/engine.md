# Notes App Backend

Инструкция по запуску приложения с использованием Docker.

## 1. Подготовка окружения
Переименуйте файл `.env.example` в `.env`.

```env
# App
PORT=3000

# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=0000
POSTGRES_DB=postgres_db
```

---

## 2. Запуск в режиме разработки (Dev)
Для запуска потребуется установленный на машине Docker.

Режим разработки поддерживает **hot-reload** (автоматическую перезагрузку при изменениях в коде) благодаря монтированию папки `src` через Docker volumes.

**Команда для запуска:**
```bash
yarn docker:dev
```

Или напрямую через docker-compose:
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
```

**Что происходит:**
*   Используется `Dockerfile.dev`.
*   Устанавливаются все зависимости (включая `devDependencies`).
*   Локальные файлы синхронизируются с контейнером.
*   Автоматически выполняются миграции базы данных, после чего запускается NestJS в режиме `--watch`.

---

## 3. Запуск в режиме продакшена (Prod)
Этот режим оптимизирован для работы в боевом окружении: код компилируется в JavaScript, а зависимости устанавливаются без лишних инструментов разработки.

**Команда для запуска:**
```bash
yarn docker:prod
```

Или напрямую через docker-compose:
```bash
docker-compose up --build
```

**Что происходит:**
*   Используется основной `Dockerfile`.
*   Проект собирается (`yarn build`).
*   Устанавливаются только `production` зависимости.
*   Запускается скомпилированный код из директории `dist`.

---

## 4. Остановка сервисов
Для корректной остановки и удаления контейнеров используйте:

```bash
yarn docker:down
```
*Или:*
```bash
docker-compose down
```
