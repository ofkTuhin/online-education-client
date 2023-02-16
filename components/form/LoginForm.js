import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useAppContext } from "store/store";
import Link from "next/link";

const LoginForm = ({ authProviders }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [type, setType] = useState(false);
  const { user, setUser } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    setUser(router.query?.user);
  }, [router]);
  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(user));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password + user,
      user: user,
      redirect: false,
    });
    console.log(res);
    // console.log(res);
    if (res.status === 200) {
      router.replace(`/${user}`);
      setUserInfo({ ...userInfo, email: "", password: "" });
    } else {
      setError("Try again incorrect email or password");
    }
  };
  return (
    <Grid container height={"80vh"}>
      {user ? (
        <Grid
          item
          sm={6}
          sx={{
            margin: "auto",
            backgroundColor: "white",
            paddingRight: "32px",
            paddingBottom: "32px",
          }}
        >
          <Typography variant="h1">Welcome to Admin Panel</Typography>
          <Typography variant="p">
            Please enter your login credentials to access admin page
          </Typography>
          <Typography color="red" mt="10px" fontSize="12px">
            {error}
          </Typography>
          {authProviders.map((provider) =>
            provider.name !== "Credentials" ? (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              </Box>
            ) : (
              <Box noValidate sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="useremail"
                    label="Email"
                    name="email"
                    type="email"
                    autoFocus
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                  <Grid
                    sx={{
                      position: "relative",
                    }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={type ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />

                    <IconButton
                      onClick={() => setType(!type)}
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "30%",
                        width: "32px",
                      }}
                    >
                      <FeatherIcon icon={type ? "eye-off" : "eye"} />
                    </IconButton>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, height: "50px" }}
                  >
                    Sign In
                  </Button>
                </form>
              </Box>
            )
          )}

          <Typography>
            Don't have an account?{" "}
            <Link href={`/registation/${user}`}>Registation</Link>
          </Typography>
        </Grid>
      ) : (
        <Grid
          item
          sm={3}
          sx={{
            margin: "auto",
            backgroundColor: "white",
            paddingRight: "32px",
            paddingBottom: "32px",
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
            onClick={() => router.push(`${router.asPath}?user=admin`)}
          >
            Admin
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
            onClick={() => router.push(`${router.asPath}?user=teacher`)}
          >
            Teacher
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
            onClick={() => router.push(`${router.asPath}?user=student`)}
          >
            Student
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginForm;
