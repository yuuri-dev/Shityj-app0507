import React from 'react';

export default function UsageGuide() {
  return (
    <div>
      <h2>使い方</h2>

      {/* 目次 */}
      <nav>
        <ul>
          <li>
            <a href="#flow">使い方の流れ</a>
          </li>
          <li>
            ページごとの説明
            <ul>
              <li>
                <a href="#group-create">グループ作成</a>
              </li>
              <li>
                <a href="#group-page">グループページ</a>
              </li>
              <ul>
                <li>
                  <a href="#group-top">Top</a>
                </li>
                <li>
                  <a href="#member-edit">メンバー編集</a>
                </li>
                <li>
                  <a href="#shift-create">シフト作成</a>
                </li>
                <li>
                  <a href="#history">履歴</a>
                </li>
              </ul>
            </ul>
          </li>
        </ul>
      </nav>

      {/* 使い方の流れ */}
      <section id="flow">
        <h3>使い方の流れ</h3>
        <ol>
          <li>グループを作成する</li>
          <li>メンバー情報を登録する</li>
          <li>希望シフトを入力する</li>
          <li>自動でシフトを生成する</li>
        </ol>
      </section>

      {/* ページごとの説明 */}
      <section id="group-create">
        <h3>グループ作成</h3>
        <p>最初に店舗やチームをグループとして作成します。</p>
      </section>

      <section id="group-page">
        <h3>グループページ</h3>

        <div id="group-top">
          <h4>Top</h4>
          <p>グループ全体の概要や進捗を確認できます。</p>
        </div>

        <div id="member-edit">
          <h4>メンバー編集</h4>
          <p>メンバーの追加・削除・編集を行います。</p>
        </div>

        <div id="shift-create">
          <h4>シフト作成</h4>
          <p>希望シフトに基づいて自動でシフトを作成します。</p>
        </div>

        <div id="history">
          <h4>履歴</h4>
          <p>過去のシフト表を確認できます。</p>
        </div>
      </section>
    </div>
  );
}
