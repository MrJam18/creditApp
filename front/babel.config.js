
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
      moduleRoot: 'D:/CreditApp/front'
    },
  ],
];

module.exports = function (api) {
  api.cache(true);
    return {
      plugins: ['macros', 'babel-plugin-root-import'],
    }
  }