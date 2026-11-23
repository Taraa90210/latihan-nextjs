export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  gambar?: string | null;
  harga: number;
  kuota: number;
  terisi: number;
};

export function rupiah(n: number) {
  return n === 0 ? "Gratis" : "Rp " + n.toLocaleString("id-ID");
}