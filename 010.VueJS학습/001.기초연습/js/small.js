// 쇼핑몰 갤러리 JS - small.js


// 0.뷰 JS 인스턴스 생성용 함수 만들기 : new Vue() 계속 쓰기 귀찮으니까!
const makeVue = (x) => new Vue({ el: x });

// 1.제목에 넣을 전역 컴포넌트 만들기 (만들기만 한 것임)
Vue.component("tit-comp", {
    template: `
        <strong>
            <span>☕다이아나 쇼핑몰🍪</span><br>
            Diana Shopping Mall
        </strong>
    `,
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
    template: `
                    <div>
                        <img v-bind:src="gsrc" v-on:click="goPapa" v-on:mouseover="ovNow" alt="dress">
                        <aside>
                            <h2>{{gname}}</h2>
                            <h3>{{gprice}}</h3>
                        </aside>
                    </div>
                `,
    // 😂부모에서 v-bind:속성명=값 으로 전달한 속성변수를 props:[] / props:{}로 받음
    props: ["haha", "myseq", "endlet"],
    // props:{"haha":Number}, ->😂데이터형 일치함
    // props:{"haha":String}, ->😂만약 속성의 데이터형이 안 맞으면! 일단 브라우저가 뿌려주지만 콘솔창에 경고 띄워줌! (벨리데이션해줌)
    // 컴포넌트 내부 변수 세팅
    data: function () {
        return {
            // gsrc:`img_gallery/${this.setNum()}.jpg`,
            // 😂😂부모에서 받아온 haha를 가져다 쓸 수 있게 된다 (this써야해~)😂😂
            gsrc: `img_gallery/${this.haha}.jpg`,
            gname: `Sofia23` + this.haha + this.endlet + (this.myseq % 2 ? "🍰" : "💛"),
            gprice: this.insComma((123000 * this.haha) / 2) + `원`,
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
    template: `
        <!-- 큰이미지 배경박스 -->
        <div id="bgbx">
            <!-- 오른쪽버튼 -->
            <a href="#" class="abtn rb">
                <span class="ir">오른쪽버튼</span>
            </a>
            <!-- 왼쪽버튼 -->
            <a href="#" class="abtn lb">
                <span class="ir">왼쪽버튼</span>
            </a>
            <!-- 닫기버튼 -->
            <a href="#" class="cbtn">
                <span class="ir">닫기버튼</span>
            </a>
            
            <!-- 큰이미지 박스 -->
            <div id="imbx">
                <!-- 큰 이미지 -->
                <img src="img_gallery/50.jpg" alt="큰 이미지">
                <!-- 이미지 설명 -->
                <h4></h4>
            </div>
        </div>
    `
}); ////////////////////////// win-comp 컴포넌트 ///////////////////////////////////




////////////////// win-comp 뷰JS 인스턴스 생성하기 /////////////////////
new Vue({
    el: "#pbg",
    // DOM이 모두 로딩된 후 실행 구역!
    mounted:function(){
        // [ 제이쿼리 기능 구현 ]

        // 공유번호 변수
        let nowNum = 1;

        // 1. 갤러리 리스트 클릭시 큰이미지박스 보이기
        $(".grid>div").click(function(){

            // 클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src");

            // 클릭된 이미지 경로를 큰이미지에 src로 넣기
            $("#imbx img").attr("src", isrc);
            
            // 큰이미지박스 보이기
            $("#bgbx").show();
            
            // 다음/이전 이미지 변경을 위한 data-num속성 읽기
            nowNum = $(this).attr("data-num");
            console.log(nowNum);
            
        }); ///////////// click ///////////////
        
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
            $("#imbx img").attr("src", `img_gallery/${nowNum}.jpg`);

        }); ////////////////// click /////////////////


    } //////////// mounted 함수 구역 ///////////////////
}); /////////////////////// 뷰JS 인스턴스 ///////////////////////////////
