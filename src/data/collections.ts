import newbornImg from '../assets/images/vbaby_newborn_set_1794589990442.jpg';
import newbornBlanketImg from '../assets/images/vbaby_newborn_blanket_set_1794590533406.jpg';
import newbornSalopetteImg from '../assets/images/vbaby_newborn_salopette_1794590532882.jpg';
import everydayImg from '../assets/images/vbaby_everyday_wear_1794589992256.jpg';
import everydayDenimImg from '../assets/images/vbaby_everyday_denim_set_1794590533534.jpg';
import everydayFloralImg from '../assets/images/vbaby_everyday_floral_set_1794590534496.jpg';
import occasionImg from '../assets/images/vbaby_occasion_outfit_1794589992911.jpg';
import occasionBoySuitImg from '../assets/images/vbaby_occasion_boy_suit_1794590535449.jpg';
import occasionGirlDressImg from '../assets/images/vbaby_occasion_girl_dress_1794590535087.jpg';
import heroCollectionImg from '../assets/images/vbaby_hero_collection_1794589991629.jpg';
import atelierCraftImg from '../assets/images/vbaby_atelier_craft_1794589992950.jpg';

import realHeroKidsImg from '../assets/images/vbaby_real_hero_kids_1794590701378.jpg';
import realNewbornBabyImg from '../assets/images/vbaby_real_newborn_baby_1794590701406.jpg';
import realToddlerPlayImg from '../assets/images/vbaby_real_toddler_play_1794590702467.jpg';
import realGirlEverydayImg from '../assets/images/vbaby_real_girl_everyday_1794590703242.jpg';
import realOccasionKidsImg from '../assets/images/vbaby_real_occasion_kids_1794590703188.jpg';
import realShowroomRackImg from '../assets/images/vbaby_real_showroom_rack_1794590703957.jpg';

export type CollectionCategory = 'all' | 'newborn' | 'everyday' | 'occasion';
export type PricingMode = 'retail' | 'wholesale';

export interface CollectionItem {
  id: string;
  category: Exclude<CollectionCategory, 'all'>;
  categoryLabel: string;
  title: string;
  fabric: string;
  ageRange: string;
  summary: string;
  image: string;
  galleryImages: string[];
  imageAlt: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  availabilityLabel: string;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
}

export const WHATSAPP_NUMBER = '201205299547';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const FACEBOOK_URL = 'https://www.facebook.com/share/1ChVnuVMtT/';
export const TIKTOK_URL = 'https://www.tiktok.com/@vdady0';

export const HERO_IMAGE = {
  src: realHeroKidsImg,
  alt: 'أطفال يرتدون ملابس V BABY القطنية في إطلالة طبيعية مريحة ومبهجة',
};

export const ATELIER_IMAGE = {
  src: realShowroomRackImg,
  alt: 'مشغل وصالة عرض مصنع V BABY لملابس الأطفال القطنية',
};

export const LOOKBOOK_GALLERY = [
  {
    src: realShowroomRackImg,
    alt: 'مشغل وصالة عرض مصنع V BABY بخطوط الإنتاج والتجهيز',
    caption: 'المصنع والعرض',
  },
  {
    src: realNewbornBabyImg,
    alt: 'مولود يرتدي طقم V BABY القطني الناعم بضوء النهار الطبيعي',
    caption: 'حديثي الولادة',
  },
  {
    src: realOccasionKidsImg,
    alt: 'أطفال بإطلالات V BABY الكلاسيكية في مناسبة عائلية',
    caption: 'أطقم المناسبات',
  },
  {
    src: atelierCraftImg,
    alt: 'تفاصيل الخياطة وأزرار الخشب الطبيعية والأقمشة القطنية',
    caption: 'جودة التشطيب',
  },
];

