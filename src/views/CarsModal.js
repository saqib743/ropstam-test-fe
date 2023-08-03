import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import config from "../config.json";
import axios from "axios";
function CarsModal(props) {
  const {
    isOpenDialog,
    setIsOpenDialog,
    isOpenDialogMode,
    hasSuccess,
    dataToEdit,
    categories,
  } = props;
  const [errors, setErrors] = useState({});

  const [inputCategoryId, setInputCategoryId] = useState(null);
  const [inputCarName, setInputCarName] = useState("");

  useEffect(() => {
    setInputCategoryId(dataToEdit?.categoryId);
    setInputCarName(dataToEdit?.carName);
  }, [dataToEdit]);

  const schema = Joi.object({
    inputCarName: Joi.string()

      .required()
      .max(25),

    inputCategoryId: Joi.string().required(),
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
      handleSave();
    }
  };

  const handleSave = () => {
    if (isOpenDialogMode === "Add") {
      axios
        .post(config.baseURL + config.addCars, {
          carName: inputCarName,
          categoryId: inputCategoryId,
        })
        .then((res) => {
          hasSuccess();
        });
    } else {
      axios
        .patch(config.baseURL + config.getCars + `/${dataToEdit.id}`, {
          carName: inputCarName,
          categoryId: inputCategoryId,
        })
        .then((res) => {
          hasSuccess();
        });
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
            value={inputCarName}
            error={errors.inputCarName !== undefined}
            type="text"
            fullWidth
            disableUnderline
            placeholder="Enter car name"
            onChange={(event) => {
              setInputCarName(event.target.value);
              setErrors({});
            }}
          />
          {errors.inputCarName && (
            <span style={{ color: "red" }}>{errors.inputCarName}</span>
          )}
          <Typography fontWeight={"600"} style={{ marginTop: "20px" }}>
            Category Name
          </Typography>
          <Select
            error={errors.inputCategoryId !== undefined}
            value={inputCategoryId}
            fullWidth
            placeholder="Please select category"
            onChange={(event) => {
              setInputCategoryId(event.target.value);
              setErrors({});
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
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
