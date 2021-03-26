// next.config.js
// const withSass = require('sass')
//     module.exports = withSass({
//     cssModules: true
// })

module.exports = {
    env: {
        environment: process.env.ENVIRONMENT,
        REVPAY_TOKEN: process.env.REVPAY_TOKEN
    }
}