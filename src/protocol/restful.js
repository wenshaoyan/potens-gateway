/**
 * Created by wenshao on 2018/4/22.
 * http-restful规范请求
 */
'use strict';
const {Call} = require('potens-core-node');
const gatewayName = 'gateway';
const prefix = '/restful';
const logger = global.getLogger('restful');


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
    const result = await amqp.rpcTopic(ex, routerKey, {params: ctx.params, query: ctx.query, body: ctx.request.body});

    return {code: 200, data: result};
}
module.exports = post;
