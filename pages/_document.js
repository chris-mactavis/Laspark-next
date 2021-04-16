import Document, {Html, Head, Main, NextScript } from 'next/document';

class document extends Document  {
    render() {
        return (
            <Html lang="en">
                <Head>
                <meta charSet="utf-8"/>

                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href="/images/favicon/favicon-16x16.png"/>
                {/* <link rel="stylesheet"
                      href="/css/bootstrap.min.css"/> */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />


                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />


                <link rel="stylesheet" type="text/css" href="/slick/slick.css"/>
                <link rel="stylesheet" type="text/css" href="/slick/slick-theme.css"/>

                {/*<meta*/}
                {/*    name="description"*/}
                {/*    content="Learn how to build a personal website using Next.js"*/}
                {/*/>*/}
                {/*<meta*/}
                {/*    property="og:image"*/}
                {/*    content={`https://og-image.now.sh/${encodeURI(*/}
                {/*        siteTitle*/}
                {/*    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}*/}
                {/*/>*/}
                {/*<meta name="og:title" content={siteTitle} />*/}
                {/*{meta}*/}

                <script src="https://code.jquery.com/jquery-3.4.1.min.js"
                        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                        crossOrigin="anonymous" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

                    <script type="text/javascript" src="/slick/slick.min.js" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
                    {/* <script src="/js/bootstrap.min.js" /> */}
                    <script src="/js/main.js" />
                </Head>
    
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
    
};

export default document;