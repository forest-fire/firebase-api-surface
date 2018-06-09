export default {
  input: "dist/esnext/index.js",
  output: {
    file: "dist/firebase-api-surface.cjs.js",
    format: "cjs",
    name: "FirebaseApiSurface"
  }
};
