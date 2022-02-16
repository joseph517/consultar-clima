import { useState, useEffect } from "react";
const key = "0ba9229e69eb32a06884dcb2977d282d";
export function Search() {
  let [ciudad, setCiudad] = useState("");
  let [datosCiudad, setDatosCiudad] = useState();
  let [datoInput, setDatoInput] = useState();

  function onClick() {
    setCiudad(datoInput);
  }

  useEffect(() => {
    if (ciudad) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setDatosCiudad(data);
          } else {
            alert(data.message);
          }
        });
    }
  }, [ciudad]);

  function temperatura(temp) {
    let celcius = Math.round(temp - 273.15);
    return celcius;
  }
  return (
    <div className="container">
      <form
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
        }}
        id="fomulario-ciudad"
      >
        <input
          onChange={(e) => {
            setDatoInput(e.target.value);
          }}
          type="text"
          placeholder="Digite una ciudad"
        />
        <button id="btnBuscarCiudad" type="button" onClick={onClick}>
          Buscar
        </button>
      </form>

      {datosCiudad ? (
        <div>
          <div>
            <h2>{datosCiudad.name}</h2>
            <h2>{temperatura(datosCiudad.main.temp)}°C</h2>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
