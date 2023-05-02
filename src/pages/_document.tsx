import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/assets/backgrounds/bg-home.svg"
            as="image"
          />
          {/* <link rel="preload" href="/assets/backgrounds/bg-loader.svg" as="image" />
          <link rel="preload" href="/assets/backgrounds/bg-play.svg" as="image" />
          <link rel="preload" href="/assets/backgrounds/bg-result.svg" as="image" /> */}

          {/* <link rel="preload" href="/assets/back-icon.svg" as="image" />
          <link rel="preload" href="/assets/backspace.svg" as="image" />
          <link rel="preload" href="/assets/chances-icon.svg" as="image" />
          <link rel="preload" href="/assets/wsp-icon.svg" as="image" />
          <link rel="preload" href="/assets/twitter-icon.svg" as="image" />
          <link rel="preload" href="/assets/scoreboard.svg" as="image" />
          <link rel="preload" href="/assets/home-icon.svg" as="image" />
          <link rel="preload" href="/assets/circle.svg" as="image" />
          <link rel="preload" href="/assets/cross.svg" as="image" />
          <link rel="preload" href="/assets/space.svg" as="image" />
          <link rel="preload" href="/assets/image-loader.svg" as="image" /> */}

          <link rel="preload" href="/assets/lotties/check.json" as="fetch" />
          <link rel="preload" href="/assets/lotties/error.json" as="fetch" />

          {/* <link rel="preload" href="/assets/sounds/startgame.mp3" as="audio" />
          <link rel="preload" href="/assets/sounds/intro.mp3" as="audio" />
          <link rel="preload" href="/assets/sounds/applause.wav" as="audio" />
          <link rel="preload" href="/assets/sounds/keyboard-click.mp3" as="audio" />
          <link rel="preload" href="/assets/sounds/silbidos.mp3" as="audio" />
          <link rel="preload" href="/assets/sounds/error-answer.mp3" as="audio" />
          <link rel="preload" href="/assets/sounds/success-answer.mp3" as="audio" /> */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />

          <meta property="og:url" content="https://queclube.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="¿Qué club e’?" />
          <meta
            property="og:description"
            content="Cinco escudos aleatorios del Fútbol Argentino cada 24hs. Los sacas? 🤔"
          />
          <meta
            property="og:image"
            itemProp="image"
            content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
          />
          <meta
            property="og:image:secure_url"
            content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@superlista_ar" />
          <meta name="twitter:creator" content="@franminen" />
          <meta name="twitter:title" content="¿Qué club e’?" />
          <meta
            name="twitter:description"
            content="Cinco escudos aleatorios del Fútbol Argentino cada 24hs. Los sacas? 🤔"
          />
          <meta
            name="twitter:image"
            content="https://firebasestorage.googleapis.com/v0/b/que-club-e.appspot.com/o/seo-cover.png?alt=media&token=9929e60f-48dd-4913-a358-7265fdb2a5a1"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
