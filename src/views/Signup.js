import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Box, Button, TextField, Typography } from "@mui/material";
function SignUp(props) {
  const [inputEmail, setInputEmail] = useState("");

  const router = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
      .regex(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid email format. Please provide a valid email address.",
      }),
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { email: inputEmail },
      { abortEarly: false }
    );

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
    } else {
      // Validation passed, handle form submission
      // For example, you can make an API call here
    }
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
            onChange={(event) => setInputEmail(event.target.value)}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: "30px" }}
          >
            Signup
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
                router("/");
              }}
            >
              Already have an account?
            </Typography>{" "}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default withStyles(styles)(SignUp);
