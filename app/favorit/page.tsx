import DaftarFavorit from "@/components/DaftarFavorit";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Event favorit" };

export default function Favorit() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Event Favorit</h1>
            <DaftarFavorit />
        </div>
    );
}