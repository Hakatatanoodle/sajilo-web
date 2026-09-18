const products = [
  { id: 1, n: "Motichoor Ladoo", c: "sweets", p: 45, d: "Soft, golden and freshly made.", img: "imgs/motichoor_ladoo.jpg", w: 1 },
  { id: 2, n: "Rasgulla", c: "sweets", p: 35, d: "Light, juicy and syrupy.", img: "imgs/rasgulla.jpg", w: 1 },
  { id: 3, n: "Kaju Barfi", c: "sweets", p: 75, d: "Rich cashew fudge.", img: "imgs/kaju_barfi.jpg", w: 1 },
  { id: 4, n: "Jalebi", c: "sweets", p: 30, d: "Crispy spirals in sweet syrup.", img: "imgs/jalebi.jpg", w: 1 },
  { id: 5, n: "Gulab Jamun", c: "sweets", p: 40, d: "Soft and fragrant.", img: "imgs/gulab_jamun.jpg", w: 1 },
  { id: 6, n: "Samosa", c: "snacks", p: 30, d: "Crisp pastry with spiced filling.", img: "imgs/samosa.jpg", w: 0 },
  { id: 7, n: "Aloo Chop", c: "snacks", p: 35, d: "Golden potato snack.", img: "imgs/aaloo_chop.jpg", w: 0 },
  { id: 8, n: "Mixed Namkeen", c: "namkeen", p: 220, d: "Crunchy savoury mix.", img: "imgs/mixed_namkeen.jpg", w: 1 },
  { id: 9, n: "Masala Tea", c: "drinks", p: 45, d: "Hot and aromatic.", img: "imgs/masala_tea.jpg", w: 0 },
  { id: 10, n: "Lassi", c: "drinks", p: 90, d: "Creamy chilled lassi.", img: "imgs/lassi.jpg", w: 0 },
];

const $ = (s) => document.querySelector(s);
const money = (n) => "Rs. " + n.toLocaleString("en-IN");

function loadCart() {
  try {
    const raw = localStorage.getItem("sajiloCart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && x.label !== "Dashain Sweet Box");
  } catch {
    return [];
  }
}

let cart = loadCart();

function save() {
  try {
    localStorage.setItem("sajiloCart", JSON.stringify(cart));
  } catch {
    /* sandboxed iframe / private mode — cart still works in memory */
  }
  drawCart();
}

function render(cat = "all") {
  const list = cat === "all" ? products : products.filter((p) => p.c === cat);
  const root = $("#products");
  root.replaceChildren();
  for (const p of list) {
    const article = document.createElement("article");
    article.className = "product";

    const pic = document.createElement("div");
    pic.className = "pic";
    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.n;
    img.loading = "lazy";
    pic.appendChild(img);

    const body = document.createElement("div");
    body.className = "body";
    const h3 = document.createElement("h3");
    h3.textContent = p.n;
    const desc = document.createElement("p");
    desc.textContent = p.d;
    body.append(h3, desc);

    if (p.w) {
      const select = document.createElement("select");
      select.className = "weight";
      select.id = "w" + p.id;
      const opts = [
        [1, `1 piece • ${money(p.p)}`],
        [5, `250g approx. • ${money(Math.round(p.p * 5 * 0.9))}`],
        [10, `500g approx. • ${money(Math.round(p.p * 10 * 0.9))}`],
        [20, `1kg approx. • ${money(Math.round(p.p * 20 * 0.85))}`],
      ];
      for (const [value, label] of opts) {
        const option = document.createElement("option");
        option.value = String(value);
        option.textContent = label;
        select.appendChild(option);
      }
      body.appendChild(select);
    }

    const price = document.createElement("div");
    price.className = "price";
    const priceInfo = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = money(p.p);
    const small = document.createElement("small");
    small.textContent = "per piece";
    priceInfo.append(strong, small);
    const addBtn = document.createElement("button");
    addBtn.className = "add";
    addBtn.type = "button";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", () => add(p.id));
    price.append(priceInfo, addBtn);
    body.appendChild(price);

    article.append(pic, body);
    root.appendChild(article);
  }
}

function add(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  let q = 1;
  let label = "1 piece";
  if (p.w) {
    const s = $("#w" + id);
    q = Number(s.value);
    label = s.options[s.selectedIndex].text.split(" • ")[0];
  }
  const unit = Math.round(p.p * q * (q >= 20 ? 0.85 : q >= 5 ? 0.9 : 1));
  const existing = cart.find((x) => x.id === id && x.q === q);
  if (existing) existing.n++;
  else cart.push({ id, q, n: 1, label, unit });
  save();
  toast(p.n + " added to your order");
}

function drawCart() {
  $("#count").textContent = cart.reduce((a, x) => a + x.n, 0);
  const items = $("#cartItems");
  items.replaceChildren();
  if (!cart.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.append("Your order is empty.", document.createElement("br"), "Add some fresh sweets 🍬");
    items.appendChild(empty);
    $("#subtotal").textContent = "Rs. 0";
    return;
  }
  cart.forEach((x, i) => {
    const p = products.find((y) => y.id === x.id);
    const nm = p ? p.n : x.name;
    const row = document.createElement("div");
    row.className = "cartitem";
    const left = document.createElement("div");
    const b = document.createElement("b");
    b.textContent = nm;
    const small = document.createElement("small");
    small.textContent = x.label;
    left.append(b, document.createElement("br"), small);
    const right = document.createElement("div");
    const cost = document.createElement("b");
    cost.textContent = money(x.unit * x.n);
    const qty = document.createElement("div");
    qty.className = "qty";
    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.addEventListener("click", () => change(i, -1));
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.addEventListener("click", () => change(i, 1));
    qty.append(minus, String(x.n), plus);
    right.append(cost, qty);
    row.append(left, right);
    items.appendChild(row);
  });
  $("#subtotal").textContent = money(cart.reduce((a, x) => a + x.unit * x.n, 0));
}

function change(i, d) {
  cart[i].n += d;
  if (cart[i].n <= 0) cart.splice(i, 1);
  save();
}

function toast(t) {
  $("#toast").textContent = t;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 1700);
}

