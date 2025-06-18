import Head from 'next/head';
import styles from './index.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="シフト自動生成アプリシフティーです。パート、アルバイトのめんどくさいシフト生成をボタンひとつで代わりに実施します。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/new" className={styles.button}>
        <p className={styles.start}>はじめる</p>
      </Link>
    </>
  );
}
