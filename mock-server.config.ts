import type { MockServerConfig } from "mock-config-server";

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/signin",
        method: "post",
        routes: [
          { data: { error: "unvalid data" } },
          {
            data: { token: "auth-user-token" },
            entities: {
              body: {
                email: "sergeisova@gmail.com",
              },
            },
          },
        ],
        interceptors: {
          response: (data, { setStatusCode }) => {
            setStatusCode(400);
            return data;
          },
        },
      },
      {
        path: "/signup",
        method: "post",
        routes: [{ data: { token: "auth-user-token" } }],
      },
      {
        path: "/reset-password",
        method: "post",
        routes: [{ data: { token: "auth-user-token" } }],
      },
    ],
  },
};

export default mockServerConfig;
