import { useFormik } from "formik";
import { SignIn } from "../components/Schemas";
import "../App.css";
import Copyright from "../components/Copyright";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../config/config";



const LogIn = () => {
  const navigate = useNavigate();


  const initialValues = {
    email: "",
    pass: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignIn,
      onSubmit: async (values) => {
        const response = await fetch(`${baseURL}api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            pass: values.pass,
          }),
        });
        const data = await response.json();
           if (data.user) {
            localStorage.setItem("token", data.user);
          toast.success("Congratulations.. You are logged In.")
            navigate("/dashboard");
          
          } else {
          toast.warning("Invalid credentials.");
         
           
          }

      },
    });
  console.log(errors);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "yellow" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            autoComplete="off"
            required
            fullWidth
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
          
            sx={{
              "& input:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px #121212 inset",
                "-webkit-text-fill-color": "white",}
              }}
          
          />
           {errors.email && touched.email ? (
                <p className="error">*{errors.email}</p>
              ) : null}

              <TextField
                fullWidth
                autoComplete="off"
                required
                margin="normal"
                value={values.pass}
                onBlur={handleBlur}
                onChange={handleChange}
                name="pass"
                label="Password"
                type="password"
                id="pass"
               
                sx={{
                  "& input:-webkit-autofill": {
                    "-webkit-box-shadow": "0 0 0 100px #121212 inset",
                    "-webkit-text-fill-color": "white",}
                  }}
              
              />
      
          {errors.pass && touched.pass ? (
                <p className="error">*{errors.pass}</p>
              ) : null}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3, mb: 4 }} />
    </Container>
  );
};
export default LogIn;
