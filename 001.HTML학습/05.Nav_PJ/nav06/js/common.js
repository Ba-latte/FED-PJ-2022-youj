// 내비게이션 유형 06 : 공통 JS - common.js //

/////////////////////////////// 로드 구역 /////////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);

/*********************************************************
    함수명 : loadFn
    기능 : 로딩 후 실행 함수
*********************************************************/
function loadFn() {
    console.log("로딩완료!");

    /*******************************************************
        GNB메뉴 객체 데이터를 이용한 HTML 태그 만들어 넣기!
    *******************************************************/
    // 1.대상선정 : .gnb
    const gnb = document.querySelector(".gnb");
    // console.log(gnb);

    // 2.변수 세팅 : html코드 담을 변수 만들기 (데이터 형이 변수에 들어갈 때 정해지는 게 자스의 특징임)
    let hcode = "";

    // 3.코드의 구조화 생성하기
    hcode += `<ul>`;
    // 1.상위메뉴 반복 코드 생성
    // mdata객체를 가져와서 반복시킴 -> for in문!!을 사용하면 됨!!!!
    // (객체하면 for in문이고 배열하면 for of문임)
    // console.log(mdata);

    for (let tm in mdata) {
        // tm은 mdata의 속성명임!

        hcode += `
            <li>
                <a href="#">${tm}</a>
                <div class="smenu">
                    <!-- 하위메뉴 구조 랩핑박스 .smbx -->
                    <aside class="smbx">
                        <h2>
                            <div class="stit">${tm}</div>
                            <a href="#">전체보기 ></a>
                        </h2>
                        <div class="swrap">
        `;

        // 2.하위메뉴 반복코드
        // -> 객체 데이터이므로 for in 사용한다!
        // -> mdata[tm] -> mdata[속성명] -> 속성값!
        // ->속성값은 서브메뉴이고 객체로 구성됨!!

        for (let sm in mdata[tm]) {
            // sm은 속성명(하위메뉴)
            hcode += `<dl>
                <dt>
                    <a href="#">${sm}</a>
                </dt>`;

            // 3.서브메뉴(최하위 메뉴) 반복 코드
            // ->서브메뉴는 배열 데이터 이므로, for of문  사용
            for (let sub of mdata[tm][sm]) {
                hcode += `<dd>
                    <a href="#">${sub}</a>
                </dd>`;
            }

            hcode += `</dl>`;
        } ////////////////// for in문 끝 /////////////////////////
        hcode += `
                        </div>
                    </asdie>
                </div>
            </li>
        `;
    } //////////////////////// for in 문 끝 ////////////////////////////////

    hcode += `</ul>`;

    // 4.GNB박스에 출력하기
    gnb.innerHTML = hcode;
    // : for문안에 얘를 넣으면, 얘가 for문 중간에 낑겨들어서 순서가 이상해질 수 있으니까, 빠져나와서 주는 게 더 정확함

    /**********************************************************
        GNB 메뉴에 마우스 오버시 서브 메뉴 보이기
    _____________________________________________________________
        [기능정의]
        -상위메뉴 li에 오버시 하위메뉴 .smenu박스의 내부 데이터만큼
        height값이 생기며, opacity 투명도가 1로 변경되는 트랜지션 수행하기
        -마우스 아웃시에는 원상복귀하기
    **********************************************************/
    // 1.대상선정
    // 이벤트 대상 : .gnb>ul>li
    const list = document.querySelectorAll(".gnb>ul>li");
    // 이벤트 종류 : mouseenter, mouseleave
    // 변경 대상 : .smenu
    // 변경 내용 : height값, opacity값 바꾸기

    // console.log(bgbx);

    // 2.하위메뉴, 하위메뉴의 배경 박스 style 변경 함수 만들기
    // ele - 변경 요소 / hv - 높이값 / opa - 투명도값
    const stFn = (ele, hv, opa) => {
        ele.style.height = hv + "px";
        ele.style.opacity = opa;
    }; //////////// stFn 함수 끝 ////////////////



    // 3.상위메뉴 li에 이벤트 설정하기
    for(let x of list){

        // (1)마우스 오버시 ///////////////////////////////
        x.onmouseenter = ()=>{
            // (1)하위메뉴 박스 .smenu 선택하기
            let tg = x.querySelector(".smenu");

            // (2)하위메뉴 박스 내부박스 높이값 구하기
            let hv = tg.querySelector(".smbx").clientHeight;
            // console.log("내부 높이: ", hv);

            // (3)style 변경 요소 함수 호출
            // stFn(요소, 높이값, 투명도)
            stFn(tg, hv, 1);
            
        }; //////////// mouseenter 끝 //////////////////

        // (2)마우스 아웃시 ///////////////////////////////
        x.onmouseleave = ()=>{
            // (1)하위메뉴 박스 .smenu 선택하기
            let tg = x.querySelector(".smenu");

            // (2)style 변경 요소 함수 호출
            // stFn(요소, 높이값, 투명도)
            stFn(tg, "0", 0);

        }; //////////// mouseleave 끝 //////////////////
    } ///////////////// for of문 끝 //////////////////




} ///////////////////////// loadFn 함수 끝 //////////////////////////////////
