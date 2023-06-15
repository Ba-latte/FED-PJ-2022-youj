// 로그인 페이지 컴포넌트 - LogIn.js


import { useState } from "react";
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { clearData, initData } from './fns/fnMem';
// 회원가입과 디자인동일
import "./css/member.css";

export default function LogIn() {

    // 라우트 이동 메서드 : 로그인에 성공하면 루트(메인페이지)로 이동시키기 위함
    let goRoute = useNavigate();

    // [ 후크 useState 메서드 셋팅하기 ]
    // [ 1. 입력요소 후크변수 ]
    // 1. 아이디변수
    const [userId, setUserId] = useState("");
    // 2. 비밀번호변수
    const [pwd, setPwd] = useState("");

    // [ 2. 에러상태값 후크변수 ]
    // -> 에러상태값변수 : 초기값은 에러 아님상태(false)
    // 1. 아이디에러변수
    const [userIdError, setUserIdError] = useState(false);
    // 2. 비밀번호에러변수
    const [pwdError, setPwdError] = useState(false);

    // [ 오류 메시지 프리셋 ]
    const msgTxt = [
        "This is a required entry", // 필수 입력
        "ID does not exist", // 아이디가 존재하지 않습니다
        "Password doesn't match", // 비밀번호가 일치하지 않습니다
    ];

    // 후크변수 메시지
    // 아이디 메시지 - 뒤에는 초기값 넣어준 것임
    const [idMsg, setIdMsg] = useState(msgTxt[0]);
    // 비번 메시지 - 뒤에는 초기값 넣어준 것임
    const [pwdMsg, setPwdMsg] = useState(msgTxt[0]);

    // [ 3. 유효성 검사 메서드 ]
    // 1. 아이디 유효성 검사 
    const changeUserId = (e) => {
        // 1. 빈값 체크
        if (e.target.value !== "") setUserIdError(false);
        else {
            setIdMsg(msgTxt[0]);
            setUserIdError(true);
        }

        // 2. 입력값 반영하기
        setUserId(e.target.value);
    }; /////////////// changeUserId ////////////////

    // 2. 비밀번호 유효성 검사
    const changePwd = (e) => {
        // 1. 빈값 체크
        if (e.target.value !== "") setPwdError(false);
        else {
            setPwdMsg(msgTxt[0]);
            setPwdError(true);
        }

        // 2. 입력값 반영하기
        setPwd(e.target.value);
    }; ///////////// changePwd ///////////////////

    
    // 3.전체 유효성 검사 함수 /////////////////////////
    const totalValid = () => {
        // 모든 입력창 검사하기 (빈 값일 경우 모두 에러를 Hook변수에 전달하기)
        if(!userId) setUserIdError(true);
        if(!pwd) setPwdError(true);

        // 통과 조건 : 
        // 1.빈 값이 아님
        // 2.에러 후크 변수가 모두 false
        // ->>위의 두가지 모두 만족시 true값 리턴하기
        // 에러 Hook변수가 모두 false일 때 (=에러메시지가 안 뜰 때) true값 리턴하기
        if(userId && pwd &&  
            !userIdError && !pwdError) return true;
        else return false; // 아니면(=하나라도 에러나면) false값 리턴하기

    }; ///////////////////// totalValid /////////////////////

    // 4.Submit 기능 함수 /////////////////////////
    const onSubmit = e => {
        // 기본 서브밋 기능 막기 : action으로 날라가는데, 날라가는거 막는 것임
        e.preventDefault();

        console.log("서브밋!");

        // 유효성 검사 전체 통과시
        if(totalValid()) {
            console.log("성공!");
            // 데이터 체크 초기화
            initData();

            // 로컬스토리지에서 "mem-data" 항목 확인하기
            let memData = localStorage.getItem("mem-data");
            console.log(memData);
            
            // 로컬스토리지 데이터 객체화하기
            memData = JSON.parse(memData);
            console.log(memData);

            // 같은 아이디 검사 상태 변수
            let isOK = true;

            // 입력한 데이터 중 아이디 비교하기
            memData.forEach(v=>{
                // 1.같은 아이디가 있는가?
                if(v["uid"] === userId) {
                    console.log("아이디가 같아요 ^^");
                    // 아이디 에러 상태 업데이트해서 에러상태 없애기
                    setUserIdError(false);

                    // 같은 아이디 검사 상태 변수 변경
                    isOK = false;


                    // 2.비밀번호가 일치하는가?
                    if(v["pwd"] === pwd) {
                        console.log("비번이 같아요 ^^");
                        // 비밀번호 에러 상태 업데이트해서 에러상태 없애기
                        setPwdError(false);

                        $(".sbtn").text("🚀로그인 성공🚀");

                        // [ 로그인 후 세팅 작업 ]
                        // 1.로그인 한 회원 정보를 로컬스토리지에 세팅하기 (세션 대신 사용하는 것임)
                        // : 실제로 로그인을 하면 서버의 세션 변수가 세팅됨
                        localStorage.setItem("minfo", JSON.stringify(v)); // 누적해서 쌓도록 한 게 아니라서 계속 변경됨!
                        console.log("로그인한 회원정보 : ", localStorage.getItem("minfo"));

                        // 2.라우팅 페이지 이동하기(useNavigate)
                        goRoute('/'); // 첫페이지로 이동!
                    }
                    else{
                        // tip) 아이디가 같은 경우로 한번 걸러져 들어와서 여기엔 단 하나의 값만 있을 수 있기 때문에 else 처리해도 됨!
                        console.log("비번 달라요 ㅠㅠㅠㅠㅠㅠ");
                        // 비밀번호가 다를 때 메시지 변경하기
                        setPwdMsg(msgTxt[2]);
                        
                        // 비밀번호 에러 상태 업데이트해서 에러 상태로 냅두기
                        setPwdError(true);
                    }
                } /////// if ////////
                // for문 안에 else를 쓰면 조건에 해당하지 않는 것들이 전부 다 else에 들어가서 노노~! -> for문 바깥에 상태변수를 만들어주고 조건문에 해당하면 상태 변수를 바꿔주는 식으로 하는게 좋음

                // 아이디가 불일치할 경우 -> 상태변수로 제어하면 됨
                if(isOK){
                    console.log("아이디가 달라요! ㅠㅠㅠㅠㅠㅠ");
                    // 아이디가 다를 때 메시지 변경하기
                    setIdMsg(msgTxt[1]);

                    // 아이디 에러 상태 업데이트하기
                    setUserIdError(true);
                }
            }); //////// forEach ////////

        } ///////////////////// if : 검사 통과시 /////////////////////
        // 불통과시
        else{
            console.log("실패!");
            
        } ///////////////////// else : 불통과시 /////////////////////


    }; ///////////////////// onSubmit /////////////////////


    return (
        <div className="outbx">
            {/* 모듈코드 */}
            <section className="membx" style={{minHeight:"300px"}}>
                <h2 onClick={clearData}>LogIn</h2>
                <form method="post" action="process.php">
                    <ul>
                        <li>
                            {/* 1.아이디 */}
                            <label>ID : </label>
                            <input
                                type="text"
                                maxLength="20"
                                placeholder="Please enter your ID"
                                value={userId}
                                onChange={changeUserId}
                            />
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건이 true이면 요소출력
                                // 훅크 데이터 idMsg로 변경출력!
                                userIdError && (
                                    <div className="msg">
                                        <small style={{ color: "red", fontSize: "10px" }}>
                                            {idMsg}
                                        </small>
                                    </div>
                                )
                            }

                            
                        </li>
                        <li>
                            {/* 2.비밀번호 */}
                            <label>Password : </label>
                            <input
                                type="password"
                                maxLength="20"
                                placeholder="Please enter your Password"
                                value={pwd}
                                onChange={changePwd}
                            />
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건이 true이면 요소출력
                                pwdError && (
                                    <div className="msg">
                                        <small style={{ color: "red", fontSize: "10px" }}>
                                            {pwdMsg}
                                        </small>
                                    </div>
                                )
                            }
                        </li>
                        <li style={{ overflow: "hidden" }}>
                            {/* 6.버튼 */}
                            <button className="sbtn" onClick={onSubmit}>
                                Submit
                            </button>
                            {/* input submit버튼이 아니어도 form요소
                            내부의 button은 submit기능이 있다! */}
                        </li>
                    </ul>
                </form>
            </section>
        </div>
    );
} ///////////// LogIn 컴포넌트 /////////////////