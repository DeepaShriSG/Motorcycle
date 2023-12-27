import React, { useContext, useEffect, useState } from "react";
import ProfileContext,{ProfileData} from "../context/ProfileContext";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify'
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import Verify from "../user/VerifyUser"
import Sidebar from "./Sidebar";
import AxiosService from "../common/ApiService";

function Userprofile() {
  
  const [code, setcode] = React.useState(false);

  const {initialValues, setInitialValues} = useContext(ProfileData)
   

  let navigate = useNavigate();

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("* Required"),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "* Invalid Mobile Number")
      .required("* Required"),
  });

  const getData = async (values) => {
    try {
      let res = await AxiosService.get("/user/getuser", values);
      console.log(res)
      console.log(res.data.user.name);
      if (res.status === 200) {
       

        setInitialValues({
          name: res.data.user.name,
          email: res.data.user.email,
          phonenumber: res.data.user.phonenumber,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (values) => {
    console.log(values);
    try {
      let res = await AxiosService.put("/user/edituser", values);

      if (res.status === 200) {
        toast.success("User Details Edited successfully")
        navigate("/userprofile/:id");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Invalid Password"
      );
      console.log(error);
    }
  };

  useEffect(() => {
   
      getData();
   
  }, []);

  return (
    <>
      <Sidebar />
      <div className="container"> 
        <div className="row justify-content-center mt-3">
          <div className="col-9 col-sm-6 col-lg-5 card py-3 px-4 my-3 me-2">
            <h3 className="Profile-heading mb-2">Profile</h3>

            <div className="row">
              <Formik
                initialValues={initialValues}
                validationSchema={UserSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                  handleEditUser(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.name}
                        name="name"
                        placeholder="Enter Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={values.email}
                        name="email"
                        placeholder="Enter email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number:</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.phonenumber}
                        name="phonenumber"
                        placeholder="Enter phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.phonenumber && touched.phonenumber ? (
                        <div style={{ color: "red" }}>{errors.phonenumber}</div>
                      ) : null}
                    </Form.Group>

                    <Button
                       variant="primary"
                       onClick={() => {
                         setcode(true)
                       }}
                      
                     >
                       Submit
                     </Button>
                     <Verify
                       show={code}
                       onHide={() => setcode(false)}
                      />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}
export default Userprofile;
