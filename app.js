/* ===================================================
   هایپرمی (شعبه اکباتان) — دیتابیس قیمت‌ها و مدیریت مودال
   =================================================== */

// دیتابیس دقیق قیمت‌های ۱۰ قلم کالای منتخب جشنواره (مبالغ به تومان)
const productsPriceData = {
  1: { oldPrice: 86700, festPrice: 60690, profit: 26010 },     // شنیتسل مرغ آمل کاله
  2: { oldPrice: 189000, festPrice: 147400, profit: 41600 },   // ماست سبو هراز
  3: { oldPrice: 219000, festPrice: 170820, profit: 48180 },   // ماست سون کاله
  4: { oldPrice: 728860, festPrice: 400873, profit: 327987 },  // کوردن بلو تانیس
  5: { oldPrice: 90000, festPrice: 58500, profit: 31500 },     // نوشیدنی رانی هلو
  6: { oldPrice: 442500, festPrice: 362850, profit: 79650 },   // دستمال فول‌تایم
  7: { oldPrice: 1250000, festPrice: 687500, profit: 562500 }, // روغن ذرت کانولا توسکا
  8: { oldPrice: 539400, festPrice: 366792, profit: 172608 },  // مایع دستشویی هندولوژی
  9: { oldPrice: 1248000, festPrice: 624000, profit: 624000 }, // کافی میکس کلاسنو
  10: { oldPrice: 520000, festPrice: 260000, profit: 260000 }  // شامپو جو دوسر انلیل
};

// تبدیل اعداد انگلیسی به فارسی و فرمت‌بندی سه رقم سه رقم
function formatPriceFa(num) {
  return Number(Math.round(num)).toLocaleString('fa-IR');
}

// تابع باز کردن پاپ‌آپ قیمت و سود
function openPriceModal(id) {
  const data = productsPriceData[id];
  if (!data) return;

  const modal = document.getElementById('priceModal');
  const modalBody = document.getElementById('priceModalBody');

  modalBody.innerHTML = `
    <div class="modal-price-row">
      <span class="label">قیمت مصرف‌کننده:</span>
      <span class="old-price-val">${formatPriceFa(data.oldPrice)} <small>تومان</small></span>
    </div>

    <div class="modal-price-row">
      <span class="label">قیمت در هایپرمی:</span>
      <span class="fest-price-val">${formatPriceFa(data.festPrice)} <small>تومان</small></span>
    </div>

    <div class="modal-profit-box">
      <span class="profit-label">🎉 سود شما از خرید:</span>
      <span class="profit-val">${formatPriceFa(data.profit)} تومان</span>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// تابع بستن پاپ‌آپ
function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// بستن مودال با کلیک روی پس‌زمینه
function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

// بستن مودال با کلید Esc کیبورد
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePriceModal();
});
