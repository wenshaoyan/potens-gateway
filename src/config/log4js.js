module.exports = {
  "appenders": {
    "console":{"type":"console"},
    "http":{
      "type": "logFaces-HTTP",
      "url": `${process.env.LOG_URL}/Gateway/${NODE_ENV}/${process.env.LOG_SALT}`
    }
  },
  "categories": {
    "default": { "appenders": ["console"], "level":"trace" },
    "router":{"appenders":["console","http"],"level":"trace"},
    "zookeeper":{"appenders":["console","http"],"level":"trace"},
    "thrift":{"appenders":["console","http"],"level":"trace"},
    "resSuccess":{"appenders":["console"],"level":"trace"},
    "resFail":{"appenders":["console","http"],"level":"trace"},
    "resUnknown":{"appenders":["console","http"],"level":"trace"},
    "error": {"appenders":["console","http"],"level":"trace"},
    "core": {"appenders":["console","http"],"level":"trace"},
    "graphql": {"appenders":["console","http"],"level":"trace"}
  }
}