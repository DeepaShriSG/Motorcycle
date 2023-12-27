import { React, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Formik} from "formik";
import * as Yup from "yup";
import AxiosService from "../common/ApiService";

function Login() {
  
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();

  let validateLogin = async (values) => {
   
    try {
      let res = await AxiosService.post("/user/login", {
      email: values.email,
      password: values.password,
      });
      if (res.status === 200) {
        
        toast.success("Logged in Successfully")
        
        sessionStorage.setItem("token", res.data.token);
        navigate("/user/userdashboard");
      }
    } catch (error) {
      
      setErrorMessage(error.response.data.message)
      toast.error(
        error.response.data.message ||
          "Error Occoured! Invalid Password"
      );
    
    }
  
  };

         const LoginSchema = Yup.object().shape({

          email:Yup.string().required('*Required'),
           password:Yup.string().required('*Required')

          })

  return (
    <>
      <div className="w-100">
        <h2 className="logo mx-2">DS Services</h2>
        <div className="row justify-content-center m-0">
          <div className="col-lg-4 col-12 col-sm-6 col-md-6 p-0 card login-page">
            <div className="login-form w-75">
              <h3 className="login-heading mb-4">Welcome back!</h3>
              <Formik
                initialValues={{
                 email:"",
                 password:""
                }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                  await validateLogin(values);
                }}
                
              >
                {({        
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                }) => (
                  <Form onSubmit={handleSubmit}>
                     
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      
                      {errorMessage || errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errorMessage}{errors.password}</div>
                      ) : null}
                    </Form.Group>

                    <div className="d-grid">
                    <Button type="submit">Submit</Button>
                    </div>
                    
                <div className="d-flex justify-content-between py-2">
                  <Link to="/forget-password" className="login-link">
                    Forget Password
                  </Link>
                  <Link to="/Signup" className="login-link mx-3">
                    Register
                  </Link>
                </div>    

                <div className="row text-center my-2">
                
                <Button className="my-2"  onClick={() => {
                          navigate("/engineer/engineerlogin") }} 
                          style={{
                          border:"2px solid #151583",
                          backgroundColor:"white",
                          color:"black"}}>Login as Engineer</Button>
                 
                 <p>or</p>
                
                 <Button onClick={() => {
                          navigate("/admin/adminlogin") }} 
                          style={{border:"2px solid #151583",
                          backgroundColor:"white",
                          color:"black"}}>Login as Admin</Button>

                  </div>    
                </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="right-side col-lg-8 col-md-6 p-0">
            <img src="/Images/login.jpg" alt="" className="right-image w-100" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
