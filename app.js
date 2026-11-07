// داده‌های نهایی و دقیق محصولات جدید (بر مبنای واحد تومان)
const productsData = {
    1: { title: "کافی میکس ریچ ۲۰×۱۸ گرم کلاسنو", oldPrice: 948000, festPrice: 521300, profit: 426700 },
    2: { title: "روغن ترکیبی ذرت ۱/۵ لیتری سلانترو", oldPrice: 2095000, festPrice: 1257000, profit: 838000 },
    3: { title: "شامپو ۷۵۰ میل آنورف", oldPrice: 429900, festPrice: 257940, profit: 171960 },
    4: { title: "روغن مایع سرخ‌کردنی کنجد، کانولا، ذرت ۱/۸ لیتری داتیس", oldPrice: 2555200, festPrice: 1788640, profit: 766560 },
    5: { title: "مایع لباسشویی ژل ۲۷۰۰ گرم پرسیل", oldPrice: 1053728, festPrice: 842982, profit: 210746 },
    6: { title: "کاپوچینو ۲۰×۲۵ گرم ترابیکا", oldPrice: 1250000, festPrice: 875000, profit: 375000 },
    7: { title: "چای ایرانی ۴۵۰ گرمی مهماندوست", oldPrice: 575000, festPrice: 402500, profit: 172500 },
    8: { title: "روغن زیتون بکر ۵۰۰ سی‌سی بروج", oldPrice: 1270000, festPrice: 952500, profit: 317500 },
    9: { title: "دال عدس ۹۰۰ گرم سبلان", oldPrice: 399900, festPrice: 319920, profit: 79980 },
    10: { title: "لوبیا چیتی ۹۰۰ گرم سبلان", oldPrice: 589900, festPrice: 501491, profit: 88409 }
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
