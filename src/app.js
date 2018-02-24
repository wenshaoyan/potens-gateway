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
const graphqlRouterPool = async (ctx, next) => {
    console.log('===========111')
    ctx.body = '1';
    console.log(ctx.url);
};
const restfulRouterPool = (ctx, next) => {
    ctx.body = '1';
    console.log(ctx.url);
};
if (getServiceConfig().graphql) {
    const re = /^\/graphql\//;
    app.use(async (ctx, next) => {
        if (re.test(ctx.url)) {
            const urlR =  ctx.url.replace(re, '');
            if (!ZKInfo.graphql || !ZKInfo.graphql.nodes){  // graphql没有节点
                ctx.throw(500, 'not found in nodes');
            } else if (!(urlR in ZKInfo.graphql.nodes)){    // 没有对应的服务
                ctx.throw(500, 'not found service');
            } else {
                const parent = ZKInfo.graphql.nodes[urlR];
                console.log(ctx.request.body,ctx.method);
                if (ctx.method === 'GET') {
                    ctx.body = await fetch('http://127.0.0.1:9000/graphql', {method: 'GET'}).then(res => res.json());
                } else if (ctx.method === 'POST') {
                    ctx.body =  await fetch('http://127.0.0.1:9000/graphql', {
                        method: 'POST',
                        body:JSON.stringify(ctx.request.body),
                        headers: { 'Content-Type': 'application/json' },
                    }).then(res=>res.json());
                }

                /*for (const id in parent.nodes) {

                }*/

                console.log(parent.data, parent.nodes);
            }
            /*fetch('http://httpbin.org/post', {
                method: 'POST',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })*/
        }
    });
}
if (getServiceConfig().restful) {
    app.use(async (ctx, next) => {
        if (ctx.url.test(/^\/restful/)) {

        }
    });
}

// 动态路由
setListenerRouter({
    onGraphqlInit: function (nodes) {
        for (let id in nodes) {

        }

    },
    onGraphqlAddService: function () {

    },
    onGraphqlAddNode: function () {

    }

});
app.use(graphqlRouter.routes(), graphqlRouter.allowedMethods());
app.use(restfulRouter.routes(), restfulRouter.allowedMethods());


app.on('error', function (err, ctx) {
    console.log(err);
});

module.exports = app;