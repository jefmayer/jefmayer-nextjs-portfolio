import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Muli:wght@200;500;900&family=Rubik+One&display=swap" rel="stylesheet" />
        <Script
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EQQJ5ZYNEG"
        />
        <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EQQJ5ZYNEG');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}