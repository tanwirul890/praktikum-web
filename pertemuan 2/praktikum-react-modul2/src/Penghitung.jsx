// src/Penghitung.jsx (VERSI BENAR)
import { useState } from 'react';
import Kartu from './Kartu';

function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const ulangi = () => {
    setJumlah(0);
  };

  return (
    <Kartu judul="Penghitung Klik">
      <p>Tombol sudah diklik {jumlah} kali</p>
      {jumlah >= 5 && <p>Wah, kamu rajin sekali mengklik!</p>}
      <div className="baris">
        <button className="tombol" onClick={tambah}>Klik Saya</button>
        <button className="tombol tombol-merah" onClick={ulangi}>Ulangi</button>
      </div>
    </Kartu>
  );
}

export default Penghitung;
