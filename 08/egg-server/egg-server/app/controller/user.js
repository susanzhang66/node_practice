const { Controller } = require('egg')

/**
* @Controller 用户管理
*/
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }
  /**
  * @summary 创建用户
  * @description 创建用户，记录用户账户/密码/类型
  * @router post /api/user
  * @request body createUserRequest *body
  * @response 200 baseResponse 创建成功
  */
  create(){
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createUserRequest)
    const res = {abc:123}
    ctx.helper.success({ctx, res})
  }
}

module.exports = UserController;