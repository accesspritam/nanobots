package com.nanobots.api.handler;

import com.nanobots.api.constants.Config;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * This handler will help process employee data and return response
 * */
public class EmployeeHandler {
  private static final Logger logger = LoggerFactory.getLogger(EmployeeHandler.class);

  public static void getEmployees(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "application/Json");
    response.end(Config.mockJson().toBuffer());
    logger.info("Request process successfully by " + EmployeeHandler.class.getCanonicalName());
  }
}
