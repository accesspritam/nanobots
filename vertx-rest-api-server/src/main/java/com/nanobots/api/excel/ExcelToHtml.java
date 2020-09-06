package com.nanobots.api.excel;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelToHtml {

  /** Public constants */
  public static final String[] FILE_TYPES = new String[] {"xls", "xlsx"};

  private static final String NEW_LINE = "\n";
  private static final String HTML_FILE_EXTENSION = ".html";
  private static final String TEMP_FILE_EXTENSION = ".tmp";
  private static final String HTML_SNNIPET_1 = "<!DOCTYPE html><html><head><title>";
  private static final String HTML_SNNIPET_2 =
      "</title>"
          + "<STYLE type=\"text/css\">\n"
          + "    .styled-table {\n"
          + "    border-collapse: collapse;\n"
          + "    margin-left:auto; margin-right:auto;\n"
          + "    font-size: 0.9em;\n"
          + "    font-family: sans-serif;\n"
          + "    min-width: 400px;\n"
          + "    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n"
          + "}\n"
          + ".styled-table thead tr {\n"
          + "    background-color: #009879;\n"
          + "    color: #ffffff;\n"
          + "    text-align: left;\n"
          + "}\n"
          + ".styled-table th,\n"
          + ".styled-table td {\n"
          + "    padding: 12px 15px;\n"
          + "}\n"
          + ".styled-table tbody tr {\n"
          + "    border-bottom: 1px solid #dddddd;\n"
          + "}\n"
          + "\n"
          + ".styled-table tbody tr:nth-of-type(even) {\n"
          + "    background-color: #f3f3f3;\n"
          + "}\n"
          + "\n"
          + ".styled-table tbody tr:last-of-type {\n"
          + "    border-bottom: 2px solid #009879;\n"
          + "}\n"
          + ".styled-table tbody tr.active-row {\n"
          + "    font-weight: bold;\n"
          + "    color: #009879;\n"
          + "}\n"
          + "</STYLE>"
          + "</head><body><table class=\"styled-table\">";
  private static final String HTML_SNNIPET_3 = "</table></body></html>";
  private static final String HTML_TR_S_ACTIVE_ROW = "<tr class=\"active-row\">";
  private static final String HTML_TR_S = "<tr>";
  private static final String HTML_TR_E = "</tr>";
  private static final String HTML_TD_S = "<td>";
  private static final String HTML_TD_E = "</td>";

  public static void parse(File file, String htmlFileName)
      throws FileNotFoundException, IOException {
    BufferedWriter writer;
    Workbook workbook;
    String fileName = file.getName();
    String folderName = file.getParent();
    if (fileName.toLowerCase().endsWith(ExcelToHtml.FILE_TYPES[0])) {
      workbook = new HSSFWorkbook(new FileInputStream(file));
    } else {
      workbook = new XSSFWorkbook(new FileInputStream(file));
    }

    File tempFile =
        File.createTempFile(
            fileName + '-', HTML_FILE_EXTENSION + TEMP_FILE_EXTENSION, new File(folderName));
    writer = new BufferedWriter(new FileWriter(tempFile));
    writer.write(HTML_SNNIPET_1);
    writer.write(fileName);
    writer.write(HTML_SNNIPET_2);
    Sheet sheet = workbook.getSheetAt(0);
    Iterator<Row> rows = sheet.rowIterator();
    Iterator<Cell> cells = null;
    while (rows.hasNext()) {
      Row row = rows.next();
      cells = row.cellIterator();
      writer.write(NEW_LINE);

      if (row.getRowNum() % 2 == 0) writer.write(HTML_TR_S_ACTIVE_ROW);
      else writer.write(HTML_TR_S);

      while (cells.hasNext()) {
        Cell cell = cells.next();
        writer.write(HTML_TD_S);
        writer.write(cell.toString());
        writer.write(HTML_TD_E);
      }
      writer.write(HTML_TR_E);
    }
    writer.write(NEW_LINE);
    writer.write(HTML_SNNIPET_3);
    writer.close();
    File newFile = new File(folderName + "/" + htmlFileName);
    tempFile.renameTo(newFile);
    tempFile.delete();

    System.out.println(newFile.getAbsolutePath());
  }
}
