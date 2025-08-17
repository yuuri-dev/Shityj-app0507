import Head from 'next/head';
import styles from './index.module.css';
import Link from 'next/link';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';

export default function Home() {
  return (
    <>
      <Head>
        <title>シフト自動生成アプリ</title>
        <meta
          name="description"
          content="シフト自動生成アプリシフティーです。パート、アルバイトのめんどくさいシフト生成をボタンひとつで代わりに実施します。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className={styles.hero_container}>
          <span className={styles.badge}>シフト管理ツール</span>

          <h1 className={styles.hero_title}>
            シフト作成を
            <span className={styles.gradient_text}>自動化</span>
            しよう
          </h1>

          <p className={styles.hero_description}>
            簡単な入力をするだけで、希望に基づくシフトをすぐに作成することができます。
            もうシフトに時間をかける必要はありません。
          </p>
        </div>

        <div className={styles.button_wrapper}>
          <Link href="/new" className={styles.button_blue}>
            はじめる
          </Link>
          <a href="#description" className={styles.button_white}>
            使い方を見る
          </a>
        </div>

        <div className={styles.top_image_wrapper}>
          <img
            src="top_img/top1.png"
            alt="top_image"
            className={styles.top_image}
          />
        </div>

        {/* ステップ */}
        <div id="description" className={styles.step}>
          <div className={styles.stepContainer}>
            <div className={styles.circle}>1</div>
            <div className={styles.stepContent}>
              <h4>従業員情報を登録</h4>
              <p>スキル、勤務可能時間、希望シフトを簡単入力</p>
            </div>
          </div>

          <div className={styles.stepContainer}>
            <div className={styles.circle}>2</div>
            <div className={styles.stepContent}>
              <h4>店舗要件を設定</h4>
              <p>必要人数、営業時間、特別な要件を設定</p>
            </div>
          </div>

          <div className={styles.stepContainer}>
            <div className={styles.circle}>3</div>
            <div className={styles.stepContent}>
              <h4>AIが自動生成</h4>
              <p>最適化されたシフト表が数分で完成</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
