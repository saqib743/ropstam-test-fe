import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import config from "../config.json";
import axios from "axios";
function CategoriesModal(props) {
  const {
    isOpenDialog,
    setIsOpenDialog,
    isOpenDialogMode,
    hasSuccess,
    dataToEdit,
  } = props;

  const [errors, setErrors] = useState({});

  const [inputCategoryName, setInputCategoryName] = useState();

  useEffect(() => {
    setInputCategoryName(dataToEdit?.categoryName);
  }, [dataToEdit]);

  const schema = Joi.object({
    inputCategoryName: Joi.string()

      .required()
      .max(25),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { inputCategoryName },
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
        .post(config.baseURL + config.addCategories, {
          categoryName: inputCategoryName,
        })
        .then((res) => {
          hasSuccess();
        });
    } else {
      axios
        .patch(config.baseURL + config.getCategories + `/${dataToEdit.id}`, {
          categoryName: inputCategoryName,
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
          <Typography fontWeight={"600"}>Category Name</Typography>
          <TextField
            value={inputCategoryName}
            error={errors.inputCategoryName !== undefined}
            type="text"
            fullWidth
            disableUnderline
            placeholder="Enter Category Name"
            onChange={(event) => setInputCategoryName(event.target.value)}
          />
          {errors.inputCategoryName && (
            <span style={{ color: "red" }}>{errors.inputCategoryName}</span>
          )}

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

export default withStyles(styles)(CategoriesModal);
