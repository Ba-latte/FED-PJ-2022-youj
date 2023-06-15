// Member 모듈 JS - Member.js

import React, {useState} from 'react';
import $ from 'jquery';
import './css/member.css';
import { Link, useNavigate } from 'react-router-dom';
import { clearData, initData } from './fns/fnMem';

    /*

        [ 후크 : Hook - 왜 필요한가? ]
    1. 목적 - 어떤 특정 데이터가 변경될때
    다른 것을 매칭하여 실시간으로 변경할 필요가 있을 경우
    간단하고 효과적으로 이것을 구현해주는 방법이다!
    2. 구현방법
        1) 상단에 후크를 import 한다 -> useState
        2) useState() 메서드를 사용한다
        코드법: 
            배열변수 = useState(초기값)
        일반형:
            const [변수명,set변수명] = useState(초기값)
            -> set변수명 작성시 변수명 첫글자는 대문자로처리!
            -> set변수명(값) : 메서드 형태로 값을 셋팅한다!(셋터와 비슷함)
        3) 작동원리
            - useState에 쓴 초기값이 배열변수 첫번째에 할당된다
            - 코드에서 set변수명 에 값을 할당하면
            useState가 이것을 체크하여 다른 변경을 
            하도록 메서드를 실행한다!
        4) 사용결과
            - 별도의 메서드 호출없이 후크 상태변수를 사용한 곳이
            자동으로 변경될때마다 다시 갱신되는 것을 확인할 수 있다!

    */


