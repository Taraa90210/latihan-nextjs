export type Event = {
    id: Number;
    judul: String;
    kategori: String;
    tanggal: String;
    lokasi: String;
    harga: Number;
    kuota: Number;
    terisi: Number;
};

export const events: Event[] = [
    { id: 1, judul: "Workshop React Untuk Pemula", kategori: "Workshop", tanggal: "2026-11-14", lokasi: "Lab RPL", harga: 50000, kuota: 30, terisi: 12 },
    
]