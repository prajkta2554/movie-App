
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Stack,
  TableContainer,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMovies } from "../../context/MovieContext";
import { addMovie, updateMovie, deleteMovie } from "../../services/api";

const AdminMovies = () => {
  const { movies, fetchMovies } = useMovies();

  const [openForm, setOpenForm] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [name, setName] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);

  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleOpenForm = (movie = null) => {
    if (movie) {
      setEditMovie(movie);
      setName(movie.name);
      setPosterPreview(movie.poster || null);
    } else {
      setEditMovie(null);
      setName("");
      setPosterPreview(null);
    }
    setPosterFile(null);
    setOpenForm(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Movie name required");

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (posterFile) formData.append("poster", posterFile);

      if (editMovie) {
        await updateMovie(editMovie._id, formData, token);
        toast.success("Movie updated");
      } else {
        if (!posterFile) return toast.error("Poster required");
        await addMovie(formData, token);
        toast.success("Movie added");
      }

      setOpenForm(false);
      setEditMovie(null);
      setPosterFile(null);
      setPosterPreview(null);
      fetchMovies();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await deleteMovie(id, token);
      toast.success("Movie deleted");
      fetchMovies();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Box
      p={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: "100%", overflowX: "hidden" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "20px", sm: "24px", md: "32px" } }}
      >
        Manage Movies
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2, width: { xs: "100%", sm: "auto" } }}
        onClick={() => handleOpenForm()}
      >
        + Add Movie
      </Button>

      <Paper elevation={3}>
        <TableContainer sx={{ maxHeight: { xs: 420, md: "none" } }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Poster</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {movies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No movies found
                  </TableCell>
                </TableRow>
              )}

              {movies.map((movie, idx) => (
                <TableRow key={movie._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 160,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.name}
                  </TableCell>

                  <TableCell>
                    <img
                      src={movie.poster || "/placeholder.png"}
                      alt={movie.name}
                      style={{
                        width: "60px",
                        height: "auto",
                        borderRadius: 6,
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent="center"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenForm(movie)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(movie._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/*  DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>
          {editMovie ? "Edit Movie" : "Add Movie"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Movie Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          {posterPreview && (
            <Box mt={2}>
              <Typography variant="caption">Poster Preview</Typography>
              <br />
              <img
                src={posterPreview}
                alt="preview"
                style={{
                  width: "100%",
                  maxWidth: 160,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default AdminMovies;
