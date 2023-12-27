import axios from "axios";

const AxiosService = axios.create({
    baseURL: "https://ms-be.onrender.com",
    headers:{
        "Content-Type": "application/json",
    }
      
})


AxiosService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
      
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        
        console.error("Request error:", error.request);
      } else {
      
        console.error("Error:", error.message);
      }
      return Promise.reject(error);
    }
  );


AxiosService.interceptors.request.use(config=>{
    
    const token = sessionStorage.getItem('token')
    if(token)
        config.headers.Authorization =`Bearer ${token}`
    
        return config
    
})

export default AxiosService