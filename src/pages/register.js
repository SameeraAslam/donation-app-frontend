import Copyright from "../components/Copyright";
import "../App.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../components/Schemas";
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
import { toast } from "react-toastify";
import { baseURL } from "../config/config";


const Register = () => {
  const navigate = useNavigate();


  const initialValues = {
    name: "",
    lname: "",
    email: "",
    pass: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUp,
      onSubmit: async (values) => {
        const response = await fetch(`${baseURL}api/regitser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            lname: values.lname,
            email: values.email,
            pass: values.pass,
          }),
        });
        const data = await response.json();
        console.log("data", data);
        if (response.status === 200) {
          toast.success("Congratulations! You are registered..");
          navigate("/login");
        } else {
          toast.warning(data.message);
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
        <Avatar sx={{ m: 1, bgcolor: "yellow" }}>{/*  */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
  
              <TextField
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                name="name"
                fullWidth
                id="name"
                label="First Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "-webkit-box-shadow": "0 0 0 100px #121212 inset",
                    "-webkit-text-fill-color": "white",}
                  }}
                
              />
              {errors.name && touched.name ? (
                <p className="error">*{errors.name}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              
              <TextField
                fullWidth
                value={values.lname}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                id="lname"
                label="Last Name"
                name="lname"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "-webkit-box-shadow": "0 0 0 100px #121212 inset",
                    "-webkit-text-fill-color": "white",}
                  }}
              />
              {errors.lname && touched.lname ? (
                <p className="error">*{errors.lname}</p>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3 }} />
  
    </Container>
  );
};
export default Register;
