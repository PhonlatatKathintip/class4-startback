import React, { useState, useEffect } from "react";
import { Card, CardContent, Input } from "@mui/joy";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Showstw from "./Components/Showstw";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function App() {
  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [slug, setSlug] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isReady, setIsReady] = useState(false);

  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log("Users in server : ", users);

  const getAllUser = () => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/user `)
      .then((res) => {
        setUsers(res?.data?.rows);
        console.log("User ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };

  const postUser = () => {
    axios
      .post(` ${process.env.REACT_APP_API_URL}/user`, {
        name: name,
        price: price,
        image: image,
        slug: slug,
      })
      .then((res) => {
        setIsReady(!isReady);
        console.log("User ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };

  useEffect(() => {
    getAllUser();
    return () => {};
  }, [isReady]);

  return (
    <div>
      {/* header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Search Engine Data Base
            </Typography>
            <div>
              <Button color="inherit" onClick={handleOpen}>
                Add User
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add your Info
                  </Typography>
                  <div>Enter Product Name</div>
                  <Input onChange={(e) => setName(e.target.value)} />
                  <div>Enter Product price</div>
                  <Input onChange={(e) => setPrice(e.target.value)} />
                  <div>Enter Product image</div>
                  <Input onChange={(e) => setImage(e.target.value)} />
                  <div>Enter Product slug</div>
                  <Input onChange={(e) => setSlug(e.target.value)} />
                  <div className="mt-3"></div>
                  <Button variant="outlined" onClick={() => postUser()}>
                    Send Product Data
                  </Button>
                </Box>
              </Modal>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {/* ////// */}
      <Card variant="outlined">
        <div className="mb-2"></div>
        <div className="flex justify-center gap-2 bt-2"></div>
        <CardContent>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Box"
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
            </div>
          </form>
          <Showstw
            data={_.filter(users, (people) =>
              people?.name?.match(new RegExp(searchTerm, "i"))
            )}
            setIsReady={setIsReady}
            isReady={isReady}
            name={name}
            price={price}
            image={image}
            slug={slug}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
