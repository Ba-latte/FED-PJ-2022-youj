// 2023캘린더


// 모듈 불러오기 : import
import MakeDallyeok from "./calendar.js";
// 현재 같은 위치일지라도 ./를 반드시 써줘야 불러온다!

// 생성자 함수를 인스턴스로 호출하기
// 인스턴스 생성이란, 특정 메모리 구역에 모듈을 로딩시켜서 개별화 기능이 적용되게 하는 것!

// 우리가 만든 달력 생성자 함수에서 전달값을 받는 것은?
// 달력을 넣을 요소의 선택자 정보임!
// 달력 놓을 요소: .calbx
let calbx = new MakeDallyeok(".calbx");
// 초기화 함수를 호출함!
calbx.initDallyeok();


// 다른 요소에 달력 추가 생성하기
let calbx2 = new MakeDallyeok(".calbx2");
// 초기화 함수 호출
calbx2.initDallyeok();

// 다음 달 달력호출하기
// calbx2.nextCal();





// 제이쿼리 라이브러리를 html페이지 상단에 호출 후 사용하면 된다!
$(".myipt").click(function(){
    console.log(this);
    // 해당 박스 달력 보이기
    $(this).next().find(".calender").show();
}); /////////// click //////////////


// 이 아래가...비즈니스 로직??이래... 활용하는 부분이래...달력을....

// on("이벤트명1 이벤트명2", 함수)
// ->> 제이쿼리에서는 이벤트 명을 띄어쓰기로 여러개를 한꺼번에 세팅 가능함!
// : js에서는 addEventListener로 원래 하나씩 세팅해야하는데, 제이쿼리는 여러개 동시에 세팅 가능함
$(".calender").on("mouseenter click", function(){
    console.log("이벤트!!");
    // 하위 날짜 박스인 .date에 클릭 이벤트를 설정한다
    // 첫번째 this : .calender임
    $(this).find(".date").click(()=>{
        // 두번째 this : 일반 익명함수 안에서는 .date를 가리킴
        // 따라서!! 이벤트를 싸고 있는 이벤트 대상을 this로 만들고 싶을 때, '화살표 함수'를 사용하면 된다!
        // -> 감싸고 있는 .calender가 this가 된다!
        // !!!!! 이벤트가 설정되었으면 window가 아니라 자기 위의 함수임!!!!!!!!
        // 올라가다가 화살표함수로 만든 function이 있으면 걔가 this가 됨
        console.log(this);
        // 화살표 함수 안 + 이벤트 설정 => this가 calender가 된 것임
        let val = $(this).find(".dinfo").val();
        // val()메서드는 input의 value값을 읽어옴
        $(this).parent().prev().val(val);
        // val(값) -> 값을 쓰면 input에 내용 넣기됨!
        $(this).hide();

        ///////////////// 시작일과 종료일 계산하기 ////////////////////////////
        // 조건1 : 두번째 캘린더인지 구분하기
        // 두번째 캘린더에서 날짜를 선택하면, 첫번째와 두번째 선택 날짜 차이값을 계산하여 .res에 표시한다!
        // 두번째 캘린더인지 구분하기 : 캘린더 부모박스가 .calbx2인 경우 찾으면 됨
        // ->> $(선택자).is(요소) : 클래스 등 요소 인지 여부 판별해줌 (true / false로 리턴)
        console.log("두번째 캘린더야?? : ", $(this).parent().is(".calbx2"));
        
        // 조건2 : 첫번째 입력창이 비어있는지 확인하기 (비어 있지 않아야함)
        console.log("첫번째 입력창이 비어있는가? : ", $("#myinput").val()==="");

        // 두번째 캘린더이고(&&) 첫번째 입력창이 비어있지 않으면 실행하기
        if($(this).parent().is(".calbx2") && $("#myinput").val()!==""){
            // 날짜 차이 계산하기 함수 호출하기
            // 대상 : #myinput, #myinput2
            let val1 = $("#myinput").val();
            let val2 = $("#myinput2").val();
            // 함수 : 생성자 함수 안에 있음! (new 키워드로 인스턴스를 생성한 변수 하위로 접근 가능함)
            // 이 함수는 결과를 리턴하므로 변수에 담는다!
            let res = calbx2.getDateDiff(val1, val2);

            // 원하는 곳에 출력하기 : .res에 출력!
            $(".res").text(res);

        } /////////////// if ////////////////////


    }); ////////////// click ///////////////////


});