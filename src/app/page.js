"use client";
import Image from "next/image";
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
        <div key={album.title} className="flex flex-row items-start">
          {/* <img src={album.cover} alt={album.title} className="w-5" /> */}
          <Image
            src={"/" + album.cover}
            width={25}
            height={25}
            alt={album.cover}
            loading="eager"
            unoptimized={false}
          />
          <p>{album.title}</p>
        </div>
      ));

    return (
      <div key={raper.id}>
        {/* <img src={raper.img} alt="zdj" className="h-60" /> */}
        <Image
          src={"/" + raper.img}
          width={240}
          height={240}
          quality={100}
          alt={raper.img}
          loading="eager"
          unoptimized={false}
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
  return <main className="items-start flex-wrap">{raperzy}</main>;
}
