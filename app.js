const products = [
  {
    name: "عسل کوهستان",
    price: "120,000",
    image: "https://via.placeholder.com/150",
    description: "عسل طبیعی و خالص از کوهستان"
  },
  {
    name: "باتری قلمی",
    price: "25,000",
    image: "https://via.placeholder.com/150",
    description: "باتری قلمی با کیفیت بالا"
  }
];

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <span class="price">${p.price} تومان</span>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderProducts);
