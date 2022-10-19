const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    argv = {
        mode: 'development'
    }
    console.log(argv)
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  
  return config;
};