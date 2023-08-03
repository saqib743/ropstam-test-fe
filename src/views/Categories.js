import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import CategoriesModal from "./CategoriesModal";
import axios from "axios";
import config from "../config.json";

function Categories(props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogMode, setIsOpenDialogMode] = useState("");
  const [dataToEdit, setDataToEdit] = useState({});
  const [categories, setCategories] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getCategories = () => {
    axios
      .get(config.baseURL + config.getCategories, {
        headers: { authorization: `bearer ${userData.token}` },
      })
      .then((res) => {
        const newCat = res.data.categories.map((cat) => {
          return { ...cat, id: cat._id };
        });
        setCategories(newCat);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  const columns = [
    { field: "categoryName", headerName: "Name", width: 700 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const handleDelete = () => {
          // Handle the button click for the specific row here
          axios
            .delete(
              config.baseURL + config.getCategories + `/${params.row.id}`,
              {
                headers: { authorization: `bearer ${userData.token}` },
              }
            )
            .then(() => {
              getCategories();
            });
        };
        const handleButtonClick = () => {
          // Handle the button click for the specific row here
          console.log("Button clicked for row with id:", params.row.id);
          setDataToEdit(params.row);

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
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        );
      },
    },
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
        dataToEdit={dataToEdit}
        hasSuccess={() => {
          getCategories();
          setIsOpenDialog(false);
        }}
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
              setDataToEdit({});
            }}
          >
            Add Category
          </Button>
          <DataGrid
            rows={categories}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>{" "}
      </Box>
    </>
  );
}
export default withStyles(styles)(Categories);
