import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, LinearProgress, Button } from "@mui/joy";
import { TextField } from "@mui/material";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Showstw from "./Components/Showstw";
import Post from "./Components/fpost";

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
        </div>
      </Card>
      <div>
        <Card variant="outlined">
          <CardContent>
            <div className="mb-4 text-center"> Search Box</div>
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
                    xmlns="http://www.w3.org/2000/svg"
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
                  placeholder="Enter your Name"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="mt-5 text-center">
              You Search <span className="text-blue-500">{searchTerm}</span>
            </div>

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
    </div>
  );
}

export default App;
