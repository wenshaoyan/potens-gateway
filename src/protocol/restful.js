/**
 * Created by wenshao on 2018/4/22.
 * http-restful规范请求
 */
'use strict';
const {Call} = require('potens-core-node');
const gatewayName = 'gateway';
const prefix = '/restful';
const logger = global.getLogger('restful');
const reIpv4 = '.*:.*:.*:(.*)';

async function post(ctx) {
    const amqp = Call.getAmqp(gatewayName);
    if (!amqp) {    // 配置错误 rabbitm.connect.gateway不存在
        logger.error('配置错误 rabbitm.connect.gateway不存在');
        return {
            code: 900,
            data: null,
            message: `not found ${gatewayName} in connects `
        };
    }
    const pathSplit = ctx.path.split('/');

    const method = ctx.method;

    if (pathSplit.length === 2) { // url中没有服务的域名
        return {
            code: 901,
            data: null,
            message: `url error, not have service domian`
        };
    }
    if (pathSplit.length === 3) {   // url只有domian 没有routerKey
        return {
            code: 901,
            data: null,
            message: `url error, not have routerKey`
        };
    }


    const ex = pathSplit[2] + '.gateway';
    const routerKey = `${ctx.method.toLocaleLowerCase()}.${pathSplit.slice(3, pathSplit.length).join('.')}`;

    if (!await amqp.checkExchange(ex)) {
        return {
            code: 404,
            data: null,
            message: `not found ${ex} in exchange `
        };
    }
    const startTime = new Date().getTime();
    let result;
    let ipv4 = ctx.ip.match(reIpv4);
    if (ipv4 instanceof Array && ipv4.length === 2) ipv4 = ipv4[1];
    else if (ipv4 === null) ipv4 = ctx.ip;
    else ctx.ipv4 = ipv4;
    try {
        result = await amqp.rpcTopic(ex, routerKey, {params: ctx.params, query: ctx.query, body: ctx.request.body});
        result = {code:200, data: result};
    } catch (e) {
        if (e.name === 'CoreException' && typeof e.code === 'number') {
            result = e.toJson();
        } else {
            result = {code: 520, message: e.message};
        }
    }
    const routerTime = new Date().getTime() - startTime;
    if (result.code !== 200) {
        logger.error(ipv4, ctx.method, ctx.url, result.code, `${routerTime}ms`);
    } else {
        logger.info(ipv4, ctx.method, ctx.url, 200, `${routerTime}ms`);
    }
    return result;



}
module.exports = post;
