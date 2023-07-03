///  게시판 모듈 - Board.js
import $ from 'jquery';
import { useEffect, useState } from 'react';
import "./css/board.css";
/* 제이슨 불러오기 */
import orgdata from "./data/data.json";

// 컴포넌트에서 제이슨 데이터를 담지말고 반드시 바깥에서 담을것!
// 👇 초기 데이터 처리는 로컬스토리지 'bdata'가 있으면 로컬스토리지를 가져오고, 없으면 제이슨 데이터를 사용하여 초기화 한다!
let org;
if(localStorage.getItem('bdata'))
    org = JSON.parse(localStorage.getItem('bdata'));
else
    org = orgdata;




// 제이슨 데이터 배열 순서 정렬하기 (내림차순으로!)
// why)최신 등록순번이 50번이 되도록
org.sort((x, y)=>{
    return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
})

// 제이쿼리 로드구역 함수 /////////
function jqFn(){
    $(()=>{

    }); //////// jQB ///////////
} ////////////// jQFn ///////////





function Board(){

// [ 제이슨 파일 데이터 로컬스토리지에 넣기 ]
// 1. 변수에 제이슨 파일 문자화 하여 불러오기
// 상단에서 불러옴!
// 실시간 데이터 변경 관리를 Hook변수화하여 처리함!
const [jsn, setJsn] = useState(org); // 초기데이터 세팅

// 2. 로컬스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata", JSON.stringify(jsn));
// console.log("로컬스:", localStorage.getItem("bdata"));

// 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1. 로컬 스토리지 데이터 파싱하기
// let bdata = JSON.parse(localStorage.getItem("bdata"));
// 👆 jsn변수에 Hook 상태처리했으므로 중간 파싱에 불필요함!


// console.log("로컬스파싱:",bdata,
// "/개수:",bdata.length);


// 페이지번호 : 페이지단위별 순서번호
// let pgnum = 1; -> 함수내 전달변수로 처리!

// 페이지단위수 : 한 페이지당 레코드수
const pgblock = 9;

// 시작번호생성 : (페이지번호-1) * 페이지단위수
// -> (pgnum-1) * pgblock
// 끝번호생성 : 페이지번호 * 페이지단위수
// -> pgnum * pgblock




/******************************************* 
    함수명: bindList
    기능: 페이지별 리스트를 생성하여 바인딩함
*******************************************/
function bindList(pgnum){ // pgnum - 페이지번호
    // 0. 게시판 리스트 생성하기
    let blist = "";
    // 전체 레코드 개수
    let totnum = jsn.length;

    // 내림차순 정렬하기
    jsn.sort((x, y)=>{
        return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
    })

    
    // 1.일반형 for문으로 특정대상 배열 데이터 가져오기
    // 데이터 순서: 번호,글제목,글쓴이,등록일자,조회수
    for (let i = (pgnum - 1) * pgblock; i < pgnum * pgblock; i++) {
        // 마지막 번호한계값 조건으로 마지막페이지 데이터 
        // 존재하는 데이터까지만 바인딩하기
        // 순번은 리스트상 순서 번호를 넣는다 (idx가 아님!)
        if(i < totnum){

            blist += `
                <tr>
                    <td>${i+1}</td>
                    <td>
                        <a href="view.html?idx=${jsn[i]["idx"]}">
                            ${jsn[i]["tit"]}
                        </a>
                    </td>
                    <td>${jsn[i]["writer"]}</td>
                    <td>${jsn[i]["date"]}</td>
                    <td>${jsn[i]["cnt"]}</td>
                </tr>
            `;
        } //////////// if ////////////
    } /////////// for 문 ///////////////
    
    // console.log("코드:", blist);

    // 2. 리스트 코드 테이블에 넣기
    $("#board tbody").html(blist);

    // 3. 페이징 블록 만들기
    // 3-1.전체 페이지 번호수 계산하기
    // 전체레코드수 / 페이지단위수 (나머지있으면+ 1 )
    // 전체 레코드 수 : totnum 변수에 이미 할당
    let pgtotal = Math.floor(totnum / pgblock);
    let pgadd = totnum % pgblock;
    console.log("페이징 전체수:",pgtotal);
    console.log("페이징 나머지:",pgadd);

    // 페이징코드변수
    let pgcode = "";

    // 3-2. 페이징코드 만들기
    // 나머지가 있으면 1을 더함
    if(pgadd!=0) pgtotal = pgtotal+1;

    // 코드만들기 for문
    for(let i = 1; i <= pgtotal; i++){

        pgcode += 
        // 페이지번호와 i가 같으면 a링크를 만들지 않는다!
        pgnum == i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;

        // 사이구분자(마지막번호 뒤는 제외)
        if(i!=pgtotal) pgcode += " | ";
        

    } /////////// for문 ///////////////

    // 3-3. 페이징코드 넣기
    $(".paging").html(pgcode);

    // 3-5. 이벤트링크 생성하기
    $(".paging a").click(function(e){
        // 기본이동막기
        e.preventDefault();
        // 바인딩함수 호출!(페이지번호 보냄)
        bindList($(this).text());

    }); /////////// click /////////////



} /////////////// bindList함수 ///////////////



// 로그인 정보 읽어오기 변수
let [nowmem, setNowmem] = useState('');



// 로그인 상태 체크 함수 ////////////
const chkLogin = ()=>{
    // 로컬스토리지의 'minfo'가 있는지 체크하기
    let chk = localStorage.getItem("minfo");

    // 로컬스토리지에 minfo가 있으면(true) log상태 Hook에 true값 업데이트하기
    if(chk) {
        setLog(true);
    }
    else setLog(false);

    console.log("로그인 상태 : ", log, " / 모드 : ", bdmode);

    // 지금 로그인한 상태인 경우에 현재 로그인한 멤버의 정보 가져오기
    if(chk) {
        setNowmem(JSON.parse(chk));
        console.log("현재 로그인 정보 : ", nowmem);
    }

}; //////////////// chkLogin 함수 ////////////////


// 게시판 모드별 상태 구분 Hook 변수 만들기
// 모드 구분값 : CRUD(Create/Read/Update/Delete)
// C : 글쓰기 / R : 글읽기 / U : 글수정 / D : 글삭제 👉 D는 U에 포함시켜서 안 씀!
// 상태추가하기! L : 글목록 (맨 처음 상태값임)
const [bdmode, setBdmode] = useState('L');



// 로그인 상태 Hook 변수 만들기 ////////
// 상태값 : false - 로그아웃상태 / true - 로그인상태
const [log, setLog] = useState(false);


// 모드 전환 함수 //////////////////
const chgMode = (e)=>{
    // 기본이동 막기(하위의 a요소!)
    e.preventDefault();

    // 하위 요소의 글자 읽어오기
    let txt = $(e.target).text();
    console.log("버튼 : ", txt);

    // 모드 변경
    // (1)글쓰기 버튼 클릭시
    if(txt == 'Write') {
        // 모드 상태값 업데이트
        setBdmode('C');

        // 잘 나오나 확인하기
        // console.log("엥??",nowmem);

        //읽기전용 입력창에 기본정보 세팅하기 
        $(()=>{
            $(".dtblview .name").val(nowmem.unm);
            $(".dtblview .email").val(nowmem.eml);
        });
    }
    // (2)리스트 버튼 클릭시
    else if(txt == 'List') setBdmode('L')
    // : 주의! bd모드를 L로 바꿀 경우, bindList()가 안 됨...! 그래서 글 내역이 안 뜸...!
    // (3)글쓰기 모드(C)일 때 Submit버튼 클릭했을 경우, 글쓴이와 이메일을 미리 적어서 내놓기
    else if(txt == 'Submit' && bdmode == 'C') {

        // 타이틀
        let tit = $("dtblview .subject").val();
        // 내용
        let cont = $(".dtblview .content").val();

        // 제목/내용 빈값 체크하기
        if(tit.trim()==''||cont.trim()==''){
            alert("Title and content are required");
        }
        // 통과시 실제 데이터 입력하기
        else{
            // 날짜 데이터 처리하기
            let today = new Date();
            let yy = today.getFullYear();
            let mm = today.getMonth();
            mm = mm < 10 ? "0" + mm : mm
            let dd = today.getDate();
            dd = dd < 10 ? "0" + dd : dd

            // 1.원본데이터 변수 할당하기
            let orgtemp = jsn;

            // 2.임시변수에 입력할 객체 데이터 생성하기
            let temp = {
                "idx" : jsn.length + 1, // 현재 개수 + 1 해서 넘버링하기
                "tit" : tit,
                "cont" : cont,
                "att" : "",
                "date" : `${yy}-${mm}-${dd}`,
                "writer" : nowmem.uid,
                "pwd" : nowmem.pwd,
                "cnt" : "1"
            }

            // 3.원본 임시변수에 데이터 push하기
            orgtemp.push(temp);

            // 4.Hook 관리변수에 최종 업데이트
            setJsn(orgtemp);

            // 5.로컬스토리지 변수에 반영하기
            localStorage.setItem('bdata', JSON.stringify(jsn));

            console.log(localStorage.getItem('bdata'));

            // 6.게시판 모드 업데이트하기(L모드로 바꾸기)
            setBdmode('L');

            // 7.리스트 바인딩 호출하기
            bindList(1);
        }

    } ////////////// 새로 입력하기 /////////////////

    // 리스트 태그를 로딩구역에서 일괄 호출하기 : 로딩구역을 만들고 그 안에서 불러줌으로써 html이 다 뿌려진 후에 리스트함수 호출해서 글들이 죽 뜨게 함
    // : 리스트 태그가 출력되었을 때 적용되도록 함
    $(()=>bindList(1));

}; ///////////////// chgMode 함수 /////////////////





// 로딩 체크 함수 : useEffect에서 호출함!! ///////
const callFn = () => {
    // tip) 상태 체크하는 함수는 한 군데에다가 모아서 해주고 그것들은 모아둔 함수를 useEffect에서 호출하면 됨


    // 리스트 상태일때만 호출!
    if(bdmode == 'L') bindList(1);

    // 로그인상태 체크함수 호출!
    chkLogin();

}; //////////////// callFn 함수 ////////////////


// 로딩체크함수 호출하기
useEffect(callFn,[]);


    return(
        <>
        {/* 모듈코드 */}
        {/* 1.게시판 리스트 : 게시판 모드 'L'일때 출력하기 */}
        {
            bdmode == 'L' &&
            <table className="dtbl" id="board">
                <caption>
                    OPINION
                </caption>
                {/* 상단 컬럼명 표시영역 */}
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Date</th>
                        <th>Hits</th>
                    </tr>
                </thead>

                {/* 중앙 레코드 표시부분 */}
                <tbody>
                    <tr>
                        <td colSpan="5">There is no data.</td>
                    </tr>
                </tbody>

                {/* 하단 페이징 표시부분 */}
                <tfoot>
                    <tr>
                        <td colSpan="5" className="paging">
                            {/* 페이징번호 위치  */}
                        </td>
                    </tr>
                </tfoot>
            </table>
        }

        {/* 2.글쓰기 테이블 : 게시판모드 'C'일때만 출력하기 */}
        {
            bdmode == 'C' &&
            <table className="dtblview">
                <caption>OPINION</caption>
                <tbody>
                    <tr>
                        <td width="100">
                            Name
                        </td>
                        <td width="650">
                            <input type="text" className="name" size="20" readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            <input type="text" className="email" size="40" readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Title
                        </td>
                        <td>
                            <input type="text" className="subject" size="60" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Content
                        </td>
                        <td>
                            <textarea className="content" cols="60" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
        </table>
        }

        <br />

        {/* 버튼 그룹 박스 */}
        <table className="dtbl btngrp">
            <tbody>
            <tr>
                <td>
                    {
                        // 리스트모드(L) : Write버튼
                        bdmode == 'L' && log &&
                        <>
                            <button onClick={chgMode}>
                                <a href="#">Write</a>
                            </button>
                        </>
                    }
                    {
                        // 글쓰기모드(C) : Submit버튼 + List버튼
                        bdmode == 'C' &&
                        <>
                            <button onClick={chgMode}>
                                <a href="#">Submit</a>
                            </button>
                            <button onClick={chgMode}>
                                <a href="#">List</a>
                            </button>
                        </>
                    }
                    {
                        // 글읽기모드(R) : List버튼 + Modify버튼(수정모드버튼)
                        bdmode == 'R' &&
                        <>
                            <button onClick={chgMode}>
                                <a href="#">List</a>
                            </button>
                            <button onClick={chgMode}>
                                <a href="#">Modify</a>
                            </button>
                        </>
                    }
                    {
                        // 글수정모드(U) : Submit버튼 + Delete버튼 + List버튼
                        bdmode == 'U' &&
                        <>
                            <button onClick={chgMode}>
                                <a href="#">Submit</a>
                            </button>
                            <button onClick={chgMode}>
                                <a href="#">Delete</a>
                            </button>
                            <button onClick={chgMode}>
                                <a href="#">List</a>
                            </button>
                        </>
                    }
                </td>
            </tr>
            </tbody>
        </table>
        {/* 빈루트를 만들고 JS로드함수포함 */}
        {jqFn()}
        </>
    )
}

export default Board;