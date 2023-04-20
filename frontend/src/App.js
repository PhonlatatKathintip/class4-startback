import React, { useState, useEffect } from "react";
import { Card, CardContent, Input } from "@mui/joy";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Button from "@mui/material/Button";

import Showstw from "./Components/Showstw";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [starWarPeople, setStarWarPeople] = useState([]);

  console.log("starWarPeople", starWarPeople);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then((res) => {
        setStarWarPeople(res.data.results);
        console.log("People ", res.data.results);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });

    return () => {};
  }, []);

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
          data={_.filter(starWarPeople, (people) =>
            people?.name?.match(new RegExp(searchTerm, "i"))
          )}
        />
      </div>
    </div>
  );
}

export default App;
