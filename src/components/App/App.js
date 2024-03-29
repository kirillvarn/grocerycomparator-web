import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useRecoilState } from 'recoil';


import Main from '../Main/Main';
import Archive from '../Archive/Archive';
import Index from '../Index/Index';
import Compare from '../Compare/Compare';
import MainStat from "../Statistics/MainStat"
import MainAdmin from "../Admin/Main/MainAdmin";

function App() {
  return (
    <div>
      <RecoilRoot>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />

      </RecoilRoot>
      <Router basename="/">
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/list" element={<Main />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/stat" element={<MainStat />} />
          <Route path="/admin" element={<MainAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
