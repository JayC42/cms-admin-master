import * as XLSX from 'xlsx';
import { ChangeEvent } from 'react';

export class ExcelUtils {
  static exportExcel = async (headerRow: string[], data: unknown[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });
    XLSX.writeFile(wb, fileName);
  };

  static exportExcelWithMultipleSheets = async (
    headerRow: string[][],
    sheets: string[],
    columnWidth: { wch: number }[][],
    fileName: string,
  ) => {
    if (headerRow.length !== sheets.length) {
      throw new Error('Header row and sheet list must have the same length.');
    }
    const wb = XLSX.utils.book_new();
    sheets.map((sheet, index) => {
      const ws = XLSX.utils.json_to_sheet([]);
      ws['!cols'] = columnWidth[index];
      XLSX.utils.book_append_sheet(wb, ws, sheet);
      XLSX.utils.sheet_add_aoa(ws, [headerRow[index]], { origin: 'A1' });
    });
    XLSX.writeFile(wb, fileName);
  };

  static readMultiplePageExcel = (event: ChangeEvent<HTMLInputElement>): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const file = event.target.files?.[0];
      if (!file) {
        reject('No file selected.');
        return;
      }

      const validMimeTypes = [
        'application/vnd.ms-excel', // For .xls files
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // For .xlsx files
      ];
      if (!validMimeTypes.includes(file.type)) {
        reject('Invalid file type. Please select an Excel file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const output: any[] = [];
          const data = new Uint8Array(reader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          workbook.SheetNames.map((sheetName, index) => {
            const targetName = workbook.SheetNames[index];
            const worksheet = workbook.Sheets[targetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            output.push(json);
          });
          resolve(output);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  static convertToExcelDate = (excelTimeValue: number) => {
    if (!excelTimeValue) {
      return undefined;
    }
    try {
      return new Date((excelTimeValue - (25567 + 1)) * 86400 * 1000);
    } catch (error) {
      return undefined;
    }
  };
}
