import React from "react";

export default function InfoTip(props) {
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
}
