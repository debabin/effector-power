import type { MockServerConfig } from "mock-config-server";

export const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/signin",
        method: "post",
        routes: [
          {
            data: { error: "unvalid data" },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: { email: "sergeisova@gmail.com", username: "sergei sova" },
            entities: {
              body: {
                email: "sergeisova@gmail.com",
              },
            },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader("Set-Cookie", "token=auth-user-token");
                return data;
              },
            },
          },
        ],
      },
      {
        path: "/signup",
        method: "post",
        routes: [
          {
            data: {
              username: "sergei sova",
            },
            interceptors: {
              response: (data, { appendHeader, request }) => {
                appendHeader("Set-Cookie", "token=auth-user-token");
                return { ...data, email: request.body.email };
              },
            },
          },
        ],
      },
      {
        path: "/reset-password",
        method: "post",
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader("Set-Cookie", "token=auth-user-token");
                return data;
              },
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
