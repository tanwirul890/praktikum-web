// src/ItemTugas.jsx
function ItemTugas({ tugas, onUbahStatus, onHapus }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={tugas.selesai}
        onChange={() => onUbahStatus(tugas.id)}
      />
      <span className={tugas.selesai ? 'selesai' : ''}>{tugas.judul}</span>
      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(tugas.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTugas;
