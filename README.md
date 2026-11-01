# Malika.abv — сайт-портфолио

Next.js 14 (App Router), без лишних зависимостей.

## Запуск
npm install
npm run dev      # http://localhost:3000
npm run build

## Что где менять
- Всё про тексты, цены, имя, Telegram, Instagram, список фото: `lib/config.js`
- Фотографии: папка `public/photos` (+ строка в `photos` в config.js)
- Цвета и шрифты: `app/globals.css`, `app/layout.js`
- Форма: вставь адрес Formspree в `site.formEndpoint`
