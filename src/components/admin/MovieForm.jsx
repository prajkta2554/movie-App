import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

const MovieForm = ({ open, onClose, onSave, editMovie }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editMovie) {
      setTitle(editMovie.title);
    }
  }, [editMovie]);

  const handleSubmit = () => {
    if (!file && !editMovie) {
      alert("Please choose poster image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("poster", file);

    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editMovie ? "Edit Movie" : "Add Movie"}</DialogTitle>

      <DialogContent>
        <TextField
          label="Movie Name"
          fullWidth
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ONLY FILE PICKER */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MovieForm;
