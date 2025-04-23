import { useState, useEffect } from "react";
import "./game.css";

import { FaHourglassHalf } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { LuRefreshCcwDot } from "react-icons/lu";
import Confetti from "react-confetti";
import axios from "axios"; 
import aidoSound  from '../../adio/adio.mp3'
import erorrSound  from '../../adio/erorr.mp3'
import finshSound  from '../../adio/finsh.mp3'

const generateTiles = () => {
  const tiles = [...Array(15).keys()].map((n) => n + 1);
  tiles.push(null);
  return shuffleArray(tiles);
}; 


const shuffleArray = (array) => {
  let shuffled = [...array];
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (!isSolvable(shuffled));
  return shuffled;
};

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
  const [bayram, setBayram] = useState(false);
  const audio = new Audio(aidoSound)
  const errorA = new Audio(erorrSound)
  const finsh = new Audio(finshSound)
  
  const handleClick = (index) => {
    if (!started) return; // 🚫 agar boshlanmagan bo‘lsa, harakat qilish mumkin emas
    if(!bayram){
    
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
      audio.play();
    }else errorA.play();}

  };

  const startGame = () => {
    setTiles(generateTiles());
    setStarted(true);
    setWon(false);
    setBayram(false); 
    setMoves(0);
    setSeconds(0);
  };



  useEffect(() => {
    if (won) {
      setBayram(true);
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count === 5) {
          clearInterval(interval);
          setBayram(false);
        }
      }, 1000);
      return () => clearInterval(interval); // tozalash
    }
  }, [won]);

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    let timer;
    if (started && !won) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer); // tozalash
  }, [started, won]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const response = await axios.post("https://your-backend-api.com/login", {
          email: formData.email,
          password: formData.password
        });
        console.log("Login muvaffaqiyatli:", response.data);
      } else {
        const response = await axios.post("https://your-backend-api.com/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        console.log("Registratsiya muvaffaqiyatli:", response.data);
      }
    } catch (error) {
      console.error("Xatolik:", error.response ? error.response.data : error.message);
    }
  };

  if (bayram) {
    finsh.play()
  }

  return (
    <div className="puzzle-container">
      {bayram && <Confetti style={{ width: "100%", height: "100%" }} />}

      {!started ? (
        <button className="start-button" onClick={startGame}>
          start
        </button>
      ) : (
        <>
          <div className="data-game">
           
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
            <p className="data-game_iconst" onClick={() => startGame()}>
              <div className="iconst">
                <LuRefreshCcwDot />
              </div>
            </p>
          </div>
          <div className="grid">
            {tiles.map((tile, index) => {
              return (
                <div
                  key={index}
                  className={`tile ${tile === null ? "empty" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {tile}
                </div>
              );
            })}
          </div>
          <div className="data-game">
            <div className="data-game_iconst_end btn">
              <div className="iconst">
                <TbHandClick />
              </div>
              <span></span>
            </div>

            <div className="data-game_iconst_end btn">
              <div className="iconst">
                <FaHourglassHalf />
              </div>
              <span>  </span>
            </div>
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
