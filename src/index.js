import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";

const StartApp = async () => {
    await initMongoConnection();
    setupServer();
};

StartApp();
