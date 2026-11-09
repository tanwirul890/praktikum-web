// src/FormTransaksi.jsx - formulir terkendali; melapor ke induk lewat onTambah
import { useState } from 'react';

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState(''); // dari input selalu berupa teks
  const [jenis, setJenis] = useState('pemasukan');

  const keteranganKosong = keterangan.trim() === '';
  const keteranganPanjang = keterangan.length > 40;
  const nominalAngka = Number(nominal); // "5000" -> 5000
  const nominalTidakValid = nominal === '' || !(nominalAngka > 0);
  const tidakValid = keteranganKosong || keteranganPanjang || nominalTidakValid;

  const tanganiKirim = (event) => {
    event.preventDefault();
    if (tidakValid) return;

    onTambah({
      keterangan: keterangan.trim(),
      nominal: nominalAngka, // simpan sebagai ANGKA
      jenis: jenis,
    });

    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
  };

  return (
    <form onSubmit={tanganiKirim}>
      <label className="label" htmlFor="keterangan">Keterangan</label>
      <input
        id="keterangan"
        className="input"
        type="text"
        placeholder="Contoh: Uang saku bulanan"
        value={keterangan}
        onChange={(event) => setKeterangan(event.target.value)}
      />
      {keteranganPanjang && <p className="galat">Keterangan maksimal 40 karakter.</p>}

      <div className="baris dua-kolom">
        <div className="kolom">
          <label className="label" htmlFor="nominal">Nominal (Rp)</label>
          <input
            id="nominal"
            className="input"
            type="number"
            min="1"
            placeholder="0"
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          />
        </div>
        <div className="kolom">
          <label className="label" htmlFor="jenis">Jenis</label>
          <select
            id="jenis"
            className="input"
            value={jenis}
            onChange={(event) => setJenis(event.target.value)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>
      </div>

      {nominal !== '' && nominalTidakValid && (
        <p className="galat">Nominal harus lebih besar dari 0.</p>
      )}

      <button className="tombol penuh" type="submit" disabled={tidakValid}>
        Tambah Transaksi
      </button>
    </form>
  );
}

export default FormTransaksi;
