import { env } from "./configs/env";
import app from "./app";
import { logger } from "./utils/logger";

const port = env.SERVER_PORT || 5000;

app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}`);
});
