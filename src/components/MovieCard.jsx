import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const MovieCard = ({ movie }) => {
  return (
    <Card
      sx={{
        width: 260,
        bgcolor: "#1c1c1c",
        color: "#fff",
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="360"
        image={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
      />

      <CardContent>
        <Typography variant="h6" noWrap>
          {movie.Title}
        </Typography>

        <Typography variant="body2" color="gray">
          Year: {movie.Year}
        </Typography>

        <Typography variant="body2" color="gray">
          Rating: ⭐ {movie.imdbRating}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
