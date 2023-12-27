import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import AxiosService from "../common/ApiService";
import Engineersidebar from "./Engineersidebar";

function CompletedUsers() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      let res = await AxiosService.get("/engineer/userslist");

      if (res.status === 200) {
        const users = res.data.user;
        setData(users);
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Error Occurred!"
      );
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-100">
      <div className="dashboard">
        <div className="left-nav m-0 p-0">
          <Engineersidebar />
        </div>
        <div className="right-content m-0 p-0">
          <div className="row my-5 mx-2">
            <h4>Completed Users</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Service</th>
                  <th>Service Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e._id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phonenumber}</td>
                    <td style={{ color: "#013cc6" }}>
                      {e.status ? "Pending" : "Completed"}
                    </td>
                    <td style={{ color: "#013cc6" }}>
                      {e.action ? "Pending" : "Completed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedUsers;
