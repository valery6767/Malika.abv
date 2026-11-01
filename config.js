// ВСЁ, ЧТО МОЖНО МЕНЯТЬ, ЛЕЖИТ ЗДЕСЬ.
export const site = {
  name: 'Malika.abv',
  title: 'Malika.abv — Editorial фотограф',
  description: 'Editorial design фотограф, ориентированный на создание выразительных и атмосферных фотографий.',
  heroTitle: 'Раскрываю Твою Настоящую Красоту Через Эстетичный Кадр',
  heroText: 'Editorial design фотограф, ориентированный на создание выразительных и атмосферных фотографий.',
  telegram: 'https://t.me/provocateurm',
  telegramHandle: '@provocateurm',
  instagram: 'https://instagram.com/malika.abv.photo',
  instagramHandle: '@malika.abv.photo',
  aboutTitle: 'Обо мне',
  about:
    'Я создаю фотографии, в которых важны не только внешность, но и настроение, характер и атмосфера человека. Моя задача — сделать кадр, который хочется пересматривать.',
  // Сюда можно вставить адрес Formspree вида https://formspree.io/f/xxxxxxx.
  // Пока поле пустое, форма открывает Telegram с готовым текстом сообщения.
  formEndpoint: '',
};

export const prices = [
  { id: 'light', name: 'LIGHT', time: '1 час', price: '20 000 ₽', text: 'Пакет для тех, кому нужна лаконичная съёмка.' },
  { id: 'optimal', name: 'OPTIMAL', time: '2 часа', price: '25 000 ₽', featured: true, text: 'Расширенная съёмка с большим количеством кадров и вариаций образа.' },
  { id: 'full', name: 'FULL', time: '3 часа', price: '30 000 ₽', text: 'Полноценная фотосессия с максимальным количеством образов, кадров и внимания к деталям.' },
];

export const filters = [
  { id: 'all', label: 'Все' },
  { id: 'individual', label: 'Индивидуальная' },
  { id: 'content', label: 'Контент' },
  { id: 'studio', label: 'Студия' },
];

// Фото лежат в public/photos. Чтобы добавить снимок, положи файл туда и добавь строку сюда.
export const photos = [
  { file: 'blazer-chair', w: 1290, h: 1590, cat: 'individual', alt: 'Чёрно-белый портрет в пиджаке на стуле' },
  { file: 'zebra-top', w: 1290, h: 1566, cat: 'content', alt: 'Портрет в топе с зебровым принтом' },
  { file: 'balaclava', w: 1248, h: 1628, cat: 'studio', alt: 'Editorial образ: лаковый тренч, балаклава и платформа' },
  { file: 'blue-diptych', w: 1290, h: 1261, cat: 'content', alt: 'Диптих: голубой топ и розовые босоножки' },
  { file: 'wedding', w: 1290, h: 1586, cat: 'content', alt: 'Пара в интерьере с деревянными панелями' },
  { file: 'ink', w: 1290, h: 1548, cat: 'individual', alt: 'Арт-портрет с чернилами на коже' },
  { file: 'lace', w: 1280, h: 1571, cat: 'individual', alt: 'Студийный fashion-портрет в кружевном образе' },
  { file: 'red-set', w: 1290, h: 1756, cat: 'content', alt: 'Красный образ в светлом интерьере' },
  { file: 'plaid', w: 1290, h: 1745, cat: 'individual', alt: 'Портрет на фоне патинированного холста' },
  { file: 'leather-coat', w: 1290, h: 1794, cat: 'studio', alt: 'Чёрный кожаный тренч в студии' },
];
export const src = (f) => `/photos/${f}.jpg`;
export const hero = photos[0];
export const aboutPhoto = photos[9];
export const instagramPhotos = [photos[2], photos[6], photos[7], photos[1], photos[8], photos[5]];
