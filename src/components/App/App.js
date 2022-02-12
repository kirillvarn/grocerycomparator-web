import { RecoilRoot, useRecoilState } from 'recoil';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';


function App() {
  return (
    <RecoilRoot>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <Header />
      <Main/>
      <Footer />
    </RecoilRoot>
  );
}

export default App;