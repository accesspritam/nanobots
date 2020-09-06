import com.nanobots.api.constants.Config;
import com.nanobots.api.handler.EmployeeHandler;
import com.nanobots.api.handler.ProjectionHandler;
import com.nanobots.api.handler.ReportHandler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;

public class NanobotsApp {

  public static void main(String[] args) {

    JsonObject jsonObject = new JsonObject();
    jsonObject.put("k1", "v1");
    jsonObject.put("k2", "v2");
    jsonObject.put("k3", "v3");
    jsonObject.put("k4", "v4");

    Vertx vertx = Vertx.vertx();

    Router router = Router.router(vertx);
    router.route().handler(BodyHandler.create());

    router.route(HttpMethod.POST, Config.POST_PROJECTION).handler(ProjectionHandler::addProjection);

    router.route(HttpMethod.POST, Config.GET_PROJECTION).handler(ProjectionHandler::getProjection);

    router.route(HttpMethod.GET, Config.GET_EMPLOYEES).handler(EmployeeHandler::getEmployees);

    router.route(HttpMethod.GET, Config.GET_REPORT).blockingHandler(ReportHandler::generateReport);

    vertx
        .createHttpServer()
        .requestHandler(router)
        .listen(
            Config.PORT,
            r -> {
              if (r.succeeded()) System.out.println("SERVER STARTED ON " + Config.PORT);
              else System.out.println("SERVER NOT STARTED: {}" + r.cause());
            });
  }
}
