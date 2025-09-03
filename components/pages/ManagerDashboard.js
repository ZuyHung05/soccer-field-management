import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "../../styles/ManagerDashboard.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ManagerDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState("");
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [yearlyData, setYearlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState({});

  // Sample data for the dashboard
  const recentBookings = [
    {
      id: 1,
      customer: "Nguyễn Văn A",
      field: "Sân A",
      time: "08:00 - 09:00",
      date: "23/04/2025",
      amount: 200000,
    },
    {
      id: 2,
      customer: "Trần Thị B",
      field: "Sân B",
      time: "09:00 - 10:00",
      date: "23/04/2025",
      amount: 250000,
    },
    {
      id: 3,
      customer: "Lê Văn C",
      field: "Sân C",
      time: "10:00 - 11:00",
      date: "23/04/2025",
      amount: 180000,
    },
    {
      id: 4,
      customer: "Phạm Văn D",
      field: "Sân A",
      time: "15:00 - 16:00",
      date: "23/04/2025",
      amount: 200000,
    },
    {
      id: 5,
      customer: "Hoàng Thị E",
      field: "Sân B",
      time: "16:00 - 17:00",
      date: "23/04/2025",
      amount: 250000,
    },
  ];

  useEffect(() => {
    // Set current month
    const date = new Date();
    const month = date.getMonth() + 1;
    setCurrentMonth(`Tháng ${month}`);

    // Fetch revenue data (simulated)
    fetchRevenueData();
  }, []);

  const fetchRevenueData = () => {
    // Simulated API data
    const apiData = {
      monthlyRevenue: [15000000, 20000000, 78000000, 29000000], // Up to April
      yearlyRevenue: {
        2022: 450000000,
        2023: 530000000,
        2024: 260000000,
      },
      todayRevenue: 1750000,
    };

    setTodayRevenue(apiData.todayRevenue);
    setMonthlyRevenue(apiData.monthlyRevenue);
    setYearlyRevenue(apiData.yearlyRevenue);

    // Prepare data for monthly chart
    const currentMonth = new Date().getMonth() + 1;
    const monthLabels = [];
    const monthData = [];

    for (
      let i = 0;
      i < Math.min(apiData.monthlyRevenue.length, currentMonth);
      i++
    ) {
      monthLabels.push(`Tháng ${i + 1}`);
      monthData.push(apiData.monthlyRevenue[i]);
    }

    setMonthlyData({
      labels: monthLabels,
      datasets: [
        {
          label: "Doanh thu (VND)",
          data: monthData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });

    // Prepare data for yearly chart
    const yearLabels = Object.keys(apiData.yearlyRevenue);
    const yearData = Object.values(apiData.yearlyRevenue);

    setYearlyData({
      labels: yearLabels,
      datasets: [
        {
          label: "Doanh thu theo năm (VND)",
          data: yearData,
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    });
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString("vi-VN") + " VND";
          },
        },
      },
    },
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Quản lý doanh thu sân bóng</h1>

      <div className="info">
        <p>
          <strong>Tháng hiện tại:</strong> <span>{currentMonth}</span>
        </p>
        <p>
          <strong>Doanh thu hôm nay:</strong>{" "}
          <span>{todayRevenue.toLocaleString("vi-VN")}</span> VND
        </p>
      </div>

      <div className="revenue-summary">
        <div className="revenue-card">
          <h3>Doanh thu hôm nay</h3>
          <p className="revenue-amount">
            {todayRevenue.toLocaleString("vi-VN")} VND
          </p>
        </div>
        <div className="revenue-card">
          <h3>Doanh thu tháng này</h3>
          <p className="revenue-amount">
            {monthlyRevenue[new Date().getMonth()]?.toLocaleString("vi-VN") ||
              "0"}{" "}
            VND
          </p>
        </div>
        <div className="revenue-card">
          <h3>Doanh thu năm nay</h3>
          <p className="revenue-amount">
            {yearlyRevenue[new Date().getFullYear()]?.toLocaleString("vi-VN") ||
              "0"}{" "}
            VND
          </p>
        </div>
      </div>

      <div className="table-section">
        <h2 className="section-title">Doanh thu từng tháng</h2>
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Doanh thu (VND)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.labels.map((month, index) => (
              <tr key={month}>
                <td>{month}</td>
                <td>
                  {monthlyData.datasets[0].data[index].toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-section">
        <h2 className="section-title">Biểu đồ doanh thu theo tháng</h2>
        <div className="chart-container">
          {monthlyData.labels.length > 0 && (
            <Bar data={monthlyData} options={chartOptions} />
          )}
        </div>
      </div>

      <div className="table-section">
        <h2 className="section-title">Doanh thu theo năm</h2>
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Năm</th>
              <th>Doanh thu (VND)</th>
            </tr>
          </thead>
          <tbody>
            {yearlyData.labels.map((year, index) => (
              <tr key={year}>
                <td>{year}</td>
                <td>
                  {yearlyData.datasets[0].data[index].toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-section">
        <h2 className="section-title">Biểu đồ doanh thu theo năm</h2>
        <div className="chart-container">
          {yearlyData.labels.length > 0 && (
            <Line data={yearlyData} options={chartOptions} />
          )}
        </div>
      </div>

      <div className="table-section">
        <h2 className="section-title">Đặt sân gần đây</h2>
        <table className="recent-bookings">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Sân</th>
              <th>Thời gian</th>
              <th>Ngày</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.field}</td>
                <td>{booking.time}</td>
                <td>{booking.date}</td>
                <td>{booking.amount.toLocaleString("vi-VN")} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;
