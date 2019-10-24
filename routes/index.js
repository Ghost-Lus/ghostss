const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Ghosts!'
})

module.exports = router
