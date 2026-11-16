import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/data/saring";

type Props = {
  s: Saringan;
  hal: number;
  jumlah: number;
};

export default function Halaman({ s, hal, jumlah }: Props) {
  if (jumlah <= 1) return null;

  const nomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          « Sebelumnya
        </Link>
      )}

      {nomor.map((n) => {
        const aktif = n === hal;
        return (
          <Link
            key={n}
            href={alamatHalaman(s, n)}
            className={`rounded border px-3 py-1.5 text-sm ${
              aktif
                ? "border-blue-600 bg-blue-50 font-bold text-blue-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {n}
          </Link>
        );
      })}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Berikutnya »
        </Link>
      )}
    </nav>
  );
}

