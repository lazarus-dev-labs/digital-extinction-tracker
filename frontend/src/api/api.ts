import ky from "ky";

const BACKEND_URL = process.env.BUN_PUBLIC_BACKEND_URL;

export const api = ky.create({
  prefixUrl: BACKEND_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        if (!request.headers.has("Content-Type")) {
          request.headers.set("Content-Type", "application/json");
        }
      },
    ],
  },
});
