/**
 * payment.js — Opsi pembayaran & hitung DP
 * Dependensi: data.js (PAYMENT_METHODS)
 */

var resPayMethod = null;
var dinePayMethod = null;

function renderPaymentOptions(ctx) {
  var el = document.getElementById('payment-' + ctx);
  if (!el) return;

  var sorted = PAYMENT_METHODS.slice().sort(function (a, b) { return (b.priority ? 1 : 0) - (a.priority ? 1 : 0); });

  var html = '<div class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">';
  sorted.forEach(function (p) {
    html +=
      '<div class="pay-option border-2 border-coffee/10 rounded-xl p-4 text-center cursor-pointer transition-all hover:border-gold hover:-translate-y-0.5" id="pay-' + ctx + '-' + p.id + '" onclick="selectPayment(\'' + ctx + '\',\'' + p.id + '\')">' +
        '<div class="text-2xl mb-1.5">' + p.icon + '</div>' +
        '<div class="text-sm font-semibold text-coffee">' + p.label + '</div>' +
        '<div class="text-[0.68rem] text-latte leading-snug mt-1">' + p.desc + '</div>' +
        (p.priority ? '<span class="inline-block mt-1.5 text-[0.56rem] tracking-wider uppercase text-gold font-semibold bg-gold/10 px-2 py-0.5 rounded-full">Rekomendasi</span>' : '') +
      '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

function selectPayment(ctx, id) {
  if (ctx === 'res') resPayMethod = id;
  else dinePayMethod = id;

  document.querySelectorAll('[id^="pay-' + ctx + '-"]').forEach(function (el) {
    // Reset ke default
    el.classList.remove('border-gold', 'bg-gold/[0.08]', 'shadow-[0_0_0_3px_rgba(201,151,58,0.12)]');
    el.classList.add('border-coffee/10');
  });
  // Aktifkan yang dipilih
  var active = document.getElementById('pay-' + ctx + '-' + id);
  active.classList.remove('border-coffee/10');
  active.classList.add('border-gold', 'bg-gold/[0.08]', 'shadow-[0_0_0_3px_rgba(201,151,58,0.12)]');
}

function renderDepositCalc() {
  var el = document.getElementById('deposit-calc');
  var keys = Object.keys(resCart);
  var total = 0;
  keys.forEach(function (k) { total += resCart[k].price * resCart[k].qty; });
  var dp = Math.ceil(total * 0.35);
  var sisa = total - dp;

  if (!keys.length) {
    el.innerHTML =
      '<div class="text-center text-sm text-latte py-1">' +
        '<p>Anda belum memilih menu pre-order.</p>' +
        '<p class="mt-1 text-xs text-latte/60">DP 35% dihitung dari total menu. Tanpa pre-order = DP Rp 0.</p>' +
      '</div>';
    return;
  }

  el.innerHTML =
    '<div class="flex justify-between text-sm mb-2"><span class="text-latte">Total Pre-Order</span><span class="font-semibold text-coffee">Rp ' + total.toLocaleString('id-ID') + '</span></div>' +
    '<div class="flex justify-between text-sm mb-3"><span class="text-latte">DP 35% (wajib dibayar)</span><span class="font-bold text-gold text-base">Rp ' + dp.toLocaleString('id-ID') + '</span></div>' +
    '<div class="flex justify-between text-xs text-latte/60 border-t border-gold/20 pt-2"><span>Sisa 65% dibayar saat tiba di cafe</span><span>Rp ' + sisa.toLocaleString('id-ID') + '</span></div>';
}