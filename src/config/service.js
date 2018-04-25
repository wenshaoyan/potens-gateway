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
    "rabbitmq": {
        "connects": {
            "gateway": {
                "protocol": "amqp",
                "hostname": "120.92.108.221",
                "port": "5672",
                "username": "gateway",
                "password": "123456",
                "vhost": "/gateway",
                "default_config": {
                    "publish_timeout": 3000,
                    "rpc_reply_timeout": 3000,
                }
            }
        }
    },
    "web": {
        "port": process.env.APP_PORT,
        "app": require('../app')
    },

};