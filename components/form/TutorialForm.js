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
import { File } from "feather-icons-react/build/IconComponents";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppContext } from "store/store";

const TutorialForm = ({ open, setOpen, setIsSubmit }) => {
  const { data: session } = useSession();
  console.log(session);
  const [tutorial, setTutorial] = useState({
    class: "",
    group: "",
    subject: "",
    topics: "",
    lecture: "",
    file: null,
  });
  console.log(tutorial);
  const router = useRouter();
  const { userDispatch, existMessage, setExistMessage } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "class",

        {
          teacher: session?.user?.user?.email,
          class: tutorial.class,
          group: tutorial.group,
          subject: tutorial.subject,
          lecture: tutorial.lecture,
          topics: tutorial.topics,
          file: tutorial.file,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      if (res.status === 200) {
        router.push("/auth/signIn/?user=admin");
        setTutorial({
          ...tutorial,
          class: "",
          subject: "",
          group: "",
          lecture: "",
          topics: "",
        });

        // userDispatch({
        //   type: "ADD_USER",
        //   payload: ,
        // });
      }
    } catch (error) {
      if (error) {
        if (error?.response?.status === 409) {
          setExistMessage(error.response.data.message);
        }
      }
    }
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
                  <Label htmlFor="class" required={true} label="Select class" />
                  <Select
                    sx={{
                      marginBottom: "10px",
                    }}
                    onChange={(e) =>
                      setTutorial({ ...tutorial, class: e.target.value })
                    }
                    value={tutorial.class}
                    displayEmpty
                    fullWidth
                    placeholder="Select class"
                  >
                    <MenuItem value="" disabled>
                      <em>Select a class</em>
                    </MenuItem>
                    <MenuItem value="nine">Nine</MenuItem>
                    <MenuItem value="ten">Ten</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <Label htmlFor="group" required={true} label="Select group" />
                  <Select
                    sx={{
                      marginBottom: "10px",
                    }}
                    onChange={(e) =>
                      setTutorial({ ...tutorial, group: e.target.value })
                    }
                    value={tutorial.group}
                    displayEmpty
                    fullWidth
                    placeholder="Select group"
                  >
                    <MenuItem value="" disabled>
                      <em>Select a group</em>
                    </MenuItem>
                    <MenuItem value="sceince">Science</MenuItem>
                    <MenuItem value="commerce">Commerce</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <Label
                    htmlFor="subject"
                    required={true}
                    label="Select subject"
                  />
                  <Select
                    sx={{
                      marginBottom: "10px",
                    }}
                    onChange={(e) =>
                      setTutorial({ ...tutorial, subject: e.target.value })
                    }
                    value={tutorial.subject}
                    displayEmpty
                    fullWidth
                    placeholder="Select subject"
                  >
                    <MenuItem value="" disabled>
                      <em>Select a subject</em>
                    </MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Math">Math</MenuItem>
                  </Select>
                </Grid>

                <Grid item>
                  <Label htmlFor="lecture" required={true} label="lecture" />
                  <TextField
                    id="lecture"
                    placeholder="lecture"
                    value={tutorial.lecture}
                    onChange={(e) =>
                      setTutorial({ ...tutorial, lecture: e.target.value })
                    }
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                    type="text"
                  />
                </Grid>
                <Grid item>
                  <Label htmlFor="topics" required={true} label="topics" />
                  <TextField
                    id="topics"
                    placeholder="topics"
                    value={tutorial.topics}
                    type="topics"
                    onChange={(e) =>
                      setTutorial({ ...tutorial, topics: e.target.value })
                    }
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <Label htmlFor="file" required={true} label="file" />
                  <TextField
                    id="file"
                    placeholder="file"
                    // value={tutorial.file}
                    type="file"
                    onChange={(e) =>
                      setTutorial({
                        ...tutorial,
                        file: {
                          preview: URL.createObjectURL(e.target.files[0]),
                          data: e.target.files[0],
                        },
                      })
                    }
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

export default TutorialForm;
