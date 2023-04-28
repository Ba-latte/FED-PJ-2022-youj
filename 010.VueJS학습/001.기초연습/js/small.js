// 쇼핑몰 갤러리 JS - small.js


// 템플릿 html 코드 객체 JS 가져오기
// 함수일경우엔 소괄호를 해줘야 실행되고 변수일 경우 그냥 바로 가져오면 실행됨
import hcode from "./hcode.js";
// .js가 생략된 상태로 가져오는게 디폴트값인 이유 = 노드.js쓸 때 자동으로 인식해주니까, 하지만 우리는 꼭 써야함

// 0.뷰 JS 인스턴스 생성용 함수 만들기 : new Vue() 계속 쓰기 귀찮으니까!
const makeVue = (x) => new Vue({ el: x });

// 1.제목에 넣을 전역 컴포넌트 만들기 (만들기만 한 것임)
Vue.component("tit-comp", {
    template: hcode.tit,
}); //////////////////// 전역 컴포넌트 1 /////////////////////////



// (2)생성용 함수로 생성하기
makeVue(".tit");

// 숫자 증감 변수 : 컴포넌트 내부 변수 세팅하는 'data: function(){}'에다 넣으면 적용 안됨!
// 🔥이유는 다음에 물어보기~~!!
let num = 0;

// 2.갤러리 리스트에 넣을 전역 컴포넌트 만들기
// 😂😂여기가 자식입니다😂😂
Vue.component("list-comp", {
    // v-on:click="goPapa" 로 부모 이벤트 접근 시작함~
    template: hcode.list,
    // 😂부모에서 v-bind:속성명=값 으로 전달한 속성변수를 props:[] / props:{}로 받음
    props: ["haha", "myseq", "endlet"],
    // props:{"haha":Number}, ->😂데이터형 일치함
    // props:{"haha":String}, ->😂만약 속성의 데이터형이 안 맞으면! 일단 브라우저가 뿌려주지만 콘솔창에 경고 띄워줌! (벨리데이션해줌)
    // 컴포넌트 내부 변수 세팅
    data: function () {
        return {
            // gsrc:`img_gallery/${this.setNum()}.jpg`,
            // 😂😂부모에서 받아온 haha를 가져다 쓸 수 있게 된다 (this써야해~)😂😂
            // 1.상품이미지 경로
            gsrc: `img_gallery/${this.haha}.jpg`,
            // 2.상품명
            gname: `Sofia23` + this.haha + this.endlet + (this.myseq % 2 ? "🍰" : "💛"),
            // 3.단위가격(원가격 : 화면 표시용)
            gprice: this.insComma((123000 * this.haha) / 2) + `원`,
            // 4.단위가격(원가격 : 숫자만!! data-price속성값으로 세팅)
            orgprice: ((123000 * this.haha) / 2),
            // 5.할인가격 : 30% 할인된 가격(원가격 * 0.7) - 반올림 : Math.round()
            sale: this.insComma(Math.round((123000 * this.haha) / 2 * 0.7)) + `원`,
            // 😂😂위에서처럼 가져온 변수를 가공해서 쓸 수 있음😂😂
        };
    },
    // 컴포넌트 내부 메서드 세팅
    methods: {
        // 클래스의 메서드 형식과 동일한 형식으로 작성 가능함
        //🌈🌈정규식함수(숫자 세자리마다 콤마해주는 기능)🌈🌈
        insComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // 부모 이벤트 호출 전달하기 : $emit()메서드 사용함!
        goPapa() {
            // $emit(부모가 만든 이벤트명)
            this.$emit("hull");
        },
        ovNow() {
            this.$emit("gotkimchi");
        },
        
        // 세일표시 여부 리턴 메서드
        condiRet(){
            return this.haha==3 || this.haha==5 || this.haha==14 || this.haha==26 || this.haha==38 || this.haha==45 || this.haha==50;
        }
    },
}); //////////////// 전역 컴포넌트 2 /////////////////////

// 리스트 뷰 인스턴스 생성하기
// makeVue(".grid");
// 😂😂여기가 부모입니다😂😂
new Vue({
    el: ".grid",
    // 부모 뷰 인스턴스 메서드구역
    methods: {
        // 자식이벤트 전달 후 실행메서드!
        goMsg() {
            // alert("자식이 부모에게 이벤트 전달 성공!");
        },
        ovMsg() {
            // console.log("이렇게?? 오버??");
        },
    },
}); //////////////////// Vue 인스턴스 ///////////////////////////




///////////// 큰이미지 보기 배경박스 컴포넌트 ///////////////////
Vue.component("win-comp", {
    template: hcode.big,
}); ////////////////////////// win-comp 컴포넌트 ///////////////////////////////////




