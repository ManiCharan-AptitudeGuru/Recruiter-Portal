import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import Papa from "papaparse";

export const data = {
  labels: ["2019", "2020", "2021", "2022", "2023"],
  datasets: [
    {
      label: "Hires per Year",
      data: [160, 150, 120, 180, 220],
      backgroundColor: "#00e676",
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Year-wise Hiring Data",
      color: "#fff",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#fff",
      },
    },
    y: {
      ticks: {
        color: "#fff",
      },
    },
  },
};

export const pieData = {
  labels: ["Technical", "Marketing", "HR", "Sales", "Finance"],
  datasets: [
    {
      label: "Department-wise Hiring",
      data: [40, 20, 15, 10, 15],
      backgroundColor: ["#00e676", "#ff9100", "#ff1744", "#2196f3", "#9c27b0"],
      hoverBackgroundColor: [
        "#00c853",
        "#ff6d00",
        "#d50000",
        "#1976d2",
        "#7b1fa2",
      ],
    },
  ],
};

export const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "#fff",
      },
    },
  },
};

export const layout = [
  { i: "a", x: 0, y: 0, w: 4, h: 2 },
  { i: "b", x: 4, y: 0, w: 4, h: 2 },
  { i: "c", x: 8, y: 0, w: 4, h: 2 },
  { i: "d", x: 0, y: 2, w: 4, h: 2 },
  { i: "e", x: 4, y: 2, w: 4, h: 2 },
  { i: "f", x: 8, y: 2, w: 4, h: 2 },
];

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
export const cols = { lg: 12, md: 10, sm: 6, xs: 2, xxs: 1 };

export const exportPDF = () => {
  const doc = new jsPDF();
  doc.text("Year-wise Hiring Data", 10, 10);

  // Add bar chart data
  doc.text("Year-wise Hiring Data:", 10, 20);
  const barData = [
    { year: "2019", hires: 160 },
    { year: "2020", hires: 150 },
    { year: "2021", hires: 120 },
    { year: "2022", hires: 180 },
    { year: "2023", hires: 220 },
  ];
  barData.forEach((item, index) => {
    doc.text(`${item.year}: ${item.hires}`, 10, 30 + index * 10);
  });

  // Add pie chart data
  doc.text("Department-wise Hiring:", 10, 90);
  const pieData = [
    { department: "Technical", percentage: 40 },
    { department: "Marketing", percentage: 20 },
    { department: "HR", percentage: 15 },
    { department: "Sales", percentage: 10 },
    { department: "Finance", percentage: 15 },
  ];
  pieData.forEach((item, index) => {
    doc.text(`${item.department}: ${item.percentage}%`, 10, 100 + index * 10);
  });

  doc.save("report.pdf");
};

export const exportExcel = () => {
  const barData = [
    { Year: "2019", Hires: 160 },
    { Year: "2020", Hires: 150 },
    { Year: "2021", Hires: 120 },
    { Year: "2022", Hires: 180 },
    { Year: "2023", Hires: 220 },
  ];

  const pieData = [
    { Department: "Technical", Percentage: 40 },
    { Department: "Marketing", Percentage: 20 },
    { Department: "HR", Percentage: 15 },
    { Department: "Sales", Percentage: 10 },
    { Department: "Finance", Percentage: 15 },
  ];

  const ws1 = XLSX.utils.json_to_sheet(barData);
  const ws2 = XLSX.utils.json_to_sheet(pieData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, "Year-wise Hiring");
  XLSX.utils.book_append_sheet(wb, ws2, "Department-wise Hiring");
  XLSX.writeFile(wb, "report.xlsx");
};

export const exportCSV = () => {
  const barData = [
    { Year: "2019", Hires: 160 },
    { Year: "2020", Hires: 150 },
    { Year: "2021", Hires: 120 },
    { Year: "2022", Hires: 180 },
    { Year: "2023", Hires: 220 },
  ];

  const pieData = [
    { Department: "Technical", Percentage: 40 },
    { Department: "Marketing", Percentage: 20 },
    { Department: "HR", Percentage: 15 },
    { Department: "Sales", Percentage: 10 },
    { Department: "Finance", Percentage: 15 },
  ];

  const csv1 = Papa.unparse(barData);
  const csv2 = Papa.unparse(pieData);
  const csv = `Year-wise Hiring Data\n${csv1}\n\nDepartment-wise Hiring Data\n${csv2}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "report.csv");
};

export const shareViaEmail = () => {
  const subject = encodeURIComponent("Year-wise Hiring Report");
  const body = encodeURIComponent(`
      Year-wise Hiring Data:
      2019: 160 hires
      2020: 150 hires
      2021: 120 hires
      2022: 180 hires
      2023: 220 hires
  
      Department-wise Hiring:
      Technical: 40%
      Marketing: 20%
      HR: 15%
      Sales: 10%
      Finance: 15%
  
      Please find the detailed report attached.
    `);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
};