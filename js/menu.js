/**
 * menu.js — Grid menu & modal detail
 * Dependensi: data.js (MENU_DATA), utils.js (showToast)
 * Semua styling via Tailwind classes, bukan CSS class kustom
 */

var modalMenuKey = null;
var modalContext = null;

function renderMenuGrid(grid, ctx, tab) {
  grid.innerHTML = '';
  var cart = ctx === 'res' ? resCart : dineCart;

  MENU_DATA[tab].forEach(function (item, i) {
    var key = tab + '_' + i;
    var qty = cart[key] ? cart[key].qty : 0;
    var inCart = qty > 0;

    var card = document.createElement('div');
    // Base classes + conditional border/bg via Tailwind
    card.id = 'mcard-' + ctx + '-' + key;
    card.className = 'border-[1.5px] rounded-xl overflow-hidden transition-all duration-200 ' +
      (inCart
        ? 'border-gold bg-gold/[0.04]'
        : 'border-coffee/[0.08] bg-[#FDFBF7] hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_24px_rgba(59,35,20,0.08)]');

    card.innerHTML =
      '<img src="' + item.img + '" alt="' + item.name + '" class="w-full object-cover block cursor-pointer" style="height:135px" loading="lazy" onclick="openMenuModal(\'' + key + '\',\'' + tab + '\',' + i + ',\'' + ctx + '\')">' +
      '<div class="p-4">' +
        '<div class="font-semibold text-sm text-coffee mb-0.5 cursor-pointer hover:text-gold transition-colors" onclick="openMenuModal(\'' + key + '\',\'' + tab + '\',' + i + ',\'' + ctx + '\')">' + item.name + '</div>' +
        '<div class="text-xs text-latte/80 leading-snug mb-3">' + item.desc.substring(0, 68) + '…</div>' +
        '<div class="flex justify-between items-center">' +
          '<span class="text-gold font-bold text-sm">Rp ' + item.price.toLocaleString('id-ID') + '</span>' +
          '<button onclick="openMenuModal(\'' + key + '\',\'' + tab + '\',' + i + ',\'' + ctx + '\')" class="text-[0.65rem] tracking-wide uppercase text-latte border border-coffee/10 px-2.5 py-1 rounded-md cursor-pointer bg-transparent hover:border-gold hover:text-gold transition-colors">Detail</button>' +
        '</div>' +
        '<div class="flex items-center gap-2 mt-3">' +
          '<button onclick="event.stopPropagation();changeQty(\'' + key + '\',\'' + tab + '\',' + i + ',-1,\'' + ctx + '\')" class="w-7 h-7 border border-coffee/10 bg-bar rounded-md cursor-pointer text-sm flex items-center justify-center text-coffee hover:bg-gold hover:text-white hover:border-gold transition-colors">−</button>' +
          '<span id="qty-' + ctx + '-' + key + '" class="text-sm font-bold text-coffee min-w-[1.25rem] text-center">' + qty + '</span>' +
          '<button onclick="event.stopPropagation();changeQty(\'' + key + '\',\'' + tab + '\',' + i + ',1,\'' + ctx + '\')" class="w-7 h-7 border border-coffee/10 bg-bar rounded-md cursor-pointer text-sm flex items-center justify-center text-coffee hover:bg-gold hover:text-white hover:border-gold transition-colors">+</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}

function updateCardStyle(ctx, key, inCart) {
  var card = document.getElementById('mcard-' + ctx + '-' + key);
  if (!card) return;
  // Hapus semua state dulu
  card.classList.remove('border-gold', 'bg-gold/[0.04]', 'border-coffee/[0.08]', 'bg-[#FDFBF7]', 'hover:-translate-y-0.5', 'hover:border-gold/50', 'hover:shadow-[0_8px_24px_rgba(59,35,20,0.08)]');
  if (inCart) {
    card.classList.add('border-gold', 'bg-gold/[0.04]');
  } else {
    card.classList.add('border-coffee/[0.08]', 'bg-[#FDFBF7]', 'hover:-translate-y-0.5', 'hover:border-gold/50', 'hover:shadow-[0_8px_24px_rgba(59,35,20,0.08)]');
  }
}

function openMenuModal(key, tab, idx, ctx) {
  var item = MENU_DATA[tab][idx];
  modalMenuKey = key;
  modalContext = ctx;
  document.getElementById('modal-img').src = item.img;
  document.getElementById('modal-img').alt = item.name;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-price').textContent = 'Rp ' + item.price.toLocaleString('id-ID');
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-history').textContent = item.history;
  document.getElementById('modal-ingredients').innerHTML =
    item.ingredients.map(function (ing) { return '<span class="inline-block px-2.5 py-0.5 rounded-full text-[0.68rem] bg-sage/10 text-sage font-medium">' + ing + '</span>'; }).join('');

  var modal = document.getElementById('menu-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeMenuModal(e) {
  if (e.target === document.getElementById('menu-modal')) {
    var modal = document.getElementById('menu-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function addFromModal() {
  if (!modalMenuKey || !modalContext) return;
  var parts = modalMenuKey.split('_');
  changeQty(modalMenuKey, parts[0], parseInt(parts[1]), 1, modalContext);
  var modal = document.getElementById('menu-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  showToast(MENU_DATA[parts[0]][parseInt(parts[1])].name + ' ditambahkan', 'success');
}

function changeQty(key, tab, idx, delta, ctx) {
  var cart = ctx === 'res' ? resCart : dineCart;
  var item = MENU_DATA[tab][idx];
  if (!cart[key]) cart[key] = { name: item.name, price: item.price, qty: 0 };
  cart[key].qty = Math.max(0, cart[key].qty + delta);
  if (cart[key].qty === 0) delete cart[key];

  var qtyEl = document.getElementById('qty-' + ctx + '-' + key);
  if (qtyEl) qtyEl.textContent = cart[key] ? cart[key].qty : 0;

  updateCardStyle(ctx, key, !!(cart[key] && cart[key].qty > 0));

  if (ctx === 'res') updateResOrderSummary();
  else updateDineCartUI();
}

function createMenuTabs(container, grid, ctx) {
  var labels = ['☕ Kopi', '🥤 Minuman', '🍽 Makanan', '🍰 Dessert'];
  var keys = ['kopi', 'minuman', 'makanan', 'dessert'];

  keys.forEach(function (tab, i) {
    var btn = document.createElement('div');
    btn.className = 'tab-btn py-2.5 px-6 border-b-[2.5px] cursor-pointer text-[0.72rem] tracking-[0.1em] uppercase font-medium whitespace-nowrap transition-colors ' +
      (i === 0 ? 'border-b-gold text-coffee' : 'border-b-transparent text-latte hover:text-coffee');
    btn.textContent = labels[i];
    btn.onclick = function () {
      // Reset semua tab ke inactive
      container.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('border-b-gold', 'text-coffee');
        b.classList.add('border-b-transparent', 'text-latte', 'hover:text-coffee');
      });
      // Aktifkan tab ini
      btn.classList.remove('border-b-transparent', 'text-latte', 'hover:text-coffee');
      btn.classList.add('border-b-gold', 'text-coffee');
      if (grid) renderMenuGrid(grid, ctx, tab);
    };
    container.appendChild(btn);
  });
}