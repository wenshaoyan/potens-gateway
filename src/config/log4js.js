const packageJson = require('../package.json');
module.exports = {
    "appenders": {
        "console": {"type": "console"},
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "trace"}
    },
    "project": {
        "name":packageJson.name,
        "version":packageJson.version
    }
};