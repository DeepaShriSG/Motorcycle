import { useEffect, useState } from "react";
import React from "react";
import Chart from 'chart.js/auto';
import AxiosService from "../common/ApiService";
import AdminSidebar from "./AdminSidebar";


function AdminDashboard() {

  const [dashboardData, setDashboardData] = useState({
    usercount: "",
    engineercount: "",
    service: "",
    pendingusers: "",
    completedusers: "",
  });


    const fetchData = async () => {
      try {
        const res = await AxiosService.get("/admin/reports");
        console.log(res)
        if (res.status === 200) {
          setDashboardData({
            usercount: res.data.userCount,
            engineercount: res.data.engineerCount,
            service: res.data.service,
            pendingusers: res.data.pendingusers,
            completedusers: res.data.completedusers,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        
      }
    };

  const [serviceReports, setServiceReports] = useState([]);
  
    const fetchServiceReports = async () => {
      try {
        const res = await AxiosService.get("/admin/servicereports");
        if (res.status === 200) {
          setServiceReports(res.data);
        }
      } catch (error) {
        console.error("Error fetching service reports:", error);
        
      }
    };
 
  let [report,setreport] = useState([]) 
  
  
    const getReport = async () => {
      try {
        let res = await AxiosService.get("/admin/servicereports");
      
        if (res.status === 200) {
        
          setreport(res.data);
        }
      } catch (error) {
        
        console.error("Error fetching data:", error);
        console.log("Invalid request");
      }
    };


    const getPieChart = async () => {
      try {
        const res = await AxiosService.get("/engineer/servicereports");

        if (res.status === 200) {
          setreport(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };


  useEffect(() => {

      const barCtx = document.getElementById('barChart').getContext('2d');
      const existingbarChart = Chart.getChart(barCtx);
  
      if (existingbarChart) {
        existingbarChart.destroy();
      }
  
      const CurrentDate = new Date();
      const month = [];
      const reportdata = [];
    
      for (let i = 0; i < 30; i++) {
        const currentDateCopy = new Date(CurrentDate);
        currentDateCopy.setDate(CurrentDate.getDate() - i);
        const formattedDate = currentDateCopy.toLocaleDateString('en-US', { day: 'numeric' });
        month.unshift(formattedDate);
    
        
        const reportValue = report[formattedDate] || 0;
        reportdata.unshift(reportValue);
      }
    
      const chartdata = {
        labels: month,
        datasets: [{
          label: 'Service-Report',
          data: serviceReports,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          tension: 0.1,
        }],
      };
    
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: chartdata,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  

    //Line chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const existingLineChart = Chart.getChart(lineCtx);
  
    if (existingLineChart) {
      existingLineChart.destroy();
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
      label: 'Users-Report',
      data: report,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };
  
    new Chart(lineCtx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      
      },
    });

   

  //pie Chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = Chart.getChart(ctx);

    if (pieChart) {
      pieChart.destroy();
    }
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending Requests', 'Completed Requests'],
        datasets: [{
          label: 'My First Dataset',
          data: [dashboardData.pendingusers, dashboardData.completedusers],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4,
        }],
      },
     
    });
  }, [ report,serviceReports, dashboardData]);

  
  useEffect(() => {

    getReport();
    fetchData();
    fetchServiceReports();
    getPieChart();

  }, []);



  return (
    <>
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

          <div className=" m-0 p-0">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div
                  className="card border-round py-3 px-4 my-3"
                  style={{ borderLeft: "10px solid #016ecd" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <p
                        className="card-heading mb-0"
                        style={{ color: "#016ecd" }}
                      >
                        Service Engineers
                      </p>
                      <h4>{dashboardData.engineercount}</h4>
                    </div>
                    <i className="fa-solid fa-screwdriver-wrench"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-md-6">
                <div
                  className="card  border-round py-3 px-4 my-3"
                  style={{ borderLeft: "10px solid #faa632" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <p
                        className="card-heading mb-0"
                        style={{ color: "#faa632" }}
                      >
                        Users
                      </p>
                      <h4>{dashboardData.usercount}</h4>
                    </div>
                    <i className="fa-solid fa-users"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div
                  className="card  border-round py-3 px-4 my-3"
                  style={{ borderLeft: "10px solid #da4f4a" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <p
                        className="card-heading mb-0"
                        style={{ color: "#da4f4a" }}
                      >
                        Pending Requests
                      </p>
                      <h4>{dashboardData.pendingusers}</h4>
                    </div>
                    <i className="fa-regular fa-calendar"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-6">
                <div
                  className="card border-round py-3 px-4 my-3"
                  style={{ borderLeft: "10px solid green" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <p
                        className="card-heading mb-0"
                        style={{ color: "green" }}
                      >
                        Completed service
                      </p>
                      <h4>{dashboardData.completedusers}</h4>
                    </div>
                    <i className="fa-regular fa-square-check"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center align-items-top text-center">
              
              <div className="col-lg-3 m-3">  
              <h4 className="Dashboard-heading  " style={{color:"black"}}>Status-Report!</h4>
              <canvas className= " p-4 bg-white shadow-sm " id="pieChart"></canvas> 
              </div>
              <div className="col-lg-7 m-3" > 
              <h4 className="Dashboard-heading " style={{color:"black"}}>Registration-Report!</h4>
              <canvas className= " p-4 bg-white shadow-sm " id="lineChart"></canvas></div>
              
              <div className="my-4 col-lg-8"> 
              <h4 className="Dashboard-heading " style={{color:"black"}}>Service-Report!</h4>
              <canvas className= " p-4 bg-white shadow-sm " id="barChart"></canvas>
              </div>
             
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
  }

export default AdminDashboard;



// useEffect(() => {
//   const getReport = async () => {
//     try {
//       let res = await AxiosService.get("/engineer/servicereports");
      
//       if (res.status === 200) {
      
//         setreportdata(res.data);
//       }
//     } catch (error) {
      
//       console.error("Error fetching data:", error);
//       console.log("Invalid request");
//     }
//   };

//   getReport();
// }, [reportdata]);



// useEffect(() => {

//   const barCtx = document.getElementById('barChart').getContext('2d');
//   const existingbarChart = Chart.getChart(barCtx);

//   if (existingbarChart) {
//     existingbarChart.destroy();
//   }

//   const currentDate = new Date();
//   const months = [];
//   const reportData = [];

//   for (let i = 0; i < 30; i++) {
//     const currentDateCopy = new Date(currentDate);
//     currentDateCopy.setDate(currentDate.getDate() - i);
//     const formattedDate = currentDateCopy.toLocaleDateString('en-US', { day: 'numeric' });
//     months.unshift(formattedDate);

//     // Assuming your report object has the date as a key
//     const reportValue = report[formattedDate] || 0;
//     reportData.unshift(reportValue);
//   }

//   const chartData = {
//     labels: months,
//     datasets: [{
//       label: 'Service-Report',
//       data: reportData,
//       fill: false,
//       backgroundColor: 'rgb(54, 162, 235)',
//       tension: 0.1,
//     }],
//   };

//   const barChart = new Chart(barCtx, {
//     type: 'bar',
//     data: chartData,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }, [ data]);