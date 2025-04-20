import { useState, useEffect } from "react";
import "./game.css";

import { FaHourglassHalf } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
// import { useWindowSize } from 'react-use'
import { LuRefreshCcwDot } from "react-icons/lu";
import Confetti from 'react-confetti'

const generateTiles = () => {
  const tiles = [...Array(15).keys()].map((n) => n + 1);
  tiles.push(null);
  return shuffleArray(tiles);
};   // 15 gacha array hosl qiladi

const shuffleArray = (array) => {
  let shuffled = [...array]; 
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }  //Shuffle qilish (tasodifiy almashtirish)
  } while (!isSolvable(shuffled)); //Shuffle qil, yechiladigan bo‘lguncha
  return shuffled;  // Yigiladigan holatdagi aralashma qaytariladi
}; // yig'sa bo'ladigan qilish

const isSolvable = (tiles) => {
  let inversions = 0;
  const flatTiles = tiles.filter((n) => n !== null);
  for (let i = 0; i < flatTiles.length; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i] > flatTiles[j]) inversions++;
    }
  }
  const blankRow = Math.floor(tiles.indexOf(null) / 4);
  return (inversions + blankRow) % 2 === 0;
};

const isSolved = (tiles) => {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return true;
};

const Game = () => {
  const [tiles, setTiles] = useState(generateTiles());
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [ bayram, setBayram ] = useState(false)

  const handleClick = (index) => {
    if (!started) return; // 🚫 agar boshlanmagan bo‘lsa, harakat qilish mumkin emas

    const emptyIndex = tiles.indexOf(null);

    const isAdjacent =
      [1, -1, 4, -4].includes(index - emptyIndex) &&
      (Math.floor(index / 4) === Math.floor(emptyIndex / 4) ||
        Math.abs(index - emptyIndex) === 4);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
      setMoves((m) => m + 1);
      setWon(isSolved(newTiles));
    }
  };

  const startGame = () => {
    setTiles(generateTiles());
    setStarted(true);
    setWon(false);
    // setTiles([]);
    setMoves(0);
    setSeconds(0);
  };

useEffect(()=>{
  if (won) {
    const fiveSecondRunner = () => {
      setBayram(true)
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count === 5) {
          clearInterval(interval);
          setBayram(false)
        }
      }, 1000);
    };
  }
},[won])



  useEffect(() => {
    let timer;
    if (started && !won) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, won]);


  

  return (
    <div className="puzzle-container">
     {bayram ? <Confetti style={{width:"100%"}}/>: " "}

      <h1 className="title_name">15 O‘yin</h1>

      {!started ? (
        <button className="start-button" onClick={startGame}>
          Boshlash
        </button>
      ) : (
        <>
          <div className="data-game">
            {bayram && won && <Confetti
              className="bayram"
            />}
            <p className="data-game_iconst">
              
              <div className="iconst">
                <TbHandClick />
              </div>
              <span> {moves}</span>
            </p>
            <p className="data-game_iconst">
              
              <div className="iconst">
                <FaHourglassHalf />
              </div>
              <span> {seconds} </span>
            </p>
            <p className="data-game_iconst" onClick={ ()=>startGame()}>
              
              <div className="iconst">
              <LuRefreshCcwDot />
              </div>
              
            </p>
          </div>
          <div className="grid">
            {tiles.map((tile, index) => {
             
              
               return <div
                key={index}
                className={`tile ${tile === null ? "empty" : ""}`}
                onClick={() => handleClick(index)}
              >
                {tile}
              </div>
            })}
          </div>
          {won && (
            <p className="win-message">🎉 Tabriklaymiz! Siz yutdingiz!</p>
          )}

        
        </>
      )}
    </div>
  );
};

export default Game;
