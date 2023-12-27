import React, {  useEffect,useContext } from "react";
import ServiceContext,{serviceData} from "../context/ServiceContext";
import Form from "react-bootstrap/Form";
import { toast } from 'react-toastify'
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams,useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import AxiosService from "../common/ApiService";
import Sidebar from "../user/Sidebar";

function UserService() {

  const params = useParams();

  let navigate = useNavigate()

  let {data, setData} = useContext(serviceData)

  const ServiceSchema = Yup.object().shape({
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model is required'),
    manufactureyear: Yup.number().required('Manufacturing year is required'),
    servicetype: Yup.string().required('Service type is required'),
  });
  

  const getData = async () => {
    try {
      let res = await AxiosService.get("/user/getservice");
      console.log(res.data.user[0].service[0][0]._id)
      if (res.status === 200) {

        const service = res.data.user[0].service[0][0];

        setData({
          id: service._id,
          brand: service.brand,
          model: service.model,
          manufactureyear: service.manufactureyear,
          servicetype: service.servicetype,
        });
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditUser = async (values) => {
    console.log(values);
    try {
      let res = await AxiosService.put("/user/edituser", values);
      console.log(res)
      if (res.status === 200) {

        toast.success("Service data Edited Successfully")
        navigate("/user/userservice");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Invalid data"
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
            <h3 className="service-heading text-center mb-2">
              Service details
            </h3>

            <div className="row">
              <Formik
                initialValues={data}
                validationSchema={ServiceSchema}
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
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.id}
                        name="id"
                        placeholder="Enter Id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.id && touched.id ? (
                        <div style={{ color: "red" }}>{errors.id}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.brand}
                        name="brand"
                        placeholder="Enter brand"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.brand && touched.brand ? (
                        <div style={{ color: "red" }}>{errors.brand}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.model}
                        name="model"
                        placeholder="Enter model"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.model && touched.model ? (
                        <div style={{ color: "red" }}>{errors.model}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Manufactureyear:</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.manufactureyear}
                        name="manufactureyear"
                        placeholder="Enter manufactureyear"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.manufactureyear && touched.manufactureyear ? (
                        <div style={{ color: "red" }}>
                          {errors.manufactureyear}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Servicetype:</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.servicetype}
                        name="servicetype"
                        placeholder="Enter servicetype"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.servicetype && touched.servicetype ? (
                        <div style={{ color: "red" }}>{errors.servicetype}</div>
                      ) : null}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
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

export default UserService;
