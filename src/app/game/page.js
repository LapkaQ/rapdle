"use client";
import { useState, useEffect } from "react";
import "../globalicons.css";

export default function Game() {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [guessedData, setGuessedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [randomRaper, setRandomRaper] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const thisYear = new Date().getFullYear();

  useEffect(() => {
    if (isLoading) {
      fetch("/rapers.json")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, []);
  useEffect(() => {
    if (data.length != 0 && randomRaper.length === 0) {
      const randomRaper = data[Math.floor(Math.random() * data.length)];
      setRandomRaper(randomRaper);
    }
  }, [data]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    const filtered = data.filter((raper) =>
      raper.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFiltredData(filtered);
  };
  const handleClick = (raper) => {
    const newGuessedData = [...guessedData, raper];
    setGuessedData(newGuessedData);

    const updatedFilteredData = filtredData.filter(
      (rapper) => rapper.id !== raper.id
    );
    setFiltredData(updatedFilteredData);

    const updatedData = data.filter((rapper) => rapper.id !== raper.id);
    setData(updatedData);

    if (raper.id === randomRaper.id) {
      setIsWin(true);
    }

    setInputValue("");
  };
  const closeAlert = () => {
    setIsWin(false);
    setDisabled(true);
  };
  const enterClick = (e) => {
    if (e.key == "Enter") {
      if (filtredData.length > 0) {
        const raper = filtredData[0];
        handleClick(raper);
      }
    }
  };
  return (
    <main className="flex flex-col">
      {isWin && (
        <div className="blurbg animate-fadeIn7">
          <div className="alertInfo">
            Wygrałeś!
            <button id="buttonCloseAlert" onClick={closeAlert}>
              X
            </button>
            <div className="flex flex-row font-normal">
              <img
                src={randomRaper.img}
                alt=""
                className="w-20 p-2 rounded-3xl"
              />
              <p className="">{randomRaper.name}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-black text-2xl">Zgadnij dzisiejszego rapera</h1>
        <input
          className="guessInput"
          type="text"
          onChange={handleChange}
          disabled={isWin ? true : disabled}
          value={inputValue}
          onKeyDown={enterClick}
        />
        <p className="absolute bottom-0 left-0">
          {randomRaper.name},{randomRaper.labels},{randomRaper.placeofbirth},
          {randomRaper.numberofalbums},{randomRaper.gender}
        </p>
        {/* LISA RAPEROW */}
        {inputValue != 0 && filtredData.length > 0 && (
          <div className="raperHints cursor-pointer">
            {filtredData.map((raper) => (
              <div
                className="flex flex-row items-center justify-between"
                key={raper.id}
                onClick={() => handleClick(raper)}
              >
                <img src={raper.img} className="w-20 p-2 rounded-3xl" alt="" />
                <h1 className="font-black grow text-center">{raper.name}</h1>
              </div>
            ))}
          </div>
        )}
        {/* KLIKNIECI RAPERZY */}
        {guessedData.length > 0 && (
          <>
            <div className="raperHints">
              <div className="flex flex-row items-center justify-between">
                <p className="categorie">Zdjecie</p>
                <p className="categorie">Wiek</p>
                <p className="categorie">Label</p>
                <p className="categorie text-center">Gdzie urodzony</p>
                <p className="categorie">Albumy</p>
                <p className="categorie">Płeć</p>
              </div>
              {guessedData.map((raper, index) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={raper.id}
                >
                  <img
                    src={raper.img}
                    className={`guessedInfo relative animate-fadeIn1 ${
                      raper.img !== randomRaper.img ? "incorrect" : "correct"
                    }`}
                    alt=""
                  />
                  {/* Year */}
                  <div
                    className={`guessedInfo relative animate-fadeIn2 ${
                      raper.year !== randomRaper.year ? "incorrect" : "correct"
                    }`}
                  >
                    {" "}
                    <h1 className="font-black grow text-center">
                      {thisYear - raper.year}
                    </h1>
                  </div>
                  {/* Labels */}
                  <div
                    className={`guessedInfo relative animate-fadeIn3 ${
                      raper.labels[0] === randomRaper.labels[0]
                        ? "correct"
                        : raper.labels.some((label) =>
                            randomRaper.labels.includes(label)
                          )
                        ? "middle"
                        : "incorrect"
                    }`}
                  >
                    <h1 className="font-black grow text-center overflow-hidden hover:overflow-visible">
                      {raper.labels.length == 1
                        ? raper.labels
                        : raper.labels
                            .filter((label, index) => index < 2)
                            .join(", ")}
                    </h1>
                  </div>
                  {/* Place of birth */}
                  <div
                    className={`guessedInfo relative animate-fadeIn4 ${
                      raper.placeofbirth !== randomRaper.placeofbirth
                        ? "incorrect"
                        : "correct"
                    }`}
                  >
                    <h1 className="font-black grow text-center">
                      {raper.placeofbirth}
                    </h1>
                  </div>
                  {/* Number of albums */}
                  <div
                    className={`guessedInfo relative animate-fadeIn5 ${
                      raper.numberofalbums !== randomRaper.numberofalbums
                        ? "incorrect"
                        : "correct"
                    }`}
                  >
                    <h1 className="font-black text-5xl">
                      {raper.numberofalbums}
                    </h1>
                    <h1 className="icon material-symbols-outlined">
                      {raper.numberofalbums !== randomRaper.numberofalbums &&
                      raper.numberofalbums !== randomRaper.numberofalbums ? (
                        raper.numberofalbums < randomRaper.numberofalbums ? (
                          <img
                            className="opacity-20"
                            src="icons/arrowup.png"
                            alt="Arrow Up"
                          />
                        ) : (
                          <img
                            className="opacity-20"
                            src="icons/arrowdown.png"
                            alt="Arrow Down"
                          />
                        )
                      ) : null}
                    </h1>
                  </div>

                  {/* Gender */}
                  <div
                    className={`guessedInfo relative animate-fadeIn6 ${
                      raper.gender !== randomRaper.gender
                        ? "incorrect"
                        : "correct"
                    }`}
                  >
                    <h1 className="font-black grow text-center">
                      {raper.gender}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
