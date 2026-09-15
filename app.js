// داده‌های مربوط به کالاها
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

// تایمر معکوس
function startCountdown() {
    const targetDate = new Date("2024-10-30T23:59:59").getTime();

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
