// داده‌های نهایی و دقیق محصولات جدید (بر مبنای واحد تومان)
const productsData = {
    1: { title: "عسل زعفرانی پت ۶۰۰ گرم کوهدشت", oldPrice: 895000, festPrice: 581750, profit: 313250 },
    2: { title: "عسل ممتاز صادراتی ۳۰۰ گرم هورتاش", oldPrice: 866880, festPrice: 520128, profit: 346752 },
    3: { title: "زیتون شور بی هسته ممتاز ۶۳۰ گرم سمیر", oldPrice: 372000, festPrice: 223200, profit: 148800 },
    4: { title: "شامپو بدن هلو و نارگیل ۷۵۰ میل آنورف", oldPrice: 429900, festPrice: 257940, profit: 171960 },
    5: { title: "ماسک مو داخل حمام ۲۰۰ میل کاتوس", oldPrice: 677280, festPrice: 440232, profit: 237048 },
    6: { title: "شنیسل ۱۰۰۰ گرم خانواده مارین", oldPrice: 925000, festPrice: 693750, profit: 231250 },
    7: { title: "کرم دست زیتون ۱۰۰ میل ویکتوریا رز", oldPrice: 426900, festPrice: 298830, profit: 128070 },
    8: { title: "شامپو حجم دهنده کراتین ۳۰۰ میل آردن", oldPrice: 299000, festPrice: 224250, profit: 74750 },
    9: { title: "بیسکویت پذیرایی با طعم توت فرنگی ۵۰۰ گرم آلویتا", oldPrice: 439500, festPrice: 285675, profit: 153825 },
    10: { title: "پک کروسان کاکائو مولتی ۶ عددی شیبا", oldPrice: 300000, festPrice: 240000, profit: 60000 }
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
