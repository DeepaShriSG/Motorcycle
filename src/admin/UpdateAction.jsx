import React, { useContext,useEffect } from "react";
import AxiosService from "../common/ApiService";
import { toast } from 'react-toastify'
import { useNavigate,useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorProvider,{ ErrorContext } from "../context/ErrorProvider"
import UpdateContext,{Updatedata} from "../context/UpdateContext";


function UpdateAction() {
  
  const { errorMessage, setErrorMessage } = useContext(ErrorContext)
  const params = useParams();
  
  const {data, setdata} = useContext(Updatedata)

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const getData = async () => {
    try {
      let res = await AxiosService.get(`/admin/getuser/${params.id}`);
      console.log(res.data.user._id)
      
  
      if (res.status === 200) {
      
        
        setdata({
          userId:  res.data.user._id,
        
        });
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured!"
      );
      console.error("Error fetching data:", error);
    }
  };


  const userAction = async (e) => {
    e.preventDefault();
    try {
      const UpdateValue = data.update === "true" ? true : false;

      const res = await AxiosService.post(`/engineer/updatestatus/${params.id}`, {
        update: UpdateValue,
      });

      console.log(res)
      
      console.log(UpdateValue)

      if (res.status === 200) {
        
        data.update = UpdateValue,
        toast.success("User action updated")
        navigate("/allusers");
        
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="w-100">
      <AdminSidebar />

      <div className="right-content ">
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
        <div className="m-p p-0">
          <div className="row justify-content-center align-items-center m-5">
            <div className="card mx-5 p-5">
              <h3 className="assign-heading text-center mb-4">
                Update User Action
              </h3>
              <div className="assign-page">
                <Form onSubmit={userAction}>
                  <Form.Group className="mb-3">
                    <Form.Label>User Id:</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      placeholder="Enter UserId"
                      value={data.userId}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Action:</Form.Label>
                    <Form.Control
                      as="select"
                      name="update"
                      value={data.update}
                     
                      onChange={handleInputChange}
                    > 
                      <option value="" disabled>
                        Action
                      </option>
                      <option value="false">Completed</option>
                      <option value="true">Pending</option>
                    </Form.Control>
                  </Form.Group>

                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}

                  <div className="d-grid">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAction;
