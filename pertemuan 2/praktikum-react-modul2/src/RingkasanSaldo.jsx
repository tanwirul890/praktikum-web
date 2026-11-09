// src/RingkasanSaldo.jsx - total saldo, pemasukan, dan pengeluaran
import { formatRupiah } from './format';

function RingkasanSaldo({ totalMasuk, totalKeluar }) {
  const saldo = totalMasuk - totalKeluar; // dihitung otomatis, bukan state

  return (
    <div className="ringkasan-saldo">
      <p className="saldo-label">Total Saldo</p>
      <p className={saldo < 0 ? 'saldo-angka keluar' : 'saldo-angka'}>
        {formatRupiah(saldo)}
      </p>

      <div className="baris dua-kolom">
        <div className="mini masuk-bg">
          <span>Pemasukan</span>
          <strong className="masuk">{formatRupiah(totalMasuk)}</strong>
        </div>
        <div className="mini keluar-bg">
          <span>Pengeluaran</span>
          <strong className="keluar">{formatRupiah(totalKeluar)}</strong>
        </div>
      </div>
    </div>
  );
}

export default RingkasanSaldo;
