const Koa = require('koa');
const app = new Koa();
const graphqlRouter = require('koa-router')();
const restfulRouter = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const fetch = require('node-fetch');


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.proxy = true;

if (getServiceConfig().graphql) {
    const re = /^\/graphql\//;
    app.use(async (ctx, next) => {
        if (re.test(ctx.url)) {
            const urlR = ctx.url.replace(re, '');
            if (!graphqlZkData.isServiceExist(urlR)) {  // graphql没有节点
                ctx.throw(500, 'not found in nodes');
            } else if (!graphqlZkData.isServiceNotNull(urlR)) {    // 没有对应的服务
                ctx.throw(500, 'not found service');
            } else {
                if (ctx.method === 'POST') {
                    const res = await fetch(`http://${graphqlZkData.getService(urlR)}/graphql`, {
                        method: 'POST',
                        body: JSON.stringify(ctx.request.body),
                        headers: {'Content-Type': 'application/json'},
                        timeout: 2000
                    });
                    try {
                        if (!res.ok) {
                            ctx.body = await res.json();
                        } else {
                            ctx.body = await res.json();
                        }
                    } catch (e) {
                        ctx.throw(res.status, await res.text());
                    }
                }

            }

        }
    });
}
if (getServiceConfig().restful) {
    app.use(async (ctx, next) => {
        if (ctx.url.test(/^\/restful/)) {

        }
    });
}

app.use(graphqlRouter.routes(), graphqlRouter.allowedMethods());
app.use(restfulRouter.routes(), restfulRouter.allowedMethods());


module.exports = app;