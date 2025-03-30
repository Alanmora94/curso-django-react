module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Buscar la regla que maneja archivos SCSS
        const oneOfRules = webpackConfig.module.rules.find((rule) => rule.oneOf);
        if (!oneOfRules || !oneOfRules.oneOf) return webpackConfig;
  
        const sassRule = oneOfRules.oneOf.find((r) =>
          r.test && r.test.toString().includes("scss")
        );
        if (!sassRule || !sassRule.use) return webpackConfig;
  
        // Buscar el uso de sass-loader dentro de los loaders
        const sassLoader = sassRule.use.find((u) =>
          u && u.loader && u.loader.includes("sass-loader")
        );
        if (sassLoader) {
          sassLoader.options = {
            ...sassLoader.options,
            api: "modern", // Forzar la API moderna
          };
        }
  
        return webpackConfig;
      },
    },
  };