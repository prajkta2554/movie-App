import { useEffect, useState } from "react";
import { IMDB_TOP_20, fetchMovieById } from "../services/api";
import MovieCard from "../components/MovieCard";
import { Box, Typography, TextField } from "@mui/material";
import { useMovies } from "../context/MovieContext";

const Search = () => {
  const { movies: backendMovies } = useMovies(); 
  const [imdbMovies, setImdbMovies] = useState([]);
  const [query, setQuery] = useState("");

  // Load IMDb Top 20 once
  useEffect(() => {
    const loadIMDBMovies = async () => {
      const data = await Promise.all(IMDB_TOP_20.map(fetchMovieById));
      setImdbMovies(data);
    };
    loadIMDBMovies();
  }, []);

  // Merge Backend + IMDb movies
  const allMovies = [
    ...backendMovies.map((m) => ({
      ...m,
      Title: m.title, 
      Poster: m.poster,
      imdbID: m._id,
      source: "backend",
    })),
    ...imdbMovies.map((m) => ({
      ...m,
      source: "imdb",
    })),
  ];

  const filteredMovies = allMovies.filter((movie) =>
    movie.Title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography
        variant="h4"
        sx={{ color: "#fff", mb: 3, fontWeight: "bold" }}
      >
        Search Movies
      </Typography>

      {/* Search Input */}
      <Box sx={{ mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Type movie name..."
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            bgcolor: "#1c1c1c",
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#E50914" },
              "&.Mui-focused fieldset": { borderColor: "#E50914" },
            },
          }}
        />
      </Box>

      {/* Movies Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 3,
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isAdminMovie={movie.source === "backend"} 
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "gray", gridColumn: "1/-1" }}>
            No movies found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Search;
