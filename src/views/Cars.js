import { withStyles } from "@mui/styles";
import styles from "../resources/styles/helpers-styles/SignIn";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import CarsModal from "./CarsModal";
import axios from "axios";
import config from "../config.json";

function Cars(props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogMode, setIsOpenDialogMode] = useState("");
  const [dataToEdit, setDataToEdit] = useState({});
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getCars = () => {
    axios
      .get(config.baseURL + config.getCars, {
        headers: { authorization: `bearer ${userData.token}` },
      })
      .then((res) => {
        const newCars = res.data.cars.map((car) => {
          return { ...car, id: car._id, catName: car.category[0].categoryName };
        });
        setCars(newCars);
      });
  };
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
    getCars();
    getCategories();
  }, []);

  const columns = [
    { field: "carName", headerName: "Name", width: 400 },
    { field: "catName", headerName: "Category", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const handleDelete = () => {
          // Handle the button click for the specific row here
          axios
            .delete(config.baseURL + config.getCars + `/${params.row.id}`, {
              headers: { authorization: `bearer ${userData.token}` },
            })
            .then(() => {
              getCars();
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
      <CarsModal
        isOpenDialog={isOpenDialog}
        isOpenDialogMode={isOpenDialogMode}
        setIsOpenDialog={setIsOpenDialog}
        handleSubmit={handleSubmit}
        dataToEdit={dataToEdit}
        hasSuccess={() => {
          getCars();
          setIsOpenDialog(false);
        }}
        categories={categories}
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
            Add Car
          </Button>
          <DataGrid
            rows={cars}
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
export default withStyles(styles)(Cars);
