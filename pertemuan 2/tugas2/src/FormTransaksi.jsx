// src/FormTransaksi.jsx
// Formulir terkendali: setiap input punya pasangan value + onChange
import { useState } from 'react';

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');
  const [jenis, setJenis] = useState('pengeluaran');

  // Validasi (nilai turunan, bukan state)
  // Ingat: nilai input selalu TEKS, jadi diubah dulu dengan Number()
  const angka = Number(nominal);
  const nominalTidakValid = nominal !== '' && (isNaN(angka) || angka <= 0);
  const keteranganTerlaluPanjang = keterangan.length > 40;
  const tidakValid =
    keterangan.trim() === '' ||
    keteranganTerlaluPanjang ||
    nominal === '' ||
    nominalTidakValid;

  const tanganiKirim = (event) => {
    event.preventDefault(); // cegah halaman reload
    if (tidakValid) return;

    onTambah({
      keterangan: keterangan.trim(),
      nominal: angka, // simpan sebagai ANGKA, bukan teks
      jenis: jenis,
    });

    setKeterangan('');
    setNominal('');
  };

  return (
    <form onSubmit={tanganiKirim} className="form">
      {/* Pilihan jenis: radio button yang ditata seperti tombol geser */}
      <div className="pilih-jenis">
        <label className={jenis === 'pemasukan' ? 'opsi aktif-masuk' : 'opsi'}>
          <input
            type="radio"
            name="jenis"
            value="pemasukan"
            checked={jenis === 'pemasukan'}
            onChange={(event) => setJenis(event.target.value)}
          />
          ↓ Pemasukan
        </label>
        <label className={jenis === 'pengeluaran' ? 'opsi aktif-keluar' : 'opsi'}>
          <input
            type="radio"
            name="jenis"
            value="pengeluaran"
            checked={jenis === 'pengeluaran'}
            onChange={(event) => setJenis(event.target.value)}
          />
          ↑ Pengeluaran
        </label>
      </div>

      <label className="field">
        <span>Keterangan</span>
        <input
          className="input"
          type="text"
          placeholder="Contoh: Beli makan siang"
          value={keterangan}
          onChange={(event) => setKeterangan(event.target.value)}
        />
      </label>
      {keteranganTerlaluPanjang && (
        <p className="galat">Keterangan maksimal 40 karakter.</p>
      )}

      <label className="field">
        <span>Nominal</span>
        <div className="input-rupiah">
          <b>Rp</b>
          <input
            className="input"
            type="number"
            placeholder="0"
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          />
        </div>
      </label>
      {nominalTidakValid && <p className="galat">Nominal harus lebih dari 0.</p>}

      <button
        className={jenis === 'pemasukan' ? 'tombol tombol-masuk' : 'tombol tombol-keluar'}
        type="submit"
        disabled={tidakValid}
      >
        + Simpan {jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
      </button>
    </form>
  );
}

export default FormTransaksi;
