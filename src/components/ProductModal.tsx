import { useEffect, useState } from 'react';
import { X, MessageCircle, Check, ShoppingBag } from 'lucide-react';
import {
  CollectionItem,
  PricingMode,
  buildWhatsAppLink,
} from '../data/collections';
import { SafeImage } from './SafeImage';

export interface CartEntry {
  key: string;
  item: CollectionItem;
  orderType: PricingMode;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

interface ProductModalProps {
  item: CollectionItem | null;
  initialPricingMode: PricingMode;
  onClose: () => void;
  onAddToCart: (entry: CartEntry) => void;
}

export function ProductModal({
  item,
  initialPricingMode,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [orderType, setOrderType] = useState<PricingMode>(initialPricingMode);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes[0] ?? '');
      setSelectedColor(item.colors[0]?.name ?? '');
      setOrderType(initialPricingMode);
      setQuantity(
        initialPricingMode === 'wholesale' ? item.minWholesaleQty : 1
      );
      setActiveImage(item.image);
    }
  }, [item, initialPricingMode]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const minQty = orderType === 'wholesale' ? item.minWholesaleQty : 1;
  const unitPrice =
    orderType === 'wholesale' ? item.wholesalePrice : item.retailPrice;
  const lineTotal = unitPrice * quantity;
  const orderTypeLabel =
    orderType === 'wholesale' ? 'جملة للمحلات' : 'قطاعي';

  const handleOrderTypeChange = (nextType: PricingMode) => {
    setOrderType(nextType);
    if (nextType === 'wholesale' && quantity < item.minWholesaleQty) {
      setQuantity(item.minWholesaleQty);
    } else if (nextType === 'retail' && quantity === item.minWholesaleQty) {
      setQuantity(1);
    }
  };

  const whatsappMessage = [
    `مرحبًا V BABY، أرغب في طلب:`,
    `• الموديل: ${item.title}`,
    `• نوع الطلب: ${orderTypeLabel}`,
    `• المقاس: ${selectedSize}`,
    `• اللون: ${selectedColor}`,
    `• الكمية: ${quantity} قطعة`,
    `• سعر القطعة: ${unitPrice} ج.م`,
    `• الإجمالي التقديري: ${lineTotal} ج.م`,
  ].join('\n');

  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  const handleAdd = () => {
    onAddToCart({
      key: `${item.id}-${orderType}-${selectedSize}-${selectedColor}`,
      item,
      orderType,
      size: selectedSize,
      color: selectedColor,
      quantity,
      unitPrice,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#173746]/45 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-3xl border border-[#E2EEF4] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:col-span-5 bg-[#F6FAFC] flex flex-col">
          <div className="flex-1 min-h-[220px]">
            <SafeImage
              src={activeImage || item.image}
              alt={item.imageAlt}
              fallbackTitle={item.title}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            />
          </div>
          {item.galleryImages.length > 1 && (
            <div className="p-3 bg-white border-t border-[#E8F1F5] grid grid-cols-3 gap-2">
              {item.galleryImages.map((imgSrc, idx) => {
                const isSelected = (activeImage || item.image) === imgSrc;
                return (
                  <button
                    key={imgSrc}
                    type="button"
                    onClick={() => setActiveImage(imgSrc)}
                    aria-label={`عرض الصورة ${idx + 1} لـ ${item.title}`}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#257A99]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <SafeImage
                      src={imgSrc}
                      alt={`${item.title} - صورة ${idx + 1}`}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#526875] mb-1.5">
                  <span>{item.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.fabric}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.ageRange}</span>
                </div>
                <h3
                  id="modal-product-title"
                  className="text-xl sm:text-2xl font-extrabold text-[#173746]"
                >
                  {item.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق نافذة التفاصيل"
                className="w-10 h-10 rounded-xl border border-[#E2EEF4] flex items-center justify-center text-[#526875] hover:text-[#173746] hover:bg-[#F6FAFC] transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-4 pb-4 border-b border-[#EDF3F6]">
              <div>
                <span className="text-2xl font-black text-[#173746] tabular-nums">
                  {unitPrice.toLocaleString('en-US')} ج.م
                </span>
                <span className="mr-1.5 text-xs font-bold text-[#526875]">
                  / للقطعة ({orderTypeLabel})
                </span>
              </div>
              {orderType === 'wholesale' && (
                <span className="text-xs font-bold text-[#257A99]">
                  الحد الأدنى للجملة: {item.minWholesaleQty} قطع
                </span>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="block text-xs font-bold text-[#173746] mb-2">
                  نظام التسعير والطلب
                </span>
                <div className="inline-flex p-1 bg-[#F3F8FB] rounded-xl border border-[#E2EEF4]">
                  {(
                    [
                      { id: 'retail', label: `قطاعي (${item.retailPrice} ج.م)` },
                      {
                        id: 'wholesale',
                        label: `جملة (${item.wholesalePrice} ج.م)`,
                      },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOrderTypeChange(option.id)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                        orderType === option.id
                          ? 'bg-white text-[#173746] shadow-xs'
                          : 'text-[#526875] hover:text-[#173746]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-[#173746] mb-2">
                  الفئة العمرية / المقاس
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#173746] text-white border-[#173746]'
                          : 'bg-white text-[#173746] border-[#DCE8EE] hover:border-[#87CEEB]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-bold text-[#173746] mb-2">
                    اللون المفضل:{' '}
                    <span className="font-semibold text-[#526875]">
                      {selectedColor}
                    </span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {item.colors.map((color) => {
                      const active = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          aria-label={color.name}
                          title={color.name}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform cursor-pointer ${
                            active
                              ? 'border-[#173746] scale-105'
                              : 'border-[#DCE8EE] hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {active && (
                            <Check className="w-3.5 h-3.5 text-[#173746]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="modal-qty"
                    className="block text-xs font-bold text-[#173746] mb-2"
                  >
                    الكمية
                  </label>
                  <div className="inline-flex items-center border border-[#DCE8EE] rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => Math.max(minQty, q - 1))
                      }
                      aria-label="تقليل الكمية"
                      className="w-9 h-9 flex items-center justify-center text-[#173746] hover:bg-[#F3F8FB] font-bold cursor-pointer"
                    >
                      −
                    </button>
                    <span
                      id="modal-qty"
                      className="w-10 text-center text-sm font-bold text-[#173746] tabular-nums"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="زيادة الكمية"
                      className="w-9 h-9 flex items-center justify-center text-[#173746] hover:bg-[#F3F8FB] font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDF3F6] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="block text-[11px] font-semibold text-[#526875]">
                الإجمالي التقديري
              </span>
              <span className="text-lg font-black text-[#173746] tabular-nums">
                {lineTotal.toLocaleString('en-US')} ج.م
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#DCE8EE] bg-white hover:bg-[#F3FAFD] text-[#173746] text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>أضف للسلة</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD700] hover:bg-[#F5CC00] text-[#2B2300] text-xs font-extrabold transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب فوري واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
