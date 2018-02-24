module.exports = {
    "zk": {
        "url": process.env.ZK_URL,
        "register": [
            {
                "path": `/${NODE_ENV}/gateway`,
                "id": `${process.env.APP_IP}:${process.env.APP_PORT}`,
                "data": {}
            }
        ]
    },
    "graphql": {
        "path_dir": `/${NODE_ENV}/graphql`,
        "routerPrefix": '/graphql'
    },
    "restful": {
        "path_dir": `/${NODE_ENV}/restful`,
        "routerPrefix": '/restful'
    },
    "web": {
        "port": process.env.APP_PORT
    }
};