export const CATEGORY_TABS: { id: CollectionCategory; label: string }[] = [
  { id: 'all', label: 'الكل (٩)' },
  { id: 'newborn', label: 'حديثي الولادة (٣)' },
  { id: 'everyday', label: 'ملابس يومية (٣)' },
  { id: 'occasion', label: 'أطقم المناسبات (٣)' },
];

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'vb-newborn-cloud',
    category: 'newborn',
    categoryLabel: 'حديثي الولادة',
    title: 'طقم سحابة للمواليد من القطن الممشط',
    fabric: 'قطن طبيعي ١٠٠٪',
    ageRange: '٠ – ١٢ شهر',
    summary:
      'رومبر وكارديجان بتصميم ناعم وخياطة داخلية لطيفة تحمي بشرة المواليد الحساسة وتوفر دفئًا متوازنًا.',
    image: realNewbornBabyImg,
    galleryImages: [realNewbornBabyImg, newbornImg, atelierCraftImg],
    imageAlt: 'طفل رضيع يرتدي طقم سحابة للمواليد من V BABY باللون السماوي والكريمي',
    sizes: ['0-3 أشهر', '3-6 أشهر', '6-9 أشهر', '9-12 شهر'],
    colors: [
      { name: 'أزرق سماوي', hex: '#87CEEB' },
      { name: 'كريمي دافئ', hex: '#F3EAD8' },
      { name: 'وردي ناعم', hex: '#FFB6C1' },
    ],
    availabilityLabel: 'متاح جملة وقطاعي',
    retailPrice: 480,
    wholesalePrice: 360,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-newborn-gift',
    category: 'newborn',
    categoryLabel: 'حديثي الولادة',
    title: 'طقم استقبال المواليد بالبطانية والقبعة',
    fabric: 'موسلين وقطن عضوي',
    ageRange: '٠ – ٦ أشهر',
    summary:
      'مجموعة متكاملة تشمل كوفرتة موسلين مسامية وقبعة معقودة وقفازات قطنية ناعمة مثالية للخروج والهدايا.',
    image: newbornBlanketImg,
    galleryImages: [newbornBlanketImg, realNewbornBabyImg, newbornImg],
    imageAlt: 'طقم استقبال المواليد V BABY باللون الوردي الفاتح والكريمي',
    sizes: ['0-3 أشهر', '3-6 أشهر'],
    colors: [
      { name: 'وردي ناعم', hex: '#F6CBD2' },
      { name: 'كريمي دافئ', hex: '#F5EFE2' },
      { name: 'سماوي فاتح', hex: '#B9E2F5' },
    ],
    availabilityLabel: 'مناسب للهدايا والتجهيز',
    retailPrice: 540,
    wholesalePrice: 410,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-newborn-salopette',
    category: 'newborn',
    categoryLabel: 'حديثي الولادة',
    title: 'سالوبيت تريكو قطني بأزرار خشبية للمواليد',
    fabric: 'تريكو قطن ناعم',
    ageRange: '٠ – ١٢ شهر',
    summary:
      'سالوبيت محبوك بخيوط قطنية مرنة مع بودي سوت مقلم بأكمام طويلة يمنح الطفل دفئًا مريحًا وحرية حركة.',
    image: newbornSalopetteImg,
    galleryImages: [newbornSalopetteImg, realNewbornBabyImg, heroCollectionImg],
    imageAlt: 'سالوبيت تريكو للمواليد باللون الكريمي مع بودي سوت أزرق مقلم',
    sizes: ['0-3 أشهر', '3-6 أشهر', '6-9 أشهر', '9-12 شهر'],
    colors: [
      { name: 'كريمي وسماوي', hex: '#EFE7D6' },
      { name: 'سماوي صافي', hex: '#87CEEB' },
      { name: 'وردي هادئ', hex: '#F5C4CD' },
    ],
    availabilityLabel: 'متاح جملة وقطاعي',
    retailPrice: 460,
    wholesalePrice: 345,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-everyday-play',
    category: 'everyday',
    categoryLabel: 'ملابس يومية',
    title: 'طقم اللعب اليومي المريح للأطفال',
    fabric: 'قطن ميلتون وخيط مرن',
    ageRange: '١ – ٨ سنوات',
    summary:
      'قصّات عملية تمنح الطفل حرية الحركة طوال اليوم مع ألوان ثابتة تتحمل الغسيل المتكرر والأنشطة اليومية.',
    image: realToddlerPlayImg,
    galleryImages: [realToddlerPlayImg, everydayImg, realHeroKidsImg],
    imageAlt: 'طفل يلعب بسعادة مرتديًا طقم V BABY اليومي بسويتشيرت سماوي وشورت بيج',
    sizes: ['1-2 سنة', '2-4 سنوات', '4-6 سنوات', '6-8 سنوات'],
    colors: [
      { name: 'أزرق سماوي', hex: '#87CEEB' },
      { name: 'أصفر دافئ', hex: '#F2C94C' },
      { name: 'رملي فاتح', hex: '#DDD1BD' },
    ],
    availabilityLabel: 'متاح جملة وقطاعي',
    retailPrice: 420,
    wholesalePrice: 310,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-everyday-denim',
    category: 'everyday',
    categoryLabel: 'ملابس يومية',
    title: 'طقم الكاجوال العملي بجاكيت خفيف وبنطلون',
    fabric: 'جبردين قطني وميلتون',
    ageRange: '٢ – ١٠ سنوات',
    summary:
      'ثلاث قطع متناسقة تضم جاكيت قطني مغسول ناعم وتيشيرت أبيض وبنطلون جوجر مريح للخروجات اليومية.',
    image: everydayDenimImg,
    galleryImages: [everydayDenimImg, realToddlerPlayImg, realShowroomRackImg],
    imageAlt: 'طقم أطفال كاجوال بجاكيت قطني سماوي وتيشيرت كريمي وبنطلون بيج',
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-10 سنوات'],
    colors: [
      { name: 'سماوي فاتح', hex: '#9EC3DC' },
      { name: 'بيج رملي', hex: '#DECDB4' },
      { name: 'أبيض عاجي', hex: '#F6F4EE' },
    ],
    availabilityLabel: 'متاح جملة وقطاعي',
    retailPrice: 560,
    wholesalePrice: 425,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-everyday-floral',
    category: 'everyday',
    categoryLabel: 'ملابس يومية',
    title: 'طقم البنات الصيفي القطني بنقشة الزهور',
    fabric: 'قطن خفيف مسامي',
    ageRange: '١ – ٧ سنوات',
    summary:
      'بلوزة قطنية بكشكشة ناعمة باللون الأصفر الدافئ مع بنطلون مطبوع بنقشات رقيقة لمظهر منعش ومريح.',
    image: realGirlEverydayImg,
    galleryImages: [realGirlEverydayImg, everydayFloralImg, realHeroKidsImg],
    imageAlt: 'طفلة ترتدي بلوزة صفراء قطنية وبنطلون بنقشة زهور في الحديقة',
    sizes: ['1-2 سنة', '2-3 سنوات', '4-5 سنوات', '6-7 سنوات'],
    colors: [
      { name: 'أصفر باستيل', hex: '#F9E79F' },
      { name: 'وردي زهور', hex: '#FADBD8' },
      { name: 'سماوي فاتح', hex: '#D6EAF8' },
    ],
    availabilityLabel: 'متاح جملة وقطاعي',
    retailPrice: 440,
    wholesalePrice: 330,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-occasion-linen',
    category: 'occasion',
    categoryLabel: 'أطقم المناسبات',
    title: 'طقم المناسبات المطرز بياقة كلاسيكية',
    fabric: 'قطن لينين فاخر',
    ageRange: '٢ – ١٠ سنوات',
    summary:
      'تشطيب أنيق بتفاصيل تطريز هادئة وأزرار طبيعية تمنح الأطفال مظهرًا راقيًا مع راحة كاملة في التجمعات.',
    image: occasionImg,
    galleryImages: [occasionImg, realOccasionKidsImg, atelierCraftImg],
    imageAlt: 'طقم مناسبات V BABY باللون الوردي الفاتح والكريمي مع تطريز ناعم',
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-10 سنوات'],
    colors: [
      { name: 'وردي ناعم', hex: '#F2B8C6' },
      { name: 'عاجي فاتح', hex: '#F7F3EA' },
      { name: 'أزرق باستيل', hex: '#B8DFEE' },
    ],
    availabilityLabel: 'إصدار موسمي',
    retailPrice: 650,
    wholesalePrice: 490,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-occasion-boy-suit',
    category: 'occasion',
    categoryLabel: 'أطقم المناسبات',
    title: 'بدلة المناسبات الكتانية للأولاد بفيست سماوي',
    fabric: 'كتان وقطن مصري',
    ageRange: '٢ – ١٠ سنوات',
    summary:
      'قميص بياقة صينية مع فيست كتان سماوي وبنطلون شينو بيج مفصل بدقة لإطلالة أنيقة في الأعياد والحفلات.',
    image: realOccasionKidsImg,
    galleryImages: [realOccasionKidsImg, occasionBoySuitImg, atelierCraftImg],
    imageAlt: 'أطفال يرتدون بدلة المناسبات السماوية وفستان السهرة الوردي في احتفال عائلي',
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-10 سنوات'],
    colors: [
      { name: 'سماوي وعاجي', hex: '#A8CBE0' },
      { name: 'بيج كلاسيكي', hex: '#D8C7AE' },
    ],
    availabilityLabel: 'إصدار موسمي',
    retailPrice: 690,
    wholesalePrice: 520,
    minWholesaleQty: 6,
  },
  {
    id: 'vb-occasion-girl-dress',
    category: 'occasion',
    categoryLabel: 'أطقم المناسبات',
    title: 'فستان المناسبات الوردي بتطريز يدوي ناعم',
    fabric: 'قطن بوبلين مطرز',
    ageRange: '٢ – ١٠ سنوات',
    summary:
      'فستان مناسبات بأكمام كشكش رقيقة وصدرية مزمومة بتطريز ورود ناعمة مع بطانة قطنية مريحة للطفلة.',
    image: occasionGirlDressImg,
    galleryImages: [occasionGirlDressImg, realOccasionKidsImg, realHeroKidsImg],
    imageAlt: 'فستان أطفال مناسبات وردي ناعم بتفاصيل تطريز',
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-10 سنوات'],
    colors: [
      { name: 'وردي باستيل', hex: '#F3C6CF' },
      { name: 'كريمي لؤلؤي', hex: '#F8F2E7' },
    ],
    availabilityLabel: 'إصدار موسمي',
    retailPrice: 620,
    wholesalePrice: 465,
    minWholesaleQty: 6,
  },
];

export interface CraftPillar {
  number: string;
  title: string;
  description: string;
}

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    number: '01.',
    title: 'خامات ناعمة ولطيفة على البشرة',
    description:
      'نختار أقمشة قطنية مسامية بملمس ناعم يناسب بشرة الأطفال ويمنحهم راحة مستمرة في البيت والخروج.',
  },
  {
    number: '02.',
    title: 'اهتمام بالتفاصيل وجودة التشطيب',
    description:
      'مراجعة دقيقة للخياطة والأزرار والياقات لضمان ثبات المقاس والشكل حتى مع الحركة والغسيل المتكرر.',
  },
  {
    number: '03.',
    title: 'ستايل عصري وألوان مبهجة',
    description:
      'تصميمات متجددة تجمع بين البساطة والشياكة وتناسب أذواق الأهل ومتاجر ملابس الأطفال.',
  },
];

export const FACTORY_METRICS = [
  { value: '+40', label: 'تصميم متجدد كل موسم' },
  { value: '100%', label: 'فحص جودة قبل التغليف' },
  { value: '0–10', label: 'سنوات تغطية المقاسات' },
];

export function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
