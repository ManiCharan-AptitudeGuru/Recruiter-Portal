const { jsPDF } = require('jspdf');
const exceljs = require('exceljs');
const { parse } = require('json2csv');

const createReportFile = async (reportData, format) => {
  let buffer;

  if (format === 'PDF') {
    const doc = new jsPDF();
    doc.text(JSON.stringify(reportData, null, 2), 10, 10);
    buffer = doc.output('arraybuffer');
  } else if (format === 'Excel') {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Report');
    const columns = Object.keys(reportData[0]).map(key => ({ header: key, key }));
    worksheet.columns = columns;
    worksheet.addRows(reportData);
    buffer = await workbook.xlsx.writeBuffer();
  } else if (format === 'CSV') {
    buffer = Buffer.from(parse(reportData));
  }

  return buffer;
};

module.exports = { createReportFile };
