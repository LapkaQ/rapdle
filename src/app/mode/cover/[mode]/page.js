"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import InfoTip from "../../../components/InfoTip";
export default function Game({ params }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [guessedData, setGuessedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [randomCover, setRandomCover] = useState({});
  const [randomRapper, setRandomRapper] = useState({});
  const [mode, setMode] = useState(
    params.mode == "normal"
      ? "normal"
      : params.mode == "freestyle"
      ? "freestyle"
      : "404"
  );
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
    if (data.length != 0) {
      let randomAlbum;
      let randomIndex;
      do {
        const randomRapper = data[Math.floor(Math.random() * data.length)];
        randomIndex = Math.floor(Math.random() * randomRapper.albums.length);
        randomAlbum = randomRapper.albums[randomIndex];
        console.log(randomIndex);
        setRandomRapper(randomRapper);
      } while (randomAlbum.title === "None");

      setRandomCover(randomAlbum);
    }
  }, [data]);
  return (
    mode !== "404" && (
      <main className="flex flex-col h-auto grow relative">
        {" "}
        <p className="font-black text-xl">Tryb: {mode}</p>
        <h1 className="font-black text-2xl">Zgadnij dzisiejszy album</h1>
        <Image
          src={"/" + randomCover.cover}
          alt={"elo zelo"}
          width={400}
          height={400}
          loading="eager"
          unoptimized={false}
          className=" p-2 rounded-3xl m-2"
          priority={true}
        />{" "}
        <div className="flex flex-col justify-center items-center content">
          <input
            className="guessInput"
            type="text"
            // onChange={handleChange}
            // disabled={isWin || isLose ? true : disabled}
            // value={inputValue}
            // onKeyDown={enterClick}
          />
          <div className="absolute bottom-0 left-0 text-transparent	hover:text-inherit bg-black p-2 rounded-2xl">
            {randomRapper.name} {randomCover.title}
          </div>
        </div>
      </main>
    )
  );
}
