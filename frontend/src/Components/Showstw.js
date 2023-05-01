import React from "react";
import _ from "lodash";
import { Table } from "@mui/joy";
import axios from "axios";
import { Input, Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Showstw({ data, setIsReady, isReady }) {
  const [Link, setLink] = React.useState("");
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (Id) => {
    setOpen(true);
    setLink(Id);
  };
  const handleClose = () => setOpen(false);

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

  const handleEditUser = () => {
    // console.log("Id", userId);
    axios
      .put("http://localhost:3001/api/user/" + Link, {
        name: name,
        price: price,
        image: image,
        slug: slug,
      })
      .then((res) => {
        setIsReady(!isReady);
      })
      .catch((error) => {
        alert(error?.message);
        console.error("Error", error?.message);
      });
    setOpen(false);
  };

  // console.log("data", data);
  // console.log("each id :" eachUser?._id);

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
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteUser(eachUser?._id)}
                  >
                    Delete
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(eachUser?._id)}
                  >
                    Edit
                  </Button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add your Info
                      </Typography>
                      <div>Enter Product Name</div>
                      <Input onChange={(e) => setName(e.target.value)} />
                      <div>Enter Product price</div>
                      <Input onChange={(e) => setPrice(e.target.value)} />
                      <div>Enter Product image</div>
                      <Input onChange={(e) => setImage(e.target.value)} />
                      <div>Enter Product slug</div>
                      <Input onChange={(e) => setImage(e.target.value)} />
                      <div className="mt-5"></div>
                      <Button
                        variant="outline"
                        onClick={() => handleEditUser()}
                      >
                        Send Product Data
                      </Button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
