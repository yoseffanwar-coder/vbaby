import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  ArrowUpLeft,
  CheckCircle2,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  X,
} from 'lucide-react';
import { BrandMark } from './components/BrandMark';
import { OrderDrawer } from './components/OrderDrawer';
import { CartEntry, ProductModal } from './components/ProductModal';
import { SafeImage } from './components/SafeImage';
import {
  ATELIER_IMAGE,
  CATEGORY_TABS,
  COLLECTION_ITEMS,
  CRAFT_PILLARS,
  CollectionCategory,
  CollectionItem,
  FACEBOOK_URL,
  FACTORY_METRICS,
  HERO_IMAGE,
  LOOKBOOK_GALLERY,
  PricingMode,
  TIKTOK_URL,
  WHATSAPP_BASE_URL,
  buildWhatsAppLink,
} from './data/collections';

interface InquiryFormState {
  name: string;
  phone: string;
  inquiryType: 'طلب جملة للمحلات' | 'طلب قطاعي / خاص';
  notes: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CollectionCategory>('all');
  const [pricingMode, setPricingMode] = useState<PricingMode>('retail');
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLookbookIdx, setActiveLookbookIdx] = useState(1);

  const [form, setForm] = useState<InquiryFormState>({
    name: '',
    phone: '',
    inquiryType: 'طلب جملة للمحلات',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const totalCartPieces = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  const handleAddToCart = (newEntry: CartEntry) => {
    setCartEntries((prev) => {
      const existing = prev.find((e) => e.key === newEntry.key);
      if (existing) {
        return prev.map((e) =>
          e.key === newEntry.key
            ? { ...e, quantity: e.quantity + newEntry.quantity }
            : e
        );
      }
      return [...prev, newEntry];
    });
    setDrawerOpen(true);
  };

  const handleUpdateCartQty = (key: string, nextQty: number) => {
    setCartEntries((prev) =>
      prev.map((e) => (e.key === key ? { ...e, quantity: nextQty } : e))
    );
  };

  const handleRemoveCartEntry = (key: string) => {
    setCartEntries((prev) => prev.filter((e) => e.key !== key));
  };

  const filteredItems =
    activeCategory === 'all'
      ? COLLECTION_ITEMS
      : COLLECTION_ITEMS.filter((item) => item.category === activeCategory);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};
    const trimmedName = form.name.trim();
    const cleanedPhone = form.phone.replace(/[\s\-()]/g, '');

    if (trimmedName.length < 2) {
      errors.name = 'يرجى كتابة الاسم الكامل (حرفان على الأقل).';
    }
    if (!/^\+?\d{8,15}$/.test(cleanedPhone)) {
      errors.phone = 'يرجى إدخال رقم هاتف صحيح (٨ إلى ١٥ رقمًا).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const compiled = [
      `مرحبًا V BABY،`,
      `الاسم: ${trimmedName}`,
      `الهاتف: ${form.phone.trim()}`,
      `نوع التعامل: ${form.inquiryType}`,
      form.notes.trim() ? `التفاصيل: ${form.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedMessage(compiled);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#173746]">
      {/* Sticky Top Navigation — strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8F1F5]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#home"
            aria-label="V BABY الرئيسية"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#257A99] rounded-lg"
          >
            <BrandMark size="sm" />
          </a>

          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-sm font-bold text-[#355362]"
          >
            <a
              href="#home"
              className="hover:text-[#257A99] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              الرئيسية
            </a>
            <a
              href="#collections"
              className="hover:text-[#257A99] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              المجموعات
            </a>
            <a
              href="#about"
              className="hover:text-[#257A99] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              عن المصنع
            </a>
            <a
              href="#contact"
              className="hover:text-[#257A99] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-sm font-extrabold transition-colors whitespace-nowrap shrink-0"
            >
              اطلب الآن
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="md:hidden w-11 h-11 rounded-xl border border-[#DCEBF2] bg-[#F7FBFE] flex items-center justify-center text-[#173746] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="قائمة الجوال"
            className="md:hidden border-t border-[#E8F1F5] bg-white px-5 py-4 flex flex-col gap-2"
          >
            {[
              { href: '#home', label: 'الرئيسية' },
              { href: '#collections', label: 'المجموعات' },
              { href: '#about', label: 'عن المصنع' },
              { href: '#contact', label: 'تواصل معنا' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl text-sm font-bold text-[#173746] hover:bg-[#F3FAFD]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center py-2.5 px-5 rounded-full bg-[#FFD700] text-[#2B2300] text-sm font-extrabold"
            >
              اطلب الآن عبر واتساب
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="bg-gradient-to-b from-[#F5FBFE] via-[#FAFDFE] to-white border-b border-[#EDF4F7]"
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p
                dir="ltr"
                className="font-latin text-xs font-bold tracking-[0.16em] text-[#257A99] text-right mb-3"
              >
                LITTLE MOMENTS BIG DREAMS
              </p>

              <h1 className="text-[clamp(2.25rem,4.2vw,3.65rem)] font-black leading-[1.2] text-[#173746] mb-5">
                عالم من الشياكة <span className="text-[#257A99]">والراحة لأطفالنا</span>
              </h1>

              <p className="text-base sm:text-lg text-[#526875] leading-relaxed max-w-xl mb-8">
                في V BABY نهتم بالتفاصيل الصغيرة التي تصنع فرقًا كبيرًا؛ ملابس أطفال
                بخامات قطنية ناعمة، تفصيل متقن، وتصميمات مبهجة تناسب كل لحظاتهم
                اليومية.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-sm sm:text-base font-extrabold transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل عبر واتساب</span>
                </a>
                <a
                  href="#collections"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E6F5FC] hover:bg-[#D5EEFA] text-[#173746] text-sm sm:text-base font-extrabold transition-colors whitespace-nowrap shrink-0"
                >
                  <span>استكشف التشكيلة</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-[#526875] pt-5 border-t border-[#E6F0F5]">
                <span>تصميم وتصنيع محلي</span>
                <span aria-hidden="true">·</span>
                <span>خامات قطنية ناعمة</span>
                <span aria-hidden="true">·</span>
                <span>مبيعات جملة وقطاعي</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden border border-[#DCEBF2] bg-[#F3FAFD]">
                <SafeImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fallbackTitle="تشكيلة V BABY للأطفال"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Collections & Pricing Showcase */}
        <section id="collections" className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <p className="text-xs font-bold text-[#257A99] mb-2">
                  إصدارات الموسم · أسعار القطاعي والجملة
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-[#173746]">
                  تشكيلة V BABY والأسعار
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#526875]">
                  اختر نظام التسعير المناسب (قطاعي أو جملة للمحلات) واستعرض الخامات
                  والمقاسات المتاحة.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                <div
                  role="group"
                  aria-label="نظام التسعير"
                  className="inline-flex items-center gap-1 p-1.5 bg-[#EFF9FD] rounded-2xl border border-[#D4EAF4]"
                >
                  {(
                    [
                      { id: 'retail', label: 'أسعار القطاعي' },
                      { id: 'wholesale', label: 'أسعار الجملة' },
                    ] as const
                  ).map((mode) => {
                    const isActive = pricingMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setPricingMode(mode.id)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#173746] text-white shadow-xs'
                            : 'text-[#355362] hover:text-[#173746]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  role="group"
                  aria-label="تصفية المجموعات"
                  className="inline-flex flex-wrap items-center gap-1 p-1.5 bg-[#F3F8FB] rounded-2xl border border-[#E2EEF4]"
                >
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-white text-[#173746] shadow-xs'
                            : 'text-[#526875] hover:text-[#173746]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#DCEBF2] bg-white hover:bg-[#F3FAFD] text-[#173746] text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#257A99]" />
                  <span>السلة</span>
                  <span className="tabular-nums">({totalCartPieces})</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {filteredItems.map((item) => {
                const activePrice =
                  pricingMode === 'wholesale'
                    ? item.wholesalePrice
                    : item.retailPrice;

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col justify-between bg-white rounded-3xl border border-[#E4EFF4] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-[#F5FAFD] overflow-hidden">
                        <SafeImage
                          src={item.image}
                          alt={item.imageAlt}
                          fallbackTitle={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#526875] mb-2">
                          <span>{item.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.fabric}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.ageRange}</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#173746] leading-snug mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#526875] leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-[#F0F6F9] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xl font-black text-[#173746] tabular-nums">
                          {activePrice.toLocaleString('en-US')} ج.م
                        </div>
                        <span className="block text-[11px] font-semibold text-[#526875] tabular-nums">
                          {pricingMode === 'wholesale'
                            ? `سعر الجملة (أقل طلب ${item.minWholesaleQty} قطع)`
                            : `سعر القطاعي · الجملة ${item.wholesalePrice} ج.م`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>اختيار وطلب</span>
                        <ArrowUpLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Clean Price Summary Table */}
            <div className="mt-12 rounded-3xl border border-[#E2EEF4] bg-[#FAFDFE] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2EEF4] flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#173746]">
                  جدول الأسعار الاسترشادي (جنيه مصري)
                </h3>
                <span className="text-xs font-semibold text-[#526875]">
                  تخفيضات إضافية للكميات الكبيرة وتعاقدات المحلات
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8F1F5] text-xs font-bold text-[#526875]">
                      <th className="py-3.5 px-6">الموديل</th>
                      <th className="py-3.5 px-4">الفئة العمرية</th>
                      <th className="py-3.5 px-4">سعر القطاعي</th>
                      <th className="py-3.5 px-4">سعر الجملة (من ٦ قطع)</th>
                      <th className="py-3.5 px-6 text-left">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF4F7] text-sm">
                    {COLLECTION_ITEMS.map((item) => (
                      <tr key={item.id} className="hover:bg-white transition-colors">
                        <td className="py-4 px-6 font-bold text-[#173746]">
                          {item.title}
                        </td>
                        <td className="py-4 px-4 text-[#526875] tabular-nums whitespace-nowrap">
                          {item.ageRange}
                        </td>
                        <td className="py-4 px-4 font-extrabold text-[#173746] tabular-nums whitespace-nowrap">
                          {item.retailPrice.toLocaleString('en-US')} ج.م
                        </td>
                        <td className="py-4 px-4 font-extrabold text-[#257A99] tabular-nums whitespace-nowrap">
                          {item.wholesalePrice.toLocaleString('en-US')} ج.م
                        </td>
                        <td className="py-4 px-6 text-left">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(item)}
                            className="inline-flex items-center gap-1 text-xs font-extrabold text-[#173746] hover:text-[#257A99] whitespace-nowrap cursor-pointer"
                          >
                            <span>احسب الطلب</span>
                            <ArrowUpLeft className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship & Brand Story */}
        <section
          id="about"
          className="py-16 sm:py-20 bg-[#F7FBFE] border-y border-[#E6F0F5]"
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="rounded-3xl overflow-hidden border border-[#DCEBF2] bg-white aspect-[4/3]">
                <SafeImage
                  src={LOOKBOOK_GALLERY[activeLookbookIdx]?.src ?? ATELIER_IMAGE.src}
                  alt={LOOKBOOK_GALLERY[activeLookbookIdx]?.alt ?? ATELIER_IMAGE.alt}
                  fallbackTitle="مصنع V BABY"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {LOOKBOOK_GALLERY.map((photo, idx) => {
                  const isActive = activeLookbookIdx === idx;
                  return (
                    <button
                      key={photo.caption}
                      type="button"
                      onClick={() => setActiveLookbookIdx(idx)}
                      aria-label={photo.caption}
                      aria-pressed={isActive}
                      className={`group text-right rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                        isActive
                          ? 'border-[#257A99]'
                          : 'border-[#DCEBF2] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <SafeImage
                          src={photo.src}
                          alt={photo.alt}
                          fallbackTitle={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <BrandMark size="md" />
                <div className="flex items-center gap-2 text-xs font-bold text-[#526875]">
                  <span>راحة</span>
                  <span aria-hidden="true">·</span>
                  <span>أناقة</span>
                  <span aria-hidden="true">·</span>
                  <span>جودة</span>
                  <span aria-hidden="true">·</span>
                  <span>طفولة سعيدة</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-[#257A99] mb-2">
                  عن مصنع V BABY
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-[#173746] leading-snug mb-4">
                  كل قطعة تحكي لحظة جميلة
                </h2>
                <p className="text-sm sm:text-base text-[#526875] leading-relaxed max-w-2xl mb-8">
                  V BABY علامة متخصصة في تصنيع ملابس الأطفال؛ نؤمن أن كل طفل يستحق
                  إطلالة أنيقة ومساحة أكبر للعب والاكتشاف، لذلك نجمع بين الخامات
                  المريحة والتشطيب المتقن في كل موديل.
                </p>

                <div className="divide-y divide-[#E0EDF3] border-y border-[#E0EDF3]">
                  {CRAFT_PILLARS.map((pillar) => (
                    <div
                      key={pillar.number}
                      className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                    >
                      <span className="font-latin text-sm font-extrabold text-[#257A99] tabular-nums shrink-0">
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#173746] mb-1">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-[#526875] leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8">
                {FACTORY_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <div
                      dir="ltr"
                      className="font-latin text-2xl sm:text-3xl font-black text-[#173746] tabular-nums text-right"
                    >
                      {metric.value}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[#526875]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conversion & Direct Contact */}
        <section id="contact" className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="rounded-3xl bg-[#EFF9FD] border border-[#D4EAF4] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-bold text-[#257A99] mb-2">
                  المبيعات والتعاون التجاري
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-[#173746] leading-snug mb-4">
                  خلّي لحظاتهم أجمل مع V BABY
                </h2>
                <p className="text-sm sm:text-base text-[#355362] leading-relaxed mb-8">
                  للاستفسار عن المنتجات المتوفرة، طلبات الجملة للمحلات والمعارض، أو
                  معرفة تفاصيل المقاسات والأسعار، يسعدنا تواصلك معنا مباشرة.
                </p>

                <div className="space-y-4 pt-6 border-t border-[#D4EAF4]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#D4EAF4] flex items-center justify-center text-[#257A99] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#526875]">
                        واتساب وهاتف المبيعات
                      </span>
                      <a
                        href={WHATSAPP_BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="font-latin text-sm font-extrabold text-[#173746] hover:text-[#257A99] tabular-nums"
                      >
                        +20 120 529 9547
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={WHATSAPP_BASE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-xs font-extrabold transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>محادثة واتساب فورية</span>
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2.5 rounded-full bg-white border border-[#D4EAF4] hover:border-[#87CEEB] text-[#173746] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                    >
                      فيسبوك
                    </a>
                    <a
                      href={TIKTOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2.5 rounded-full bg-white border border-[#D4EAF4] hover:border-[#87CEEB] text-[#173746] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                    >
                      تيك توك
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCEBF2] p-6 sm:p-8">
                {submittedMessage ? (
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#1E8E5A] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-extrabold text-[#173746]">
                          تم تجهيز رسالة استفسارك بنجاح
                        </h3>
                        <p className="text-sm text-[#526875] mt-1">
                          اضغط على الزر أدناه لإرسال التفاصيل مباشرة إلى فريق مبيعات
                          V BABY عبر واتساب.
                        </p>
                      </div>
                    </div>

                    <pre className="whitespace-pre-wrap font-sans text-sm text-[#173746] bg-[#F7FBFE] border border-[#E2EEF4] rounded-xl p-4 leading-relaxed">
                      {submittedMessage}
                    </pre>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppLink(submittedMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-sm font-extrabold transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>إرسال عبر واتساب الآن</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedMessage(null)}
                        className="px-5 py-3 rounded-full border border-[#DCEBF2] hover:bg-[#F7FBFE] text-[#173746] text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        تعديل البيانات
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-bold text-[#173746] mb-1.5"
                        >
                          الاسم الكامل
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="مثال: أميرة محمد"
                          aria-invalid={Boolean(formErrors.name)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D4E4EC] bg-white text-sm text-[#173746] placeholder:text-[#8CA0AC] focus:outline-none focus:border-[#257A99]"
                        />
                        {formErrors.name && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#B42318]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-bold text-[#173746] mb-1.5"
                        >
                          رقم الهاتف / واتساب
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          dir="ltr"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+20 100 000 0000"
                          aria-invalid={Boolean(formErrors.phone)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D4E4EC] bg-white text-sm text-right font-latin tabular-nums text-[#173746] placeholder:text-[#8CA0AC] focus:outline-none focus:border-[#257A99]"
                        />
                        {formErrors.phone && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#B42318]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-bold text-[#173746] mb-2">
                        نوع الاستفسار
                      </span>
                      <div className="inline-flex p-1 bg-[#F3F8FB] rounded-xl border border-[#E2EEF4]">
                        {(['طلب جملة للمحلات', 'طلب قطاعي / خاص'] as const).map(
                          (type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, inquiryType: type }))
                              }
                              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                form.inquiryType === type
                                  ? 'bg-white text-[#173746] shadow-xs'
                                  : 'text-[#526875] hover:text-[#173746]'
                              }`}
                            >
                              {type}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-notes"
                        className="block text-xs font-bold text-[#173746] mb-1.5"
                      >
                        تفاصيل الطلب أو المقاسات المطلوبة (اختياري)
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        placeholder="اكتب الموديلات أو الفئات العمرية أو الكمية التقريبية..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4E4EC] bg-white text-sm text-[#173746] placeholder:text-[#8CA0AC] focus:outline-none focus:border-[#257A99] resize-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <span className="text-xs text-[#526875]">
                        يتم الرد مباشرة عبر فريق المبيعات
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#173746] hover:bg-[#224E63] text-white text-sm font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>تجهيز الطلب للواتساب</span>
                        <ArrowUpLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#173746] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/15">
            <div>
              <span
                dir="ltr"
                className="font-latin text-xl font-extrabold tracking-tight text-white"
              >
                V BABY
              </span>
              <p
                dir="ltr"
                className="font-latin text-xs tracking-widest text-[#B7D5E3] mt-1"
              >
                LITTLE MOMENTS BIG DREAMS
              </p>
            </div>

            <nav
              aria-label="روابط التذييل"
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-[#D6E8F0]"
            >
              <a href="#home" className="hover:text-white transition-colors">
                الرئيسية
              </a>
              <a href="#collections" className="hover:text-white transition-colors">
                المجموعات
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                عن المصنع
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                تواصل معنا
              </a>
            </nav>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
              >
                Facebook
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
              >
                TikTok
              </a>
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#20BD66] hover:bg-[#1AA659] text-white transition-colors whitespace-nowrap shrink-0"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#B7D5E3]">
            <p>© {currentYear} V BABY. جميع الحقوق محفوظة.</p>
            <p>ملابس أطفال بخامات ناعمة وتصميمات مميزة</p>
          </div>
        </div>
      </footer>

      {/* Compact WhatsApp Quick Action */}
      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed left-4 bottom-4 z-30 w-12 h-12 rounded-full bg-[#1CA85B] hover:bg-[#16914D] text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Interactive Product Inquiry Modal */}
      <ProductModal
        item={selectedProduct}
        initialPricingMode={pricingMode}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Cart / Order Summary Drawer */}
      <OrderDrawer
        open={drawerOpen}
        entries={cartEntries}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveCartEntry}
        onClear={() => setCartEntries([])}
      />
    </div>
  );
}
