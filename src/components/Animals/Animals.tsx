import React, { useState, useEffect } from "react";
import "./Animals.css";
import axios from "axios";
import { Animal } from "../../models/Animal";
import { Link } from "react-router-dom";

export const Animals = () => {
  let defaultValue: Animal[] = [];
  const [animals, setAnimals] = useState(defaultValue);

  useEffect(() => {
    const a = localStorage.getItem("animals");
    if (a) {
      setAnimals(JSON.parse(a));
      console.log("finns redan");
    } else {
      axios
        .get<Animal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          window.localStorage.setItem("animals", JSON.stringify(response.data));
        });
    }
  }, []);

  const divs = animals.map((animal, i) => {
    let currentDate = new Date();
    let updateLastFed = new Date(animals[i].lastFed);
    let diffMilli = currentDate.getTime() - updateLastFed.getTime();
    let diffHour = Math.floor((diffMilli / (1000 * 60 * 60)) % 24);

    if (diffHour >= 4) {
      console.log("djuret är hungrig");
      animals[i].isFed = false;
      localStorage.setItem("animals", JSON.stringify(animals));
    }
    return (
      <div key={animal.id} className="animal-div">
        <Link to={`/animal/${animal.id}`}>{animal.name}</Link>
        {diffHour >= 4 ? (
          <span className="fedme-span">Jag är hungrig</span>
        ) : (
          <></>
        )}
      </div>
    );
  });

  console.log("test");
  return <div>{divs}</div>;
};
