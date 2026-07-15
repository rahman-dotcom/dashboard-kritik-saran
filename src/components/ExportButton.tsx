"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Survei } from "@/types/survei";

type Props = {
  data: Survei[];
};

export default function ExportButton({ data }: Props) {

  const exportExcel = () => {

    const excelData = data.map((item) => ({

      Tanggal: item.tanggal,

      Loket: item.loket,

      Kebersihan:
        item.kebersihan === 1
          ? "Kurang"
          : item.kebersihan === 2
          ? "Cukup"
          : "Baik",

      Keramahan:
        item.keramahan === 1
          ? "Kurang"
          : item.keramahan === 2
          ? "Cukup"
          : "Baik",

      Solusi:
        item.solusi === 1
          ? "Kurang"
          : item.solusi === 2
          ? "Cukup"
          : "Baik",

      Informasi:
        item.informasi === 1
          ? "Kurang"
          : item.informasi === 2
          ? "Cukup"
          : "Baik",

      Kepuasan:
        item.rataRata >= 2.5
          ? "Sangat Puas"
          : item.rataRata >= 1.75
          ? "Cukup Puas"
          : "Kurang Puas",

    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Hasil Survei"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "Data_Hasil_Survei.xlsx");

  };

  return (

    <button
      onClick={exportExcel}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
    >
      Export Excel
    </button>

  );
}