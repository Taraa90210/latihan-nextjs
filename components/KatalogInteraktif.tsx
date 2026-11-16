"use client";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  useEffect(() => {
    const simpan = localStorage.getItem("urut");
    if (simpan) setUrut(simpan);
  }, []);

  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const reset = () => setJumlahTampil(4);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.kuota > e.terisi) &&
      (hargaMaks === "" || e.harga <= Number(hargaMaks)),
  );

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = tersusun.reduce((sum, e) => sum + e.harga, 0);
  const rataRataHarga =
    tersusun.length > 0 ? Math.round(totalHarga / tersusun.length) : 0;
  const totalSisa = tersusun.reduce((sum, e) => sum + (e.kuota - e.terisi), 0);

  function handleSetCari(v: string) { setCari(v); reset(); }
  function handleSetKategori(v: string) { setKategori(v); reset(); }
  function handleSetUrut(v: string) {
    setUrut(v);
    localStorage.setItem("urut", v);
    reset();
  }
  function handleSetHanyaTersedia(v: boolean) { setHanyaTersedia(v); reset(); }
  function handleSetHargaMaks(v: string) { setHargaMaks(v); reset(); }

  return (
    <div>
      <KontrolKatalog
        cari={cari} setCari={handleSetCari}
        kategori={kategori} setKategori={handleSetKategori}
        daftarKategori={daftarKategori}
        urut={urut} setUrut={handleSetUrut}
        hanyaTersedia={hanyaTersedia} setHanyaTersedia={handleSetHanyaTersedia}
        hargaMaks={hargaMaks} setHargaMaks={handleSetHargaMaks}
      />
      <p className="text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket {totalSisa}
      </p>
      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tersusun.slice(0, jumlahTampil).map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
          {jumlahTampil < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setJumlahTampil((prev) => prev + 4)}
                className="rounded border bg-white px-4 py-2 text-sm hover:bg-slate-50"
              >
                Tampilkan lagi ({tersusun.length - jumlahTampil} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
