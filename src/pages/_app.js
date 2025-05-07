import '@/styles/globals.css';
import Header from '../components/Header';
import { GroupProvider } from 'src/contexts/GroupContext';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <GroupProvider>
        <Component {...pageProps} />
      </GroupProvider>
    </div>
  );
}
