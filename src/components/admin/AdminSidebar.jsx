import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
      }}
    >
      {/* ADMIN TITLE */}
      <Typography
        variant="h5"
        sx={{ color: "#E50914", fontWeight: "bold", mb: 4 }}
      >
        Admin Dashboard
      </Typography>

      {/* AVATAR */}
      <Avatar sx={{ width: 80, height: 80, mb: 2 }} />

      <Typography sx={{ mb: 3 }}>Admin</Typography>

      <Divider sx={{ width: "80%", bgcolor: "#333", mb: 3 }} />

      {/* SETTINGS */}
      <IconButton sx={{ color: "#fff" }}>
        <SettingsIcon />
      </IconButton>

      {/* LOGOUT */}
      <IconButton sx={{ color: "#E50914", mt: 2 }} onClick={logout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default AdminSidebar;
