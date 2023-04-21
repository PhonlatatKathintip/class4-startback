import React from "react";
import _ from "lodash";
import { Table, Button } from "@mui/joy";

export default function Showstw({ data }) {
  console.log("data", data);
  return (
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
              <Button color="danger">ลบ</Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
