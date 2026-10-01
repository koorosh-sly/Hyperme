// داده‌های مربوط به کالاها
const productsData = {
    1: { title: "پنیر پیتزا رنده شده ۵۰۰ گرمی بسته سلفونی ۲۰۲", oldPrice: 858500, festPrice: 497930, profit: 360570 },
    2: { title: "کوردن بلو ۴۰۰ گرمی تانیس", oldPrice: 728900, festPrice: 400873, profit: 328027 },
    3: { title: "پنیر لبنه شونا ۳۰۰ گرم هراز", oldPrice: 210000, festPrice: 147000, profit: 63000 },
    4: { title: "مایع لباسشویی جنرال HD سبز ۲۰۰۰ گرمی سافتن", oldPrice: 532480, festPrice: 436552, profit: 95928 },
    5: { title: "نوشابه انرژی‌زا قوطی وورنیچ ۲۵۰ میلی‌لیتر نایت کینگ", oldPrice: 135000, festPrice: 78300, profit: 56700 },
    6: { title: "نوشیدنی انرژی‌زا ۵۰۰ میلی‌لیتر فایرپاور", oldPrice: 220000, festPrice: 132000, profit: 88000 },
    7: { title: "پودر لاته سلفونی ۲۰ ساشه ۵۸۰ گرم ونز کافه", oldPrice: 1325000, festPrice: 861250, profit: 463750 },
    8: { title: "کیسه زباله سه رول متوسط ریحانه", oldPrice: 479000, festPrice: 239500, profit: 239500 },
    9: { title: "شامپو موهای خشک عصاره انبه ۴۰۰ میلی‌لیتر انلیل", oldPrice: 520000, festPrice: 260000, profit: 260000 },
    10: { title: "لوسیون بدن آنجلو پوست نرمال ۲۵۰ میلی‌لیتر ویکتوریا رز", oldPrice: 840000, festPrice: 420000, profit: 420000 }
};

// تبدیل ارقام به فارسی
function toPersianDigits(num) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => farsiDigits[x]);
}

// فرمت سه‌رقمی قیمت‌ها
function formatPriceFa(num) {
    return toPersianDigits(num.toLocaleString('en-US'));
}

// باز کردن مودال قیمت و سود
window.openPriceModal = function(id) {
    const data = productsData[id];
    if (!data) return;

    const modalTitle = document.getElementById('modalProductTitle');
    const modalBody = document.getElementById('priceModalBody');
    const modal = document.getElementById('priceModal');

    if (modalTitle && modalBody && modal) {
        modalTitle.innerText = data.title;
        modalBody.innerHTML = `
            <div style="text-align: right; line-height: 2; font-size: 1.05rem;">
                <p class="modal-price-row">
                    <span class="label"><strong>قیمت مصرف‌کننده:</strong></span>
                    <span class="old-price-val">${formatPriceFa(data.oldPrice)} تومان</span>
                </p>
                <p class="modal-price-row">
                    <span class="label"><strong>قیمت هایپرمی:</strong></span>
                    <span class="fest-price-val">${formatPriceFa(data.festPrice)} تومان</span>
                </p>
                <div class="modal-profit-box">
                    <span class="profit-label">🎉 سود شما:</span>
                    <span class="profit-val">${formatPriceFa(data.profit)} تومان</span>
                </div>
            </div>
        `;
        modal.classList.add('active');
    }
};

// بستن مودال
window.closePriceModal = function() {
    const modal = document.getElementById('priceModal');
    if (modal) {
        modal.classList.remove('active');
    }
};

// بستن مودال با کلیک روی پس‌زمینه
window.handleBackdropClick = function(event) {
    const modal = document.getElementById('priceModal');
    if (event.target === modal) {
        window.closePriceModal();
    }
};

// تایمر معکوس تا پایان ۸ آبان (معادل ۳۰ اکتبر)
function startCountdown() {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 9, 30, 23, 59, 59).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (distance < 0) {
            const container = document.querySelector('.countdown-container');
            if (container) {
                container.innerHTML = '<span style="font-size: 1.2rem; font-weight: bold; color: #e53935;">جشنواره به پایان رسید!</span>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = toPersianDigits(days < 10 ? '0' + days : days);
        if (hoursEl) hoursEl.innerText = toPersianDigits(hours < 10 ? '0' + hours : hours);
        if (minutesEl) minutesEl.innerText = toPersianDigits(minutes < 10 ? '0' + minutes : minutes);
        if (secondsEl) secondsEl.innerText = toPersianDigits(seconds < 10 ? '0' + seconds : seconds);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// راه‌اندازی تایمر پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});
