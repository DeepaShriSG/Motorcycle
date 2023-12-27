import React, { useEffect } from "react";
import AxiosService from "../common/ApiService";
import { toast } from 'react-toastify'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

function AddNewEngineer() {

    
  let navigate = useNavigate()

  const handleAdd = async(values)=>{
    
    try {
      let res = await AxiosService.post("/engineer/create",values)
      console.log(res)
      if(res.status ===201){
        
        toast.success("Engineer Registered Successfully")
        navigate('/allengineers')
      }
      
    } catch (error) {
      toast.error(
        error.response.message ||
          "Error Occoured! Try again"
      );
      console.log(error)
    }

  }

  useEffect(()=>{
    console.log('useEffect Triggered')
    
  },[])

  const engineerschema = Yup.object().shape({
    name:Yup.string().required('* Required'),
    email:Yup.string().email('* Invalid Email').required('* Required'),
    phonenumber:Yup.string().matches(/^\d{10}$/,'* Invalid Phone Number').required('* Required'),
    password: Yup.string().required('*Required'),
    
  })


  return (
    <div className="w-100">
    <h2 className="logo mx-2">DS Services</h2>
    <div className="row justify-content-start m-0">
      <div className="col-lg-4 col-12 col-sm-6 p-0 card login-page">
      <div className="login-form w-75">
        <h3 className="Register-heading">Register!</h3>

        <Formik 
               initialValues={{
                name:"",
                email:"",
                password:'',
                phonenumber:'',
                
               }}
               validationSchema={engineerschema}
               onSubmit={(values)=>{handleAdd(values) }}
               >
       {({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
         <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Name:</Form.Label>
      <Form.Control type="text" name='name' placeholder="Enter Name" onBlur={handleBlur} onChange={handleChange}/>
        {errors.name && touched.name ? <div style={{color:"red"}}>{errors.name}</div>:null}
    </Form.Group>

    
  <Form.Group className="mb-3">  
    <Form.Label>Email:</Form.Label>
       <Form.Control type="email" name='email' placeholder="Enter email"  onBlur={handleBlur} onChange={handleChange}/>   
    {errors.email && touched.email ? <div style={{color:"red"}}>{errors.email}</div>:null}
  </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" name='password' placeholder="Enter password"  onBlur={handleBlur} onChange={handleChange}/>
      {errors.password && touched.password ? <div style={{color:"red"}}>{errors.password}</div>:null}
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control type="text" name='phonenumber' placeholder="Enter Phonenumber" onBlur={handleBlur} onChange={handleChange}/>
      {errors.phonenumber && touched.phonenumber ? <div style={{color:"red"}}>{errors.phonenumber}</div>:null}
    </Form.Group>

      
      <Button type='submit' >
              Submit
       </Button>
  
  </Form>
   )}
         </Formik>

        </div>
        </div>

        <div className="right-side col-lg-8 p-0">
        <img
          src="/Images/signup.jpg"
          alt=""
          srcset=""
          className="right-image w-100"
        />

      </div>
    </div>
  </div>
  )
}

export default AddNewEngineer