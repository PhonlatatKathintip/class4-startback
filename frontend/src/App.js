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
      <Card>
        <div className="mb-2">
          <div>Enter Your Name</div>
          <Input onChange={(e) => setName(e.target.value)} />
          <div>Enter Your Department</div>
          <Input onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div className="flex justify-center gap-2">
          <Button color="success" onClick={() => postUser()}>
            Send...Your....Data
          </Button>
          <Button color="warning">Save....Your....Data</Button>
        </div>
      </Card>
      <div>
        <Card>
          <CardContent>
            <div>Search Box</div>
            <Input
              placeholder="Input Some Search Word"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              You Search <span className="text-blue-500">{searchTerm}</span>
            </div>
          </CardContent>
        </Card>

        <Showstw
          data={_.filter(users, (people) =>
            people?.name?.match(new RegExp(searchTerm, "i"))
          )}
          setIsReady={setIsReady}
          isReady={isReady}
        />
      </div>
    </div>
  );
}

export default App;
