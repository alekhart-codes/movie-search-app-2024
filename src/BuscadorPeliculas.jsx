import { useState } from "react"


  export const BuscadorPeliculas = () => {
    
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = '99a303844f42e1a5ebcdcd3be602dd5a';
  
    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]); // Inicializar como un array vacío
  
    const handleInputChange = (e) => {
      setBusqueda(e.target.value);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetchPeliculas();
    }
  
    const fetchPeliculas = async () => {
      try {
        const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`);
        const data = await response.json();
        setPeliculas(data.results); // Establecer las películas como el array de resultados
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className="container">
        <h1 className="title">Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={busqueda}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
  
        <div className="movie-list">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
              <h2>{pelicula.title}</h2>
              <p>{pelicula.overview}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  