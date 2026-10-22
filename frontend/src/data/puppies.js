const galleryFilesByPuppy = {
  'maltipoo-max-male': ['photo-01.webp', 'photo-02.jpg'],
  'korean-teacup-maltipoo-female': [
    'photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg', 'photo-05.jpg',
    'photo-06.jpg', 'photo-07.jpg', 'photo-08.jpg', 'photo-09.jpg', 'photo-10.jpg',
  ],
  'korean-teacup-poodle-female': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg'],
  'maltipoo-cavapoo-male': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg'],
  'toy-poodle-male-female': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg'],
  'maltipoo-female-2': [
    'photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg', 'photo-05.jpg',
    'photo-06.jpg', 'photo-07.jpg',
  ],
  'pomeranian-female': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg'],
  'copper-male': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg'],
  'shitzu-female': ['photo-01.jpeg', 'photo-02.jpeg'],
  'shitzu-male': ['photo-01.jpg', 'photo-02.jpg'],
  'maltipoo-female-1': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg'],
  'maltipoo-female': ['photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg'],
}

export const puppies = [
  { slug: 'maltipoo-max-male', aliases: ['max-maltipoo'], name: 'Max', breed: 'Maltipoo', detail: 'Boy', age: '3 months', origin: 'Dubai', photo: 'dog-max.webp' },
  { slug: 'korean-teacup-maltipoo-female', name: 'Korean Teacup Maltipoo', breed: 'Maltipoo', detail: 'Girl', age: '2 months', origin: 'Korea', photo: 'dog-korean-maltipoo.jpg' },
  { slug: 'korean-teacup-poodle-female', aliases: ['pearl-poodle'], name: 'Korean Teacup Poodle', breed: 'Toy Poodle', detail: 'Girl', age: '2 months', origin: 'Korea', photo: 'dog-korean-poodle.jpg' },
  { slug: 'maltipoo-cavapoo-male', name: 'Maltipoo & Cavapoo', breed: 'Cavapoo', detail: 'Boy', age: '3 months', origin: 'Dubai', photo: 'dog-maltipoo-cavapoo.jpg' },
  { slug: 'toy-poodle-male-female', name: 'Toy Poodle', breed: 'Toy Poodle', detail: 'Boy & girl', age: '2 months', origin: 'Dubai', photo: 'dog-toy-poodle.jpg' },
  { slug: 'maltipoo-female-2', aliases: ['coco-maltipoo'], name: 'Maltipoo', breed: 'Maltipoo', detail: 'Girl', age: '3 months', origin: 'Dubai', photo: 'dog-maltipoo-coco.jpg' },
  { slug: 'pomeranian-female', aliases: ['teddy-pomeranian'], name: 'Pomeranian', breed: 'Pomeranian', detail: 'Girl', age: '3 months', origin: 'Dubai', photo: 'dog-pomeranian.jpg' },
  { slug: 'copper-male', aliases: ['milo-cavapoo'], name: 'Copper', breed: 'Cavapoo', detail: 'Boy', age: '2 months', origin: 'Dubai', photo: 'dog-copper.webp' },
  { slug: 'shitzu-female', name: 'Shih Tzu', breed: 'Shih Tzu', detail: 'Girl', age: '2 months', origin: 'Dubai', photo: 'dog-shih-tzu-girl.jpeg' },
  { slug: 'shitzu-male', aliases: ['luna-shih-tzu'], name: 'Shih Tzu', breed: 'Shih Tzu', detail: 'Boy', age: '2 months', origin: 'Dubai', photo: 'dog-shih-tzu-boy.jpg' },
  { slug: 'maltipoo-female-1', name: 'Maltipoo', breed: 'Maltipoo', detail: 'Girl', age: '2.5 months', origin: 'Dubai', photo: 'dog-maltipoo-girl.jpg' },
  { slug: 'maltipoo-female', name: 'Maltipoo', breed: 'Maltipoo', detail: 'Girl', age: '2 months', origin: 'Dubai', photo: 'dog-maltipoo-last.jpg' },
].map((puppy) => {
  const image = `/images/${puppy.photo}`
  return {
    ...puppy,
    gallery: galleryFilesByPuppy[puppy.slug].map((file) => `/images/puppy-galleries/${puppy.slug}/${file}`),
    image,
  }
})

export const faqs = [
  {
    question: 'How can I meet a puppy before choosing?',
    answer: 'Arrange a visit to meet puppies currently in Dubai. Our team can help you plan a time and answer questions before you decide.',
  },
  {
    question: 'What health information is provided?',
    answer: 'We share the available veterinary and vaccination records for each puppy and talk you through the care information before adoption.',
  },
  {
    question: 'Can you help with an international puppy?',
    answer: 'We can discuss which puppies may be available through international breeders and explain the travel arrangements and expected timing.',
  },
]
