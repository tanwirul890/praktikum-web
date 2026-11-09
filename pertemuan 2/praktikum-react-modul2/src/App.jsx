// src/App.jsx  (Modul 2 Langkah 1-7 + TUGAS 1 & TUGAS 2)
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';

function App() {
  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // TUGAS 1: state baru untuk filter yang sedang dipilih
  // nilainya salah satu dari: 'semua' | 'belum' | 'selesai'
  const [filter, setFilter] = useState('semua');

  // Efek A: dijalankan SEKALI saat App pertama kali tampil
  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!');
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // 2. Menambah tugas
  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // 3. Mengubah status selesai
  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
    });
    setDaftarTugas(daftarBaru);
  };

  // 4. Menghapus satu tugas
  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // TUGAS 2: hapus semua tugas yang sudah selesai
  // .filter() menyisakan tugas yang BELUM selesai saja -> array baru (immutable)
  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // 5. Nilai turunan (dihitung dari state, bukan state baru)
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // TUGAS 1: daftar yang ditampilkan = daftarTugas yang disaring sesuai filter.
  // Ini juga nilai turunan, jadi TIDAK perlu disimpan di state.
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true; // 'semua'
  });

  // TUGAS 1: data tombol filter supaya tidak menulis 3 tombol berulang-ulang
  const pilihanFilter = [
    { nilai: 'semua', label: 'Semua' },
    { nilai: 'belum', label: 'Belum Selesai' },
    { nilai: 'selesai', label: 'Selesai' },
  ];

  return (
    <div className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {/* TUGAS 1: tombol filter, yang aktif diberi className berbeda */}
        <div className="baris baris-filter">
          {pilihanFilter.map((pilihan) => (
            <button
              key={pilihan.nilai}
              className={
                filter === pilihan.nilai
                  ? 'tombol tombol-kecil'
                  : 'tombol tombol-kecil tombol-pasif'
              }
              onClick={() => setFilter(pilihan.nilai)}
            >
              {pilihan.label}
            </button>
          ))}
        </div>

        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasTampil.length === 0 ? (
          <p className="kosong">Tidak ada tugas pada filter ini.</p>
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

        {/* TUGAS 2: tombol hanya muncul jika ada minimal 1 tugas selesai (&&) */}
        {jumlahSelesai > 0 && (
          <button
            className="tombol tombol-merah tombol-hapus-selesai"
            onClick={hapusSemuaSelesai}
          >
            Hapus Semua yang Selesai ({jumlahSelesai})
          </button>
        )}
      </Kartu>
    </div>
  );
}

export default App;
