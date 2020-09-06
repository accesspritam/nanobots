package com.nanobots.api.handler;

import com.nanobots.api.constants.Config;
import com.nanobots.api.excel.ExcelToHtml;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;
import java.io.File;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/*
 * This handler will help generate HTML report from excel data-set and return
 * */
public class ReportHandler {
  private static final Logger logger = LoggerFactory.getLogger(ReportHandler.class);

  public static void generateReport(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "text/html");

    try {
      URL url = Class.forName(Config.MAIN_APP_CLASS).getResource(Config.DATA_SET_FILE_NAME);
      File excelDataSet = new File(url.getPath());
      ExcelToHtml.parse(excelDataSet, Config.HTML_REPORT_FILE_NAME);
      response.sendFile(Config.HTML_REPORT_FILE_NAME);
      logger.info("Request process successfully by " + ReportHandler.class.getCanonicalName());

    } catch (Exception e) {

      response.end(e.getMessage());
    }
  }
}
