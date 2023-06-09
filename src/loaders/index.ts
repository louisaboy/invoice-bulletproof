import expressLoader from "./express";
import dependencyInjectorLoder from "./dependencyInjector";
import databaseLoader from "./database";
import Logger from "./logger";
import { Invoice } from "../entity/Invoice";

export default async ({ expressApp }) => {
  const connection = await databaseLoader.create();
  Logger.info("✅ DB loaded and connected!");
  await dependencyInjectorLoder({
    repositories: [Invoice].map((e) => ({
      name: e.name.charAt(0).toLowerCase() + e.name.slice(1) + "Repository",
      repository: connection.manager.getRepository(e),
    })),
  });
  Logger.info("✅ Dependency Injector loaded.");

  await expressLoader({ app: expressApp });
  Logger.info("✅ Express loaded.");
};
