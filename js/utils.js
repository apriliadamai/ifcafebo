/**
 * utils.js — Helper functions
 * Dependensi: tidak ada
 */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
}

function scrollToDineCart() {
  const el = document.getElementById('dine-cart-section');
  if (el && !el.classList.contains('hidden')) {
    window.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
  }
}

function showToast(msg, type) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  // Tailwind classes berdasarkan tipe
  const bgClass = type === 'success' ? 'bg-sage' : type === 'error' ? 'bg-terracotta' : 'bg-coffee';
  toast.className = bgClass + ' px-5 py-3 rounded-lg text-sm font-medium text-white animate-slideIn shadow-[0_4px_16px_rgba(0,0,0,.15)] max-w-[340px]';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all .3s';
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

function formatDate(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  var days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  var months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

function initScrollReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Hapus kelas opacity-0 dan translate-y, sehingga transisi Tailwind berjalan
        entry.target.classList.remove('opacity-0', 'translate-y-[30px]');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.opacity-0').forEach(function (el) { observer.observe(el); });
}