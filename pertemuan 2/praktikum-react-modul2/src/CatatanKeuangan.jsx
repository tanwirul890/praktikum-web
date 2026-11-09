// src/CatatanKeuangan.jsx - HALAMAN 2: Catatan Keuangan Mini (Tugas 3)
// State transaksi disimpan di sini (lifting state up); anak hanya melapor.
import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import RingkasanSaldo from './RingkasanSaldo';

const KUNCI_STORAGE = 'catatan-keuangan';

function CatatanKeuangan() {
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
      if (dataTersimpan) return JSON.parse(dataTersimpan);
    } catch (galat) {
      console.error('Data localStorage rusak, memulai dari kosong.', galat);
    }
    return [];
  });

  // Efek: judul tab peramban
  useEffect(() => {
    document.title = 'Catatan Keuangan Mini';
  }, []);

  // Efek: sinkronkan ke localStorage setiap daftarTransaksi berubah
  useEffect(() => {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  const tambahTransaksi = (data) => {
    const transaksiBaru = {
      id: Date.now(),
      ...data,
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setDaftarTransaksi([transaksiBaru, ...daftarTransaksi]);
  };

  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((t) => t.id !== id));
  };

  // Nilai turunan: nominal sudah berupa angka sehingga dijumlahkan dengan benar
  const totalMasuk = daftarTransaksi
    .filter((t) => t.jenis === 'pemasukan')
    .reduce((jumlah, t) => jumlah + t.nominal, 0);

  const totalKeluar = daftarTransaksi
    .filter((t) => t.jenis === 'pengeluaran')
    .reduce((jumlah, t) => jumlah + t.nominal, 0);

  return (
    <>
      <Kartu judul="Ringkasan Keuangan">
        <RingkasanSaldo totalMasuk={totalMasuk} totalKeluar={totalKeluar} />
      </Kartu>

      <Kartu judul="Tambah Transaksi">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      <Kartu judul={`Riwayat Transaksi (${daftarTransaksi.length})`}>
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Catat pemasukan atau pengeluaran pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((transaksi) => (
              <ItemTransaksi
                key={transaksi.id}
                transaksi={transaksi}
                onHapus={hapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </>
  );
}

export default CatatanKeuangan;
