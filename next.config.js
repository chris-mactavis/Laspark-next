// next.config.js
// const withSass = require('sass')
//     module.exports = withSass({
//     cssModules: true
// })

module.exports = {
    env: {
        environment: process.env.ENVIRONMENT,
        REVPAY_TOKEN: process.env.REVPAY_TOKEN
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://161.35.7.233/api/:path*',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/*',
                headers: [
                    {
                        key: 'x-custom-header',
                        value: 'my custom header value',
                    },
                    {
                        key: 'x-another-custom-header',
                        value: 'my other custom header value',
                    },
                ],
            },
        ]
    },
}
