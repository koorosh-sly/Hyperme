// داده‌های مربوط به کالاها (اصلاح شده به تومان)
const productsData = {
    1: { title: "پنیر پیتزا رنده شده ۲۰۰۰ گرمی تانیس", oldPrice: 2134690, festPrice: 1280814, profit: 853876 },
    2: { title: "نان سیر ۲ عددی متوسط ۴۲۰ گرم پمینا", oldPrice: 398800, festPrice: 239280, profit: 159520 },
    3: { title: "شنیسل مرغ خانواده ۱۰۰۰ گرم آمل", oldPrice: 867000, festPrice: 520200, profit: 346800 },
    4: { title: "کیسه فریزر تجزیه‌پذیر ۱۰۰ عددی چسبدار پتروکلین", oldPrice: 390000, festPrice: 195000, profit: 195000 },
    5: { title: "نوشیدنی انرژی‌زا ۵۰۰ میلی‌لیتر فایرپاور", oldPrice: 220000, festPrice: 132000, profit: 88000 },
    6: { title: "کافی میکس ریچ ۲۰ ساشه KLASSNO", oldPrice: 948000, festPrice: 474000, profit: 474000 }
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

// تایمر معکوس تا پایان ۸ آبان
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
