import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RecoilRoot, useRecoilState } from 'recoil';


import Main from '../Main/Main';
import MainStat from "../Statistics/MainStat"

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
      <Router>
        <Routes>
            <Route exact path="/stat" element={<MainStat/>}/>
            <Route exact path="/" element={<Main/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;