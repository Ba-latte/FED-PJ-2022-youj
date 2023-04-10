/* 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll-class.js */


/********************************************************
    [ 🔥클래스로 묶어서 export해준다! ]
-변경사항들
1.공용 변수는 constructor에 this키워드로 등록함
2.모든 함수는 메서드형태로 변경함
ex) function 함수명(){} ----->>> 메서드명(){}
3.서로 다른 메서드에서 클래스 내부 다른 메서드를 호출할 때 this 키워드를 사용하여 호출함!
4.이벤트 등록시 addEventListener(이벤트명, 함수)
함수일때는 함수명만 쓰면 등록되었으나,
클래스는 함수가 아닌 메서드이므로! 이것은 익명함수 구역을 만들고 함수를 호출하는 방식으로 this 키워드를 사용한 메서드 호출을 해야 호출됨!

********************************************************/
class AutoScroll {
    // 생성자 메서드(최초 실행구역이 되기도 함)
    constructor() {



        /********************************************************
            대상 변수 할당하기
        ********************************************************/
        // 전체 페이지 번호
        this.pno = 0;
        // 페이지 요소
        this.pg = $(".page");
        // 전체 페이지 개수
        this.pgcnt = this.pg.length;
        // console.log("페이지 개수: ", this.pgcnt, this.pg);
        // 광클(광휠? 광실행;;)금지변수 - 변수를 배열에 담으면! 여러 금지 변수들 한번에 관리 가능함!
        this.prot = [];
        // 광스크롤 금지
        this.prot[0] = 0;
        // 광클 초기값 (chgMenu에서의 광클금지)
        this.prot[1] = 0;

        // THIS.GNB메뉴 li
        this.gnb = $(".gnb li");
        // 인디케이터 메뉴 li
        this.indic = $(".indic li");

        // 각 페이지별 등장요소
        this.minfo = $(".minfo");

        // 💖인스턴스 생성시 접근하여 변경가능한 속성 2가지 선정함! ///////////////////////////
        // (1)이동시간
        this.sc_speed = 700;

        // (2)이징값
        this.easing = "easeInOutBack";

        // ⭐최초로 호출할 메서드도 여기서 호출!⭐
        this.initPg();

    } //////////// constructor ////////////////////




    /************************************************************
        메서드명 : initPg
        기능 : 페이지 초기 세팅하기
    ************************************************************/
    initPg() {
        /********************************************************
            이벤트 등록하기
        ********************************************************/
        // 윈도우 휠 이벤트 발생시
        // $(window).on("wheel", this.wheelFn);
        $(window).on("wheel", ()=>this.wheelFn());
        // THIS.GNB 메뉴 클릭시
        // 대상 : .gnb a
        $(".gnb a").click(()=>this.chgMenu());
        // 인디케이터 메뉴 클릭시
        // 대상 : .indic a
        $(".indic a").click(()=>this.chgMenu());
        // : 메서드 호출하는 명령문 형태로 직접 호출?해야 호출이 된다고 하심(;;;)



        // 새로고침시 스크롤위치를 계속 잡아두고 있기 때문에 세팅은 1번으로 바뀌는데 위치는 그대로임;; -> 바꿔야함
        // 새로고침시 스크롤 위치 캐싱 변경하기 : 맨위로!
        $("html,body").animate({ scrollTop: "0px" });


    } ////////////////// initPg 메서드 ///////////////////////////////




