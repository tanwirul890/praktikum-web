// src/format.js
// Fungsi bantu untuk menampilkan angka dan tanggal

export function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

export function formatTanggal(teksIso) {
  if (!teksIso) return '';
  return new Date(teksIso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
