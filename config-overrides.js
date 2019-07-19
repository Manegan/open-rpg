const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appPath = path.resolve(__dirname, 'src/main/resources/app/src');
        paths.appBuild = path.resolve(__dirname, 'src/main/resources/site');
        paths.appPublic = path.resolve(__dirname, 'src/main/resources/app/public');
        paths.appHtml = path.resolve(__dirname, 'src/main/resources/app/public/index.html');
        paths.appIndexJs = path.resolve(__dirname, 'src/main/resources/app/src/index.js');
        paths.appSrc = path.resolve(__dirname, 'src/main/resources/app/src');
        return paths;
    },
    dev: function (dev, env) {
        console.log(dev);
        return dev;
    }
};
