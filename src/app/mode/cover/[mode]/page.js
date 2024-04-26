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
      const randomRapper = data[Math.floor(Math.random() * data.length)];
      let randomAlbum;
      do {
        const randomIndex = Math.floor(
          Math.random() * randomRapper.albums.length
        );
        randomAlbum = randomRapper.albums[randomIndex];
      } while (randomAlbum.title === "None");
      setRandomCover(randomAlbum);
      console.log(randomAlbum);
    }
  }, [data]);
  return (
    mode !== "404" && (
      <main className="flex flex-col h-auto grow relative">
        <h1>Cover {params.mode}</h1>
        <Image
          src={"/" + randomCover.cover}
          alt={"elo zelo"}
          width={400}
          height={400}
          loading="eager"
          unoptimized={false}
          className=" p-2 rounded-3xl"
        />
        <h1 className="font-bold text-xl">{randomCover.title}</h1>
      </main>
    )
  );
}
