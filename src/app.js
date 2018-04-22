const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const fetch = require('node-fetch');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.proxy = true;
const restful = require('./protocol/restful');

app.use(async(ctx, next) => {
    if (/^\/restful/.test(ctx.url)) {
        ctx.body = await restful(ctx);
    } else if (/^\/graphql\//.test(ctx.url)) {

    } else {    // 404

    }
});

/*const re = /^\/graphql\//;
app.use(async(ctx, next) => {
    if (re.test(ctx.url)) {
        const request_gateway_id = new Date().getTime() + '-' + Math.random().toString(36).substr(2);
        const addHeader = {
            request_gateway_id,
            'Content-Type': 'application/json'
        };
        const urlR = ctx.url.replace(re, '');
        if (!graphqlZkData.isServiceExist(urlR)) {  // graphql没有节点
            ctx.throw(500, 'not found in nodes');
        } else if (!graphqlZkData.isServiceNotNull(urlR)) {    // 没有对应的服务
            ctx.throw(500, 'not found service');
        } else {
            if (ctx.method === 'POST') {
                let res;
                try {
                    res = await fetch(`http://${graphqlZkData.getService(urlR)}/graphql`, {
                        method: 'POST',
                        body: JSON.stringify(ctx.request.body),
                        headers: addHeader,
                        timeout: 2000
                    });
                    ctx.body = await res.json();
                } catch (e) {
                    if (e instanceof fetch.FetchError) {    // 请求错误
                        if (e.type === 'request-timeout') { // 请求超时
                            ctx.throw(408, e.message);
                        } else if (e.type === 'invalid-json') {  // 响应body转json失败
                            ctx.throw(500, await res.text());
                        } else {    // 其他
                            ctx.throw(500, e.message);
                        }
                    } else {    // 其他异常
                        ctx.throw(500, e.method);
                    }
                }
            }
        }

    }
});*/





// app.use(graphqlRouter.routes(), graphqlRouter.allowedMethods());
// app.use(restfulRouter.routes(), restfulRouter.allowedMethods());


module.exports = app;