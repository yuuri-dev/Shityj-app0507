// html2pdf.jsの読み込みをクライアント側のみに限定するためのコンポーネント
import dynamic from 'next/dynamic';

const ShiftView2_Wrapper = dynamic(() => import('../ShiftView2'), {
  ssr: false, // これでSSRを無効化
});

export default ShiftView2_Wrapper;
