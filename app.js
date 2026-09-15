const productsData = {
  1: { title: "پنیر خامه‌ای ۳۰۰ گرم هراز", oldPrice: 136250, newPrice: 102188, profit: 34062 },
  2: { title: "ماست دبه سبو پرچرب ۱۸۰۰ گرم هراز", oldPrice: 298500, newPrice: 223875, profit: 74625 },
  3: { title: "پنیر پیتزا رنده‌شده ۵۰۰ گرم ۲۰۲", oldPrice: 497930, newPrice: 288800, profit: 209130 },
  4: { title: "پنیر موزارلا ۲ کیلو تانیس", oldPrice: 1233256, newPrice: 739954, profit: 493302 },
  5: { title: "پک ۳+۱ خمیردندان مراقبت روزانه ۷۰۰ گرم کاپیتانو", oldPrice: 845000, newPrice: 405600, profit: 439400 },
  6: { title: "مایع دستشویی ۴۵۰ گرم آرگان پیورکر", oldPrice: 119700, newPrice: 71820, profit: 47880 },
  7: { title: "مایع ظرفشویی لیمویی سبز ۳۷۵۰ گرم تاژ", oldPrice: 549808, newPrice: 467337, profit: 82471 },
  8: { title: "مایع لباسشویی محافظت لباس‌های مشکی ۲۷۰۰ گرم اکو", oldPrice: 698400, newPrice: 558720, profit: 139680 },
  9: { title: "برنج ایرانی طارم محلی فریدونکنار ۱۰ کیلو کاویش", oldPrice: 3950000, newPrice: 3160000, profit: 790000 },
  10: { title: "نوشیدنی انرژی‌زا نایت کینگ ۲۵۰ میلی", oldPrice: 87750, newPrice: 57038, profit: 30712 }
};

function formatToman(num) {
  return new Intl.NumberFormat('fa-IR').format(Math.round(num)) + ' تومان';
}

function openPriceModal(id) {
  const item = productsData[id];
  if (!item) return;

  document.getElementById('modalProductTitle').innerText = item.title;
  document.getElementById('priceModalBody').innerHTML = `
    <div class="price-row old">
      <span>قیمت مصرف‌کننده:</span>
      <span>${formatToman(item.oldPrice)}</span>
    </div>
    <div class="price-row new">
      <span>قیمت با تخفیف:</span>
      <span>${formatToman(item.newPrice)}</span>
    </div>
    <div class="price-row profit">
      <span>سود شما از این خرید:</span>
      <span>${formatToman(item.profit)}</span>
    </div>
  `;
  document.getElementById('priceModal').style.display = 'flex';
}

function closePriceModal() {
  document.getElementById('priceModal').style.display = 'none';
}

function handleBackdropClick(e) {
  if (e.target.id === 'priceModal') closePriceModal();
}

// تاریخ پایان: ۸ آبان ۱۴۰۵
const targetDate = new Date('2026-10-30T23:59:59').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<span style="color:#22c55e;font-weight:bold;">جشنواره به پایان رسید</span>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const toPersian = (n) => new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(n);

  document.getElementById('days').innerText = toPersian(days);
  document.getElementById('hours').innerText = toPersian(hours);
  document.getElementById('minutes').innerText = toPersian(minutes);
  document.getElementById('seconds').innerText = toPersian(seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();
