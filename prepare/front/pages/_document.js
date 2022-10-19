import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      // styled-components가 서버사이드 렌더링이 가능하게 하는 부분
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    // 기본 형태
    // 이렇게 했을 때 app.js가 document로 감싸지면서 제일 최상단의 html의 head body까지 수정가능하게 된다.
    return (
      <Html>
        <Head />
        <body>
          {/* ie에서도 돌아갈 수 있도록 */}
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es2019%2Ces2018%2Ces2017%2Ces2016%2Ces2015%2Cdefault" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
