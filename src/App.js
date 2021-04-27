import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {

  const [search, setSearch] = useState({
    city: "",
    country: ""
  });

  const [call, getCall] = useState(false);

  const [result, getResult] = useState({});
  const [error, setError] = useState(false);

  const { city, country } = search;

  useEffect(() => {
    const callApi = async () => {

      if (call) {
        const APIkey = 'f11b098821139b82d88abdf4c5cf5382';

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;

        const answer = await fetch(URL);

        const info = await answer.json();

        console.log(info);

        getResult(info);

        getCall(false);

        // Detecta si hubo resultados correctos en la consulta

        if (info.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    callApi();
  }, [call]);

  let component;
  if (error === true) {
    component = <Error message="No hay resultados" />
  } else {
    component = <Weather
      result={result}
    />
  }


  return (
    <Fragment>
      <Header
        title='Api de clima'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                getCall={getCall}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