function openCart() {
  $("#drawer").classList.add("open");
  $("#shade").style.display = "block";
}
function closeCart() {
  $("#drawer").classList.remove("open");
  $("#shade").style.display = "none";
}

window.addBox = function addBox(kind) {
  const b =
    kind === "tihar"
      ? { name: "Tihar Sweet Gift Box", unit: 1299 }
      : { name: "Dashain Mithai Gift Box", unit: 1499 };
  cart.push({ id: "box-" + kind, q: 1, n: 1, label: "Festive gift box", unit: b.unit, name: b.name });
  save();
  openCart();
  toast(b.name + " added to your order");
};

render();
drawCart();

$("#filters").onclick = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#filters button").forEach((x) => x.classList.remove("selected"));
  e.target.classList.add("selected");
  render(e.target.dataset.cat);
};
$("#cartBtn").onclick = openCart;
$("#closeCart").onclick = closeCart;
$("#shade").onclick = closeCart;
$("#hamb").onclick = () => $("#nav").classList.toggle("open");
$("#checkout").onclick = () => {
  if (!cart.length) return toast("Your order is empty");
  $("#orderModal").classList.add("show");
  closeCart();
};
$("#reviewBtn").onclick = () => $("#reviewModal").classList.add("show");
document.querySelectorAll("[data-close]").forEach((x) => {
  x.onclick = () => $("#" + x.dataset.close).classList.remove("show");
});

$("#reviewForm").onsubmit = (e) => {
  e.preventDefault();
  const n = $("#rname").value.trim();
  const t = $("#rtext").value.trim();
  if (!n || !t) return;
  const initials = n
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const article = document.createElement("article");
  const stars = document.createElement("div");
  stars.className = "stars";
  stars.textContent = "★★★★★";
  const quote = document.createElement("p");
  quote.textContent = "“" + t + "”";
  const footer = document.createElement("footer");
  const badge = document.createElement("b");
  badge.textContent = initials;
  const meta = document.createElement("span");
  const strong = document.createElement("strong");
  strong.textContent = n;
  const small = document.createElement("small");
  small.textContent = "New visitor review";
  meta.append(strong, small);
  footer.append(badge, meta);
  article.append(stars, quote, footer);
  $("#reviewsList").prepend(article);

  $("#reviewModal").classList.remove("show");
  e.target.reset();
  toast("Thanks — review stays on this page only.");
};

$("#orderForm").onsubmit = (e) => {
  e.preventDefault();
  cart = [];
  save();
  $("#orderModal").classList.remove("show");
  toast("Demo only — nothing was sent or charged.");
  e.target.reset();
};

document.querySelectorAll(".nav a").forEach((a) => {
  a.onclick = () => $("#nav").classList.remove("open");
});