////////////////// win-comp 뷰JS 인스턴스 생성하기 /////////////////////
new Vue({
    el: "#pbg",
    // DOM이 모두 로딩된 후 실행 구역!
    mounted:function(){
        // [ 제이쿼리 기능 구현 ]

        // 공유(하는)번호 변수
        let nowNum = 1;
        // 공유(하는)가격 변수
        let orgprice = 0;

        // 1. 갤러리 리스트 클릭시 큰이미지박스 보이기
        $(".grid>div").click(function(){

            // (1)클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src");

            // (2)클릭된 이미지 경로를 큰이미지에 src로 넣기
            $(".gimg img").attr("src", isrc);
            
            // (3)큰이미지박스 보이기
            $("#bgbx").show();
            
            // (4)다음/이전 이미지 변경을 위한 data-num속성 읽기
            nowNum = $(this).attr("data-num");
            console.log(nowNum);
            
            // (5)셋업함수 불러와서 값 세팅하기
            setVal();
        }); ///////////// click ///////////////



        // 상품명, 가격 등 데이터 셋업 함수
        function setVal(){
            // (1)nowNum값에 의한 대상 선정하기
            const tg = $(`.grid>div[data-num=${nowNum}]`);
            // console.log(tg.find("h2").text());
            // console.log(tg.find("h3").text());

            // 1. [ 가격 계산을 위한 원가격 세팅 ]
            orgprice = tg.find("h3>span:first").attr("data-price"); 

            // 1-1. 세일 적용일 경우 세일 가격으로 업데이트!!
            if(tg.find("h3>span:first").is(".del")){
                orgprice = Math.round(orgprice * 0.7)
            } ///////////////// if : 세일 적용된 제품일 경우 //////////////////////////
            
            console.log("원가격", orgprice);


            // (2)상품명을 큰 박스에 넣기
            $("#gtit, #gcode").text(tg.find("h2").text());

            // (3)상품가격을 큰 박스에 넣기
            // 세일일 경우와 아닌 경우를 나누기!!
            // 세일일 때
            if(tg.find("h3 span").first().is(".del")){
                $("#gprice, #total").html(
                    insComma("<small>30% 세일가</small>" + orgprice) + "원"
                    // tg.find("h3 span").last().text()
                );
            } ////////////////////// if : h3 span태그 중 첫번째 놈이 .del이니? //////////////////
            // 세일이 아닐 때
            else{
                $("#gprice, #total").text(
                    insComma(orgprice) + "원"
                    // tg.find("h3 span").first().text()
                );
            } //////////////// else : h3 span태그 중 첫번째 놈이 .del이 아닌 경우 ///////////////////////
        } //////////////////////// setVal 함수 ///////////////////////////
        

        // 2.닫기 버튼 클릭시 큰이미지박스 숨기기
        $(".cbtn").click(function(e){
            // a요소의 기본기능 막기
            e.preventDefault();

            $("#bgbx").hide();
        }); //////////// click /////////////

        // 3.이전/다음 버튼 클릭시 이미지 변경하기
        $(".abtn").click(function(e){
            // console.log("맞아?");
            e.preventDefault();
            
            // 오른쪽 버튼 여부
            let isB = $(this).is(".rb");

            // 분기하기
            if(isB){
                nowNum++;
                if(nowNum === 51){nowNum = 1;}

            } ///////////////////// if : 오른쪽 버튼일 경우 ////////////////////
            else{
                nowNum--;
                if(nowNum === 0){nowNum = 50;}
            } ///////////////// else : 왼쪽 버튼일 경우 //////////////////////

            console.log("변경된 번호: ", nowNum);

            // 4.큰 이미지 변경하기
            $(".gimg img").attr("src", `img_gallery/${nowNum}.jpg`);

            // 5.값 세팅하기
            setVal();

        }); ////////////////// click /////////////////


        // [ 수량 증가/감소 버튼 클릭시 데이터 반영하기 ]
        // 이벤트 대상: .chg_num img
        // 변경 대상 : input#sum
        const sum = $("input#sum");

        $(".chg_num img").click(function(){
            // 1.클릭된 버튼 구분하기
            let isB = $(this).attr("alt");
            // 2.현재값 읽어오기 : value의 기본형은 String이라서 이걸 숫자형으로 바꿔주기
            let isV = Number(sum.val());

            console.log("버튼 구분: ", isB);
            console.log("현재값: ", isV);
            // input에 입력된 값은 text가 아니라 value임!

            // 3.분기하기
            // (1)alt의 내용이 증가일 때
            if(isB === "증가"){
                // sum.val(isV++); ->> ++을 뒤에 쓰면, 현재값이 변경 안됨!
                // 왜?? 1증가 전에 반영하기 때문임!

                sum.val(++isV);

            } ////////////////// if : 증가일 때 /////////////////////////
            // (2)alt의 내용이 감소일 때 : 한계값 1
            else{
                isV = --isV;
                if(isV===0) isV = 1;
                sum.val(isV);
            } ////////////////// else : 감소일 때 ///////////////////////

            // 4.가격 표시하기


        }); ////////////////// click /////////////////////  


    } //////////// mounted 함수 구역 ///////////////////
}); /////////////////////// 뷰JS 인스턴스 ///////////////////////////////
