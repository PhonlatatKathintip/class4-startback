import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, LinearProgress, Button } from "@mui/joy";
import { TextField } from "@mui/material";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Showstw from "./Components/Showstw";

function App() {
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

  useEffect(() => {
    getAllUser();
    return () => {};
  }, [isReady]);

  return (
    <div>
      <Card>
        <div className="mb-2">
          <div>Enter Your Name</div>
          <Input />
          <div>Enter Your Department</div>
          <Input />
        </div>
        <div className="flex justify-center gap-2">
          <Button color="success">Send...Your....Data</Button>
          <Button color="warning">Change.Your....Data</Button>
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
        <div>
          ---------------------------------------------------------------
        </div>
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
