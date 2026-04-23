import rateLimit from "express-rate-limit";
import { env } from "../configs/env";
import { ApiError } from "../utils/ApiError";

export class RateLimitMiddleware {
  // This stops people from spamming our server with too many requests
  public static handle() {
    return rateLimit({
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX,
      message: "Too many requests from this IP, please try again later.",
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res, next) => {
        next(ApiError.badRequest("Too many requests, please try again later", "RATE_LIMIT_EXCEEDED" as any));
      },
    });
  }
}
