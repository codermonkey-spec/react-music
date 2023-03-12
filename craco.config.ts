const CracoLess = require("craco-less");
const path = require("path");

const resolve = (dir: string) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true },
        },
        modifyLessRule: function () {
          return {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64:6]",
                  },
                },
              },
              { loader: "less-loader" },
            ],
          };
        },
      },
    },
  ],
};

export {};
