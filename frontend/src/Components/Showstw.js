import React from "react";
import _ from "lodash";
import { Table, Button, Card } from "@mui/joy";
import axios from "axios";

export default function Showstw({ data, setIsReady, isReady }) {
  const handleDeleteUser = (userId) => {
    axios
      .delete("http://localhost:3001/api/user/" + userId)
      .then((res) => {
        setIsReady(!isReady);
      })
      .catch((error) => {
        alert(error?.message);
        console.error("Error", error?.message);
      });
  };
  console.log("data", data);
  return (
    <Card>
      <div>
        <h3 className="font-bold">User List</h3>
        <Table>
          <thead>
            <tr>
              <th>ลำดับที่</th>
              <th>ชื่อ</th>
              <th>แผนก</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          {_.map(data, (eachUser, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{eachUser?.name}</td>
              <td>{eachUser?.department}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteUser(eachUser?._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Card>
  );
}
