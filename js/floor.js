/**
 * floor.js — Peta lantai cafe
 * Dependensi: data.js (TABLE_DEFS, existingReservations), utils.js (formatDate)
 * Semua warna status meja via inline style (bukan CSS class)
 */

var selectedTableId = null;

function getTableStatus(tableId, selDate, selTime, selDur) {
  var selH = parseInt(selTime.split(':')[0]);
  var selEnd = selH + parseInt(selDur);
  var now = new Date();
  var todayStr = now.toISOString().split('T')[0];
  var curH = now.getHours() + now.getMinutes() / 60;
  var reserved = false, busy = false;

  for (var i = 0; i < existingReservations.length; i++) {
    var r = existingReservations[i];
    if (r.tableId !== tableId || r.date !== selDate) continue;
    var rH = parseInt(r.time.split(':')[0]);
    var rEnd = rH + r.duration;
    if (selH < rEnd && selEnd > rH) {
      if (selDate === todayStr && curH >= rH && curH < rEnd) busy = true;
      else reserved = true;
    }
  }
  return busy ? 'busy' : reserved ? 'taken' : 'free';
}

// Warna berdasarkan status — semua inline style
var STATUS_COLORS = { free: '#7A8C6E', taken: '#C2623B', busy: '#8B5E3C', selected: '#C9973A' };
var STATUS_CURSOR = { free: 'pointer', taken: 'not-allowed', busy: 'not-allowed', selected: 'pointer' };
var STATUS_LABEL = { free: 'Tersedia', taken: 'Direservasi', busy: 'Terpakai sekarang', selected: 'Tersedia' };

function renderFloorMap(date, time) {
  var floor = document.getElementById('cafeFloor');
  var dur = document.getElementById('res-duration').value;
  floor.innerHTML = '';

  // Label utara
  var north = document.createElement('div');
  north.className = 'absolute text-[0.6rem] tracking-[0.2em] uppercase font-medium top-2 left-1/2 -translate-x-1/2';
  north.style.color = 'rgba(59,35,20,0.25)';
  north.textContent = '↑ UTARA';
  floor.appendChild(north);

  // Bar counter
  var bar = document.createElement('div');
  bar.className = 'absolute flex items-center justify-center text-[0.6rem] tracking-[0.15em] uppercase font-medium rounded-bl-lg top-0 left-0';
  bar.style.cssText = 'width:28%;height:85px;background:rgba(139,94,60,0.1);border-right:2px dashed rgba(139,94,60,0.3);border-bottom:2px dashed rgba(139,94,60,0.3);color:#8B5E3C';
  bar.textContent = '☕ Bar & Kasir';
  floor.appendChild(bar);

  // Pintu masuk
  var door = document.createElement('div');
  door.className = 'absolute flex items-center justify-center text-[0.62rem] tracking-[0.15em] uppercase font-semibold bottom-0 left-1/2 -translate-x-1/2';
  door.style.cssText = 'width:140px;height:38px;border-top:2px solid rgba(201,151,58,0.6);color:#C9973A';
  door.textContent = '🚪 Pintu Masuk';
  floor.appendChild(door);

  var freeCount = 0, takenCount = 0, busyCount = 0;

  TABLE_DEFS.forEach(function (t) {
    var status = getTableStatus(t.id, date, time, dur);
    if (status === 'free') freeCount++;
    else if (status === 'taken') takenCount++;
    else busyCount++;

    var el = document.createElement('div');
    el.className = 'absolute flex flex-col items-center justify-center transition-transform duration-150';
    el.id = 'tspot-' + t.id;
    el.style.top = t.top + 'px';
    el.style.left = 'calc(' + t.leftPct + '% - ' + (t.w / 2) + 'px)';
    el.style.cursor = STATUS_CURSOR[status];
    if (status === 'free') {
      el.onmouseenter = function () { el.style.transform = 'scale(1.08)'; };
      el.onmouseleave = function () { el.style.transform = 'scale(1)'; };
    }

    var shape = document.createElement('div');
    shape.className = 'flex flex-col items-center justify-center text-white text-[0.6rem] font-semibold transition-all duration-200';
    shape.style.cssText = 'width:' + t.w + 'px;height:' + t.h + 'px;border-radius:' + (t.shape === 'round' ? '50%' : '8px') + ';background:' + STATUS_COLORS[status];
    shape.innerHTML = t.id + '<br><span style="font-size:.5rem;font-weight:400;opacity:.8">' + t.cap + ' kursi</span>';

    var lbl = document.createElement('div');
    lbl.className = 'text-[0.58rem] font-medium mt-0.5';
    lbl.style.color = '#8B5E3C';
    lbl.textContent = STATUS_LABEL[status];

    el.appendChild(shape);
    el.appendChild(lbl);

    if (status === 'free') {
      (function (tableDef) {
        el.addEventListener('click', function () { selectTable(tableDef); });
      })(t);
    }

    floor.appendChild(el);
  });

  document.getElementById('floor-subtitle').textContent =
    formatDate(date) + ' · ' + time + ' WIB · ' + freeCount + ' meja tersedia dari ' + TABLE_DEFS.length;

  var tl = document.getElementById('timeline-info');
  if (takenCount > 0 || busyCount > 0) {
    tl.classList.remove('hidden');
    var html = '';
    if (busyCount > 0) html += '<strong class="text-terracotta">🔴 ' + busyCount + ' meja</strong> sedang dipakai saat ini. ';
    if (takenCount > 0) html += '<strong class="text-gold">🟡 ' + takenCount + ' meja</strong> sudah direservasi pada rentang waktu yang sama.';
    tl.innerHTML = html;
  } else {
    tl.classList.add('hidden');
  }
}

function selectTable(t) {
  if (selectedTableId) {
    var prev = document.getElementById('tspot-' + selectedTableId);
    if (prev) {
      var prevShape = prev.querySelector('div');
      prevShape.style.background = STATUS_COLORS.free;
      prev.style.cursor = STATUS_CURSOR.free;
      prev.querySelector('.text-\\[0\\.58rem\\]').textContent = STATUS_LABEL.free;
      prev.onmouseenter = function () { prev.style.transform = 'scale(1.08)'; };
      prev.onmouseleave = function () { prev.style.transform = 'scale(1)'; };
    }
  }
  selectedTableId = t.id;
  var el = document.getElementById('tspot-' + t.id);
  el.querySelector('div').style.background = STATUS_COLORS.selected;
  el.querySelector('div').style.boxShadow = '0 0 0 3px rgba(201,151,58,0.4)';
  el.style.cursor = STATUS_CURSOR.selected;
  el.onmouseenter = function () { el.style.transform = 'scale(1.08)'; };
  el.onmouseleave = function () { el.style.transform = 'scale(1)'; };

  var info = document.getElementById('selected-table-info');
  info.classList.remove('hidden');
  info.innerHTML = '<strong>Meja ' + t.id + '</strong> dipilih — kapasitas <strong>' + t.cap + ' kursi</strong>. Klik meja lain untuk mengubah.';
  document.getElementById('btn-to-step3').classList.remove('hidden');
}