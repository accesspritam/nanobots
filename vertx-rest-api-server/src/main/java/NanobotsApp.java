import com.nanobots.api.constants.Config;
import com.nanobots.api.handler.EmployeeHandler;
import com.nanobots.api.handler.ProjectionHandler;
import com.nanobots.api.handler.ReportHandler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * This is main application class for nanobots app that runs vertx server on default 8443 port
 * it loads all the rest endpoint as defined and start listening for incoming traffic.
 * */

public class NanobotsApp {

  private static final Logger logger = LoggerFactory.getLogger(NanobotsApp.class);

  public static void main(String[] args) {

    Vertx vertx = Vertx.vertx();

    Router router = Router.router(vertx);
    router.route().handler(BodyHandler.create());

    //Prepare routes and assign handlers
    router.route(HttpMethod.POST, Config.POST_PROJECTION).handler(ProjectionHandler::addProjection);
    router.route(HttpMethod.POST, Config.GET_PROJECTION).handler(ProjectionHandler::getProjection);
    router.route(HttpMethod.GET, Config.GET_EMPLOYEES).handler(EmployeeHandler::getEmployees);
    router.route(HttpMethod.GET, Config.GET_REPORT).blockingHandler(ReportHandler::generateReport);

    //start vertex server on defined port and start listening to request
    vertx
        .createHttpServer()
        .requestHandler(router)
        .listen(
            Config.PORT,
            r -> {
              if (r.succeeded()) logger.info("SERVER STARTED ON {}", Config.PORT);
              else logger.error("SERVER NOT STARTED", r.cause());
            });
  }
}
