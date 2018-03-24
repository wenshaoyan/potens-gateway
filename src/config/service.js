module.exports = {
    "node_env": NODE_ENV,
    "core_log": getLogger('core'),
    "zk": {
        "url": process.env.ZK_URL,
        "register": [
            {
                "path": `/${NODE_ENV}/gateway`,
                "id": `${process.env.APP_IP}:${process.env.APP_PORT}`,
                "data": {

                }
            }
        ]
    },
    "web": {
        "port": process.env.APP_PORT,
        "app": require('../app')
    },
    "amq": {    // 可选
        "mail": {
            "topic": "basis-mail",
            "host": process.env.KAFKA_URL,
            "type": "kafka"
        }
    }
};