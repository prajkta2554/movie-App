import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
