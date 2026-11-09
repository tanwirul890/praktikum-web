// src/Kartu.jsx
// Komponen pembungkus: judul dikirim lewat props, isi dikirim lewat children
function Kartu({ judul, children }) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

export default Kartu;
