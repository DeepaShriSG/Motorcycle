import React,{useEffect,useContext} from 'react'
import ProfileContext,{ProfileData} from "../context/ProfileContext";
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams,useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AxiosService from '../common/ApiService';
import VerifyAdmin from './VerifyAdmin';

function AdminProfile() {
  
  const [code, setcode] = React.useState(false);
    
  const params = useParams()

  const {initialValues, setInitialValues} = useContext(ProfileData)
  
  let navigate = useNavigate()

  const adminschema = Yup.object().shape({
    name:Yup.string().required('* Required'),
    email:Yup.string().email('* Invalid Email').required('* Required'),
    phonenumber:Yup.string().matches(/^\d{10}$/,'* Invalid Mobile Number').required('* Required')
  })
 
  const getData = async(values)=>{
    try { 
      let res =   await AxiosService.get(`/admin/getadmin/${params.id}`,values)
      console.log(res)
      if(res.status === 200)
      
      {
          setInitialValues({
              name:res.data.admin.name,
              email:res.data.admin.email,
              phonenumber:res.data.admin.phonenumber,

          });

        console.log(res.data)
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Try again"
      );
      console.log(error)
    } 
  }

  const handleEditUser = async(values)=>{
    
    try {
      let res = await AxiosService.put(`/admin/editadmin/${params.id}`,values)
    
      if(res.status===200)
      {
        navigate("/adminprofile");
      }
    } catch (error) {
       console.log(error)
    }
  }
  useEffect(()=>{
    if(params.id)
    {
        getData(params.id)
    }
    else
    {
      navigate('/admindashboard')
    }
  },[])

  return (
    <div className="w-100">
     <div className="left-nav col-3 m-0 p-0">
         <AdminSidebar/>
      </div>
    <div className="right-content px-3 pt-3">
    <div className="d-block d-sm-none m-2">
           <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
                DS Services
              </a>
              <div className="col-6 text-end px-4"> 
             <i className="menuicon fa-solid fa-bars fa-xl" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></i>
            </div>
            </span>
          </div>

          <div className=" m-0 p-0">
            <div className="row justify-content-center align-items-center">
            <div className="card col-lg-6 col-sm-6 col-md-6 p-3 m-3">
            <h3 className="assign-heading text-center mb-4">Edit Profile</h3>
            <Formik
             initialValues={initialValues}
             validationSchema={adminschema}
              enableReinitialize={true}
              onSubmit={ (values)=>{
              handleEditUser(values)
       }}
     >
       {({ values,errors,touched,handleBlur,handleSubmit,handleChange})=>(
         <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3">
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" value = {values.name} name='name' placeholder="Enter Name" onBlur={handleBlur} onChange={handleChange}/>
             {errors.name && touched.name ? <div style={{color:"red"}}>{errors.name}</div>:null}
           </Form.Group>
 
          <Form.Group className="mb-3">
             <Form.Label>Email</Form.Label>
             <Form.Control type="email" value = {values.email} name='email' placeholder="Enter email"  onBlur={handleBlur} onChange={handleChange}/>
             {errors.email && touched.email ? <div style={{color:"red"}}>{errors.email}</div>:null}
           </Form.Group>
           
     
           <Form.Group className="mb-3">
             <Form.Label>Phone Number:</Form.Label>
             <Form.Control type="text" value = {values.phonenumber} name='phonenumber' placeholder="Enter phonenumber" onBlur={handleBlur} onChange={handleChange}/>
             {errors.phonenumber && touched.phonenumber ? <div style={{color:"red"}}>{errors.phonenumber}</div>:null}
           </Form.Group>
 
          
 
           <Button
                        variant="primary"
                        onClick={() => {
                          setcode(true)
                        }}
                       
                      >
                        Submit
                      </Button>
                      <VerifyAdmin
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
  
 </div>
 
 
 
  )
}

export default AdminProfile