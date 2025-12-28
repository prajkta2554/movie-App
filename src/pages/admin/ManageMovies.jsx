import { Box, Typography, Button } from "@mui/material";

const ManageMovies = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ color: "#fff" }}>
        Edit / Delete Movies (Demo)
      </Typography>

      <Typography sx={{ color: "gray" }}>
        Later we will connect backend.
      </Typography>
    </Box>
  );
};

export default ManageMovies;
