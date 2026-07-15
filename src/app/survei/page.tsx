"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export default function SurveiPage() {
  const [kebersihan, setKebersihan] = useState(0);
  const [keramahan, setKeramahan] = useState(0);
  const [solusi, setSolusi] = useState(0);
  const [informasi, setInformasi] = useState(0);

  const simpanSurvei = async () => {

  if (
    kebersihan === 0 ||
    keramahan === 0 ||
    solusi === 0 ||
    informasi === 0
  ) {
    alert("Silakan isi seluruh penilaian.");
    return;
  }

  try {

    const rataRata =
      (
        kebersihan +
        keramahan +
        solusi +
        informasi
      ) / 4;

    await addDoc(
      collection(db, "survei_pelayanan"),
      {

        tanggal: new Date().toLocaleDateString("id-ID"),

        loket,

        pelayanan,

        kebersihan,

        keramahan,

        solusi,

        informasi,

        rataRata,

        createdAt: serverTimestamp(),

      }
    );

    router.push(`/terimakasih?loket=${nomorLoket}`);

  } catch (error) {

    console.error(error);

    alert("Gagal mengirim survei.");

  }

};

  // Sementara hardcode.
  // Nanti akan otomatis dari QR Code.
  const searchParams = useSearchParams();
  const router = useRouter();

const nomorLoket = searchParams.get("loket");

const loket =
  nomorLoket === "2"
    ? "Loket 2"
    : "Loket 1";

const pelayanan =
  nomorLoket === "2"
    ? "Pengaduan Konsumen"
    : "Pengecekan SLIK";

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center py-10 px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8">

       <div className="relative mb-10">

  <div className="absolute left-0 top-1/2 -translate-y-1/2">
    <Image
      src="/logo-ojk.png"
      alt="Logo OJK"
      width={140}
      height={140}
      priority
    />
  </div>

  <div className="text-center">

    <h1 className="text-3xl font-bold text-blue-900">
      Survei Kepuasan Pelayanan
    </h1>

    <p className="text-2xl text-gray-600 mt-2">
      OJK Provinsi Banten
    </p>

  </div>

</div>
        <div className="mt-8 bg-blue-50 rounded-xl p-5">

          <h2 className="text-xl font-semibold">
            {loket}
          </h2>

          <p className="text-gray-600">
            {pelayanan}
          </p>

        </div>

        <Pertanyaan
          judul="1. Kebersihan Ruangan Loket"
          value={kebersihan}
          setValue={setKebersihan}
        />

        <Pertanyaan
          judul="2. Keramahan Petugas"
          value={keramahan}
          setValue={setKeramahan}
        />

        <Pertanyaan
          judul="3. Solusi yang Disampaikan Pelayanan"
          value={solusi}
          setValue={setSolusi}
        />

        <Pertanyaan
          judul="4. Informasi yang Disampaikan Pelayanan"
          value={informasi}
          setValue={setInformasi}
        />

        <button
onClick={simpanSurvei}
className="mt-10 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-4 font-semibold"
>
Kirim Penilaian
</button>

      </div>

    </main>
  );
}

type PertanyaanProps = {
  judul: string;
  value: number;
  setValue: (nilai: number) => void;
};

function Pertanyaan({
  judul,
  value,
  setValue,
}: PertanyaanProps) {

  const pilihan = [
    {
      nilai: 1,
      emoji: "😞",
      teks: "Kurang",
    },
    {
      nilai: 2,
      emoji: "😐",
      teks: "Cukup",
    },
    {
      nilai: 3,
      emoji: "😊",
      teks: "Baik",
    },
  ];

  return (
    <div className="mt-8">

      <h3 className="font-semibold text-lg mb-4">
        {judul}
      </h3>

      <div className="grid grid-cols-3 gap-4">

        {pilihan.map((item) => (

          <button
            key={item.nilai}
            onClick={() => setValue(item.nilai)}
            className={`border rounded-2xl p-5 transition

            ${
              value === item.nilai
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white hover:bg-blue-50"
            }`}
          >

            <div className="text-5xl">
              {item.emoji}
            </div>

            <div className="mt-3 font-semibold">
              {item.teks}
            </div>

          </button>

        ))}

      </div>

    </div>
  );
}