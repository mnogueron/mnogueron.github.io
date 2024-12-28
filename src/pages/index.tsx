import Head from "next/head";
/*import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
//import styles from "@/styles/Home.module.css";*/
import WrappedApp from "@/index";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export default function Home() {
  return (
    <>
      <Head>
          {/** <!-- Primary Meta Tags --> **/}
          <title>Matthieu Nogueron - Portfolio</title>
          <meta name="title" content="Matthieu Nogueron - Portfolio" />
              <meta name="description" content="Matthieu Nogueron - French software engineer living in Stockholm - React tutor and full time sustainability advocate" />

          {/** <!-- Open Graph / Facebook --> **/}
                  <meta property="og:type" content="website" />
                      <meta property="og:url" content="https://mnogueron.github.io/" />
                          <meta property="og:title" content="Matthieu Nogueron - Portfolio" />
                              <meta property="og:description" content="Matthieu Nogueron - French software engineer living in Stockholm - React tutor and full time sustainability advocate" />
                                  <meta property="og:image" content="https://mnogueron.github.io/image.jpg" />

          {/** <!-- Twitter --> **/}
                                      <meta property="twitter:card" content="summary_large_image" />
                                          <meta property="twitter:url" content="https://mnogueron.github.io/" />
                                              <meta property="twitter:title" content="Matthieu Nogueron - Portfolio" />
                                                  <meta property="twitter:description" content="Matthieu Nogueron - French software engineer living in Stockholm - React tutor and full time sustainability advocate" />
                                                      <meta property="twitter:image" content="https://mnogueron.github.io/image.jpg" />

          {/** <!--
                                                            These stylesheets provide Fonts for Material-UI: Roboto and the material icons
                                                          --> **/}
                                                          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                                                          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <WrappedApp />


        {/**<div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>src/pages/index.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>**/}
    </>
  );
}
