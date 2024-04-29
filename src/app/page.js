"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
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

  const thisYear = new Date().getFullYear();
  const raperzy = data.map((raper) => {
    const albums = raper.albums
      .filter((album) => album.title !== "None")
      .map((album) => (
        <div key={album.title} className="flex flex-row items-start ">
          <Image
            src={"/" + album.cover}
            width={25}
            height={25}
            alt={album.cover}
            loading="eager"
            unoptimized={false}
          />
          <p className="w-52 hover:text-[color:rgb(var(--theme-rgb))] transition duration-50 ease-in-out">
            {album.title}
          </p>
        </div>
      ));

    return (
      <div key={raper.id}>
        {/* <img src={raper.img} alt="zdj" className="h-60" /> */}
        <Image
          src={"/" + raper.img}
          width={240}
          height={240}
          quality={70}
          alt={raper.img}
          loading="eager"
          priority={true}
        />
        <h1 className="font-bold text-2xl">{raper.name}</h1>
        <br />
        <h2>
          Label:{" "}
          <strong>
            {raper.labels.length < 2
              ? raper.labels
              : raper.labels.map((label, index) => (
                  <span key={index}>
                    {label}
                    {index !== raper.labels.length - 1 && <br />}
                  </span>
                ))}
          </strong>
        </h2>
        <p>
          Wiek: <strong>{thisYear - raper.year}</strong>
        </p>
        <p>
          Miejsce urodzenia: <strong>{raper.placeofbirth}</strong>
        </p>
        <p>
          Ilość wydanych albumów: <strong>{raper.albums.length}</strong>
        </p>
        <div className="flex flex-col justify-center">{albums}</div>
        <p>
          Płeć: <strong>{raper.gender}</strong>
        </p>
      </div>
    );
  });
  console.log(data);

  return (
    <main className="flex flex-col items-center flex-wrap justify-center grow">
      <div className="">
        <h1 className="font-black text-5xl p-5 flex text-nowrap flex-row items-center justify-center gap-3 max-md:flex-col">
          Welcome to <span className="themeGradient">Rapdle</span>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 p-5 max-md:flex-col">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Rapper</h1>
          <p>Mode:</p>
          <div className="flex gap-2">
            <Link href="/mode/rapper/normal">
              <button className="chooseModeButton">Normal</button>
            </Link>
            <Link href="/mode/rapper/freestyle">
              <button className="chooseModeButton">Freestyle</button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Cover</h1>
          <p>Mode:</p>
          <div className="flex gap-2">
            <Link href="/mode/cover/normal">
              <button className="chooseModeButton">Normal</button>
            </Link>
            <Link href="/mode/cover/freestyle">
              <button className="chooseModeButton">Freestyle</button>
            </Link>
          </div>
        </div>
      </div>
      <button
        className="chooseModeButton m-5"
        onClick={() => setLoading(!isLoading)}
      >
        Toggle rappers
      </button>
      <div className="flex items-start justify-center flex-wrap">
        {isLoading && raperzy}
      </div>
    </main>
  );
}
