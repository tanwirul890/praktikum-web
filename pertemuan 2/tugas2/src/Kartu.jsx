// src/Kartu.jsx
// Komponen pembungkus: judul & info tambahan lewat props, isi lewat children
function Kartu({ judul, info, children }) {
  return (
    <section className="kartu">
      <div className="kartu-kepala">
        <h2>{judul}</h2>
        {info && <span className="kartu-info">{info}</span>}
      </div>
      {children}
    </section>
  );
}

export default Kartu;
