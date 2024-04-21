"use client";
import { useState, useEffect } from "react";

export default function game() {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [raper, setRaper] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  useEffect(() => {
    if (isLoading) {
      fetch("/rapers.json")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
    // const raper = data[Math.floor(Math.random() * data.length)];
  }, []);
  useEffect(() => {
    if (data.length != 0) {
      console.log(JSON.parse(JSON.stringify(data)).length);
      const raper = data[Math.floor(Math.random() * data.length)];
      console.log(raper);
      setRaper(raper);
    }
  }, [data]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    const filtered = data.filter((raper) =>
      raper.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFiltredData(filtered);
  };
  return (
    <main className="flex-col">
      <div>
        <h1 className="font-black text-2xl">Zgadnij dzisiejszego rapera</h1>
        <input className="guessInput" type="text" onChange={handleChange} />
        <p className="absolute bottom-0 left-0">{raper.name}</p>
        {inputValue != 0 && filtredData.length > 0 && (
          <div className="raperHints">
            {filtredData.map((raper) => (
              <div
                className="flex flex-row items-center justify-between"
                key={raper.id}
              >
                <img src={raper.img} className="w-20 p-2 rounded-3xl" alt="" />
                <h1 className="font-black grow text-center">{raper.name}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
