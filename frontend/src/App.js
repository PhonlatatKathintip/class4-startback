import React, { useState, useEffect } from "react";
import { Card, CardContent, Input, LinearProgress } from "@mui/joy";
import "./index.css";
import _ from "lodash";
import axios from "axios";
import Showstw from "./Components/Showstw";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [isReady, setIsReady] = useState(false);

  const [users, setUsers] = useState([]);

  console.log("Users in server : ", users);

  // use effect
  const getAllUser = () => {
    // setIsReady(false);
    axios
      .get(` ${process.env.REACT_APP_API_URL}/user `)
      .then((res) => {
        setUsers(res?.data?.rows);
        // setIsReady(true);
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
  //

  // if (!isReady) {
  //   return (
  //     <div>
  //       <LinearProgress />
  //     </div>
  //   );
  // }

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
          setIsReady={setIsReady}
          isReady={isReady}
        />
      </div>
    </div>
  );
}

export default App;
