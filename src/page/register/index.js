import {
  Button,
  TextField,
  FormControl,
  Alert,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import styles from "./Register.module.scss";
import FormError from "../../components/formError";
import { registerUser } from "../../services";
import { useNavigate, Link } from "react-router-dom";
import BackdropLoading from "../../components/backDrop";

const Register = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
    showCPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [errorTop, setErrorTop] = useState("");
  const navigate = useNavigate();
  const userRegister = JSON.stringify({
    fullName: values.fullname,
    PhoneNumber: values.phone,
    userName: values.username,
    email: values.email,
    password: values.password,
  });

  const handleRegister = async () => {
    const res = await registerUser(userRegister);
    if (res) {
      setAlertSuccess(true);
      setOpenLoading(false);
    }
  };

  const handleDirectLogin = () => {
    navigate("/login");
  };

  const handleOnChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = (prop) => (e) => {
    if (prop === "password") {
      setValues({ ...values, showPassword: !values.showPassword });
    } else {
      setValues({ ...values, showCPassword: !values.showCPassword });
    }
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const validateEmail = (email) => {
    if (email) {
      return email.match(/\S+@\S+\.\S+/);
    }
  };

  const validatePassword = (pass) => {
    if (pass) {
      return pass.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
      );
    }
  };

  const validateUsername = (name) => {
    if (name) {
      return name.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setOpenLoading(true);
    let isSubmit = true;

    let inputsError = {};

    if (
      values.fullname === null ||
      values.fullname === undefined ||
      values.fullname === ""
    ) {
      inputsError.fullname = "Missing Fullname";
      isSubmit = false;
    }

    if (
      values.phone === null ||
      values.phone === undefined ||
      values.phone === ""
    ) {
      inputsError.phone = "Missing Phone";
      isSubmit = false;
    }

    if (
      values.username === null ||
      values.username === undefined ||
      values.username === ""
    ) {
      inputsError.username = "Missing Username";
      isSubmit = false;
    } else {
      if (!validateUsername(values.username)) {
        inputsError.username = "Username invalid";
        isSubmit = false;
      }
    }

    if (
      values.email === null ||
      values.email === undefined ||
      values.email === ""
    ) {
      inputsError.email = "Missing Email";
      isSubmit = false;
    } else {
      if (!validateEmail(values.email)) {
        inputsError.email = "Email invalid";
        isSubmit = false;
      }
    }

    if (
      values.password === null ||
      values.password === undefined ||
      values.password === ""
    ) {
      inputsError.password = "Missing Password";
      isSubmit = false;
    } else {
      if (!validatePassword(values.password)) {
        inputsError.password =
          "Password must be at least 8 characters, must be at least 1 uppercase, must be at least 1 number and must be at least 1 special character";
        isSubmit = false;
      }
    }

    if (
      values.cpassword === null ||
      values.cpassword === undefined ||
      values.cpassword === ""
    ) {
      inputsError.cpassword = "Missing Confirm Password";
      isSubmit = false;
    } else {
      if (values.cpassword !== values.password) {
        inputsError.cpassword = "Confirm Password not match Password";
        isSubmit = false;
      }
    }

    if (!isSubmit) {
      setErrors(inputsError);
      setErrorTop("Register Fail! Please check again.")
      setOpenLoading(false);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      setErrorTop("")
      setValues({
        ...values,
        fullname: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
      handleRegister();
    }
  };
  console.log(typeof(errors.fullname))
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Register</h1>
      </div>
      <div className={styles.content}>
        <FormControl fullWidth sx={{ m: 1 }}>
          {errorTop !== "" && <FormError errors={errorTop} />}
          {alertSuccess && (
            <Alert severity="success">
              Register Successfully —
              <strong className={styles.pointer} onClick={handleDirectLogin}>
                Login now
              </strong>
            </Alert>
          )}
        </FormControl>
        <form onSubmit={handleSubmitRegister}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-fullname"
              name="fullname"
              label="FullName"
              variant="outlined"
              error={errors.fullname !== undefined}
              helperText={errors.fullname !== "" && errors.fullname}
              value={values.fullname ? values.fullname : ""}
              onChange={handleOnChange("fullname")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-phone"
              name="phone"
              label="Phone"
              variant="outlined"
              type={"number"}
              error={errors.phone !== undefined} 
              helperText={errors.phone !== "" && errors.phone}
              value={values.phone ? values.phone : ""}
              onChange={handleOnChange("phone")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-username"
              name="username"
              label="Username"
              variant="outlined"
              error={errors.username !== undefined}
              helperText={errors.username !== "" && errors.username}
              value={values.username ? values.username : ""}
              onChange={handleOnChange("username")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-email"
              name="email"
              label="Email"
              variant="outlined"
              error={errors.email !== undefined}
              helperText={errors.email !== "" && errors.email}
              value={values.email ? values.email : ""}
              onChange={handleOnChange("email")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              label="Password"
              variant="outlined"
              error={errors.password !== undefined}
              value={values.password ? values.password : ""}
              onChange={handleOnChange("password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!errors.password && (
              <FormHelperText error id="outlined-adornment-password">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              name="cpassword"
              label="Confirm Password"
              variant="outlined"
              error={errors.cpassword !== undefined}
              value={values.cpassword ? values.cpassword : ""}
              onChange={handleOnChange("cpassword")}
              type={values.showCPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword("cpassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showCPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!errors.cpassword && (
              <FormHelperText error id="outlined-adornment-confirm-password">
                {errors.cpassword}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <p style={{ margin: "0 auto" }}>
              Have already an account?{" "}
              <Link to="/login" style={{ color: "#000", fontWeight: 600 }}>
                {" "}
                Login now
              </Link>
            </p>
          </FormControl>
        </form>
      </div>
      <BackdropLoading openLoading={openLoading} />
    </div>
  );
};

export default Register;
