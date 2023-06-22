// 메인 레이아웃 컴포넌트

import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";
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
            setLogMsg("🦇 Welcome " + JSON.parse(localStorage.getItem("minfo"))["unm"]);
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
                                <li key={i}>
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
                            <Link to='/sch'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Link>
                        </li>
                        {
                            /* 회원가입, 로그인은 로그인하지 않은 상태일때만 보이게 하기 */
                            logSts === null &&
                            <>
                                <li>
                                    <Link to="/mem">Join Us</Link>
                                </li>
                                <li>
                                    <Link to="/login">LOG IN</Link>
                                </li>
                            </>
                        }
                        {
                            /* 로그아웃버튼은 로그인 상태일때만 보이게 하기 */
                            logSts !== null &&
                            <li>
                                <a href="#" onClick={logout}>LOG OUT</a>
                            </li>
                        }
                    </ul>
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
