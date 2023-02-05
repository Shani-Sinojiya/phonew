namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXTAUTH_URL: string;
    API_URL: string;
    API_TOKEN: string;
    API_IMAGE_URL: string;
  }
}
