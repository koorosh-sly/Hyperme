// دیتابیس ۱۰ قلم کالای منتخب (مبالغ به تومان)
const productsPriceData = {
  1: { title: "شنیتسل مرغ خانواده ۱ کیلو آمل کاله", oldPrice: 86700, festPrice: 60690, profit: 26010 },
  2: { title: "ماست سبو همزده پرچرب ۸۰۰ گرم هراز", oldPrice: 189000, festPrice: 147400, profit: 41600 },
  3: { title: "ماست پرچرب ۹۰۰ گرم سون کاله", oldPrice: 219000, festPrice: 170820, profit: 48180 },
  4: { title: "کوردن بلو ۴۰۰ گرمی تانیس", oldPrice: 728860, festPrice: 400873, profit: 327987 },
  5: { title: "نوشیدنی هلو ۳۰۰ میلی‌لیتر رانی", oldPrice: 90000, festPrice: 58500, profit: 31500 },
  6: { title: "دستمال توالت چهارلا ۸ رول فول تایم", oldPrice: 442500, festPrice: 362850, profit: 79650 },
  7: { title: "روغن مایع کانولا ذرت ۱۳۵۰ گرم توسکا", oldPrice: 1250000, festPrice: 687500, profit: 562500 },
  8: { title: "مایع دستشویی نارگیل ۲ کیلو هندولوژی", oldPrice: 539400, festPrice: 366792, profit: 172608 },
  9: { title: "کافی میکس آمریکانو ۲۴۰ گرم کلاسنو", oldPrice: 1248000, festPrice: 624000, profit: 624000 },
  10: { title: "شامپو روزانه عصاره جو دو سر ۴۰۰ میل انلیل", oldPrice: 520000, festPrice: 260000, profit: 260000 }
};

// تبدیل اعداد به فارسی
function toPersianDigits(num) {
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => faDigits[d]);
}

// فرمت قیمت با کاما و فونت فارسی
function formatPriceFa(num) {
  const formatted = Number(Math.round(num)).toLocaleString('en-US');
  return toPersianDigits(formatted);
}

// مدیریت باز کردن مودال
function openPriceModal(id) {
  const data = productsPriceData[id];
  if (!data) return;

  document.getElementById('modalProductTitle').textContent = data.title;
  document.getElementById('priceModalBody').innerHTML = `
    <div class="modal-price-row">
      <span class="label">قیمت مصرف‌کننده:</span>
      <span class="old-price-val">${formatPriceFa(data.oldPrice)} <small>تومان</small></span>
    </div>
    <div class="modal-price-row">
      <span class="label">قیمت هایپرمی:</span>
      <span class="fest-price-val">${formatPriceFa(data.festPrice)} <small>تومان</small></span>
    </div>
    <div class="modal-profit-box">
      <span class="profit-label">🎉 سود شما:</span>
      <span class="profit-val">${formatPriceFa(data.profit)} تومان</span>
    </div>
  `;

  document.getElementById('priceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// بستن مودال
function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = 'auto';
}

// بستن با کلیک روی پس‌زمینه
function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

// بستن با دکمه Escape کیبورد
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePriceModal();
});

// ── تایمر معکوس جشنواره (پایان هفته) ──
function startCountdown() {
  // تنظیم زمان پایان (مثلاً ۳ روز دیگر یا تاریخ دلخواه)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(23, 59, 59, 0);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      const container = document.getElementById('countdown');
      if (container) container.innerHTML = '<span class="expired-msg">جشنواره به پایان رسید!</span>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    if (elDays) elDays.textContent = toPersianDigits(days < 10 ? '0' + days : days);
    if (elHours) elHours.textContent = toPersianDigits(hours < 10 ? '0' + hours : hours);
    if (elMinutes) elMinutes.textContent = toPersianDigits(minutes < 10 ? '0' + minutes : minutes);
    if (elSeconds) elSeconds.textContent = toPersianDigits(seconds < 10 ? '0' + seconds : seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

document.addEventListener('DOMContentLoaded', startCountdown);
