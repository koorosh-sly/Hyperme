const products = [
  {
    category: "عسل طبیعی",
    items: [
      { name: "عسل چهل گیاه ۵۰۰ گرم", price: 320000 },
      { name: "عسل آویشن ۵۰۰ گرم", price: 380000 },
      { name: "عسل سدر ۵۰۰ گرم", price: 450000 },
    ]
  },
  {
    category: "باتری و لوازم برقی",
    items: [
      { name: "باتری قلمی دوتایی", price: 45000 },
      { name: "باتری نیم‌قلمی دوتایی", price: 45000 },
      { name: "باتری کتابی ۹ ولت", price: 65000 },
    ]
  }
];

const container = document.getElementById("menu-container");

if (container) {
  container.innerHTML = "";

  products.forEach(category => {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category.category;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "product-grid";

    category.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <span class="product-name">${item.name}</span>
        <span class="product-price">${item.price.toLocaleString("fa-IR")} تومان</span>
      `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}
