// دیتابیس ۱۰ قلم کالا (تمام مبالغ به تومان)
const productsPriceData = {
  1: { title: "شنیتسل مرغ خانواده ۱ کیلو آمل کاله", oldPrice: 867000, festPrice: 606900, profit: 260100 },
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

// فرمت سه‌رقمی قیمت به فارسی
function formatPriceFa(num) {
  const formatted = Number(Math.round(num)).toLocaleString('en-US');
  return toPersianDigits(formatted);
}

// باز کردن پنجره مودال
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

// بستن پنجره مودال
function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// بستن با کلیک روی پس‌زمینه
function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

// بستن با کلید Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePriceModal();
});

// ── تایمر معکوس جشنواره تا پایان روز ۸ آبان ۱۴۰۵ ──
function startCountdown() {
  const targetDate = new Date(2026, 9, 29, 23, 59, 59).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
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

// ── افکت پرواز بادکنک‌های براق کرومی (Chrome Balloons) ──
function launchChromeBalloons() {
  const container = document.createElement('div');
  container.className = 'balloon-container';
  document.body.appendChild(container);

  const colors = ['gold', 'blue', 'orange', 'green', 'pink', 'purple'];
  const totalBalloons = 22; // تعداد بهینه برای روانی و زیبایی حداکثری

  for (let i = 0; i < totalBalloons; i++) {
    const balloon = document.createElement('div');
    const color = colors[i % colors.length];
    balloon.className = `balloon balloon--${color}`;

    // موقعیت تصادفی افقی
    const leftPercent = Math.random() * 90 + 5;
    // اندازه بادکنک (۴۶ تا ۶۶ پیکسل)
    const size = Math.floor(Math.random() * 20) + 46;
    // سرعت حرکت (۴.۲ تا ۶.۲ ثانیه)
    const duration = (Math.random() * 2 + 4.2).toFixed(2);
    // تاخیر ورود برای پخش شدن یکنواخت
    const delay = (Math.random() * 1.6).toFixed(2);
    // چرخش تصادفی ملایم
    const rotation = (Math.random() * 16 - 8) + 'deg';

    balloon.style.left = `${leftPercent}%`;
    balloon.style.setProperty('--b-size', `${size}px`);
    balloon.style.setProperty('--b-dur', `${duration}s`);
    balloon.style.setProperty('--b-rot', rotation);
    balloon.style.animationDelay = `${delay}s`;

    container.appendChild(balloon);
  }

  // حذف المان پس از اتمام برای آزاد شدن کامل حافظه
  setTimeout(() => {
    container.remove();
  }, 7000);
}

// راه‌اندازی پس از لود کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setTimeout(launchChromeBalloons, 250);
});
