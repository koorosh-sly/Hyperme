// ==============================
// داده‌های محصولات و قیمت‌ها
// ==============================
const productsData = {
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

// تابع تبدیل اعداد انگلیسی به فارسی
function toPersianDigits(num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

// فرمت سه‌رقم‌سه‌رقم قیمت به همراه ارقام فارسی
function formatPriceFa(num) {
  const formatted = Math.round(num).toLocaleString('en-US');
  return toPersianDigits(formatted);
}

// ==============================
// مدیریت مودال نمایش قیمت
// ==============================
function openPriceModal(id) {
  const data = productsData[id];
  if (!data) return;

  const modal = document.getElementById('priceModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
    <h3 style="margin-bottom: 1rem; color: #222; font-size: 1.1rem;">${data.title}</h3>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
      <div style="margin-bottom: 0.5rem; color: #777;">
        قیمت مصرف‌کننده: <del>${formatPriceFa(data.oldPrice)} تومان</del>
      </div>
      <div style="margin-bottom: 0.5rem; color: #e53935; font-weight: bold; font-size: 1.15rem;">
        قیمت هایپرمی: ${formatPriceFa(data.festPrice)} تومان
      </div>
      <div style="color: #2e7d32; font-weight: bold;">
        🎉 سود شما: ${formatPriceFa(data.profit)} تومان
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closePriceModal() {
  const modal = document.getElementById('priceModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleBackdropClick(event) {
  if (event.target.id === 'priceModal') {
    closePriceModal();
  }
}

// ==============================
// تایمر شمارش معکوس جشنواره
// ==============================
function startCountdown() {
  // تاریخ پایان جشنواره (می‌توانید به تاریخ مد نظرتان تغییر دهید)
  // مثال: 2026-10-30 یا تاریخ جاری جشنواره
  const targetDate = new Date("2026-10-30T23:59:59").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const container = document.getElementById("countdownTimer");

    if (distance < 0) {
      if (container) {
        container.innerHTML = '<div style="font-size:1.2rem; font-weight:bold; color:#e53935; text-align:center;">جشنواره به پایان رسید!</div>';
      }
      return;
    }

    // محاسبات ریاضی روز، ساعت، دقیقه و ثانیه:
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // ✅ اصلاح کلیدی: باقی‌مانده ساعت تقسیم بر یک دقیقه
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // باقی‌مانده دقیقه تقسیم بر یک ثانیه
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = toPersianDigits(days < 10 ? '0' + days : days);
    if (hoursEl) hoursEl.innerText = toPersianDigits(hours < 10 ? '0' + hours : hours);
    if (minutesEl) minutesEl.innerText = toPersianDigits(minutes < 10 ? '0' + minutes : minutes);
    if (secondsEl) secondsEl.innerText = toPersianDigits(seconds < 10 ? '0' + seconds : seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// اجرای تایمر پس از بارگذاری DOM
document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
});
