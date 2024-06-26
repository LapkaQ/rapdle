"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pixelify } from "react-pixelify";

import Image from "next/image";
import InfoTip from "../../components/InfoTip";
export default function Page({ params }) {
  const router = useRouter();
  // Jaka podstrona
  const [mode, setMode] = useState(
    params.mode[0] === "rapper"
      ? "rapper"
      : params.mode[0] === "cover"
      ? "cover"
      : "404"
  );
  // Jaka podstrona v2
  const [category, setCategory] = useState(
    params.mode[1] === "normal"
      ? "normal"
      : params.mode[1] === "freestyle"
      ? "freestyle"
      : "404"
  );
  // Wszyscy raperzy
  const [data, setData] = useState([]);
  // Wszyscy raperzy backup
  const [dataBK, setDataBK] = useState([]);
  // Przefiltrowani raperzy w inpucie
  const [filtredData, setFiltredData] = useState([]);
  // Kliknięci raperzy
  const [guessedData, setGuessedData] = useState([]);
  // Czy zaladowalo dane
  const [isLoading, setLoading] = useState(true);
  // Losowy Raper
  const [randomRapper, setRandomRapper] = useState([]);
  // Losowy Album
  const [randomCover, setRandomCover] = useState({});
  // Vartosc inputa
  const [inputValue, setInputValue] = useState("");
  // Czy wygrana?
  const [isWin, setIsWin] = useState(false);
  // Czy przegrana?
  const [isLose, setIsLose] = useState(false);
  // Status inputa
  const [disabled, setDisabled] = useState(false);
  // Czy hover na kategoriach
  const [hoveredInfo, setHoveredInfo] = useState({
    zdjecie: false,
    wiek: false,
    label: false,
    birthplace: false,
    albumy: false,
    plec: false,
  });
  let value;
  // Wczytywanie streak rapper normal do local storage
  value = parseInt(localStorage.getItem("streakRapperNormal")) || 0;
  const [streakRapperNormal, setStreakRapperNormal] = useState(value);
  localStorage.setItem("streakRapperNormal", streakRapperNormal);

  // Wczytywanie streak rapper freestyle do local storage
  value = parseInt(localStorage.getItem("streakRapperFreestyle")) || 0;
  const [streakRapperFreestyle, setStreakRapperFreestyle] = useState(value);
  localStorage.setItem("streakRapperFreestyle", streakRapperFreestyle);

  // Wczytywanie streak cover normal do local storage
  value = parseInt(localStorage.getItem("streakCoverNormal")) || 0;
  const [streakCoverNormal, setStreakCoverNormal] = useState(value);
  localStorage.setItem("streakCoverNormal", streakCoverNormal);

  // Wczytywanie streak cover freestyle do local storage
  value = parseInt(localStorage.getItem("streakCoverFreestyle")) || 0;
  const [streakCoverFreestyle, setStreakCoverFreestyle] = useState(value);
  localStorage.setItem("streakCoverFreestyle", streakCoverFreestyle);
  const thisYear = new Date().getFullYear();
  // routing i pobieranie danych
  useEffect(() => {
    console.log(mode);
    console.log(category);
    if (mode === "404" || category === "404") {
      router.push("/404");
    }
    if (isLoading) {
      fetch("/rapers.json")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setDataBK(data);
          setLoading(false);
        });
    }
  }, []);
  // Losuje raperza i album przy kazdej zmianie [data]
  useEffect(() => {
    if (data.length != 0 && randomRapper.length === 0) {
      let randomAlbum;
      let randomIndex;
      do {
        const randomRapper = data[Math.floor(Math.random() * data.length)];
        randomIndex = Math.floor(Math.random() * randomRapper.albums.length);
        randomAlbum = randomRapper.albums[randomIndex];
        setRandomRapper(randomRapper);
      } while (randomAlbum.title === "None");

      setRandomCover(randomAlbum);
    }
  }, [data]);
  // handleChange dla inputa ktory filtruje raperow i albumy
  const handleChange = (e) => {
    setInputValue(e.target.value);
    let filtered;
    mode === "rapper"
      ? (filtered = data.filter((rapper) =>
          rapper.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        ))
      : (filtered = data.flatMap((rapper) =>
          rapper.albums.filter(
            (album) =>
              album.title
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase()) &&
              album.title !== "None"
          )
        ));
    setFiltredData(filtered);
  };
  //Klikniecie w inputa
  const handleClick = (rapper) => {
    console.log(guessedData.length);
    let newGuessedData;
    let updatedFilteredData;
    let updatedData;

    if (mode === "rapper") {
      newGuessedData = [...guessedData, rapper];
      setGuessedData(newGuessedData);

      updatedFilteredData = filtredData.filter((r) => r.id !== rapper.id);
      setFiltredData(updatedFilteredData);

      updatedData = data.filter((r) => r.id !== rapper.id);
      setData(updatedData);

      if (rapper.id === randomRapper.id) {
        setIsWin(true);
        AddStreaks();
      } else if (guessedData.length > 3 && category === "normal") {
        ResetStreaks();
      }
      if (category === "normal" && guessedData.length > 3) {
        setIsLose(true);
      }
    } else if (mode === "cover") {
      newGuessedData = [...guessedData, rapper];
      setGuessedData(newGuessedData);
      updatedFilteredData = filtredData.filter((r) => r.title !== rapper.title);
      setFiltredData(updatedFilteredData);
      updatedData = data.map((r) => ({
        ...r,
        albums: r.albums.filter((a) => a.title !== rapper.title),
      }));
      setData(updatedData);

      if (rapper.title === randomCover.title) {
        setIsWin(true);
        AddStreaks();
      } else if (guessedData.length > 3 && category === "normal") {
        ResetStreaks();
      }
      if (category === "normal" && guessedData.length > 3) {
        setIsLose(true);
      }
    }
    setInputValue("");
  };

  // Klikniecie Enter w inpucie
  const enterClick = (e) => {
    if (e.key == "Enter" && inputValue.length > 0) {
      if (filtredData.length > 0) {
        const raper = filtredData[0];
        handleClick(raper);
      }
    }
  };
  // Mouse enter na kategorie
  const handleMouseEnter = (key) => {
    setHoveredInfo((prev) => ({
      ...prev,
      [key]: true,
    }));
  };
  // Mouse leave na kategorie
  const handleMouseLeave = (key) => {
    setHoveredInfo((prev) => ({
      ...prev,
      [key]: false,
    }));
  };
  // Zamkniecie Alerta
  const closeAlert = () => {
    setIsWin(false);
    setIsLose(false);
    setDisabled(true);
  };
  const AddStreaks = () => {
    mode === "rapper"
      ? category === "normal"
        ? ((value =
            parseInt(localStorage.getItem("streakRapperNormal") || 0) + 1),
          setStreakRapperNormal(value),
          localStorage.setItem("streakRapperNormal", value))
        : guessedData.length <= 4 &&
          ((value =
            parseInt(localStorage.getItem("streakRapperFreestyle") || 0) + 1),
          setStreakRapperFreestyle(value),
          localStorage.setItem("streakRapperFreestyle", value))
      : category === "normal"
      ? ((value = parseInt(localStorage.getItem("streakCoverNormal") || 0) + 1),
        setStreakCoverNormal(value),
        localStorage.setItem("streakCoverNormal", value))
      : guessedData.length <= 4 &&
        ((value =
          parseInt(localStorage.getItem("streakCoverFreestyle") || 0) + 1),
        setStreakCoverFreestyle(value),
        localStorage.setItem("streakCoverFreestyle", value));
  };
  const ResetStreaks = () => {
    mode === "rapper"
      ? category === "normal"
        ? (setStreakRapperNormal(0),
          localStorage.setItem("streakRapperNormal", 0))
        : (setStreakRapperFreestyle(0),
          localStorage.setItem("streakRapperFreestyle", 0))
      : category === "normal"
      ? (setStreakCoverNormal(0), localStorage.setItem("streakCoverNormal", 0))
      : (setStreakCoverFreestyle(0),
        localStorage.setItem("streakCoverFreestyle", 0));
    // setStreakCoverFreestyle(0);
    // setStreakCoverNormal(0);
    // setStreakRapperNormal(0);
    // setStreakRapperFreestyle(0);
    // localStorage.setItem("streakRapperNormal", 0);
    // localStorage.setItem("streakRapperFreestyle", 0);
    // localStorage.setItem("streakCoverNormal", 0);
    // localStorage.setItem("streakCoverFreestyle", 0);
  };
  // Alert z wygraną
  const WinAlert = () => {
    return (
      <div
        className={`blurbg ${
          mode === "rapper" ? "animate-fadeIn7" : "animate-fadeIn3"
        }`}
      >
        <div className="alertInfo text-6xl winAlert py-5 px-24 max-md:py-2 max-md:px-12 max-md:text-2xl">
          Wygrałeś!
          <button
            id="buttonCloseAlert"
            className="w-4 h-4 p-8 max-md:h-4 max-md:w-4  max-md:p-5"
            onClick={closeAlert}
          >
            X
          </button>
          {mode === "rapper" ? (
            <div className="flex flex-row font-normal justify-center items-center">
              <Image
                src={"/" + randomRapper.img}
                alt={randomRapper.img}
                width={80}
                height={80}
                loading="eager"
                unoptimized={false}
                className="p-2 rounded-3xl"
                priority={true}
              />
              <p className="flex flex-row justify-center items-center max-md:flex-col">
                {randomRapper.name}
              </p>
            </div>
          ) : (
            <div className="flex flex-row font-normal justify-center items-center">
              <Image
                src={"/" + randomCover.cover}
                alt={randomCover.cover}
                width={80}
                height={80}
                loading="eager"
                unoptimized={false}
                className=" p-2 rounded-3xl"
                priority={true}
              />
              <p className="flex flex-row justify-center items-center max-md:flex-col">
                {randomCover.title}
              </p>
            </div>
          )}
          <div className="flex flex-row font-normal">
            <div className="flex flex-row gap-5">
              Próby: <p className="font-bold">{guessedData.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // Alert z przegraną
  const LoseAlert = (props) => {
    const { instant } = props; // Otrzymywanie argumentu "instant" z props
    return (
      <div className={`blurbg ${!instant && "animate-fadeIn1"}`}>
        <div className="alertInfo text-5xl loseAlert py-5 px-24 max-md:py-2 max-md:px-12 max-md:text-2xl">
          Przegrałeś!
          <button
            id="buttonCloseAlert"
            className="w-4 h-4 p-8 max-md:h-4 max-md:w-4  max-md:p-5"
            onClick={closeAlert}
          >
            X
          </button>
          {mode === "rapper" ? (
            <div className=" flex flex-row font-normal justify-center items-center">
              <Image
                src={"/" + randomRapper.img}
                alt={randomRapper.img}
                width={80}
                height={80}
                loading="eager"
                unoptimized={false}
                className=" p-2 rounded-3xl"
                priority={true}
              />
              <p className="flex flex-row justify-center items-center max-md:flex-col">
                {randomRapper.name}
              </p>
            </div>
          ) : (
            <div className=" flex flex-row font-normal justify-center items-center">
              <Image
                src={"/" + randomCover.cover}
                alt={randomCover.cover}
                width={80}
                height={80}
                loading="eager"
                unoptimized={false}
                className="p-2 rounded-3xl"
                priority={true}
              />
              <p className="flex flex-row justify-center items-center max-md:flex-col">
                {randomCover.title}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  // Restart gry
  const RestartGame = () => {
    setDisabled(false);
    setInputValue("");
    setGuessedData([]);
    setData(dataBK);
    let randomAlbum;
    let randomIndex;
    do {
      const randomRapper = data[Math.floor(Math.random() * data.length)];
      randomIndex = Math.floor(Math.random() * randomRapper.albums.length);
      randomAlbum = randomRapper.albums[randomIndex];
      setRandomRapper(randomRapper);
    } while (randomAlbum.title === "None");

    setRandomCover(randomAlbum);
  };

  switch (mode) {
    case "rapper":
      return category !== "404" ? (
        <main className="flex flex-col h-auto grow relative">
          {(isWin && <WinAlert />) || (isLose && <LoseAlert />)}
          <div className="flex flex-col justify-center items-center content">
            <div className="mainInfoGame">
              <p className="font-black text-xl  max-md:text-base">
                Tryb: {category}
              </p>
              <div className="flex flex-row">
                {category == "normal" && (
                  <div
                    className={`attemptsLeft relative flex flex-col justify-center items-center  ${
                      guessedData.length == 5 ? "incorrect" : "correct"
                    }`}
                  >
                    <h1 className="font-light text-xl max-md:text-sm">
                      Próby:
                    </h1>
                    <h1 className="font-black text-5xl max-md:text-3xl">
                      {" "}
                      {5 - guessedData.length}
                    </h1>
                  </div>
                )}
                {/* STREAKS */}

                <div className="relative flex justify-center items-center">
                  <Image
                    src="/images/StreakFire.png"
                    width={90}
                    height={90}
                    quality={100}
                    className={`streakFire duration-500 ${
                      (category === "normal" &&
                        (streakRapperNormal === 0
                          ? "saturate-0"
                          : "saturate-1")) ||
                      (category === "freestyle" &&
                        (streakRapperFreestyle === 0
                          ? "saturate-0"
                          : "saturate-1"))
                    }`}
                  />
                  <h1 className="font-black text-3xl bottom-3 streakText">
                    {category == "normal"
                      ? streakRapperNormal
                      : streakRapperFreestyle}
                  </h1>
                </div>
              </div>
              <h1 className="font-black text-2xl  max-md:text-base">
                Zgadnij dzisiejszego rapera
              </h1>
            </div>

            {category === "freestyle" && (
              <p
                onClick={
                  !disabled
                    ? () => {
                        setIsLose(true, "instant");
                        ResetStreaks(); // Dodano wywołanie funkcji ResetStreaks
                      }
                    : RestartGame
                }
                className="cursor-pointer text-sm animate-pulse max-md:text-xs"
              >
                {!disabled ? "poddaj się" : "zagraj ponownie"}
              </p>
            )}

            <input
              className="guessInput"
              type="text"
              onChange={handleChange}
              disabled={isWin || isLose ? true : disabled}
              value={inputValue}
              onKeyDown={enterClick}
            />
            <div className="absolute bottom-0 left-0 text-transparent	hover:text-inherit bg-black p-2 rounded-2xl">
              {randomRapper.name},{randomRapper.labels},
              {randomRapper.placeofbirth},{randomRapper.voivodeship}
              {randomRapper.albums && randomRapper.albums.length},
              {randomRapper.gender}
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
                    <Image
                      src={"/" + raper.img}
                      alt={raper.img}
                      width={80}
                      height={80}
                      loading="eager"
                      unoptimized={false}
                      className="w-20 p-2 rounded-3xl max-md:w-14 max-md:rounded-xl"
                    />
                    <h1 className="font-black grow text-center">
                      {raper.name}
                    </h1>
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
                        <InfoTip tekst="asdad asdad ada dada dad " />
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
                        Miejsce urodzenia
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
                      <Image
                        src={"/" + raper.img}
                        alt={raper.img}
                        width={80}
                        height={80}
                        loading="eager"
                        unoptimized={false}
                        className={`guessedInfo relative animate-fadeIn1 ${
                          raper.img !== randomRapper.img
                            ? "incorrect"
                            : "correct"
                        }`}
                      />
                      {/* Year */}
                      <div
                        className={`guessedInfo relative animate-fadeIn2 ${
                          raper.year !== randomRapper.year
                            ? "incorrect"
                            : "correct"
                        }`}
                      >
                        <h1 className="font-black text-5xl max-md:text-xl">
                          {thisYear - raper.year}
                        </h1>
                        <h1 className="icon material-symbols-outlined">
                          {thisYear - raper.year !==
                          thisYear - randomRapper.year ? (
                            thisYear - raper.year <
                            thisYear - randomRapper.year ? (
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
                          raper.labels[0] === randomRapper.labels[0]
                            ? "correct"
                            : raper.labels.some((label) =>
                                randomRapper.labels.includes(label)
                              )
                            ? "middle"
                            : "incorrect"
                        }`}
                      >
                        <h1 className="labelsText font-black text-center text-xs">
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
                          raper.placeofbirth !== randomRapper.placeofbirth
                            ? raper.voivodeship !== randomRapper.voivodeship
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
                          raper.albums.length !== randomRapper.albums.length
                            ? "incorrect"
                            : "correct"
                        }`}
                      >
                        <h1 className="font-black text-5xl max-md:text-xl">
                          {raper.albums.length}
                        </h1>
                        <h1 className="icon material-symbols-outlined">
                          {raper.albums.length !==
                          randomRapper.albums.length ? (
                            raper.albums.length < randomRapper.albums.length ? (
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
                          raper.gender !== randomRapper.gender
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
      ) : (
        <></>
      );
    case "cover":
      return category !== "404" ? (
        <main className="flex flex-col h-auto grow relative">
          {(isWin && <WinAlert />) || (isLose && <LoseAlert />)}
          <div className="flex flex-col justify-center items-center">
            <div className="mainInfoGame">
              <p className="font-black text-xl  max-md:text-base">
                Tryb: {category}
              </p>
              <div className="flex flex-row">
                {category == "normal" && (
                  <div
                    className={`attemptsLeft relative flex flex-col justify-center items-center ${
                      guessedData.length == 5 ? "incorrect" : "correct"
                    }`}
                  >
                    <h1 className="font-light text-xl max-md:text-sm">
                      Próby:
                    </h1>
                    <h1 className="font-black text-5xl max-md:text-3xl">
                      {" "}
                      {5 - guessedData.length}
                    </h1>
                  </div>
                )}
                {/* STREAKS */}
                <div className="relative flex justify-center items-center">
                  <Image
                    src="/images/StreakFire.png"
                    width={90}
                    height={90}
                    quality={100}
                    className={` streakFire duration-500 ${
                      (category === "normal" &&
                        (streakCoverNormal === 0
                          ? "saturate-0"
                          : "saturate-1")) ||
                      (category === "freestyle" &&
                        (streakCoverFreestyle === 0
                          ? "saturate-0"
                          : "saturate-1"))
                    }`}
                  />
                  <h1 className="font-black text-3xl bottom-3 streakText">
                    {category == "normal"
                      ? streakCoverNormal
                      : streakCoverFreestyle}
                  </h1>
                </div>
              </div>
              <h1 className="font-black text-2xl  max-md:text-base">
                Zgadnij dzisiejszy album
              </h1>
            </div>
            {category === "freestyle" && (
              <p
                onClick={
                  !disabled
                    ? () => {
                        setIsLose(true, "instant");
                        ResetStreaks();
                      }
                    : RestartGame
                }
                className="cursor-pointer text-sm animate-pulse max-md:text-xs"
              >
                {!disabled ? "poddaj się" : "zagraj ponownie"}
              </p>
            )}
            <div className="relative pixeloza">
              <div
                className={`filterImage ${
                  !disabled
                    ? guessedData.length == 0
                      ? "blur1 "
                      : guessedData.length == 1
                      ? "blur2"
                      : guessedData.length == 2
                      ? "blur3"
                      : guessedData.length == 3
                      ? "blur4"
                      : guessedData.length == 4
                      ? "blur5"
                      : guessedData.length == 5
                      ? "blur6"
                      : guessedData.length >= 6 && "blur7"
                    : "blur7"
                }`}
              ></div>
              <Pixelify
                src={"/" + randomCover.cover}
                width={400}
                height={400}
                centered={true}
                pixelSize={
                  !disabled
                    ? guessedData.length == 0
                      ? 100
                      : guessedData.length == 1
                      ? 80
                      : guessedData.length == 2
                      ? 60
                      : guessedData.length == 3
                      ? 40
                      : guessedData.length == 4
                      ? 20
                      : guessedData.length == 5
                      ? 10
                      : guessedData.length == 6
                      ? 5
                      : guessedData.length >= 7 && 0
                    : 0
                }
                fillTransparencyColor={"Transparent"}
              ></Pixelify>
            </div>

            <input
              className="guessInputCover"
              type="text"
              onChange={handleChange}
              disabled={isWin || isLose ? true : disabled}
              value={inputValue}
              onKeyDown={enterClick}
            />
            {/* LISA ALBUMOW */}
            {inputValue != 0 && filtredData.length > 0 && (
              <div className="albumsHints cursor-pointer flex flex-col gap-2">
                {filtredData.map((album) => (
                  <div
                    className="flex flex-row items-center justify-between"
                    key={album.title}
                    onClick={() => handleClick(album)}
                  >
                    <h1 className="font-black grow text-center">
                      {album.title}
                    </h1>
                  </div>
                ))}
              </div>
            )}
            {/* KLIKNIETE ALBUMY */}
            {guessedData.length > 0 && (
              <>
                <div className="albumsHints">
                  {guessedData.map((album, index) => (
                    <div
                      className="flex flex-row items-center justify-between"
                      key={album.title}
                    >
                      {/* IMG COVER */}
                      <Image
                        src={"/" + album.cover}
                        alt={album.cover}
                        width={80}
                        height={80}
                        loading="eager"
                        unoptimized={false}
                        className={`guessedInfo relative animate-fadeIn1 ${
                          album.cover !== randomCover.cover
                            ? "incorrect"
                            : "correct"
                        }`}
                      />
                      {/* Title */}
                      <div className="opacity-0 flex justify-center relative animate-fadeIn2 w-full ">
                        <h1
                          className={`rounded-lg font-black text-center w-auto ${
                            album.title !== randomCover.title
                              ? "incorrect"
                              : "correct"
                          }`}
                        >
                          {album.title}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="absolute bottom-0 left-0 text-transparent	hover:text-inherit bg-black p-2 rounded-2xl">
              {randomRapper.name} {randomCover.title}
            </div>
          </div>
        </main>
      ) : (
        <></>
      );
    default:
      return <></>;
  }
}
