import { useEffect } from 'react';
import { MessageCircle, ShoppingBag, Trash2, X } from 'lucide-react';
import { buildWhatsAppLink } from '../data/collections';
import { CartEntry } from './ProductModal';
import { SafeImage } from './SafeImage';

interface OrderDrawerProps {
  open: boolean;
  entries: CartEntry[];
  onClose: () => void;
  onUpdateQty: (key: string, nextQty: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

export function OrderDrawer({
  open,
  entries,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: OrderDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.quantity,
    0
  );
  const totalPieces = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  const whatsappSummary = [
    'مرحبًا V BABY، أرغب في تأكيد الطلب التالي:',
    ...entries.map((entry, idx) => {
      const modeLabel = entry.orderType === 'wholesale' ? 'جملة' : 'قطاعي';
      return `${idx + 1}) ${entry.item.title} (${modeLabel}) | مقاس: ${entry.size} | لون: ${entry.color} | الكمية: ${entry.quantity} × ${entry.unitPrice} ج.م = ${entry.quantity * entry.unitPrice} ج.م`;
    }),
    `إجمالي القطع: ${totalPieces}`,
    `الإجمالي التقديري: ${subtotal.toLocaleString('en-US')} ج.م`,
  ].join('\n');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#173746]/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="سلة الطلبات"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-r border-[#DCEBF2] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E8F1F5] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#257A99]" />
            <h3 className="text-lg font-extrabold text-[#173746]">
              سلة الطلبات ({totalPieces})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="w-10 h-10 rounded-xl border border-[#E2EEF4] flex items-center justify-center text-[#526875] hover:text-[#173746] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {entries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-[#F3FAFD] border border-[#DCEBF2] flex items-center justify-center text-[#257A99] mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-base font-extrabold text-[#173746]">
                السلة فارغة حاليًا
              </p>
              <p className="mt-1 text-sm text-[#526875] max-w-xs">
                اختر أي موديل من تشكيلة V BABY وحدد المقاس والكمية لعرض التكلفة
                الإجمالية.
              </p>
            </div>
          ) : (
            entries.map((entry) => {
              const minQty =
                entry.orderType === 'wholesale'
                  ? entry.item.minWholesaleQty
                  : 1;
              return (
                <div
                  key={entry.key}
                  className="p-4 rounded-2xl border border-[#E4EFF4] bg-[#FAFDFE] flex gap-3.5"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#E4EFF4] shrink-0">
                    <SafeImage
                      src={entry.item.image}
                      alt={entry.item.imageAlt}
                      fallbackTitle={entry.item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-[#173746] leading-snug">
                        {entry.item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemove(entry.key)}
                        aria-label={`حذف ${entry.item.title}`}
                        className="text-[#64748B] hover:text-[#B42318] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-[#526875]">
                      {entry.orderType === 'wholesale' ? 'جملة' : 'قطاعي'} ·{' '}
                      {entry.size} · {entry.color}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-[#DCE8EE] rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(
                              entry.key,
                              Math.max(minQty, entry.quantity - 1)
                            )
                          }
                          aria-label="تقليل الكمية"
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#173746] cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#173746] tabular-nums">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(entry.key, entry.quantity + 1)
                          }
                          aria-label="زيادة الكمية"
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#173746] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-black text-[#173746] tabular-nums">
                        {(entry.unitPrice * entry.quantity).toLocaleString(
                          'en-US'
                        )}{' '}
                        ج.م
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#E8F1F5] bg-[#F7FBFE] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-[#526875]">
                الإجمالي التقديري ({totalPieces} قطعة)
              </span>
              <span className="text-xl font-black text-[#173746] tabular-nums">
                {subtotal.toLocaleString('en-US')} ج.م
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={buildWhatsAppLink(whatsappSummary)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFD700] hover:bg-[#F2C900] text-[#2B2300] text-sm font-extrabold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الطلب عبر واتساب</span>
              </a>
              <button
                type="button"
                onClick={onClear}
                className="px-4 py-3 rounded-full border border-[#DCE8EE] bg-white hover:bg-[#F3FAFD] text-xs font-bold text-[#526875] cursor-pointer"
              >
                مسح
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
