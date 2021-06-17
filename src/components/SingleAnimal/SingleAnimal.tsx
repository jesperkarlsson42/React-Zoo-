import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Animal } from "../../models/Animal";
import "./singleanimal.css";

interface IParams {
  id: string;
}

export const SingleAnimal = () => {
  let defaultValues: Animal = {
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
    medicine: "",
    isFed: false,
    lastFed: new Date(),
  };

  let { id } = useParams<IParams>();

  const [animal, setAnimal] = useState(defaultValues);
  const [buttonToggle, setButtonToggle] = useState(false);
 

  function feedAnimal() {
    const animals: Animal[] = JSON.parse(localStorage.animals);

    for (let i = 0; i < animals.length; i++) {
      if (animals[i].id === parseInt(id)) {
        animals[i].isFed = true;
        animals[i].lastFed = new Date();
        localStorage.setItem("animals", JSON.stringify(animals));
        setAnimal(animals[i]);
        setButtonToggle(true);
      }
    }

    console.log(animal);
  }

  const animalsFromLS = localStorage.getItem("animals");

  useEffect(() => {
    if (animalsFromLS !== null) {
      const animals = JSON.parse(animalsFromLS);
      console.log(animals);

      for (let i = 0; i < animals.length; i++) {
        if (animals[i].id === parseInt(id)) {
          let currentDate = new Date();
          let updateLastFed = new Date(animals[i].lastFed);
          let diffMilli = currentDate.getTime() - updateLastFed.getTime();
          let diffHour = Math.floor((diffMilli / (1000 * 60 * 60)) % 24);

          if (diffHour >= 3) {
            console.log("djuret är hungrig");
            animals[i].isFed = false;
            setButtonToggle(false);
            localStorage.setItem("animals", JSON.stringify(animals));
          }

          console.log(animals);
          setAnimal(animals[i]);
        }
      }
    }
  }, [id, animalsFromLS]);



  return (
    <>
      <Link to="/">tillbaka</Link>
      <p>{animal.name}</p>
      <p>{animal.id}</p>
      <img className="img" src={animal.imageUrl} alt={animal.name}></img>
      <p>{animal.longDescription}</p>
      <p>{animal.isFed.toString()}</p>
      <p>{animal.lastFed.toString()}</p>

      {buttonToggle ? <></> : <button onClick={feedAnimal}>Mata mig</button>}
      
    </>
  );
};
