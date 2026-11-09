// src/formatRupiah.js
// Fungsi bantu format angka & tanggal

// 15000 -> "Rp 15.000"
export function formatRupiah(angka) {
  return 'Rp ' + Math.abs(angka).toLocaleString('id-ID');
}

// id transaksi dibuat dari Date.now(), jadi bisa sekalian dipakai sebagai tanggal
// 1731150000000 -> "9 Nov 2026, 17.40"
export function formatTanggal(waktu) {
  return new Date(waktu).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
