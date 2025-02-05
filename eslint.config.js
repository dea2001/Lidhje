import React, { useState, useEffect, useRef } from "react";
import CSVReader from "./CSVReader";
import './App.css';

function App() {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [wordGroups, setWordGroups] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [message, setMessage] = useState("");
  const [completedGroups, setCompletedGroups] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false); // ✅ Track if game is over

  

  const hasShuffled = useRef(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleWords = (csvData) => {
    if (csvData && csvData.length > currentGameIndex && !hasShuffled.current) {
      const groups = csvData[currentGameIndex].groups;
      setWordGroups(groups);
      const flatWords = groups.flatMap(group => group.words);
      setShuffledWords(shuffleArray(flatWords));
      hasShuffled.current = true;
    }
  };

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((selectedWord) => selectedWord !== word));
    } else {
      if (selectedWords.length < 4 && !completedGroups.some(group => group.words.includes(word))) {
        setSelectedWords((prev) => [...prev, word]);
      }
    }
  };

  const checkSelection = () => {
    if (selectedWords.length === 4) {
      const firstWord = selectedWords[0];
      const groupIndex = wordGroups.findIndex(group => group.words.includes(firstWord));
      const allSameGroup = selectedWords.every(word => wordGroups[groupIndex]?.words.includes(word));

      if (allSameGroup) {
        setCompletedGroups([...completedGroups, { group: groupIndex, words: selectedWords }]);
        setShuffledWords(shuffledWords.filter(wordObj => !selectedWords.includes(wordObj)));
        setMessage(`E saktë! Këto fjalë i përkasin kategorisë ${wordGroups[groupIndex].name}.`);
      } else {
        setMessage("Provo sërish! Këto fjalë nuk i përkasin të njëjtës kategori.");
        setAttemptsLeft(attemptsLeft - 1);
      }
      setSelectedWords([]);
    }
  };

  // ✅ Detect when game is over
  useEffect(() => {
    if (attemptsLeft === 0) {
      setTimeout(() => {
        setCompletedGroups(wordGroups.map((group, index) => ({
          group: index,
          words: group.words,
        })));
      }, 100);
    }
  }, [attemptsLeft, wordGroups]);
  
  
  
  
  
  

  const handleNextGame = () => {
    setCurrentGameIndex(prev => prev + 1);
    setAttemptsLeft(4);
    setSelectedWords([]);
    setCompletedGroups([]);
    setWordGroups([]);
    setShuffledWords([]);
    setGameOver(false); // Reset game over state
    hasShuffled.current = false;
  };

  useEffect(() => {
    if (attemptsLeft === 0) {
      console.log("❌ Chances are over!");
  
      if (wordGroups.length > 0) {
        const allGroups = wordGroups.map((group, index) => ({
          group: index,
          words: group.words,
        }));
  
        console.log("✅ Storing all groups:", allGroups);
        setCompletedGroups(allGroups);
      }
    }
  }, [attemptsLeft, wordGroups]);
  
  

  return (
    <div className="App">
      <h1>Lidhje</h1>
      <CSVReader onWordsParsed={handleWords} />
      <h2>{`Loja ${currentGameIndex + 1}`}</h2>

      {/* Show completed and missed groups */}
      <div className="completed-groups">
  {completedGroups.length > 0 ? (
    completedGroups.map((group, index) => {
      const colors = ["lightyellow", "lawngreen", "lightblue", "plum"];
      const backgroundColor = colors[group.group % colors.length];

      return (
        <div key={index} className="completed-group" style={{ backgroundColor }}>
          <h4>{wordGroups[group.group]?.name || `Group ${group.group + 1}`}</h4>
          <div>{group.words.join(", ")}</div>
        </div>
      );
    })
  ) : (
    <p>🚨 No groups to display</p> 
  )}
</div>






      {/* Show grid only if game is NOT over */}
      {attemptsLeft > 0 && (
  <div className="grid-container">
    {shuffledWords.map((wordObj, index) => (
      <div key={index} className={`word ${selectedWords.includes(wordObj.word) ? "selected" : ""}`}
        onClick={() => handleWordClick(wordObj.word)}>
        {wordObj.word}
      </div>
    ))}
  </div>
)}



      {/* Chances left */}
      {!gameOver && (
        <div className="chances">
          {[...Array(4)].map((_, idx) => (
            <span key={idx} className={`dot ${idx < 4 - attemptsLeft ? "empty" : ""}`}></span>
          ))}
        </div>
      )}

      {/* Check Selection button */}
      {!gameOver && selectedWords.length === 4 && <button onClick={checkSelection}>Kontrollo Zgjedhjet</button>}

      {/* Show message for 2 seconds */}
      {message && <p>{message}</p>}

      {/* Next Game button */}
      {gameOver && <button onClick={handleNextGame} className="nextButton">Loja e Ardhshme</button>}
    </div>
  );
}

export default App;
