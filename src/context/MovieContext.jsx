import { createContext, useContext, useEffect, useState } from "react";
import { getAllMovies } from "../services/api";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await getAllMovies();
    setMovies(data);
  };

  useEffect(() => { fetchMovies(); }, []);

  return (
    <MovieContext.Provider value={{ movies, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
