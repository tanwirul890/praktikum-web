// src/App.jsx  (TUGAS 3 - Catatan Keuangan Mini)
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import RingkasanSaldo from './RingkasanSaldo';

function App() {
  // State utama disimpan di induk (lifting state up).
  // (f) Baca dulu dari localStorage; kalau belum ada, mulai dari array kosong.
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    const dataTersimpan = localStorage.getItem('catatan-keuangan');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [];
  });

  // (f) Simpan ke localStorage setiap kali daftarTransaksi berubah
  useEffect(() => {
    localStorage.setItem('catatan-keuangan', JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  // (a) Dipanggil oleh FormTransaksi lewat props onTambah
  const tambahTransaksi = (data) => {
    const transaksiBaru = { id: Date.now(), ...data };
    setDaftarTransaksi([...daftarTransaksi, transaksiBaru]);
  };

  // (b) Dipanggil oleh ItemTransaksi lewat props onHapus
  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((t) => t.id !== id));
  };

  // (c) Nilai turunan: dihitung otomatis dari state, TIDAK disimpan sebagai state
  const totalPemasukan = daftarTransaksi
    .filter((t) => t.jenis === 'pemasukan')
    .reduce((total, t) => total + Number(t.nominal), 0);

  const totalPengeluaran = daftarTransaksi
    .filter((t) => t.jenis === 'pengeluaran')
    .reduce((total, t) => total + Number(t.nominal), 0);

  // Transaksi terbaru ditampilkan paling atas.
  // Pakai [...array] dulu supaya array state asli tidak ikut terbalik (immutable).
  const transaksiTerbaru = [...daftarTransaksi].reverse();

  return (
    <div className="halaman">
      <header className="header">
      
        <div>
          <h1 className="judul">Catatan Keuangan Mini</h1>
          <p className="subjudul">Pantau pemasukan & pengeluaranmu dengan mudah</p>
        </div>
      </header>

      <main className="grid">
        <div className="kolom">
          <RingkasanSaldo pemasukan={totalPemasukan} pengeluaran={totalPengeluaran} />

          <Kartu judul="Tambah Transaksi">
            <FormTransaksi onTambah={tambahTransaksi} />
          </Kartu>
        </div>

        <div className="kolom">
          <Kartu judul="Riwayat Transaksi" info={`${daftarTransaksi.length} transaksi`}>
            {/* (e) Pesan khusus jika belum ada transaksi */}
            {daftarTransaksi.length === 0 ? (
              <div className="kosong">
                <div className="kosong-ikon">🧾</div>
                <p className="kosong-judul">Belum ada transaksi</p>
                <p>Catat pemasukan atau pengeluaran pertamamu lewat formulir.</p>
              </div>
            ) : (
              <ul className="daftar">
                {transaksiTerbaru.map((transaksi) => (
                  <ItemTransaksi
                    key={transaksi.id}
                    transaksi={transaksi}
                    onHapus={hapusTransaksi}
                  />
                ))}
              </ul>
            )}
          </Kartu>
        </div>
      </main>
    </div>
  );
}

export default App;
