const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan");

const index = require("./routes/index");
const user = require("./routes/user");
const artcle = require("./routes/artcle");

const { REIDS_CONFIG } = require("./config/db");

// error handler
onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"]
    })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 日志记录
const ENV = process.env.NODE_ENV;
if(ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'));  
}else {
    // 线上环境使用combined
    const logFileName = path.join(__dirname, 'logs', 'access.log');
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(morgan("combined", {
        stream: writeStream
    })); 
}

// session 配置
app.keys = ['HELLO_Nodes']
app.use(session({
    // 配置 cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: redisStore({
        // all: '127.0.0.1:6379' // redis本地写死
        all: `${REIDS_CONFIG.host}:${REIDS_CONFIG.port}`
    })
}))

// routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(artcle.routes(), artcle.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
