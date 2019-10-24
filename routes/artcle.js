const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/blog");

// 获取博客列表
router.get("/list", async (ctx, next) => {
    ctx.body = 'this is blog list'
});

module.exports = router;