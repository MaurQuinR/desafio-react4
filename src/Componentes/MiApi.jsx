import { useState, useEffect } from 'react';
import Buscador from './Buscador'

// info guardará los valores traídos desde la API
var MiApi = () => {
  var [datos, setDatos] = useState([]);
  var [busqueda, setBusqueda] = useState('');

  // obtiene los datos de la API
  var consultarDatos = async () => {
    var url = 'https://www.feriadosapp.com/api/laws.json';
    var response = await fetch(url);
    var {data} = await response.json();
    setDatos(data)};
  
  // LLamamos al función que consume la API al momento de montar el componente
  useEffect(() => {
    consultarDatos();

  

  }, []);



  return (
    <div>
      <div className="mb-5">
        <label htmlFor="busqueda"><h2>Historia de los Feriados</h2></label>
        <input 
        id="busqueda"
        type="text"
        placeholder="Buscar Feriado"
        className="form-control"
        value={busqueda}
        onChange={(e) => {
        setBusqueda(e.target.value);
        }}
        />
    
      </div>

      <div className="col-8">
        {
          //se fitran los datos de beusqueda si esta vacio se muestran todos los item 
          datos.filter((elemento) => {
            if(busqueda === ''){
              return elemento;
            } else if (
              elemento.content
              .toLocaleLowerCase()
              .includes(busqueda.toLocaleLowerCase())
            ){
              return elemento;
            }
          })
          .map((item) => (
            <Buscador key={item.content} item={item} />
          ))
        }
      </div> 
           
    </div>
  );
};

export default MiApi;