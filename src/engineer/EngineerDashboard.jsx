import React from "react";
import { toast } from 'react-toastify'
import Chart from 'chart.js/auto';
import { useEffect,useState } from "react";
import AxiosService from "../common/ApiService";
import Engineersidebar from "../engineer/Engineersidebar";


function EngineerDashboard() {

  
  let [data,setData] = useState({
    userCount: "",
    assigned: "",
    pending: "",
    completed : ""

  })

  let [report,setreport] = useState([])
 
  
  
    const getData = async () => {
      try {
        let res = await AxiosService.get("/engineer/reports");
        console.log(res.data.userCount)
        if (res.status === 200) {
        
          setData({
            userCount:res.data.userCount,
            assigned: res.data.assigned,
            pending: res.data.pending,
            completed : res.data.completed});
        }
      } catch (error) {
        
        console.error("Error fetching data:", error);
        console.log("Invalid request");
      }
    };
 
 
    const getReport = async () => {
      try {
        let res = await AxiosService.get("/engineer/servicereports");
      
        if (res.status === 200) {
        
          setreport(res.data);
        }
      } catch (error) {
        
        console.error("Error fetching data:", error);
        console.log("Invalid request");
      }
    };

    useEffect(()=>{
      const barCtx = document.getElementById('barChart').getContext('2d');
      const existingbarChart = Chart.getChart(barCtx);
  
      if (existingbarChart) {
        existingbarChart.destroy();
      }
  
      const currentDate = new Date();
      const months = [];
      const reportData = [];
    
      for (let i = 0; i < 30; i++) {
        const currentDateCopy = new Date(currentDate);
        currentDateCopy.setDate(currentDate.getDate() - i);
        const formattedDate = currentDateCopy.toLocaleDateString('en-US', { day: 'numeric' });
        months.unshift(formattedDate);
    
        // Assuming your report object has the date as a key
        const reportValue = report[formattedDate] || 0;
        reportData.unshift(reportValue);
      }
    
      const chartData = {
        labels: months,
        datasets: [{
          label: 'Service-Report',
          data: reportData,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          tension: 0.1,
        }],
      };
    
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  
    //Doughnut Chart
      const ctx = document.getElementById('doughnutChart').getContext('2d');
      const doughnutChart = Chart.getChart(ctx);
  
      if (doughnutChart) {
        doughnutChart.destroy();
      }
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Pending Requests', 'Completed Requests'],
          datasets: [{
            label: 'My First Dataset',
            data: [data.pending, data.completed],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          }],
        },
       
      });
    },[report,data])
   
  
    useEffect(() =>{
      getData(),
      getReport()
    },[])

  return (
     
    <div className="w-100">
     
    <div className="left-nav bg-white p-0 ">
     <Engineersidebar/>
    </div>

      <div className="right-content px-3">
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
        <h4 className="Dashboard-heading m-2" style={{color:"black"}}>Engineer's Dashboard!</h4>
          <div className="col-lg-3 col-sm-6 col-md-6">
          <div className="card border-round py-3 px-4 my-3" style={{borderLeft:"10px solid #016ecd"}}>
                <div className="d-flex justify-content-between">
                       <div>
                        <p className="card-heading mb-0" style={{color:"#016ecd"}}>Assigned Services</p>
                        <h4>{data.assigned}</h4>
                       </div>
                       <i className="fa-solid fa-screwdriver-wrench"></i>     
                </div>  
              
            </div>
            
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
          <div className="card  border-round py-3 px-4 my-3" style={{borderLeft:"10px solid #faa632"}}>
                <div className="d-flex justify-content-between" >
                       <div>
                        <p className="card-heading mb-0" style={{color:"#faa632"}}>Users</p>
                        <h4 >{data.userCount}</h4>
                       </div>
                        <i className="fa-solid fa-users"></i>     
                </div>  
              
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-md-6">
          <div className="card  border-round py-3 px-4 my-3" style={{borderLeft:"10px solid #da4f4a"}}>
                <div className="d-flex justify-content-between" >
                       <div>
                        <p className="card-heading mb-0" style={{color:"#da4f4a"}}>Pending Reports</p>
                        <h4>{data.pending}</h4>
                       </div>
                        <i className="fa-regular fa-calendar" ></i>     
                </div>  
               
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-md-6">
          <div className="card border-round py-3 px-4 my-3" style={{borderLeft:"10px solid green"}}>
                <div className="d-flex justify-content-between">
                       <div>
                        <p className="card-heading mb-0" style={{color:"green"}}>Completed Reports</p>
                        <h4>{data.completed}</h4>
                       </div>
                       <i className="fa-regular fa-square-check" ></i>     
                </div>  
              
            </div>
          </div>
        </div>
         <div className="row m-3 p-3 justify-content-between align-items-center">
              
              <div className="col-lg-4"  >
                <h4 className="Dashboard-heading " style={{color:"black"}}>Users-Status-Report!</h4>
                  <canvas className= " p-4 bg-white shadow-sm " id="doughnutChart"></canvas> 
                  </div>

              <div  className="col-lg-8" > 
              <h4 className="Dashboard-heading " style={{color:"black"}}>Service-Registration-Report!</h4>
              <canvas className= " p-3 bg-white shadow-sm" id="barChart"></canvas>
              </div>
              
            </div>
      </div>
      </div>
      
   
    </div>
 

  )
}

export default EngineerDashboard