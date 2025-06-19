// html2pdf.jsの読み込みをクライアント側のみに限定するためのコンポーネント
import dynamic from 'next/dynamic';

const ShiftView1_Wrapper = dynamic(() => import('../ShiftView1'), {
  ssr: false, // これでSSRを無効化
});

export default ShiftView1_Wrapper;
