// Member 모듈 JS - Member.js

import React, {useState} from 'react';
import $ from 'jquery';
import './css/member.css';

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
        if(valid.test(e.target.value)) setUserIdError(false);
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
        console.log("입력값 확인! : ", e.target.value);
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
        // 1.값이 비어있는제 확인하기
        if(e.target.value !== "") setUserNameError(false);
        else setUserNameError(true);
        // 👆 userName이 빈값인지 확인하는 것은... 맨처음엔 userName에 값이 안 들어가기 때문에~ 실시간 반영을 위해서는 타겟value를 체크하는 것이 맞다!

        console.log("입력값 확인! : ", e.target.value);

        // 2.입력값 반영하기
        setUserName(e.target.value);

    }; ///////////////////// changeUserName /////////////////////


    return(
        <>
            {/* 모듈 코드 */}
            <section className='membx'>
                <h2>Member</h2>
                
                <form>
                    <ul>
                        <li>
                            {/* 1.아이디 */}
                            <label>ID : </label>
                            <input type="text" maxLength="20" placeholder="Please enter your ID." value={userId} onChange={changeUserId} />
                            {/* value={userId} -> 중괄호{}에 값이 들어가면 그게 위의 userId에들어간대 */}
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건문이 true일 경우 요소 출력(아니면 출력 안 함)
                                userIdError &&
                                <div className='msg'>
                                    <small style={{color:"red", fontSize:"10px"}} >User ID must contain at least 5 alphanumeric characters.</small>
                                </div>

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
                        </li>
                        <li>
                            {/* 5.버튼 */}
                        </li>
                        <li>
                            {/* 6.로그인 페이지 링크 */}
                        </li>
                    </ul>

                </form>
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// Member 컴포넌트 //////////////////


// [ 제이쿼리 로드구역 함수 ]
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////


// [ 내보내기 ]
export default Member;