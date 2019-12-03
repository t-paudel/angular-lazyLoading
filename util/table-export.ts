import { TableExport } from 'tableexport';

export class ExportData {
  static exportToCSV(tableId: string) {
    console.log('ExportData::exportToCSV()');

    const extension = 'csv';
    const mime = 'text/csv';

    const table = new TableExport(document.getElementById(tableId), { formats: ['csv'], exportButtons: false });
    const data = table.getExportData()[tableId][extension].data;

    table.export2file(data, mime, tableId, '.csv');
  }
}
