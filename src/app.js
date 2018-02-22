const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.proxy = true;



// logger
app.use(router_log());

// 获取用户信息
// app.use(getUser());
// 规范响应头
app.use(response({
    jsonFile:errorSource,
    successLog:getLogger('resSuccess'),
    failLog:getLogger('resFail')
}));

router.use('/banners', banner.routes(),banner.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function (err, ctx) {
    console.log(err);
});

module.exports = app;