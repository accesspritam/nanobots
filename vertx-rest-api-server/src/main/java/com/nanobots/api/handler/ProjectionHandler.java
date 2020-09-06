package com.nanobots.api.handler;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

public class ProjectionHandler {

  public static void addProjection(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "application/Json");
    response.end(routingContext.getBody());
  }

  public static void getProjection(final RoutingContext routingContext) {

    HttpServerResponse response = routingContext.response();
    response.putHeader("Content-Type", "application/Json");
    response.end(routingContext.getBody());
  }
}
