import React, { useEffect } from "react";

const CSVReader = ({ onWordsParsed }) => {
  useEffect(() => {
    // Simulated CSV Data
    const csvData = [
      {
        game: "Game 1",
        groups: [
          { name: "Vëllezer", words: ["Frashëri", "Prifti", "Xhaka", "Veshaj"] },
          { name: "Sinonime të fjalës 'Fat'", words: ["Nafakë", "Kismet", "Short", "Paracaktim"] },
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
      /*{
        game: "Game 3",
        groups: [
          { name: "Tekste Përputhen", words: ["Dill dill me mu nuk ka dill dill", "Sta jap çuno sta jap ti lulin dot se kap", "Foli me ty e se di a menon foli me ty e se di a dëgjon", "Ledianaaaaa e bukur sikur zanaa"] },
          { name: "Citate nga Ujku", words: ["A kena shtet a nuk kenaaaa?! O Edi Ramaa", "Oboboo larg qoft laj laj ilalla", "Ooo si smu ndan iher kto mamit mu që janë tndame", "Ne spo dalim nprotest për tdrejtat e njeriut"] },
          { name: "Citate nga Bigu", words: ["Siuuuuuu", "Uakanda Foeva", "Të mirët i merr publiku", "O madre de dios hidh dy pika tru"] },
          { name: "Citate nga Kiçja", words: ["Të pres un damarët për një mashkull?! Për një feshkull?!!", "O byçkake o byçkake mamasë amaaan moj", "Ça do çuni do pith çuni ça do", "Ça thon ore zot se mdhemb koka si jap dot shpjegim"] },
        ],
      },*/
    ];
    
    onWordsParsed(csvData);
  }, [onWordsParsed]);

  return null; // No file input, just sends data
};

export default CSVReader;
