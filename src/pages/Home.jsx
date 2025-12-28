import { useEffect, useState } from "react";
import { IMDB_TOP_20, fetchMovieById } from "../services/api";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const { movies: adminMovies } = useMovies(); 
  const [imdbMovies, setImdbMovies] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 5;

  // Load IMDb movies once
  useEffect(() => {
    const loadMovies = async () => {
      const data = await Promise.all(IMDB_TOP_20.map(fetchMovieById));
      setImdbMovies(data);
    };
    loadMovies();
  }, []);

  // Merge Admin + IMDb movies
  const allMovies = [...adminMovies, ...imdbMovies];

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography
        variant="h4"
        sx={{ color: "#fff", mb: 3, fontWeight: "bold" }}
      >
        Movies
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 3,
        }}
      >
        {allMovies.slice(start, end).map((movie) => (
          <MovieCard
            key={movie._id || movie.imdbID}
            movie={movie}
            isAdminMovie={!!movie._id} 
          />
        ))}
      </Box>

      <Pagination
        total={allMovies.length}
        perPage={perPage}
        current={page}
        onChange={setPage}
      />
    </Box>
  );
};

export default Home;
