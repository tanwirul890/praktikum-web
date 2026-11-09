// src/ItemTransaksi.jsx - satu baris transaksi
import { formatRupiah } from './format';

function ItemTransaksi({ transaksi, onHapus }) {
  const adalahPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item-transaksi">
      <div className="info">
        <span className="ket">{transaksi.keterangan}</span>
        <span className="tanggal">{transaksi.tanggal}</span>
      </div>

      <span className={adalahPemasukan ? 'nominal masuk' : 'nominal keluar'}>
        {adalahPemasukan ? '+ ' : '- '}
        {formatRupiah(transaksi.nominal)}
      </span>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
        aria-label={`Hapus transaksi ${transaksi.keterangan}`}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;
