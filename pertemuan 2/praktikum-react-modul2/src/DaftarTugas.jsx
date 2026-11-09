// src/DaftarTugas.jsx - HALAMAN 1: Daftar Tugas Praktikum (Modul 2 + Tugas 1 & 2)
import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';

const OPSI_FILTER = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'belum', label: 'Belum Selesai' },
  { nilai: 'selesai', label: 'Selesai' },
];

function DaftarTugas() {
  // State utama: dibaca dari localStorage lebih dulu
  const [daftarTugas, setDaftarTugas] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem('daftar-tugas');
      if (dataTersimpan) return JSON.parse(dataTersimpan);
    } catch (galat) {
      console.error('Data localStorage rusak, memakai data contoh.', galat);
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // TUGAS 1: state pilihan filter
  const [filter, setFilter] = useState('semua');

  // Efek: judul tab peramban mengikuti jumlah tugas yang belum selesai
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek: simpan ke localStorage setiap daftarTugas berubah
  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  const ubahStatus = (id) => {
    setDaftarTugas(
      daftarTugas.map((tugas) =>
        tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas
      )
    );
  };

  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // TUGAS 2: hapus semua tugas yang berstatus selesai
  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // Nilai turunan (tidak disimpan sebagai state)
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // TUGAS 1: .filter() dijalankan SEBELUM .map()
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true;
  });

  return (
    <>
      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        <div className="baris filter">
          {OPSI_FILTER.map((opsi) => (
            <button
              key={opsi.nilai}
              className={
                filter === opsi.nilai
                  ? 'tombol tombol-kecil tombol-filter aktif'
                  : 'tombol tombol-kecil tombol-filter'
              }
              onClick={() => setFilter(opsi.nilai)}
            >
              {opsi.label}
            </button>
          ))}
        </div>

        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasTampil.length === 0 ? (
          <p className="kosong">Tidak ada tugas pada kategori ini.</p>
        ) : (
          <ul className="daftar">
            {tugasTampil.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}

        {/* TUGAS 2: "> 0" agar React tidak menampilkan angka 0 */}
        {jumlahSelesai > 0 && (
          <button className="tombol tombol-merah hapus-selesai" onClick={hapusSemuaSelesai}>
            Hapus Semua yang Selesai ({jumlahSelesai})
          </button>
        )}
      </Kartu>
    </>
  );
}

export default DaftarTugas;
