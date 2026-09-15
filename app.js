const productsPriceData = {
  1: { title: "پنیر خامه‌ای ۳۰۰ گرم هراز", oldPrice: 195000, festPrice: 136250, profit: 58750 },
  2: { title: "ماست دبه سبو پرچرب ۱۸۰۰ گرم هراز", oldPrice: 398000, festPrice: 298500, profit: 99500 },
  3: { title: "پنیر پیتزا رنده‌شده ۵۰۰ گرم ۲۰۲", oldPrice: 858500, festPrice: 497930, profit: 360570 },
  4: { title: "پنیر موزارلا ۲ کیلو تانیس", oldPrice: 2055760, festPrice: 1233256, profit: 822504 },
  5: { title: "پک ۳+۱ خمیردندان مراقبت روزانه ۷۰۰ گرم کاپیتانو", oldPrice: 1300000, festPrice: 845000, profit: 455000 },
  6: { title: "مایع دستشویی ۴۵۰ گرم آرگان پیورکر", oldPrice: 199500, festPrice: 119700, profit: 79800 },
  7: { title: "مایع ظرفشویی لیمویی سبز ۳۷۵۰ گرم تاژ", oldPrice: 626833, festPrice: 549808, profit: 77025 },
  8: { title: "مایع لباسشویی محافظت لباس‌های مشکی ۲۷۰۰ گرم امو", oldPrice: 873000, festPrice: 698400, profit: 174600 },
  9: { title: "برنج ایرانی طارم محلی فریدونکنار ۱۰ کیلو کاویش", oldPrice: 4960000, festPrice: 3950000, profit: 1010000 },
  10: { title: "نوشیدنی انرژی‌زا نایت کینگ ۲۵۰ میلی", oldPrice: 135000, festPrice: 87750, profit: 47250 }
};

function toPersianDigits(num) {
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => faDigits[d]);
}

function formatPriceFa(num) {
  const formatted = Number(Math.round(num)).toLocaleString('en-US');
  return toPersianDigits(formatted);
}

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

function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePriceModal();
});

// تایمر معکوس تا ساعت ۲۳:۵۹:۵۹ روز ۸ آبان
function startCountdown() {
  const targetDate = new Date(2026, 9, 30, 23, 59, 59).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      const container = document.getElementById('countdown');
      if (container) {
        container.innerHTML = '<span class="expired-msg">جشنواره به پایان رسید!</span>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
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

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});
