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
# WЕсли запуск прошел корректно, вы можете перейти по адресу `http://localhost:3000` и увидеть сообщение "Hello World! Application is working!".
# Для перехода к Swagger API документации перейдите по адресу `http://localhost:3000/swagger`.

## 4. Остановка сервисов
Для корректной остановки и удаления контейнеров используйте:

```bash
yarn docker:down
```
---

## Стек технологий
*   **Framework**: [NestJS](https://nestjs.com/) — прогрессивный Node.js фреймворк для создания эффективных и масштабируемых серверных приложений.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) — строгая типизация для надежности кода.
*   **Database**: [PostgreSQL](https://www.postgresql.org/) — мощная объектно-реляционная база данных.
*   **ORM**: [TypeORM](https://typeorm.io/) — поддержка Data Mapper и Active Record паттернов.
*   **API Documentation**: [Swagger (OpenAPI)](https://swagger.io/) — интерактивная документация доступна по адресу `/swagger` после запуска.
*   **Security**:
    *   [Passport.js](https://www.passportjs.org/) + JWT для аутентификации.
    *   [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) для хеширования паролей.
    *   [Helmet](https://helmetjs.github.io/) для защиты от распространенных веб-уязвимостей.
    *   [Cookie-parser](https://github.com/expressjs/cookie-parser) для работы с HttpOnly Cookies.
*   **Validation**: [class-validator](https://github.com/typestack/class-validator) & [class-transformer](https://github.com/typestack/class-transformer).
*   **Build Tool**: [SWC](https://swc.rs/) — сверхбыстрый компилятор для TypeScript/JavaScript.

---

## Архитектура проекта
Проект следует модульной архитектуре NestJS, что обеспечивает высокую степень инкапсуляции и удобство тестирования.

**Основные модули:**
*   `Auth`: Обработка регистрации и входа, выдача JWT токенов (AccessToken и RefreshToken).
*   `Users`: Управление профилями пользователей.
*   `Notes`: Основная бизнес-логика заметок (CRUD операции).
*   `Database`: Конфигурация подключения к базе данных и управление миграциями.
*   `Shared`: Общие декораторы, интерфейсы, исключения и фильтры.

**Слои приложения:**
1.  **Controllers**: Обработка входящих HTTP-запросов и возвращение ответов.
2.  **Services**: Содержат бизнес-логику и взаимодействуют с базой данных через репозитории.
3.  **Entities**: Описание схем таблиц базы данных с использованием TypeORM.
4.  **DTO (Data Transfer Objects)**: Описание структуры данных для входящих запросов с правилами валидации.
5.  **Migrations**: Версионирование схемы базы данных.
