export default {
  expo: {
    name: "Administrador",
    slug: "teste-react_TCC",
    version: "1.0.0",

    icon: "./assets/images/icon.png",

    web: {
      bundler: "metro",
      output: "static",

      name: "Administrador",
      shortName: "Admin",
      description: "Painel administrativo",
      display: "standalone",
      themeColor: "#4FC3F7",
      backgroundColor: "#ffffff",

      favicon: "./assets/images/favicon.png"
    },

    plugins: ["expo-router"]
  }
};

