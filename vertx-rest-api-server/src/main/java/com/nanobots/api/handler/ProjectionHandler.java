package com.nanobots.api.handler;

import com.nanobots.api.constants.Config;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * This handler will help process projection data and return response
 * */
public class ProjectionHandler {
  private static final Logger logger = LoggerFactory.getLogger(ProjectionHandler.class);

  public static void addProjection(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "application/Json");
    response.end(routingContext.getBody());
    logger.info("Request process successfully by " + ProjectionHandler.class.getCanonicalName());
  }

  public static void getProjection(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "application/Json");
    response.end(Config.mockJson().toBuffer());
    logger.info("Request process successfully by " + ProjectionHandler.class.getCanonicalName());
  }
}
