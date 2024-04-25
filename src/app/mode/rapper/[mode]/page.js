"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Game({ params }) {
  const router = useRouter();
  const [mode, setMode] = useState(
    params.mode == "normal"
      ? "normal"
      : params.mode == "freestyle"
      ? "freestyle"
      : "404"
  );

  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [guessedData, setGuessedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [randomRaper, setRandomRaper] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState({
    zdjecie: false,
    wiek: false,
    label: false,
    birthplace: false,
    albumy: false,
    plec: false,
  });
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    if (mode !== "freestyle" && mode !== "normal") {
      router.push("/404");
    }
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
    if (guessedData.length > 3) {
      setIsLose(true);
    }
    setInputValue("");
  };
  const closeAlert = () => {
    setIsWin(false);
    setIsLose(false);
    setDisabled(true);
  };
  const enterClick = (e) => {
    if (e.key == "Enter") {
      // console.log(JSON.parse(JSON.stringify(randomRaper.albums)).length);
      // console.log(randomRaper.albums);
      if (filtredData.length > 0) {
        const raper = filtredData[0];
        handleClick(raper);
      }
    }
  };
  const handleMouseEnter = (key) => {
    setHoveredInfo((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const handleMouseLeave = (key) => {
    setHoveredInfo((prev) => ({
      ...prev,
      [key]: false,
    }));
  };
  const InfoTip = (props) => {
    if (props.tekst == "labelInfo") {
      return (
        <div className="infoTip">
          <div className="flex flex-row justify-center items-start">
            <p className="correct p-2 rounded-md"></p>
            <p>Są w tym samym labelu</p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <p className="middle p-2 rounded-md"></p>
            <p>Mieli wspolny label</p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <p className="incorrect p-2 rounded-md"></p>
            <p>Brak powiązań</p>
          </div>
        </div>
      );
    } else if (props.tekst == "birthplace") {
      return (
        <div className="infoTip">
          <div className="flex flex-row justify-center items-start">
            <p className="correct p-2 rounded-md"></p>
            <p>Urodzeni w tym samym mieście</p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <p className="middle p-2 rounded-md"></p>
            <p>Urodzeni w tym samym województwie </p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <p className="incorrect p-2 rounded-md"></p>
            <p>Brak powiązań</p>
          </div>
        </div>
      );
    }
  };
  const WinAlert = () => {
    return (
      <div className="blurbg animate-fadeIn2">
        <div className="alertInfo winAlert">
          <button id="buttonCloseAlert" onClick={closeAlert}>
            X
          </button>
          <div className="flex flex-row font-normal">
            {/* <img
          src={randomRaper.img}
          alt=""
          className="w-20 p-2 rounded-3xl"
        /> */}
            <Image
              src={"/" + randomRaper.img}
              alt={randomRaper.img}
              width={80}
              height={80}
              loading="eager"
              unoptimized={false}
              className="w-20 p-2 rounded-3xl"
            />
            <p className="">{randomRaper.name}</p>
          </div>
          <div className="flex flex-row font-normal">
            <p className="flex flex-row gap-5">
              Próby: <p className="font-bold">{guessedData.length}</p>
            </p>
          </div>
        </div>
      </div>
    );
  };
  const LoseAlert = () => {
    return (
      <div className="blurbg animate-fadeIn3">
        <div className="alertInfo loseAlert">
          Przegrałeś!
          <button id="buttonCloseAlert" onClick={closeAlert}>
            X
          </button>
          <div className="flex flex-row font-normal">
            {/* <img
          src={randomRaper.img}
          alt=""
          className="w-20 p-2 rounded-3xl"
        /> */}
            <Image
              src={"/" + randomRaper.img}
              alt={randomRaper.img}
              width={80}
              height={80}
              loading="eager"
              unoptimized={false}
              className="w-20 p-2 rounded-3xl"
            />
            <p className="">{randomRaper.name}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    mode !== "404" && (
      <main className="flex flex-col h-auto grow relative">
        <p>{mode}</p>
        {(isWin && <WinAlert />) || (isLose && <LoseAlert />)}
        <div className="flex flex-col justify-center items-center content">
          <h1 className="font-black text-2xl">Zgadnij dzisiejszego rapera</h1>
          <input
            className="guessInput"
            type="text"
            onChange={handleChange}
            disabled={isWin || isLose ? true : disabled}
            value={inputValue}
            onKeyDown={enterClick}
          />
          <div className="absolute bottom-0 left-0 text-transparent	hover:text-inherit bg-black p-2 rounded-2xl">
            {randomRaper.name},{randomRaper.labels},{randomRaper.placeofbirth},
            {randomRaper.voivodeship}
            {randomRaper.albums && randomRaper.albums.length},
            {randomRaper.gender}
          </div>
          {/* LISA RAPEROW */}
          {inputValue != 0 && filtredData.length > 0 && (
            <div className="raperHints cursor-pointer">
              {filtredData.map((raper) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={raper.id}
                  onClick={() => handleClick(raper)}
                >
                  {/* <img src={raper.img} className="w-20 p-2 rounded-3xl" alt="" /> */}
                  <Image
                    src={"/" + raper.img}
                    alt={raper.img}
                    width={80}
                    height={80}
                    loading="eager"
                    unoptimized={false}
                    className="w-20 p-2 rounded-3xl"
                  />
                  <h1 className="font-black grow text-center">{raper.name}</h1>
                </div>
              ))}
            </div>
          )}
          {/* KLIKNIECI RAPERZY */}
          {guessedData.length > 0 && (
            <>
              <div className="raperHints">
                <div className="flex flex-row items-center justify-between relative">
                  <div className="categorie relative">
                    {hoveredInfo.zdjecie && (
                      <InfoTip tekst="asdasdasdasdaskdjaskdaskdjaskdjaskdjaskds" />
                    )}
                    <p
                      onMouseEnter={() => handleMouseEnter("zdjecie")}
                      onMouseLeave={() => handleMouseLeave("zdjecie")}
                    >
                      Zdjecie
                    </p>
                  </div>
                  <div className="categorie relative">
                    {hoveredInfo.wiek && (
                      <InfoTip tekst="asdad asdad ada dada dad" />
                    )}
                    <p
                      onMouseEnter={() => handleMouseEnter("wiek")}
                      onMouseLeave={() => handleMouseLeave("wiek")}
                    >
                      Wiek
                    </p>
                  </div>
                  <div className="categorie relative">
                    {hoveredInfo.label && <InfoTip tekst="labelInfo" />}
                    <p
                      onMouseEnter={() => handleMouseEnter("label")}
                      onMouseLeave={() => handleMouseLeave("label")}
                    >
                      Label
                    </p>
                  </div>
                  <div className="categorie text-center relative">
                    {hoveredInfo.birthplace && <InfoTip tekst="birthplace" />}
                    <p
                      onMouseEnter={() => handleMouseEnter("birthplace")}
                      onMouseLeave={() => handleMouseLeave("birthplace")}
                    >
                      Gdzie urodzony
                    </p>
                  </div>
                  <div className="categorie relative">
                    {hoveredInfo.albumy && <InfoTip tekst="albumy" />}
                    <p
                      onMouseEnter={() => handleMouseEnter("albumy")}
                      onMouseLeave={() => handleMouseLeave("albumy")}
                    >
                      Albumy
                    </p>
                  </div>
                  <div className="categorie relative">
                    {hoveredInfo.plec && <InfoTip tekst="plec" />}
                    <p
                      onMouseEnter={() => handleMouseEnter("plec")}
                      onMouseLeave={() => handleMouseLeave("plec")}
                    >
                      Płeć
                    </p>
                  </div>
                </div>
                {guessedData.map((raper, index) => (
                  <div
                    className="flex flex-row items-center justify-between"
                    key={raper.id}
                  >
                    {/* <img
                    src={raper.img}
                    className={`guessedInfo relative animate-fadeIn1 ${
                      raper.img !== randomRaper.img ? "incorrect" : "correct"
                    }`}
                    alt=""
                  /> */}
                    <Image
                      src={"/" + raper.img}
                      alt={raper.img}
                      width={80}
                      height={80}
                      loading="eager"
                      unoptimized={false}
                      className={`guessedInfo relative animate-fadeIn1 ${
                        raper.img !== randomRaper.img ? "incorrect" : "correct"
                      }`}
                    />
                    {/* Year */}
                    <div
                      className={`guessedInfo relative animate-fadeIn2 ${
                        raper.year !== randomRaper.year
                          ? "incorrect"
                          : "correct"
                      }`}
                    >
                      <h1 className="font-black text-5xl">
                        {thisYear - raper.year}
                      </h1>
                      <h1 className="icon material-symbols-outlined">
                        {thisYear - raper.year !==
                        thisYear - randomRaper.year ? (
                          thisYear - raper.year <
                          thisYear - randomRaper.year ? (
                            // <img
                            //   className="opacity-20"
                            //   src="icons/arrowup.png"
                            //   alt="Arrow Up"
                            // />
                            <Image
                              src="/icons/arrowup.png"
                              alt="Arrow Up"
                              width={80}
                              height={80}
                              loading="eager"
                              unoptimized={false}
                              className={`opacity-20`}
                            />
                          ) : (
                            // <img
                            //   className="opacity-20"
                            //   src="icons/arrowdown.png"
                            //   alt="Arrow Down"
                            // />
                            <Image
                              src="/icons/arrowdown.png"
                              alt="Arrow Down"
                              width={80}
                              height={80}
                              loading="eager"
                              unoptimized={false}
                              className={`opacity-20`}
                            />
                          )
                        ) : null}
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
                      <h1 className="font-black text-center overflow-hidden hover:overflow-visible hover:text-ellipsis">
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
                          ? raper.voivodeship !== randomRaper.voivodeship
                            ? "incorrect"
                            : "middle"
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
                        raper.albums.length !== randomRaper.albums.length
                          ? "incorrect"
                          : "correct"
                      }`}
                    >
                      <h1 className="font-black text-5xl">
                        {raper.albums.length}
                      </h1>
                      <h1 className="icon material-symbols-outlined">
                        {raper.albums.length !== randomRaper.albums.length ? (
                          raper.albums.length < randomRaper.albums.length ? (
                            // <img
                            //   className="opacity-20"
                            //   src="icons/arrowup.png"
                            //   alt="Arrow Up"
                            // />
                            <Image
                              src="/icons/arrowup.png"
                              alt="Arrow Up"
                              width={80}
                              height={80}
                              loading="eager"
                              unoptimized={false}
                              className={`opacity-20`}
                            />
                          ) : (
                            // <img
                            //   className="opacity-20"
                            //   src="icons/arrowdown.png"
                            //   alt="Arrow Down"
                            // />
                            <Image
                              src="/icons/arrowdown.png"
                              alt="Arrow Down"
                              width={80}
                              height={80}
                              loading="eager"
                              unoptimized={false}
                              className={`opacity-20`}
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
    )
  );
}