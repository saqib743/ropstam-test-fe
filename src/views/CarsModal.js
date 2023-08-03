import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
function CarsModal(props) {
  const { isOpenDialog, setIsOpenDialog, isOpenDialogMode } = props;
  const [errors, setErrors] = useState({});

  const [inputCategoryId, setInputCategoryId] = useState(null);
  const [inputCarName, setInputCarName] = useState("");

  const schema = Joi.object({
    inputCarName: Joi.string()

      .required()
      .max(25),

    inputCategoryId: Joi.number().required(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { inputCarName, inputCategoryId },
      { abortEarly: false }
    );

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
    } else {
    }
  };
  return (
    <Dialog
      open={isOpenDialog}
      onClose={() => {
        setIsOpenDialog(false);
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography>{isOpenDialogMode}</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography fontWeight={"600"}>Car Name</Typography>
          <TextField
            error={errors.inputCarName !== undefined}
            type="text"
            fullWidth
            disableUnderline
            placeholder="Enter car name"
            onChange={(event) => setInputCarName(event.target.value)}
          />
          {errors.inputCarName && (
            <span style={{ color: "red" }}>{errors.inputCarName}</span>
          )}
          <Typography fontWeight={"600"} style={{ marginTop: "20px" }}>
            Category Name
          </Typography>
          <TextField
            error={errors.inputCategoryId !== undefined}
            type="text"
            fullWidth
            disableUnderline
            placeholder="Enter categoryId"
            onChange={(event) => setInputCategoryId(+event.target.value)}
          />
          {errors.inputCategoryId && (
            <span style={{ color: "red" }}>{errors.inputCategoryId}</span>
          )}{" "}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: "30px" }}
          >
            {isOpenDialogMode}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(CarsModal);
