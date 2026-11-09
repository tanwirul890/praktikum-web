// src/ItemTransaksi.jsx
// Satu baris transaksi. Tidak menyimpan state, hanya menampilkan & melapor ke induk.
import { formatRupiah, formatTanggal } from './formatRupiah';

function ItemTransaksi({ transaksi, onHapus }) {
  const isPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      {/* className dinamis: hijau untuk pemasukan, merah untuk pengeluaran */}
      <span className={isPemasukan ? 'item-ikon masuk' : 'item-ikon keluar'}>
        {isPemasukan ? '↓' : '↑'}
      </span>

      <div className="item-teks">
        <p className="item-judul">{transaksi.keterangan}</p>
        <p className="item-tanggal">{formatTanggal(transaksi.id)}</p>
      </div>

      <strong className={isPemasukan ? 'nominal hijau' : 'nominal merah'}>
        {isPemasukan ? '+' : '-'} {formatRupiah(transaksi.nominal)}
      </strong>

      <button
        className="tombol-hapus"
        title="Hapus transaksi"
        onClick={() => onHapus(transaksi.id)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
        </svg>
      </button>
    </li>
  );
}

export default ItemTransaksi;
