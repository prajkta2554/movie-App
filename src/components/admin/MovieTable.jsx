import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button, Avatar
} from "@mui/material";

const MovieTable = ({ movies, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Movie Name</TableCell>
          <TableCell>Poster</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie._id}>
            <TableCell>{movie.title}</TableCell>

            <TableCell>
              <Avatar src={movie.poster} variant="rounded" />
            </TableCell>

            <TableCell>
              <Button size="small" onClick={() => onEdit(movie)}>
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;
