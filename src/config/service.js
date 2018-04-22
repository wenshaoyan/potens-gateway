const path = require('path');
module.exports = {
    "project_dir": path.resolve(__dirname, '..'),
    "node_env": NODE_ENV,
    "core_log": getLogger('core'),
    "server_name": "gateway",
    "service_id": "1.0.0.0",
    "zk": {
        "url": process.env.ZK_URL,
        "register": [
        ]
    },
    "web": {
        "port": process.env.APP_PORT,
        "app": require('../app')
    },

};