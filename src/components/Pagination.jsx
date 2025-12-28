import { Pagination as MuiPagination, Box } from "@mui/material";

const Pagination = ({ total, perPage, current, onChange }) => {
  const pages = Math.ceil(total / perPage);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <MuiPagination
        count={pages}
        page={current}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
