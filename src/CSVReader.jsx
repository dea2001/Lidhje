import React, { useEffect } from "react";

const CSVReader = ({ onWordsParsed }) => {
  useEffect(() => {
    // Simulated CSV Data
    const csvData = [
      {
        game: "Game 1",
        groups: [
          { name: "Vëllezer", words: ["Frashëri", "Prifti", "Xhaka", "Veshaj"] },
          { name: "Fat", words: ["Nafakë", "Kismet", "Llotari", "Paracaktim"] },
          { name: "__ zi", words: ["Mjekër", "Fat", "Derë", "Marrë"] },
          { name: "Personazhe në Kartmonedha 10-she", words: ["Aleksandër", "Pjetër", "Elizabeta", "Çarls"] },
        ],
      },
      {
        game: "Game 2",
        groups: [
          { name: "Pjesë Trupi", words: ["Gju", "Kyç", "Shpatull", "Legen"] },
          { name: "Zona të Tiranës", words: ["Brryl", "Poligrafik", "Fresk", "Vizion"] },
          { name: "i/e Shkathët", words: ["Brisk", "Dhelpër", "i/e Mprehtë", "Finok"] },
          { name: "Gjëra të Mprehta", words: ["Shikim", "Fjalë", "Thikë", "Dhëmb"] },
        ],
      },
      {
        game: "Game 3",
        groups: [
          { name: "Mendjemadh", words: ["Fodull", "Madhëria e tij/saj", "Hundpërpjetë", "Zotrote"] },
          { name: "Princeshë", words: ["Mbi bizele", "Diana", "Mononoke", "Aurora"] },
          { name: "Lule", words: ["Mos më prek", "Balli", "Narcizi", "Lakër"] },
          { name: "Me Shtresa", words: ["Përbindësh", "Qepa", "Lazanja", "Shoqëria"] },
        ],
      },
      {
        game: "Game 4",
        groups: [
          { name: "Armiqësi", words: ["Hasmëri", "Inat", "Luftë", "Urrejtje"] },
          { name: "Fillon me Metal", words: ["Armik", "Hekurudhë", "Argjendar", "Titanik"] },
          { name: "Fjale me 'Udhë'", words: ["Rrudhë", "Udhëtar", "Udhëkalim", "Udhëkryq"] },
          { name: "Gjera të Kuqe", words: ["Bakër", "Gjak", "Qershi", "Trëndafil"] },
        ],
      },
    ];
    
    onWordsParsed(csvData);
  }, [onWordsParsed]);

  return null; // No file input, just sends data
};

export default CSVReader;
