import React from "react";
import _ from "lodash";
import { Table, Button } from "@mui/joy";
import axios from "axios";

export default function Showstw({
  data,
  setIsReady,
  isReady,
  name,
  department,
}) {
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

  const handleEditUser = (userId) => {
    axios
      .put("http://localhost:3001/api/user/" + userId, {
        name: name,
        department: department,
      })
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
    <div className="mt-5">
      <h3 className="font-bold">User List</h3>
      <Table>
        <thead>
          <tr>
            <th>ลำดับที่</th>
            <th>ชื่อ</th>
            <th>แผนก</th>
            <th>
              <div className="text-center">ดำเนินการ</div>
            </th>
          </tr>
        </thead>
        {_.map(data, (eachUser, index) => (
          <tr>
            <td>
              <div className="p-5">{index + 1}</div>
            </td>
            <td>{eachUser?.name}</td>
            <td>{eachUser?.department}</td>
            <td>
              <div className="flex gap-3 justify-center">
                <Button
                  color="danger"
                  onClick={() => handleDeleteUser(eachUser?._id)}
                >
                  Delete
                </Button>

                <Button
                  color="warning"
                  onClick={() => handleEditUser(eachUser?._id)}
                >
                  Edit
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
