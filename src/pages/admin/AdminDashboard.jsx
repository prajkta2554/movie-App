import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        width: 220,
        height: 600,
        background: "#141414",
        color: "#fff",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, color: "#E50914" }}>
        Admin Panel
      </Typography>

      <Button
        fullWidth
        component={Link}
        to="/admin/dashboard"
        sx={{ color: "#fff", justifyContent: "flex-start" }}
      >
        Welcome Admin
      </Button>

      <Button
        fullWidth
        component={Link}
        to="/admin/movies"
        sx={{ color: "#fff", justifyContent: "flex-start" }}
      >
        Movies Center
      </Button>
    </Box>
  );
};

export default AdminSidebar;
