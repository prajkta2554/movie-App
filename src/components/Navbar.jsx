import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { admin, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ background: "#141414" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT SIDE */}
        <Box>
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#E50914",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            MovieApp
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/movies">
            Movies
          </Button>

          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>

          {/* ADMIN DASHBOARD */}
          {admin && admin.role === "admin" && (
            <Button
              color="inherit"
              component={Link}
              to="/admin/dashboard"  
            >
              Admin Dashboard
            </Button>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box>
          {!admin ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout (Admin)
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
