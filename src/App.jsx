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

  // Prevent re-shuffling
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

      // Shuffle words ONCE and store in state
      const flatWords = groups.flatMap(group => group.words);
      setShuffledWords(shuffleArray(flatWords).map(word => ({ word, tempColor: "white" })));

      hasShuffled.current = true; // Prevents further shuffling
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
        setShuffledWords(shuffledWords.filter(wordObj => !selectedWords.includes(wordObj.word)));
        setMessage(`E saktë! Këto fjalë i përkasin kategorisë ${wordGroups[groupIndex].name}.`);
      } else {
        setMessage("Provo sërish! Këto fjalë nuk i përkasin të njëjtës kategori.");
        setAttemptsLeft(attemptsLeft - 1);
      }
      setSelectedWords([]);
    }
  };

  const handleNextGame = () => {
    setCurrentGameIndex(prev => prev + 1);
    setAttemptsLeft(4);
    setSelectedWords([]);
    setCompletedGroups([]);
    setWordGroups([]);
    setShuffledWords([]);
    hasShuffled.current = false; // Allows shuffle for the new game
  };

  const handlePreviousGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(prev => prev - 1);
      setAttemptsLeft(4);
      setSelectedWords([]);
      setCompletedGroups([]);
      setWordGroups([]);
      setShuffledWords([]);
      hasShuffled.current = false; // Allows shuffle for the previous game
    }
  };
  

  // 🔥 Fix: useEffect to clear messages after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clears the message after 2 seconds
      }, 2000);
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [message]);

  useEffect(() => {
    if (attemptsLeft === 0) {
      console.log("❌ Chances are over! Running useEffect...");
      
      if (wordGroups.length > 0) {
        const allGroups = wordGroups.map((group, index) => ({
          group: index,
          words: group.words,
        }));
  
        console.log("✅ Storing all groups:", allGroups);
        setCompletedGroups(allGroups);
      } else {
        console.log("⚠️ wordGroups is EMPTY!");
      }
    }
  }, [attemptsLeft, wordGroups]);
  

  return (
    <div className="App">
      <h1>Lidhje</h1>
      <CSVReader onWordsParsed={handleWords} />
      <h2>{`Loja ${currentGameIndex + 1}`}</h2>

      {/* Completed Groups Section */}
      <div className="completed-groups">
        {completedGroups.length > 0 ? completedGroups.map((group, index) => {
          const colors = ["lightyellow", "lawngreen", "lightblue", "plum"];
          const groupIndex = group.group % colors.length;
          const backgroundColor = colors[groupIndex];

          return (
            <div key={index} className="completed-group" style={{ backgroundColor, padding: "10px", borderRadius: "8px", marginBottom: "8px" }}>
              <h4>{wordGroups[group.group]?.name || `Group ${group.group + 1}`}</h4>
              <div>{group.words.join(", ")}</div>
            </div>
          );
        }) : null}
      </div>

      {/* Show grid only if attempts are left */}
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

      {/* Show Chances */}
      {attemptsLeft > 0 && (
        <div className="chances">
          {[...Array(4)].map((_, idx) => (
            <span key={idx} className={`dot ${idx < 4 - attemptsLeft ? "empty" : ""}`}></span>
          ))}
        </div>
      )}

      {/* Check Selection button */}
      {selectedWords.length === 4 && <button onClick={checkSelection}>Kontrollo Zgjedhjet</button>}

      {/* Show message for 2 seconds */}
      {message && <p>{message}</p>}

      <button 
  onClick={handlePreviousGame} 
  className="prevButton"
  disabled={currentGameIndex === 0} // Disable if on the first game
>
  Loja e Kaluar
</button>


      {/* Next Game button */}
      {currentGameIndex < 2 && <button onClick={handleNextGame} className="nextButton">Loja e Ardhshme</button>}
    </div>
  );
}

export default App;
