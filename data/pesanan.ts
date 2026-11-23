export type Pesanan = {
    nomor: number;
    eventId: number;
    nama: string;
    email: string;
    jumlah: number;
    total: number;
    dibuat: string;
    events: { judul: string } | null;
};

// export const pesanan: Pesanan[] = [];

// let nomorTerakhir = 0;

// export function tambahPesanan(data: Omit<Pesanan, "nomor">) {
//     nomorTerakhir += 1;
//     pesanan.unshift({ nomor: nomorTerakhir, ...data });
//     return nomorTerakhir;
// }