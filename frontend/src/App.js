import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, LinearProgress } from "@mui/joy";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Showstw from "./Components/Showstw";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [isReady, setIsReady] = useState(false);

  const [users, setUser] = useState([]);

  console.log("Users in server : ", users);

  // use effect
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user")
      .then((res) => {
        setUser(res.data.rows);
        setIsReady(true);
        console.log("People ", res.data);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });

    return () => {};
  }, []);

  //

  if (!isReady) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div>
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
        {/* <Button onClick={setSearchTerm} color="secondary" variant="contained">
          Start Searching
        </Button> */}
        <div>
          ---------------------------------------------------------------
        </div>
        <Showstw
          data={_.filter(users, (people) =>
            people?.name?.match(new RegExp(searchTerm, "i"))
          )}
        />
      </div>
    </div>
  );
}

export default App;
