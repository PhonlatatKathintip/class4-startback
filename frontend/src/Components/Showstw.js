import React from "react";
import _ from "lodash";
import { Table, Button, Box } from "@mui/joy";
import axios from "axios";

export default function Showstw({
  data,
  setIsReady,
  isReady,
  name,
  price,
  image,
  slug,
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
        price: price,
        slug: slug,
        image: image,
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
      <Table>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อ</th>
            <th></th>
            <th>ราคา</th>
            <th>slug</th>
            <th>image</th>
          </tr>
        </thead>
        {_.map(data, (eachUser, index) => (
          <tr>
            <td>
              <div className="p-5">{index + 1}</div>
            </td>
            <td>{eachUser?.name}</td>
            <td></td>
            <td>{eachUser?.price}</td>
            <td>{eachUser?.slug}</td>
            <td>{eachUser?.image}</td>
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
