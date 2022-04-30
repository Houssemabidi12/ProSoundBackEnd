module.exports = (app) => {
  app.use((_, res, next) => {
    res.setHeaders("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeaders("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
};
