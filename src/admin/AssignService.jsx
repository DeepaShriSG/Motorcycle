import React, { useContext, useState,useEffect } from "react";
import { toast } from 'react-toastify'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AxiosService from "../common/ApiService";
import { useNavigate,useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorProvider,{ ErrorContext } from "../context/ErrorProvider"


function AssignService() {

  const { errorMessage, setErrorMessage } = useContext(ErrorContext)
  const [engineers, setEngineers] = useState([]);

  const params = useParams();
  

  const [data, setdata] = useState({
    userId: "",
    engineerId: "",
  });
  

  const assignschema = Yup.object().shape({
    userId:Yup.string().required('* Required'),
    engineerId:Yup.string().required('* Required'),
    
  })
 
  const getEngineers = async () => {
    try {
      const res = await AxiosService.get("/engineer/getengineers"); 
      console.log(res)
      if (res.status === 200) {
        const engineerData = res.data.engineer;
        if (Array.isArray(engineerData)) {
          setEngineers(engineerData);
        }
        
      }
    } catch (error) {
      console.error("Error fetching engineers:", error);
    }
  };


  const getData = async () => {
    try {
      const res = await AxiosService.get(`/admin/getservice/${params.id}`);
      if (res.status === 200) {
        setdata({
          userId: res.data.user[0]._id,
          engineerId: "",
        });
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
        "Error Occurred! Try again"
      );
      console.error("Error fetching data:", error);
    }
  };
  

  let navigate = useNavigate();

  const handleAssignUser = async (values) => {
    try {
      const res = await AxiosService.post(`/admin/assign/${params.id}`, values);
      if (res.status === 201) {
        toast.success("User assigned successfully");
        navigate("/allusers");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error("Error assigning user:", error);
    }
  };

  useEffect(()=>{
    if(params.id)
    {
        getEngineers();
        getData()
    }
    else
    {
      navigate('/servicerequests')
    }
  },[])


  return (
    <div className="w-100">
      <AdminSidebar />

      <div className="right-content px-3">
        <div className="d-block d-sm-none m-2">
          <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
              DS Services
            </a>
            <div className="col-6 text-end px-4">
              <i
                className="menuicon fa-solid fa-bars fa-xl"
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              ></i>
            </div>
          </span>
        </div>
        <div className="m-0 p-0">
          <div className="row justify-content-center align-items-center m-5">
            
           <div className="card mx-5 p-5">
              <h3 className="assign-heading text-center mb-4">Assign User</h3>
              <div className="assign-page">
              <Formik
             initialValues={data}
             validationSchema={assignschema}
              enableReinitialize={true}
              onSubmit={ (values)=>{
                handleAssignUser(values)
                 }}
     >
       {({ values,errors,touched,handleBlur,handleSubmit,handleChange})=>(
         <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3">
             <Form.Label>User Id:</Form.Label>
             <Form.Control type="text" value = {values.userId} name='userId' placeholder="Enter userId" onBlur={handleBlur} onChange={handleChange}/>
             {errors.userId && touched.userId ? <div style={{color:"red"}}>{errors.userId}</div>:null}
           </Form.Group>
 
                  <Form.Group className="mb-3">
                    <Form.Label>Engineer Id:</Form.Label>
                    <Form.Control
                      as="select"
                      name="engineerId"
                      value={values.engineerId}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value="">Select Engineer</option>
                      {engineers.map((engineer) => (
                        <option key={engineer._id} value={engineer._id}>
                          {engineer.name} 
                        </option>
                      ))}
                    </Form.Control>
                    {errors.engineerId && touched.engineerId ? <div style={{ color: "red" }}>{errors.engineerId}</div> : null}
                  </Form.Group>

                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}

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
      </div>
    </div>
  );
}

export default AssignService;
