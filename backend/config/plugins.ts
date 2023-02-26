export default ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedfields: ["id", "uid"],
    },
  },
});
