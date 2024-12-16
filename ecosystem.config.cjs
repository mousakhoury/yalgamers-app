module.exports = {
    apps: [
        {
            name: 'yalgamers.gg',
            script: './build/index.js',
            env: {
                PORT: process.env.PORT,
                PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL,
                BODY_SIZE_LIMIT: process.env.BODY_SIZE_LIMIT,
                PUBLIC_REDIS_URL: process.env.PUBLIC_REDIS_URL
            },
            instances: "max",
            exec_mode: "cluster"
        }
    ]
}
