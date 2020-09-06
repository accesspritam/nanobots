package com.nanobots.api.constants;

import io.vertx.core.json.JsonObject;

public final class Config {

  public static int PORT = 8443;
  public static final String MAIN_APP_CLASS = "NanobotsApp";
  public static final String POST_PROJECTION = "/v1/nanobots/rest/api/post/projection";
  public static final String GET_PROJECTION = "/v1/nanobots/rest/api/get/projection";
  public static final String GET_EMPLOYEES = "/v1/nanobots/rest/api/get/employees";
  public static final String GET_REPORT = "/v1/nanobots/rest/api/get/report";

  public static final String DATA_SET_FILE_NAME = "data-set.xlsx";
  public static final String HTML_REPORT_FILE_NAME = "report.html";

  public static JsonObject mockJson() {
    //dummy json
    JsonObject jsonObject = new JsonObject();
    jsonObject.put("k1", "v1");
    jsonObject.put("k2", "v2");
    jsonObject.put("k3", "v3");
    jsonObject.put("k4", "v4");
    return jsonObject;
  }
}
