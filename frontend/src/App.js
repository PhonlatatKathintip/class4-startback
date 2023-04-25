import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, Button } from "@mui/joy";
import Modal from "@mui/material/Modal";
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

function App() {
  const [name, setName] = useState("");

  const [department, setDepartment] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isReady, setIsReady] = useState(false);

  const [users, setUsers] = useState([]);

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
        department: department,
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
            <Button color="inherit">Add User</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* ////// */}
      <Card variant="outlined">
        <div className="mb-2">
          <div>Enter Your Name</div>
          <Input onChange={(e) => setName(e.target.value)} />
          <div>Enter Your Department</div>
          <Input onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div className="flex justify-center gap-2 bt-2">
          <Button color="success" onClick={() => postUser()}>
            Send...Your....Data
          </Button>
          <Button color="warning" onClick={() => Modal()}>
            popup test
          </Button>
        </div>
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
            department={department}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
