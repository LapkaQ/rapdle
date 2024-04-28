export default function Rules() {
  return (
    <main className="flex flex-row items-center  justify-center gap-40">
      <div className="tryby w-1/2">
        <h1 className="font-black text-5xl themeGradient">Poradnik</h1>
        <div className="flex flex-row gap-5">
          <div className="tryb">
            <p className="font-black text-3xl rulesTextH2">
              Gra &quot;Raper&quot;
            </p>
            <div className="font-bold text-2xl ">Opis:</div>
            <p>
              W trybie &quot;Raper&quot; gracz stara się zgadnąć tożsamość
              rapera na podstawie różnych kategorii, takich jak wiek, wytwórnia
              muzyczna, miejsce urodzenia, liczba wydanych albumów i płeć.
              Kafelki z informacjami są podświetlane na zielono, czerwono lub
              pomarańczowo, w zależności od trafności odpowiedzi.
            </p>
            <div className="font-bold text-2xl ">Inne:</div>
            <div className="text-sm flex  flex-col gap-2">
              <div>
                <p>Kolor pomarańczowy w kategorii &quot;Label&quot;</p>
                <div className="flex flex-row gap-1 items-center">
                  <div className="middle rounded-md bg-orange-500 w-5 h-5"></div>
                  <p>Mieli wspólną wytwórnię</p>
                </div>
              </div>
              <div>
                <p>
                  Kolor pomarańczowy w kategorii &quot;Miejsce urodzenia&quot;
                </p>
                <div className="flex flex-row gap-1 items-center">
                  <div className="middle rounded-md bg-orange-500 w-5 h-5"></div>
                  <p>Urodzili się w tym samym regionie</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tryb">
            <p className="font-black text-3xl rulesTextH2">
              Gra &quot;Cover&quot;
            </p>
            <div className="font-bold text-2xl ">Opis:</div>
            <p>
              W trybie &quot;Okładka&quot; gracz próbuje rozpoznać okładki
              albumów, które są rozpikselowane i posiadają zmniejszoną saturację
              kolorów. Z każdą nieudaną próbą, rozpikselowanie zmniejsza się, a
              nasycenie kolorów wzrasta. Gracz musi wpisać poprawny tytuł
              albumu, aby zdobyć punkty.
            </p>
          </div>
        </div>
      </div>

      <div className="tryby w-1/2">
        <h1 className="font-black text-5xl themeGradient">Streaks</h1>
        <div>
          <p className="font-black text-3xl rulesTextH2">Czym są Streaks?</p>
          <p>
            Streaks to punkty przyznawane za poprawne odgadnięcie pod rząd tego
            samego rapera lub albumu. Streaks resetują się po przegranej.
          </p>
        </div>
        <div>
          <div className="flex flex-row gap-5">
            <div className="tryb">
              <p className="font-black text-xl rulesTextH2">
                Tryb &quot;Normalny&quot;
              </p>
              <p>
                W trybie &quot;Normalnym&quot; gracz zdobywa Streaks za kolejne,
                poprawne odgadnięcia rapera lub albumu. Po pięciu nieudanych
                próbach Streaks gracza resetują się do zera.
              </p>
            </div>
            <div className="tryb">
              <p className="font-black text-xl rulesTextH2">
                Tryb &quot;Freestyle&quot;
              </p>
              <p>
                W trybie &quot;Freestyle&quot; gracz zdobywa Streaks za kolejne,
                poprawne odgadnięcia rapera lub albumu w mniej niż sześciu
                próbach. Po pięciu nieudanych próbach odgadnięcia, gracze nie
                otrzymują ani nie tracą Streaksów. Po kliknięciu przycisku{" "}
                <b>Poddaj się</b>, gracz traci Streaks i resetują się do zera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
