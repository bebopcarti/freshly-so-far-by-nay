import './admin.css'

function Admin() {
  return (
    <>
      <section className="tambah">
        <h2>Tambah Produk</h2>
        <form action="">
          <input type="text" name="nama" placeholder="Nama Produk" required />
          <input type="number" name="harga" step="1000" placeholder="Harga" required />
          <input type="file" name="gambar" />
          <button type="submit">Tambah Produk</button>
        </form>
      </section>

      <section className="dashboard" id="dashboard">
        <div className="produk">
          <h2>Your Product</h2>
          <table>
            <thead>
              <tr>
                <th>Menu</th>
                <th>Gambar</th>
                <th>Harga</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* nanti data produk kamu ditampilkan di sini */}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Admin;