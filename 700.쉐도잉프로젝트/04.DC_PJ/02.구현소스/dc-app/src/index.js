// index.js는 public/index.html 페이지에 적용되는 컴포넌트다!


import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./index.css";
import Characters from './dc/Characters';
import Main from './dc/Main';
import Comics from './dc/Comics';
import Movies from './dc/Movies';
import Games from './dc/Games';
import News from './dc/News';
import Video from './dc/Video';
import Layout from './dc/Layout';
import Member from './dc/Member';
import ScrollTop from './dc/common/ScrollTop';


/****************************************************************************
    [ 리액트 라우터 ]
-컴포넌트를 연결하여 특정 이벤트에 모듈을 변경해주는 중계 역할을 함
1.<BrowserRouter> - 라우터 Root
2.<Routes> - 개별 라우터를 묶어주는 역할
3.<Route> - 개별 라우터
    [ 속성 ]
    1.path : 경로를 지정함 (Link의 to속성 경로와 일치함)
    2.element : 연결할 컴포넌트 지정
    
    [ 하위 라우트 만들기 ]
    ex)하위 라우트를 만들 수 있음
    <Route path="/">
        <Route />
        <Route />
        <Route />
    </Route>

4.라우터를 구성하는 컴포넌트는 자체적으로 내보내기 세팅을 해야함
-형식 : export default 라우터 컴포넌트
-레이아웃을 입혀서 화면에 출력해야하기 때문에
****************************************************************************/

// 라우터 구성 컴포넌트 : 스스로 내보내기 세팅 필수임
// 레이아웃 컴포넌트를 라우터에 입혀서 화면에 출력하기 때문에 스스로 내보내기를 세팅하는 것임
export default function App(){
    return(
        <BrowserRouter>
            <ScrollTop /> 
            {/* 👆라우터 갱신될 때 스크롤 상단 이동 모듈 작동함!
            : 세팅 위치는 상관 없음! 위쪽이든 아래쪽이든 간에 <BrowserRouter>안에 있으면 됨 */}
            <Routes>
                {/* 🔥중요🔥 : 레이아웃 컴포넌트를 루트로 잡아줘야함 */}
                <Route path='/' element={<Layout />}>
                    {/* 하위 라우트 세팅하기 */}
                    {/* path대신 index만 쓰면 첫페이지임! 
                    -> Layout의 Link to='/'에 해당하는 세팅이며 필수임! : 루트를 설정해주는 것이라서! */}
                    <Route index element={<Main />} />
                    <Route path='ct' element={<Characters />} />
                    <Route path='co1' element={<Comics sub="0" />} />
                    <Route path='co2' element={<Comics sub="1" />} />
                    <Route path='co3' element={<Comics sub="2" />} />
                    <Route path='mv' element={<Movies />} />
                    <Route path='gm' element={<Games />} />
                    <Route path='nw' element={<News />} />
                    <Route path='vd' element={<Video />} />
                    <Route path='mem' element={<Member />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
} //////////////////// App 컴포넌트 ////////////////////////

// 랜더링하기
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);