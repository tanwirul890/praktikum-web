// src/format.js - menampilkan angka sebagai Rupiah
const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export function formatRupiah(angka) {
  return formatter.format(angka);
}
