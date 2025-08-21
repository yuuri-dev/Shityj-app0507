import Head from 'next/head';
import styles from './index.module.css';
import Link from 'next/link';

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
            簡単な入力をするだけで、希望に基づくシフトを作成することができます。
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

        <div id="servise_feature_description" className={styles.features}>
          <h1>サービスの特徴</h1>
          <div className={styles.featureContainer}>
            <div className={styles.featureCard}>
              <h3>かんたん操作</h3>
              <p>
                シンプルなUIで直感的に操作できます。アプリの機能は最低限に絞っています。
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>希望に沿った最適化</h3>
              <p>
                従業員の入りたい回数とシフト作成側の必要人数から希望通りのシフトを作成します。
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>簡単に共有可能</h3>
              <p>
                作成したシフトを簡単に画像やPDFに保存することができます。
              </p>
            </div>
          </div>
        </div>

        <div className={styles.top_image_wrapper}>
          <img
            src="top_img/top1.png"
            alt="top_image"
            className={styles.top_image}
          />
        </div>

        {/* ステップ */}
        <div className={styles.step}>
          <h1>シフト生成はたった3ステップで完了</h1>
          <div id="description" className={styles.stepContainer}>
            <div className={styles.circle}>1</div>
            <div className={styles.stepContent}>
              <h4>店舗要件を設定</h4>
              <p>必要人数、営業時間、特別な要件を設定</p>
            </div>
          </div>
          <div className={styles.stepContainer}>
            <div className={styles.circle}>2</div>
            <div className={styles.stepContent}>
              <h4>従業員情報を登録</h4>
              <p>スキル、勤務可能時間、希望シフトを簡単入力</p>
            </div>
          </div>

          <div className={styles.stepContainer}>
            <div className={styles.circle}>3</div>
            <div className={styles.stepContent}>
              <h4>シフトをボタンひとつで自動生成</h4>
              <p>独自のアルゴリズムで最適化されたシフト表が数秒で完成</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
