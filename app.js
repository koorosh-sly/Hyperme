/* ===================================================
   هایپرمی — مدیریت داده‌ها و پنجره پاپ‌آپ قیمت و سود
   =================================================== */

// دیتابیس دقیق قیمت مصرف‌کننده، قیمت جشنواره و سود حاصل از تخفیف
const productsPriceData = {
  1: { oldPrice: 859200, festPrice: 558480, profit: 300720 },  // ناگت مرغ ۲۰۲
  2: { oldPrice: 867800, festPrice: 607460, profit: 260340 },  // شنیتسل مرغ ۲۰۲
  3: { oldPrice: 1405000, festPrice: 843000, profit: 562000 }, // پنیر موزارلا جلفا
  4: { oldPrice: 279000, festPrice: 223200, profit: 55800 },   // پرو ماست کاله
  5: { oldPrice: 104000, festPrice: 67600, profit: 36400 },    // نوشابه گازدار سن‌ایچ
  6: { oldPrice: 90000, festPrice: 54000, profit: 36000 },      // پودر ژله ونزکافه
  7: { oldPrice: 210000, festPrice: 140700, profit: 69300 },   // مینی ویفر فرمند
  8: { oldPrice: 520000, festPrice: 260000, profit: 260000 },  // شامپو انلیل
  9: { oldPrice: 840000, festPrice: 420000, profit: 420000 },  // لوسیون ویکتوریا رز
  10: { oldPrice: 827400, festPrice: 620550, profit: 206850 }  //مایع لباسشویی دورتو
}


// تابع فرمت سه‌رقم سه‌رقم اعداد به فارسی
function formatPriceFa(num) {
  return Number(num).toLocaleString('fa-IR');
}

// تابع باز کردن پاپ‌آپ
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
      <span class="profit-label">🎉 سود شما:</span>
      <span class="profit-val">${formatPriceFa(data.profit)} تومان</span>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه در هنگام باز بودن پاپ‌آپ
}

// تابع بستن پاپ‌آپ
function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// بستن با کلیک روی پس‌زمینه تاریک بیرون کادر
function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

// بستن با کلید Escape کیبورد
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePriceModal();
});
