"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { Survei } from "@/types/survei";
import SurveyTable from "@/components/SurveyTable";
import ExportButton from "@/components/ExportButton";

export default function Dashboard() {

  const [data, setData] = useState<Survei[]>([]);
  const [filterLoket, setFilterLoket] = useState("Semua");

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "survei_pelayanan"),
      (snapshot) => {

        console.log("Jumlah Dokumen :", snapshot.docs.length);

        const hasil: Survei[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Survei, "id">),
        }));

        console.log(hasil);

        setData(hasil);

      }
    );

    return () => unsubscribe();

  }, []);

  const filteredData =
  filterLoket === "Semua"
    ? data
    : data.filter(item => item.loket === filterLoket);
    
  const indeksKepuasan =
  filteredData.length > 0
    ? Math.round(
        (
          filteredData.reduce(
            (total, item) => total + Number(item.rataRata),
            0
          ) /
          filteredData.length /
          3
        ) * 100
      )
    : 0;

  return (

    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <Header />

        <div className="grid md:grid-cols-4 gap-5 mt-8">

          <StatCard
            title="Loket 1"
            value={data.filter(item => item.loket === "Loket 1").length}
            color="bg-gray-600"
          />

          <StatCard
            title="Loket 2"
            value={data.filter(item => item.loket === "Loket 2").length}
            color="bg-gray-600"
          />

          <StatCard
            title="Total Survei"
            value={data.length}
            color="bg-cyan-600"
          />

          <StatCard
            title="Indeks Kepuasan"
            value={indeksKepuasan}
            color="bg-red-500"
            suffix="%"
          />

               </div>
            <div className="flex items-center gap-4 mt-8 mb-6">

            <select
            value={filterLoket}
            onChange={(e) => setFilterLoket(e.target.value)}
            className="border rounded-xl px-4 py-3 bg-white shadow"
            >
            <option>Semua</option>
            <option>Loket 1</option>
            <option>Loket 2</option>
            </select>

            <ExportButton data={filteredData} />

            </div>
        <SurveyTable data={filteredData} />

      </div>

    </main>

  );

}