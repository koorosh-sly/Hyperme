// داده‌های مربوط به کالاها
const productsData = {
    1: { title: "کیسه فریزر آسان مصرف ۲۰۰ برگی ۳۵*۲۵ پرمیس", oldPrice: 520000, festPrice: 312000, profit: 208000 },
    2: { title: "فیس واش تیوپی ۲۰۰ میل بیول (برای پوست چرب)", oldPrice: 454800, festPrice: 309264, profit: 145536 },
    3: { title: "مایع ظرفشویی ۳۵۰۰ گ لیمو پیورکر", oldPrice: 733660, festPrice: 513562, profit: 220098 },
    4: { title: "تاپینگ پیتزا پرچرب رنده شده ۲ ک کاله", oldPrice: 2590000, festPrice: 1761200, profit: 828800 },
    5: { title: "همبرگر مخصوص ۶۰% ۵۰۰ گ تاتیس", oldPrice: 427350, festPrice: 256410, profit: 170940 },
    6: { title: "پنیر پیتزارنده شده ۱۸۰g بسته سلفونی ۲۰۲", oldPrice: 329300, festPrice: 190994, profit: 138306 },
    7: { title: "پودر کاپوچینو ۲۰ عددی نایلون ۵۰۰ گرم محمود", oldPrice: 1099000, festPrice: 714350, profit: 384650 },
    8: { title: "مانی بار غلات سیب و دارچین ۲۵گ مانی", oldPrice: 75000, festPrice: 50250, profit: 24750 },
    9: { title: "روغن مایع مخلوط کانولا ذرت ۸۱۰ گرم توسکا", oldPrice: 775000, festPrice: 503750, profit: 271250 },
    10: { title: "برنج ایرانی طارم محلی فریدونکنار ۱۰ کیلو کاویش", oldPrice: 5100000, festPrice: 4233000, profit: 867000 }
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
