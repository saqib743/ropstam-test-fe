import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useState } from "react";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CategoriesModal from "./CategoriesModal";

function Categories(props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogMode, setIsOpenDialogMode] = useState("");
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const handleButtonClick = () => {
          // Handle the button click for the specific row here
          console.log("Button clicked for row with id:", params.row.id);
          setIsOpenDialog(true);
          setIsOpenDialogMode("Update");
        };

        return (
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Button
              variant="contained"
              color="info"
              onClick={handleButtonClick}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleButtonClick}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
    },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Bob Smith" },
    { id: 3, name: "Bob Smith" },
  ];
  const handleSubmit = () => {
    console.log("eee");
  };
  return (
    <>
      {" "}
      <CategoriesModal
        isOpenDialog={isOpenDialog}
        isOpenDialogMode={isOpenDialogMode}
        setIsOpenDialog={setIsOpenDialog}
        handleSubmit={handleSubmit}
      />
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Box
          style={{
            height: "100%",
            width: "95%",
          }}
        >
          <Button
            variant="contained"
            style={{ marginBottom: "20px" }}
            onClick={() => {
              setIsOpenDialog(true);
              setIsOpenDialogMode("Add");
            }}
          >
            Add Category
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>{" "}
      </Box>
    </>
  );
}
export default withStyles(styles)(Categories);