// [ 컴포넌트 ]
function Member(){

    // 요구사항 : 각 입력 항목에 맞는 유효성 검사를 입력하는 순간! 실시간으로 체크하여 결과를 화면에 리턴하기

    // [ 리액트 라우터 이동시 이동 메서드 사용하기 : useNavigate ]
    // 1.Link를 사용한 세팅으로 라우터를 이동하였음
    // -> 코드적으로 이동할 때에는? 바로 useNavigate를 사용함
    // 2.import하기 : import {useNavigate} from 'react-router-dom';
    // 3.사용법 : 변수 = useNavigate();
    // -> 변수(라우터 경로) 형태로 사용하면 됨


    // 라우터 이동 내비게이트 생성하기
    const goRoute = useNavigate();


    // [ Hook useState 메서드 세팅하기 ]
    // [ 🥰1.입력요소 Hook 변수 ]
    // 1.아이디 변수 : 초기값은 비어있는 값으로 만들기
    const [userId, setUserId] = useState("");
    // 2.비밀번호 변수
    const [pwd, setPwd] = useState("");
    // 3.비밀번호 확인 변수
    const [chkPwd, setChkPwd] = useState("");
    // 4.사용자 이름 변수
    const [userName, setUserName] = useState("");
    // 5.이메일 변수
    const [email, setEmail] = useState("");

    // [ 🥰2.에러상태값 후크변수 ]
    // -> 에러 상태값 변수 : 초기값은 에러 아님 상태! (false)
    // 1.아이디 에러 변수
    const [userIdError, setUserIdError] = useState(false);
    // 2.비밀번호 에러 변수
    const [pwdError, setPwdError] = useState(false);
    // 3.비밀번호 확인 에러 변수
    const [chkPwdError, setChkPwdError] = useState(false);
    // 4.사용자 이름 에러 변수
    const [userNameError, setUserNameError] = useState(false);
    // 5.이메일 에러 변수
    const [emailError, setEmailError] = useState(false);

    // [ 아이디 관련 메시지 프리셋 ]
    const msgId = [
        "User ID must contain at least 5 alphanumeric characters.",
        "This ID is already in use",
        "That's a great ID 😎"
    ];
    // Hook 변수 메시지
    const [idMsg, setIdMsg] = useState(msgId[0]);

    // // [로컬스토리지 클리어 ] /////////////// 📌fns/fnMem.js 로 보냄
    // const clearData = ()=>{
    //     // 로컬스토리지 비우기
    //     localStorage.clear();
        
    //     console.log("로컬스토리지 클리어");
    // } /////////////// clearData ///////////////


    // // [ 로컬스토리지 초기 체크 세팅 : 없으면 만들어! ] /////////////// 📌fns/fnMem.js 로 보냄
    // const initData = ()=>{
    //     // 처리 프로세스를 실행시켜주기
    //     // alert("처리 페이지로 이동!");

    //     // [ 만약 로컬스토리지에 "mem-data"항목이 null(빈 값)이면 이 항목 만들어주기 ]
    //     if(localStorage.getItem("mem-data")===null){
    //         localStorage.setItem("mem-data", `
    //             [
    //                 {
    //                     "idx": "1",
    //                     "uid": "tomtom",
    //                     "pwd": "1111",
    //                     "unm": "Tom",
    //                     "eml": "tom@gmail.com"
    //                 }
    //             ]
    //         `);
    //     } ////////////// if : 로컬스토리지 항목 존재 체크 //////////////
    // }; /////////////// initData ///////////////






    // [ 🥰3.유효성 검사 메서드 ]
    // 1.아이디 유효성 검사
    const changeUserId = e => {
        // e - 이벤트 전달 변수
        // 1.아이디 유효성 검사식 : 따옴표로 감싸지 말 것!
        const valid = /^[A-Za-z0-9+]{5,}$/;
        
        // 2.입력값 확인 : e.target -> 이벤트가 발생한 요소
        // console.log("입력값 확인! : ", e.target.value);

        // 3.에러 아님 상태 if문
        // 조건 : 유효성 검사 결과가 true인가? -> true가 나면 에러상태값이 false(=에러아님)여야 함
        // -> test()메서드 사용할 예정
        // 정규식.test() -> 정규식 검사 결과 리턴 메서드
        // 결과 : true이면 에러 상태값이 false! / 반대로 false이면 에러 상태값이 true임!
        if(valid.test(e.target.value)) {
            // 로컬스토리지 데이터 체크 함수 호출하기
            initData();

            // [ 아이디 형식에는 맞지만 사용 중인 아이디인지 검사하기 ]
            // 로컬스토리지에서 데이터 항목 가져오기
            let memData = localStorage.getItem("mem-data");
            console.log("로컬쓰 : ", memData);

            // 📢기존 아이디가 있으면 상태값 false로 업데이트
            let isOK = true;

            // 로컬스토리지가 null이 아닌 경우
            if(memData) {
                console.log("통과시 : ", memData);
                // 로컬스토리지에 기존 아이디 중에 있는지 확인하기
                // 문자형 데이터를 객체형 데이터로 변환하기(배열형)
                memData = JSON.parse(memData);

                
                // 검사 돌기
                memData.forEach((v)=>{
                    // 지금 입력한 value값이 기존의 아이디와 같은 것이 있는지 확인하기! : 기존의 아이디와 같은 경우
                    if(v["uid"] === e.target.value) {
                        // (1)메시지 변경하기
                        setIdMsg(msgId[1]);
                        // (2)아이디 에러 상태값 업데이트해주기
                        setUserIdError(true);
                        
                        // (3)존재 여부 업데이트
                        isOK = false;
                    } //////////// if : 기존 아이디와 같은 경우 ////////////

                    // 기존 아이디가 없으면 들어가기!
                    if(isOK){
                        console.log("바깥");
                        // 메시지 변경 : 처음 메시지로 변경
                        setIdMsg(msgId[0]);
                        // 아이디 에러 상태값 업데이트
                        setUserIdError(false);
                    }
                });

                

            } ///////////////////// if : null이 아닌 경우 /////////////////////
            else{
                console.log("DB가 없어요😂");
            } ///////////////////// else : null 인 경우 /////////////////////

            // setUserIdError(false); // 에러 아님 상태!
            
        } ///////////////////// if /////////////////////
        // 👆 유효성검사식.test(전달된 값)이 true라면 에러변수에 false를 보내서 에러 아님이라고 하기!
        else setUserIdError(true); 
        
        // 4.실제 userId 후크변수값이 업데이트 되어야 화면에 출력됨 : 검사하고 넣고 검사하고 넣고 반복
        setUserId(e.target.value);


    }; ///////////////////// changeUserId /////////////////////

    // 2.비밀번호 유효성 검사
    const changePwd = e => {
        // 1.유효성 검사식 : 따옴표 쓰지 말 것
        const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        // 2.입력값 확인
        // console.log("입력값 확인! : ", e.target.value);
        // 3.에러 아님 상태 if문
        if(valid.test(e.target.value)) setPwdError(false);
        else setPwdError(true); 
        // 4.후크변수 업데이트 하기
        setPwd(e.target.value);

    }; ///////////////////// changePwd /////////////////////

    // 3.비밀번호 확인 유효성 검사
    const changeChkPwd = e => {
        // 1.위에 입력한 비밀번호와 일치하는지 여부
        if(pwd === e.target.value) setChkPwdError(false); // 에러 아니라고 보내기
        else setChkPwdError(true); // 에러라고 보내기

        // 2.입력값 반영하기 : 후크변수 업데이트
        setChkPwd(e.target.value);

    }; ///////////////////// changeChkPwd /////////////////////

    // 4.사용자 이름 유효성 검사
    const changeUserName = e => {
        // 1.값이 비어있는지 확인하기
        if(e.target.value !== "") setUserNameError(false);
        else setUserNameError(true);
        // 👆 userName이 빈값인지 확인하는 것은... 맨처음엔 userName에 값이 안 들어가기 때문에~ 실시간 반영을 위해서는 타겟value를 체크하는 것이 맞다!

        // console.log("입력값 확인! : ", e.target.value);

        // 2.입력값 반영하기
        setUserName(e.target.value);

    }; ///////////////////// changeUserName /////////////////////

    // 5.이메일 유효성 검사
    const changeEmail = e => {
        // 1.이메일 정규식 세팅하기
        const valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;


        // 2.이메일 유효성 검사 확인하기
        if(valid.test(e.target.value)) setEmailError(false);
        else setEmailError(true);

        console.log("입력값 확인! : ", valid.test(e.target.value));

        // 3.입력값 반영하기
        setEmail(e.target.value);

    }; ///////////////////// changeEmail /////////////////////

    // 6.전체 유효성 검사 함수 /////////////////////////
    const totalValid = () => {
        // 모든 입력창 검사하기 (빈 값일 경우 모두 에러를 Hook변수에 전달하기)
        if(!userId) setUserIdError(true);
        if(!pwd) setPwdError(true);
        if(!chkPwd) setChkPwdError(true);
        if(!userName) setUserNameError(true);
        if(!email) setEmailError(true);

        // 통과 조건 : 
        // 1.빈 값이 아님
        // 2.에러 후크 변수가 모두 false
        // ->>위의 두가지 모두 만족시 true값 리턴하기
        // 에러 Hook변수가 모두 false일 때 (=에러메시지가 안 뜰 때) true값 리턴하기
        if(userId && pwd && chkPwd && userName && email && 
            !userIdError && !pwdError && !chkPwdError && !userNameError && !emailError) return true;
        else return false; // 아니면(=하나라도 에러나면) false값 리턴하기

    }; ///////////////////// totalValid /////////////////////

    // 7.Submit 기능 함수 /////////////////////////
    const onSubmit = e => {
        // 기본 서브밋 기능 막기 : action으로 날라가는데, 날라가는거 막는 것임
        e.preventDefault();

        console.log("서브밋!", email);

        // 유효성 검사 전체 통과시
        if(totalValid()) {
            // 👆 소괄호()를 적어서 바로 실행시켜줘야 t/f가 리턴됨

            // [ 로컬스토리지의 항목을 가져와서 변수에 담기 ]
            let memData = localStorage.getItem("mem-data");

            // 확인해보기
            console.log("변환 전) 로컬 스토리지!: ", memData);
            
            // [ 담은 변수인 memData를 객체로 바꾸기 ]
            memData = JSON.parse(memData);
            
            // 확인해보기
            console.log("변환 후) 로컬 스토리지!: ", memData);

            // [ 새로운 데이터 구성하기 ]
            let newObj = {
                "idx": memData.length+1,
                "uid": userId,
                "pwd": pwd,
                "unm": userName,
                "eml": email
            };


            // [ 데이터 추가하기 : 배열에 데이터 추가할 때 쓰는 메서드는 'push()'임 ]
            memData.push(newObj);

            // 추가 후 콘솔창에서 확인해보기 (로컬스토리지에는 미반영됨)
            // console.log("데이터 추가 후) 로컬 스토리지!: ", memData);
            
            // [ 로컬스토리지에 추가한 데이터 반영하기 : 객체 형태인 내용물을 다시 string 형태로 바꿔서 집어 넣기 ]
            localStorage.setItem("mem-data", JSON.stringify(memData));
            
            // 로컬스토리지에 들어갔는지 확인해보기
            console.log("반영 후) 로컬 스토리지!: ", localStorage.getItem("mem-data"));

            // 로그인 페이지로 이동하기(라우터 이용하기)
            // : useNavigate 사용!
            $(".sbtn").text("😎넌 이제 회원인거야😎");
            setTimeout(()=>{
                goRoute('/login');
            }, 2000);
            // -> <Link to='/login'> </Link>와 동일한 기능을 수행함!
            
        } ///////////////////// if : 검사 통과시 /////////////////////
        // 불통과시
        else{
            // alert("입력을 수정하세요!");
        } ///////////////////// else : 불통과시 /////////////////////


        


    }; ///////////////////// onSubmit /////////////////////


    return(
        <div className='outbx'>
            {/* 모듈 코드 */}
            <section className='membx'>
                <h2 onClick={clearData}>Join Us</h2>
                
                <form method='post' action='process.php'>
                    <ul>
                        <li>
                            {/* 1.아이디 */}
                            <label>ID : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your ID." value={userId} onChange={changeUserId} />
                            {/* value={userId} -> 중괄호{}에 값이 들어가면 그게 위의 userId에들어간대 */}
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건문이 true일 경우 요소 출력(아니면 출력 안 함)
                                // Hook 데이터 idMsg로 변경 출력하기
                                userIdError && (
                                    <div className='msg'>
                                        <small style={{color:"red", fontSize:"10px"}} >
                                            {idMsg}
                                        </small>
                                    </div>
                                )
                            }

                            {
                                // "훌륭한 아이디네요"일 경우
                                // : 아이디 에러가 false일 떄 출력하기
                                // 고정 데이터 배열 msgId 세번째 값 출력하기
                                !userIdError && userId && (
                                    <div className='msg'>
                                    <small style={{color:"green", fontSize:"10px"}} >
                                        {msgId[2]}
                                    </small>
                                </div>
                                )

                                // value={userId} 값은 setUserId를 통해서만 업데이트되어 실제 화면에 반영됨
                                // onChange={changeUserId} -> change이벤트 발생시 changeUserId 함수 호출!
                            }
                        </li>
                        <li>
                            {/* 2.비밀번호 */}
                            <label>Password : </label>
                            <input type="password" maxLength="20" placeholder="Please enter your password." value={pwd} onChange={changePwd} />
                            {
                                // 에러일 경우 메시지 보여주기
                                pwdError &&
                                <div className='msg'>
                                    <small style={{color:"red", fontSize:"10px"}} >Password must be at least 8 characters long and must contain at least one letter and one number each.</small>
                                </div>
                            }
                        </li>
                        <li>
                            {/* 3.비밀번호 확인 */}
                            <label>Confirm password : </label>
                            <input type="password" maxLength="20" placeholder="Please enter your confirm password." value={chkPwd} onChange={changeChkPwd} />
                            {
                                // 에러일 경우 메시지 보여주기
                                chkPwdError &&
                                <div className='msg'>
                                    <small style={{color:"red", fontSize:"10px"}} >Password verification does not match.</small>
                                </div>
                            }
                        </li>
                        <li>
                            {/* 4.이름 */}
                            <label>User Name : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your name." value={userName} onChange={changeUserName} />
                            {
                                // 에러일 경우 메시지 보여주기
                                userNameError && (
                                    <div className='msg'>
                                        <small style={{color:"red", fontSize:"10px"}} >This is a required entry.</small>
                                    </div>
                                )
                            }
                        </li>
                        <li>
                            {/* 5.이메일 */}
                            <label>Eamil : </label>
                            <input type="text" maxLength="50" placeholder="Please enter your email." value={email} onChange={changeEmail} />
                            {
                                // 에러일 경우 메시지 보여주기
                                emailError && (
                                    <div className='msg'>
                                        <small style={{color:"red", fontSize:"10px"}} >Please enter a valid email format</small>
                                    </div>
                                )
                            }
                        </li>
                        <li style={{overflow:"hidden"}}>
                            {/* 6.버튼 */}
                            <button className='sbtn' onClick={onSubmit}>Submit</button>
                            {/* 👆 input 태그의 submit버튼이 아니더라도! form요소 내부의 button은 submit기능이 있음! */}
                        </li>
                        <li>
                            {/* 7.로그인 페이지 링크 */}
                            Are you already a member?
                            <Link to="/login"> Log In </Link>
                        </li>
                    </ul>

                </form>
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </div>
    );
} ////////////////// Member 컴포넌트 //////////////////


// [ 제이쿼리 로드구역 함수 ]
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////


// [ 내보내기 ]
export default Member;