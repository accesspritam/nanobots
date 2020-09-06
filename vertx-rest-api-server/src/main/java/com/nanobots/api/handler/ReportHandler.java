package com.nanobots.api.handler;
import com.nanobots.api.constants.Config;
import com.nanobots.api.excel.ExcelToHtml;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;
import java.io.File;
import java.net.URL;

public class ReportHandler {

  public static void generateReport(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "text/html");

    try {
      URL url =Class.forName(Config.MAIN_APP_CLASS).getResource(Config.DATA_SET_FILE_NAME);
      File excelDataSet = new File(url.getPath());
      ExcelToHtml.parse(excelDataSet);
      response.sendFile(Config.HTML_REPORT_FILE_NAME);

    } catch (Exception e) {

      response.end(e.getMessage());
    }
  }
}
