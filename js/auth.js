/**
 * auth.js — Logic login
 * Dependensi: utils.js (showToast, scrollToSection)
 */

var loggedInUser = null;

function handleReservasiClick() {
  if (loggedInUser) {
    initReservasi();
    scrollToSection('section-reservasi');
    return;
  }
  var modal = document.getElementById('login-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('login-name').value = '';
  document.getElementById('login-email').value = '';
  document.getElementById('login-phone').value = '';
  document.getElementById('login-pass').value = '';
  setTimeout(function () { document.getElementById('login-name').focus(); }, 150);
}

function closeLogin() {
  var modal = document.getElementById('login-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function doLogin() {
  var name = document.getElementById('login-name').value.trim();
  var email = document.getElementById('login-email').value.trim();
  var phone = document.getElementById('login-phone').value.trim();
  var pass = document.getElementById('login-pass').value;
  var errEl = document.getElementById('login-error');

  if (!name || !email || !phone || !pass) { errEl.textContent = 'Semua field wajib diisi.'; errEl.classList.remove('hidden'); return; }
  if (!email.includes('@')) { errEl.textContent = 'Format email tidak valid.'; errEl.classList.remove('hidden'); return; }
  if (phone.length < 10 || !phone.startsWith('08')) { errEl.textContent = 'No. HP harus diawali 08 dan minimal 10 digit.'; errEl.classList.remove('hidden'); return; }
  if (pass.length < 6) { errEl.textContent = 'Password minimal 6 karakter.'; errEl.classList.remove('hidden'); return; }

  loggedInUser = { name: name, email: email, phone: phone };
  closeLogin();
  showToast('Selamat datang, ' + name + '!', 'success');
  initReservasi();
  setTimeout(function () { scrollToSection('section-reservasi'); }, 200);
}