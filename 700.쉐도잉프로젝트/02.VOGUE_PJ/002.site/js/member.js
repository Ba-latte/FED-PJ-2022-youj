/* 보그 PJ 회원가입 페이지 JS - member.js */


/* 보그 PJ 회원가입 페이지 JS - member.js */

///////////// 제이쿼리 코드 블록 /////////////////
$(()=>{
    console.log("제이쿼리 - 로딩완료!");

    /********************************************* 
        [ 사용자 입력폼 유효성 검사 ]
        - 이벤트종류 : blur(포커스가 빠질때 발생) <-> focus(포커스 들어갈 때)
        - 제이쿼리 이벤트 메서드 : blur()
        - 이벤트 대상:
        -> id가 'email2'가 아니고 class가 'search'가 
        아닌 type이 'text'인 입력요소 input
        과 함께 type이 'password'인 입력요소 input

        ->>>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search],
        input[type=password]
        >>> 대괄호는 속성선택자(CSS원래문법) 
        != 같지않다(제이쿼리전용)

    *********************************************/
    $(`input[type=text][id!=email2][class!=search],
    input[type=password]`)
    // .on("blur", function(){ ->> 이렇게 쓰는 게 보편적인 방법!
    .blur(function(){
        // console.log("블러!");

        // 0.공백 제거 처리 함수
        // get rid of space -> 공백을 제거하라!
        const groSpace = cv => cv.replace(/\s/g,"");
        // 원형 : (cv)=>{return cv.replace(/\s/g,"")};
        // 정규식 : 슬래쉬(/) 사이에 표현함, \s 는 스페이스문자임
        // 정규식도 객체래,,
        // 참고사이트 : https://www.w3schools.com/jsref/jsref_obj_regexp.asp
        // 해석 : 스페이스문자(공백문자)를 모두 (g:global-전역) 찾아서 없애시오(빈 공백으로 변경)


        // 1.방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id"); // -> attr(속성명) 속성명 하나만 쓰면 속성 찾아옴(getAttribute와 같음)
        // cid는 current id(현재 아이디) 줄임말!
        
        // 2.블러가 발생한 요소의 입력 값은?
        // let cv = $(this).val().trim();
        // -중간공백제거 함수 추가한 것 : groSpace($(this).val());
        // 근데 이름은 중간 공백 줘야함! 즉, 거기는 트림만 써야함! ->> 삼항연산자로 해결하기
        let cv = cid==="mnm" ? $(this).val().trim() : groSpace($(this).val());
        // ->> cid가 mnm이니? 응 : 아니
        // cv는 current value (현재값)란 뜻
        // val() : input요소의 값(value)을 읽기/쓰기용
        // trim() : 앞/뒤 공백 제거 (공백만 있을 때도 공백 지워버림)
        // groSpace() : 전체 공백 제거 함수 (위에서 작성함)

        // 2-1.서비스 차원으로 공백 제거된 데이터를 다시 입력창에 넣어줌
        $(this).val(cv); // val()에다가 값을 넣으면 그 값이 반영됨
        
        console.log(cid, cv);

        /*****************************************
            3.빈값 여부 검사하기
        *****************************************/
        if(cv === ""){
            // 메시지 출력
            $(this).siblings(".msg").text("필수입력!");
        }

        /************************************************************
            4.아이디일경우 유효성 검사
            -검사 기준 : 영문자로 시작하는 6~20글자 영문자/숫자
        ************************************************************/



        ////// 모두 통과일 경우 메시지 지우기 /////////////
        else{
            // 메시지 지우기
            $(this).siblings(".msg").empty();
            // empty() : 내용 지우기

        } ///////// else : 모두 통과 ///////////////

    }); ////////////// blur ///////////////


}); ////////////////// jQB /////////////////////