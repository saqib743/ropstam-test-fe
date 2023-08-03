import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

function SignIn(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const router = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
      .regex(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid email format. Please provide a valid email address.",
      }),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { email: inputEmail, password: inputPassword },
      { abortEarly: false }
    );

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
    } else {
      handleLogin();
    }
  };
  const handleLogin = () => {
    axios
      .post(config.baseURL + config.login, {
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data));
        localStorage.setItem("isLoggedIn", true);
        router("/cars");
      });
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
    >
      <Box
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        padding={"20px 20px"}
        borderRadius={"8px"}
      >
        <form onSubmit={handleSubmit}>
          <Typography fontWeight={"600"}>Email</Typography>
          <TextField
            error={errors.email !== undefined}
            type="text"
            fullWidth
            disableUnderline
            placeholder="Enter email"
            onChange={(event) => {
              setInputEmail(event.target.value);
              setErrors({});
            }}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          <Typography fontWeight={"600"} style={{ marginTop: "20px" }}>
            Password
          </Typography>
          <TextField
            error={errors.password !== undefined}
            type="password"
            fullWidth
            disableUnderline
            placeholder="Enter password"
            onChange={(event) => {
              setInputPassword(event.target.value);
              setErrors({});
            }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: "30px" }}
          >
            Login
          </Button>{" "}
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            style={{
              marginTop: "10px",
            }}
          >
            <Typography
              fontWeight={"400"}
              style={{ cursor: "pointer", color: "light-blue" }}
              onClick={() => {
                router("/signup");
              }}
            >
              Don't have an account?
            </Typography>{" "}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default withStyles(styles)(SignIn);
