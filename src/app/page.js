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
  const raperzy = data.map((raper) => (
    <div key={raper.id}>
      <img src={raper.img} alt="" className="h-60" />
      <h1 className="font-bold text-2xl">{raper.name}</h1> <br />
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
        Miejsce urodzenia: <strong>{raper.placeofbirth}</strong>
      </p>
      <p>
        Ilosc wydanych albumów: <strong>{raper.numberofalbums}</strong>
      </p>
      <p>
        Plec: <strong>{raper.gender}</strong>
      </p>
    </div>
  ));
  console.log(data);
  return <main className="items-start flex-wrap">{raperzy}</main>;
}
