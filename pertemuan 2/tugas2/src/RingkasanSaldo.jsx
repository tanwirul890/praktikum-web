// src/RingkasanSaldo.jsx
// Hanya menerima angka lewat props lalu menampilkannya (tidak punya state).
import { formatRupiah } from './formatRupiah';

function RingkasanSaldo({ pemasukan, pengeluaran }) {
  const saldo = pemasukan - pengeluaran;

  // Persentase pengeluaran terhadap pemasukan (untuk progress bar)
  const persen = pemasukan === 0 ? 0 : Math.min((pengeluaran / pemasukan) * 100, 100);

  return (
    <div className="saldo-wrap">
      {/* Kartu saldo utama */}
      <div className={saldo < 0 ? 'kartu-saldo minus' : 'kartu-saldo'}>
        <div className="kartu-saldo-hiasan" />
        <p className="kartu-saldo-label">Total Saldo</p>
        <p className="kartu-saldo-nilai">
          {saldo < 0 && '- '}
          {formatRupiah(saldo)}
        </p>

        <div className="rasio">
          <div className="rasio-teks">
            <span>Pengeluaran vs pemasukan</span>
            <span>{Math.round(persen)}%</span>
          </div>
          <div className="rasio-bar">
            <div className="rasio-isi" style={{ width: `${persen}%` }} />
          </div>
        </div>
      </div>

      {/* Dua kartu kecil: pemasukan & pengeluaran */}
      <div className="statistik">
        <div className="stat stat-masuk">
          <span className="stat-ikon">↓</span>
          <div>
            <p className="stat-label">Pemasukan</p>
            <p className="stat-nilai">{formatRupiah(pemasukan)}</p>
          </div>
        </div>
        <div className="stat stat-keluar">
          <span className="stat-ikon">↑</span>
          <div>
            <p className="stat-label">Pengeluaran</p>
            <p className="stat-nilai">{formatRupiah(pengeluaran)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RingkasanSaldo;
