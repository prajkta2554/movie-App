
// OMDb — Top 20 IMDB Movies (optional, if needed)
export const API_KEY = "847ee449";

export const IMDB_TOP_20 = [
  "tt0111161","tt0068646","tt0071562","tt0468569","tt0050083",
  "tt0108052","tt0167260","tt0110912","tt0060196","tt0137523",
  "tt0120737","tt0109830","tt1375666","tt0080684","tt0167261",
  "tt0073486","tt0099685","tt0047478","tt0114369","tt0317248",
];

// Fetch movie from OMDb by ID
export const fetchMovieById = async (id) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  return res.json();
};


// BACKEND API

export const BACKEND_API = "http://localhost:5000/api";

//  USER FEATURES

// Get all movies
export const getAllMovies = async () => {
  const res = await fetch(`${BACKEND_API}/movies`);
  return res.json();
};

// Search movies
export const searchMovies = async (query) => {
  const res = await fetch(`${BACKEND_API}/movies/search?q=${query}`);
  return res.json();
};

// Get movie by ID
export const getMovieById = async (id) => {
  const res = await fetch(`${BACKEND_API}/movies/${id}`);
  return res.json();
};

//AUTH 

// Admin Login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BACKEND_API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

//  ADMIN CRUD (FILE UPLOAD) 

// Add Movie (FormData)
export const addMovie = async (formData, token) => {
  const res = await fetch(`${BACKEND_API}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    body: formData,
  });
  return res.json();
};

// Update Movie (FormData)
export const updateMovie = async (id, formData, token) => {
  const res = await fetch(`${BACKEND_API}/movies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
};

// Delete Movie
export const deleteMovie = async (id, token) => {
  const res = await fetch(`${BACKEND_API}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
