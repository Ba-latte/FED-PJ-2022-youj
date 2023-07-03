// 메인 레이아웃 컴포넌트

import Logo from "./Logo";
import "./css/layout.css";
import $ from 'jquery';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { gnb_data, bmenu } from "./data/common";
import { useState } from "react";
import ScrollTop from "./common/ScrollTop";

// 폰트어섬 임포트
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/***********************************************************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
1.<Link to ="/경로명"></Link>
-to 속성의 경로는 <Route path="/경로명">과 일치함

2.<Outlet />
-라우터 연결 컴포넌트가 출력되는 자리 컴포넌트를 말함
***********************************************************************************/

const Layout = ()=>{
    
    // 자식 컴포넌트 값 전달 테스트 함수
    const callMe = (x)=>{
        console.log("누구? : ", x);
    }; ///////////////// callMe ////////////////////


    // 라우터를 이용하여 데이터 보내기 : 라우터 이동메서트 세팅하기
    const goNav = useNavigate();
    

    // 로그인 상태 Hook변수 : 로컬스토리지의 "minfo" 항목의 값을 초기 할당함
    const [logSts, setLogSts] = useState(localStorage.getItem("minfo"));

    // 로그인 환영 메시지 Hook변수
    // : 메시지도 상태관리해줘야 그때그때 다르게 들어간다고함
    // : 리액트만 사용해서 구현하면 알아서 타이밍 맞추는데, 돔 건드리는 코딩(제이쿼리같은거)을 같이 한다면 타이밍 맞추는데 힘들수도 있음
    const [logMsg, setLogMsg] = useState("");

    // 로그인 환영 메시지 스타일
    const logstyle = {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
        
    }; //////////// logstyle ////////////////

    // [ 로그인 세팅 함수 ] 👉 ScrollTop.js의 useEffect 함수 구역에서 호출함
    const setLogin = ()=>{
        // 1.로그인 Hook변수 업데이트하기
        setLogSts(localStorage.getItem("minfo"));

        // 2.만약 로컬스토리지의 값이 null이 아니면 메시지 뿌리기
        if(localStorage.getItem("minfo")){
            // null이면 false처리 나니까, 널이 아니면 중괄호 영역에 들어올 수 있음
            
            // 메시지 세팅하기 : 객체 안의 "unm"속성이 사용자 이름!
            setLogMsg("😎 Welcome " + JSON.parse(localStorage.getItem("minfo"))["unm"]);
        }
    }; //////////////// setLogin //////////////////


    // [ 로그아웃 함수 ] 👉 LOGOUT 버튼에서 호출함
    const logout = ()=>{
        // 1. 로컬스토리지의 "minfo" 항목만 삭제하기 (clear하면 모든 항목이 다 지워지니 주의할 것)
        localStorage.removeItem("minfo");

        // 2. 로그인 상태 Hook 변수 업데이트하기
        setLogSts(null); // 비어있다는 의미로 null 주는 것임! (null도 데이터의 하나임!)
        console.log("로그아웃됨!", logSts);

        
    }; ////////////// logout ////////////////



    // [ 검색창 보이기 함수 ] ///////////////////
    const showSearch = ()=>{
        // 1. a요소 숨기기
        document.querySelector(".searchingGnb+a").style.opacity = "0";

        // 2. 검색창 보이기 + 포커스 넣기
        let tg = document.querySelector(".searchingGnb");
        tg.style.display = "block";
        tg.querySelector("input").focus();


    }; ////////////// showSearch 함수 //////////////////


    // [ 입력창에서 엔터키를 누르면 검색 함수 호출하기 ] //////////////////////
    const enterKey = (e)=>{
        // JS 오리지널 문법에서 엔터키는 13번?이었음

        // 이벤트의 key가 엔터키일 때 검색 함수(schList) 호출하도록 if문으로 제어하기
        if(e.key === 'Enter') goSearch();
    }; //////////////// enterKey 함수 /////////////////////



    // [ 검색 페이지로 검색어와 함께 이동하기 ] /////////////////////////////
    const goSearch = ()=>{
        // 검색어 읽어오기
        let kw = document.querySelector(".searchingGnb input").value;
        console.log("검색어 : ", kw);

        // 라우터 이동하기 : 전달값(검색어) 가져가기
        goNav('/res',{state:{keyword:kw}});

    }; //////////////////// goSearch 함수 //////////////////////


    // 햄버거 버튼 클릭시 메뉴 등장하기 ///////////////
    const chgMenu = ()=>{
        // let topA = $(".top");
        // // 제이쿼리 is 메서드! : 있는지 없는지 확인 후 t/f 리턴
        // let isOn = topA.is(".on");

        // // on클래스가 있으면 제거하기
        // if(isOn) topA.removeClass("on");
        // // 없으면 추가하기
        // else topA.addClass("on");

        // 토글 클레스 메서드로 on 클래스를 추가/제거하기
        $(".top").toggleClass("on");

    }; ///////////////// chgMenu 함수 /////////////////

    // 메뉴 클릭시 닫기 부가 기능 함수
    const rmCls = ()=>$(".top").removeClass("on");



    return(
        <>
            <ScrollTop sfn={setLogin} /> 
            {/* 👆라우터 갱신될 때 스크롤 상단 이동 모듈 작동함! + 로그인 세팅 함수 호출 전달하기 (자식에게 setLogin함수 전달) : 세팅 위치는 상관 없음! 위쪽이든 아래쪽이든 간에 <BrowserRouter>안에 있으면 됨 */}
            {/* 1.상단영역 */}
            <header className="top">

                {/* 로그인 환영 메시지 : 조건 - logSts값이 null이 아니면 */}
                {
                    logSts !== null &&
                    <div className="logmsg" style={logstyle}>
                        {logMsg}
                    </div>
                }


                {/* 내비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to='/main'><Logo gb="top" tt={callMe} /></Link>
                        </li>
                        {
                            gnb_data.map((v, i)=>
                            // Link 컴포넌트에 다른 이벤트 걸면 에러 발생함! 그러니까 위의 li에 이벤트를 거는 것임! 이래도 가능함! (이벤트 버블링 때문!)
                            // chgMenu는 토글로 클래스 추가/제거 기능만 있으니까 그냥 이 함수 씀~
                                <li key={i} onClick={rmCls}>
                                    <Link to={v.link}>{v.txt}</Link>
                                    {/* console.log(v.sub) */}
                                    {/* v.sub가 없으면 undefined! */}
                                    {
                                        // 조건식 && 출력코드
                                        // 조건 : 서브데이터(배열)가 없지 않으면 (=있으면) 출력!
                                        // undefined - 정의되지 않은 값
                                        // null - 빈 값
                                        // 👉위의 두가지는 데이터가 없다는 값!
                                        v.sub != undefined &&
                                        <div className="smenu">
                                            <ol>
                                                {
                                                    v.sub.map((v, i)=>
                                                    <li key={i}>
                                                        <Link to={v.link}>{v.txt}</Link>
                                                    </li>
                                                    )
                                                }
                                            </ol>
                                        </div>
                                    }
                                </li>
                            )
                        }
                        {/* 마진레프트 : 오토! -> 자동으로 끝으로 가게 함(?) */}
                        <li style={{marginLeft:"auto"}}>
                            {/* 검색 입력 박스 */}
                            {/* 검색박스 */}
                            <div className='searchingGnb'>
                                {/* 검색버튼 돋보기아이콘 */}
                                <FontAwesomeIcon 
                                icon={faSearch}
                                className='schbtnGnb'
                                title='Open search'
                                onClick={goSearch}
                                />
                                {/* 입력창 */}
                                <input id='schinGnb' type='text' 
                                placeholder='Filter by Keyword' onKeyUp={enterKey} />
                            </div>
                            {/* 검색기능 링크 : 클릭시 검색창 보이기! */}
                            <a href="#" onClick={showSearch} >
                                <FontAwesomeIcon icon={faSearch} />
                            </a>
                        </li>
                        {
                            /* 회원가입, 로그인은 로그인하지 않은 상태일때만 보이게 하기 */
                            logSts === null &&
                            <>
                                <li>
                                    <Link to="/mem" onClick={rmCls}>Join Us</Link>
                                </li>
                                <li>
                                    <Link to="/login" onClick={rmCls}>LOG IN</Link>
                                </li>
                            </>
                        }
                        {
                            /* 로그아웃버튼은 로그인 상태일때만 보이게 하기 */
                            logSts !== null &&
                            <li onClick={rmCls}>
                                <a href="#" onClick={logout}>LOG OUT</a>
                            </li>
                        }
                    </ul>
                    {/* 햄버거 버튼 */}
                    <button className="hambtn" onClick={chgMenu}></button>
                </nav>
            </header>
            {/* 2.메인영역 */}
            <main className="cont">
                {/* 출력 파트 : 각 페이지의 컴포넌트가 출력되는 부분 */}
                <Outlet />
            </main>
            {/* 3.하단영역 */}
            <footer className="info">
                <ul>
                    <li>
                        <Logo gb="bottom" tt={callMe} />
                    </li>
                    <li>
                        <ol className="bmenu">
                            {bmenu.map((v, i) => (
                                <li key={i}>
                                    <a href={v.link} target="_blank">
                                        {v.txt.toUpperCase()}
                                    </a>
                                    {i!=4?" |":""}
                                </li>
                            ))}
                        </ol>
                    </li>
                    <li>© & ™ DC. ALL RIGHTS RESERVED</li>
                </ul>
            </footer>
        </>
    );
}; /////////////// Layout 컴포넌트 ////////////////

// 내보내기
export default Layout;
