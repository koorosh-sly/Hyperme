// اطلاعات کالاها
const productsPriceData = {
  1: {
    title: "پنیر خامه‌ای ۳۰۰ گرم هراز",
    oldPrice: 195000,
    festPrice: 136250,
    profit: 58750
  },

  2: {
    title: "ماست دبه سبو پرچرب ۱۸۰۰ گرم هراز",
    oldPrice: 398000,
    festPrice: 298500,
    profit: 99500
  },

  3: {
    title: "پنیر پیتزا رنده‌شده ۵۰۰ گرم ۲۰۲",
    oldPrice: 858500,
    festPrice: 497930,
    profit: 360570
  },

  4: {
    title: "پنیر موزارلا ۲ کیلو تانیس",
    oldPrice: 2055760,
    festPrice: 1233256,
    profit: 822504
  },

  5: {
    title: "پک ۳+۱ خمیردندان مراقبت روزانه ۷۰۰ گرم کاپیتانو",
    old845: 1300000,
    festPrice: 845000,
    profit: 455000
  },

  6: {
    title: "مایع دستشویی ۴۵۰ گرم آرگان پیورکر",
    oldPrice: 199500,
    festPrice: 119700,
    profit: 79800
  },

  7: {
    title: "مایع ظرفشویی لیمویی سبز ۳۷۵۰ گرم تاژ",
    oldPrice: 626833,
    festPrice: 549808,
    profit: 77025
  },

  8: {
    title: "مایع لباسشویی محافظت لباس‌های مشکی ۲۷۰۰ گرم اکو",
    oldPrice: 873000,
    festPrice: 698400,
    profit: 174600
  },

  9: {
    title: "برنج ایرانی طارم محلی فریدونکنار ۱۰ کیلو کاویش",
    oldPrice: 4960000,
    festPrice: 3950000,
    profit: 1010000
  },

  10: {
    title: "نوشیدنی انرژی‌زا نایت کینگ ۲۵۰ میلی",
    oldPrice: 135000,
    festPrice: 87750,
    profit: 47250
  }
};


// تبدیل اعداد انگلیسی به فارسی
function toPersianDigits(value) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return String(value).replace(/\d/g, function (digit) {
    return persianDigits[digit];
  });
}


// قالب‌بندی قیمت
function formatPriceFa(value) {
  const formattedValue = Math.round(Number(value))
    .toLocaleString("en-US");

  return toPersianDigits(formattedValue);
}


// باز کردن پنجره قیمت و سود
function openPriceModal(id) {
  const product = productsPriceData[id];

  if (!product) {
    return;
  }

  const modal = document.getElementById("priceModal");
  const modalTitle = document.getElementById("modalProductTitle");
  const modalBody = document.getElementById("priceModalBody");

  if (!modal || !modalTitle || !modalBody) {
    return;
  }

  modalTitle.textContent = product.title;

  modalBody.innerHTML = `
    <div class="modal-price-row">
      <span class="label">قیمت مصرف‌کننده:</span>
      <span class="old-price-val">
        ${formatPriceFa(product.oldPrice)}
        <small>تومان</smallتومان</small>
      </span>
    </div>

    <-price-row">
      <span class="label">قیمت هایپرمی:</span>
      <span class="fest-price-val">
        ${formatPriceFa(product.festPrice)}
        <small>تومان</small>
      </span>
    </div>

    <div class="modal-profit-box">
      <span class="profit-label">🎉 سود شما:</span>
      <span class="profit-val">
        ${formatPriceFa(product.profit)} تومان
      </span>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}


// بستن پنجره قیمت و سود
function closePriceModal() {
  const modal = document.getElementById("priceModal");

  if (modal) {
    modal.classList.remove("active");
  }

  document.body.style.overflow = "";
}


// بستن پنجره با کلیک روی پس‌زمینه
function handleBackdropClick(event) {
  if (event.target && event.target.id === "priceModal") {
    closePriceModal();
  }
}


// بستن پنجره با کلید Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePriceModal();
  }
});


// افزودن صفر به ابتدای اعداد
function formatTimeUnit(value) {
  return toPersianDigits(
    String(value).padStart(2, "0")
  );
}


// شروع تایمر
function startCountdown() {
  const countdown = document.getElementById("countdown");

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (
    !countdown ||
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    console.error("عناصر روزشمار در index.html پیدا نشدند.");
    return;
  }


  /*
    پایان جشنواره:
    ۸ آبان ۱۴۰۵، ساعت ۲۳:۵۹:۵۹ به وقت ایران

    تاریخ معادل میلادی:
    ۳۰ اکتبر ۲۰۲۶

    +03:30 یعنی ساعت رسمی ایران.
  */

  const targetDate = new Date(
    "2026-10-30T23:59:59+03:30"
  ).getTime();


  function updateTimer() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdown.innerHTML = `
        <span class="expired-msg">
          جشنواره به پایان رسید!
        </span>
      `;

      clearInterval(timerInterval);
      return;
    }


    const totalSeconds = Math.floor(distance / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
      (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;


    daysElement.textContent = formatTimeUnit(days);
    hoursElement.textContent = formatTimeUnit(hours);
    minutesElement.textContent = formatTimeUnit(minutes);
    secondsElement.textContent = formatTimeUnit(seconds);
  }


  // نمایش فوری بدون صبر یک ثانیه
  updateTimer();


  // به‌روزرسانی هر یک ثانیه
  const timerInterval = setInterval(
    updateTimer,
    1000
  );
}


// اجرای کد بعد از آماده‌شدن صفحه
document.addEventListener(
  "DOMContentLoaded",
  function () {
    startCountdown();
  }
);
