namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    URL: string;
    MONGODB_URI: string;
    MONGODB_PASSWORD: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    API_URL: string;
    API_TOKEN: string;
    API_IMAGE_URL: string;
    GRAPHQL_URL: string;
  }
}
