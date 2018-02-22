module.exports = {
    "zk": {
        "url": process.env.ZK_URL,
        "register": [
            {
                "path": "/develop/graphql/admin",
                "id": "127.0.0.1:9000",
                "data": {
                }
            }
        ]
    },
    "web": {
        "port": process.env.APP_PORT
    }
};