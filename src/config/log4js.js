const packageJson = require('../package.json');
module.exports = {
    "appenders": {
        "console": {"type": "console"},
        "kafka": {
            "type": "kafka",
            "socket_config": {"kafkaHost": process.env.KAFKA_URL, "topic": "global-log"}
        }
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "trace"}
    },
    "project": {
        "name":packageJson.name,
        "version":packageJson.version
    }
};