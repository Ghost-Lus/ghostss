const router = require("koa-router")();
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async function(ctx, next) {
    ctx.body = 'this is userLogin'
});

router.get("/info", async function(ctx, next) {
    ctx.body = 'this is userInfo'
});

module.exports = router;
