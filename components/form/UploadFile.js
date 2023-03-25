import { Axios } from "@lib/axios";
import { modalStyle } from "@lib/customStyles";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Label from "components/FormLabel";
import { useSession } from "next-auth/react";
import { useState } from "react";

const UploadFile = ({ open, setOpen, setIsSubmit }) => {
  const { data: session } = useSession();
  console.log(session);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch(
      // "http://localhost:5000/api/class/upload-file",
      "https://online-education-server-three.vercel.app/api/class/upload-file",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.status === 200) {
      setOpen(false);
    }
    const responseWithBody = await response.json();
    if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(400)}>
          <Grid container spacing={4}>
            <Grid
              item
              sx={{
                margin: "auto",
                backgroundColor: "white",
                paddingRight: "32px",
                paddingBottom: "32px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid item>
                  <Label htmlFor="file" required={true} label="file" />
                  <TextField
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                  />
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadFile;
