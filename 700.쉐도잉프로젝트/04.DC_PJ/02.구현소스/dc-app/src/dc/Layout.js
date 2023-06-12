// 메인 레이아웃 컴포넌트

import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";

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
    
    /* GNB 메뉴 데이터 구성하기 */
    const gnb_data = [
        // {
        //     txt:"Home",
        //     link:"/",
        // },
        {
            txt:"CHARACTERS",
            link:"/ct",
        },
        {
            txt:"COMICS",
            link:"/co1",
            sub:[
                {
                    txt:"LATEST COMICS",
                    link:"/co1",
                },
                {
                    txt:"DC UNIVERSE INFINITE",
                    link:"/co2",
                },
                {
                    txt:"ALL COMICS SERIES",
                    link:"/co3",
                },
            ],
        },
        {
            txt:"MOVIES & TV",
            link:"/mv",
            sub:[
                {
                    txt:"DC MOVIES",
                    link:"/mv",
                },
                {
                    txt:"DC SERIES",
                    link:"/mv",
                },
                {
                    txt:"DC ON HBO MAX",
                    link:"/mv",
                },
            ],
        },
        {
            txt:"GAMES",
            link:"/gm",
        },
        {
            txt:"NEWS",
            link:"/nw",
        },
        {
            txt:"VIDEO",
            link:"/vd",
        },
    ];
    // 👆 지금은 메뉴가 하이라키 구조가 아니고 단층 구조, 단순 나열, 명확한 상태라서 배열로 씀

    /* bmenu 메뉴 데이터 구성하기 */
    const bmenu = [
        {
            txt: "Privacy Policy",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/WM/",
        },
        {
            txt: "Terms",
            link: "https://www.dcuniverseinfinite.com/terms?_gl=1*5nxhg2*_gcl_au*MTk3OTgxNzUwMi4xNjgzMTc3NDg3",
        },
        {
            txt: "Ad Choices",
            link: "https://www.warnermediaprivacy.com/policycenter/b2c/wm/",
        },
        {
            txt: "Accessibility",
            link: "https://policies.warnerbros.com/terms/en-us/#accessibility",
        },
        {
            txt: "Cookie Settings",
            link: "https://www.dc.com/#compliance-link",
        },
    ];


    return(
        <>
            {/* 1.상단영역 */}
            <header className="top">
                {/* 내비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to='/'><Logo /></Link>
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
                            <FontAwesomeIcon icon={faSearch} />
                        </li>
                        <li>
                            <Link to="/mem">Join Us</Link>
                        </li>
                        <li>
                            <Link to="/login">LOG IN</Link>
                        </li>
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
                        <Logo gb="bottom" />
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