    /*******************************************************
        메서드명 : wheelFn
        기능 : 마우스휠 이벤트 발생시 호출됨
        ->한 페이지씩 자동 스크롤 기능
    *******************************************************/
    wheelFn() {
        // console.log("휠~~~");
        // 광휠금지 - 1이면 리턴 / 0이면 1을 주고 일정 시간(0.8초) 지난 후 0으로 다시 만들기
        if (this.prot[0])
            return;
        this.chkCrazy(0);


        // 1.휠 방향 알아내기
        let delta = event.wheelDelta;
        console.log(delta);

        // 2.방향에 따른 페이지번호 증감
        if (delta < 0) {
            this.pno++;
            if (this.pno === this.pgcnt)
                this.pno = this.pgcnt - 1;
            // 마지막 페이지 번호에 고정시키기! (더이상 증가 못하도록)
        }
        else {
            this.pno--;
            if (this.pno === -1)
                this.pno = 0;
            // 첫 페이지 번호에 고정시키기! (더이상 감소 못하도록)
        }
        // console.log(this.pno);
        // 3.스크롤 이동하기 + 메뉴에 클래스 "on" 넣기 (자신제외 형제들에게는 on빼기)
        this.movePg();


    } ////////////////////////// wheelFn 메서드 /////////////////////////////////



    /******************************************
        메서드명 : chgMenu
        기능 : 메뉴 클릭시 메뉴 변경과 페이지 이동
    ******************************************/
    chgMenu() {
        // console.log("나 클릭!", this, event.currentTarget, idx);
        // this 키워드는 생성자 메서드의 객체를 가리킴!
        // 따라서 이벤트 발생 자신은 event.currentTarget 라고 해야 함!
        // 0.광클금지
        if (this.prot[1])
            return;
        this.chkCrazy(1);


        // 1.클릭된 a요소의 부모 li순번을 구함 === this.pno
        let idx = $(this).parent().index();
        console.log(idx);
        // 2.전역 페이지 번호에 순번 업데이트
        this.pno = idx;

        // 3.페이지 이동 + 메뉴에 클래스 "on" 넣기 (자신제외 형제들에게는 on빼기)
        this.movePg();

    } ///////////////// chgMenu 메서드 ///////////////////////////



    /*******************************************************
        메서드명 : chkCrazy
        기능 : 광적 동작 체크하여 제어, 리턴
    *******************************************************/
    chkCrazy(seq) {
        this.prot[seq] = 1;
        // 일정 시간 후 풀어주기
        setTimeout(() => { this.prot[seq] = 0; }, this.sc_speed);
        // this.sc_speed : 생성시 세팅가능한 이동시간(이동시간동안 막기)
    } ////////////////// chkCrazy 메서드 ///////////////////////



    /*******************************************************
        메서드명 : moveThis.pg
        기능 : 페이지 이동
    *******************************************************/
    movePg() {
        // ⭐대상 : html, body -> 2개를 모두 잡아야 공통적으로 적용됨!!(모든 브라우저에서 적용되게 하려면~)⭐
        $("html, body").animate({
            scrollTop: ($(window).height() * this.pno) + "px"
        }, this.sc_speed, this.easing

        );
        // 이동 후 콜백메서드 (요소 등장 메서드) 호출하기
        // 대상 : THIS.GNB메뉴, 인디케이터 메뉴
        this.gnb.eq(this.pno).addClass("on").siblings().removeClass("on");
        this.indic.eq(this.pno).addClass("on").siblings().removeClass("on");

    } ///////////////// movePg 메서드 ///////////////////////










        // // 등장할 요소 초기화
        // this.minfo.css({
        //     opacity: 0,
        //     transform: "translate(-50%, 50%)",
        //     transition: ".6s ease-out"
        // }); //////////// css //////////////////
        /*******************************************************
            메서드명 : showEle
            기능 : 페이지 이동 후 요소 등장하기
        *******************************************************/
        // this.showEle = ()=>{
        //     // .this.minfo 페이지별 등장하기
        //     this.pg.eq(this.pno).find(".this.minfo").css({
        //         opacity: 1,
        //         transform: "translate(-50%, -50%)",
        //     }) /////////// css ////////////////
        //     .parents(".page").siblings().find(".this.minfo").css({
        //         opacity: 0,
        //         transform: "translate(-50%, 50%)",
        //         transition: ".6s ease-out"
        //     });;
        // } //////////////////// showEle 메서드 ///////////////////////
        // 최초 호출하기
        // setTimeout(showEle, 1000);
        

} ///////// AutoScroll 클래스 /////////////////







// 🔥클래스 내보내기 /////////////
export default AutoScroll;
