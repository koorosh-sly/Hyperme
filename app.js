// دیتابیس ۱۰ قلم کالای جدید جشنواره (تمام مبالغ به تومان)
const productsPriceData = {
  1: { title: "پنیر خامه‌ای ۳۰۰ گرم هراز", oldPrice: 195000, festPrice: 136250, profit: 58750 },
  2: { title: "ماست دبه سبو پرچرب ۱۸۰۰ گرم هراز", oldPrice: 398000, festPrice: 298500, profit: 99500 },
  3: { title: "پنیر پیتزا رنده‌شده ۵۰۰ گرم ۲۰۲", oldPrice: 858500, festPrice: 497930, profit: 360570 },
  4: { title: "پنیر موزارلا ۲ کیلو تانیس", oldPrice: 2055760, festPrice: 1233256, profit: 822504 },
  5: { title: "پک ۳+۱ خمیردندان مراقبت روزانه ۷۰۰ گرم کاپیتانو", oldPrice: 1300000, festPrice: 845000, profit: 455000 },
  6: { title: "مایع دستشویی ۴۵۰ گرم آرگان پیورکر", oldPrice: 199500, festPrice: 119700, profit: 79800 },
  7: { title: "مایع ظرفشویی لیمویی سبز ۳۷۵۰ گرم تاژ", oldPrice: 626833, festPrice: 549808, profit: 77025 },
  8: { title: "مایع لباسشویی محافظت لباس‌های مشکی ۲۷۰۰ گرم اکو", oldPrice: 873000, festPrice: 698400, profit: 174600 },
  9: { title: "برنج ایرانی طارم محلی فریدونکنار ۱۰ کیلو کاویش", oldPrice: 4960000, festPrice: 3950000, profit: 1010000 },
  10: { title: "نوشیدنی انرژی‌زا نایت کینگ ۲۵۰ میلی", oldPrice: 135000, festPrice: 87750, profit: 47250 }
};

// تبدیل اعداد انگلیسی به فارسی
function toPersianDigits(num) {
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => faDigits[d]);
}

// فرمت سه‌رقمی قیمت به فارسی
function formatPriceFa(num) {
  const formatted = Number(Math.round(num)).toLocaleString('en-US');
  return toPersianDigits(formatted);
}

// باز کردن پنجره مودال قیمت و سود
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

// ── تایمر معکوس جشنواره تا پایان روز ۸ آبان ۱۴۰۵ (۲۹ اکتبر ۲۰۲۶، ساعت ۲۳:۵۹:۵۹) ──
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
    const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % 1000) / 1000);

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

// ── افکت انفجار ستاره‌های درخشان در بدو ورود و محو کامل از حافظه پس از ۳ ثانیه ──
function launchBurstStars() {
  const container = document.createElement('div');
  container.className = 'stars-burst-container';
  document.body.appendChild(container);

  const starTypes = ['gold', 'cyan', 'white', 'purple'];
  const totalStars = 35;

  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement('div');
    const type = starTypes[Math.floor(Math.random() * starTypes.length)];
    star.className = `burst-star star--${type}`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.floor(Math.random() * 250 + 60);
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    const size = Math.floor(Math.random() * 12) + 12;
    const duration = (Math.random() * 0.8 + 1.4).toFixed(2);
    const delay = (Math.random() * 0.3).toFixed(2);

    star.style.setProperty('--tx', `${tx}px`);
    star.style.setProperty('--ty', `${ty}px`);
    star.style.setProperty('--star-size', `${size}px`);
    star.style.left = `calc(50% + ${Math.random() * 40 - 20}px)`;
    star.style.top = `calc(35% + ${Math.random() * 40 - 20}px)`;
    star.style.animation = `star-burst ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s forwards`;

    container.appendChild(star);
  }

  // آزادسازی کامل رم و پردازنده بعد از ۳ ثانیه
  setTimeout(() => {
    container.remove();
  }, 3000);
}

// راه‌اندازی با بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  launchBurstStars();
});
