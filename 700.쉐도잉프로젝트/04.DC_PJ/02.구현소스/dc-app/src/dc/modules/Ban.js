// 배너 컴포넌트 - Ban.js


// 이 파트에서만 쓰는 CSS 임포트하기
import "../css/ban.css";
// 배너 데이터 임포트하기
import ban_data from "../data/banner";
// 제이쿼리
import $ from "jquery";



/*******************************************************************************************

    [ 🔥JS 혹은 jQuery 라우터 구현시 로드 불일치 문제 ]
-JS 기능이 들어간 페이지의 로드구역 설정시 본 페이지가 index페이지에 바로 불려질 경우엔 이 문제가 생기지 않음
-그러나 라우터로 서브 로딩 구현할 경우 이 구역은 라우터 모체가 로딩되는 것으로 실행됨
-따라서 본 모듈에 적용하려고 한 의도와 달리 본 소스에는 적용되지 않는 문제가 발생함 -> 라우터 로딩 불일치 문제

    [ 해결 방법 ]
-로딩 구역을 함수로 만들고 컴포넌트 소스 하단에서 함수를 호출하기
-주의: 로드 구역 포함해야 함
ex) 해결 방법 예시
function jqFn(){로드 구역을 포함한 소스}
function 컴포넌트명(){
    return(
        <>
            소스들
            {jqFn()} 👈 이렇게 하단에서 해당 함수 호출하면 됨
        </>
    );
}

*******************************************************************************************/

// [ 🔥로드 구역 함수화 하기 ] //////////////////////////////
function jqFn(){
    
    ///////////////// jQB ////////////////
    $(()=>{
        // 0.광클금지 변수
        let prot = 0;

        // 1. 버튼 클릭시 이동기능구현
        $(".abtn").click(function(){
            // 0. 광클 금지 설정 : prot변수가 1이라면 함수 진입 못하게 리턴시킴/아니라면 진입하고 prot변수 1로 만들어서 막아두기/일정시간이 지난 이후 다시 0으로 만들어서 진입가능하게 해주기
            if(prot) return;
            prot = 1;
            setTimeout(()=>prot=0, 400);


            // 1. 버튼 구분하기
            let isB = $(this).is(".rb");
            console.log("오른쪽버튼이야? : ", isB);
            

            // 슬라이드 타겟 설정하기 : 클릭된 버튼의 형제 요소인 .slider
            const tg = $(this).siblings(".slider");

            // 2. 분기하여 기능구현하기
            // (1) 오른쪽 버튼 클릭시 : 오른쪽에서 들어옴(left: 0 -> -100%)
            if(isB){
                tg.animate({left:"-100%"}, 400, 
                function(){
                    // 여기서 this는 tg임
                    // 첫번째 li 맨 뒤로 보내기 + 동시에 left: 0 만들기
                    $(this).append($(this).find("li").first())
                    .css({left:"0"});
                }); /////////// animate ////////////
            } ///////////// if : 오른쪽버튼인 경우 ///////////////////
            // (2) 왼쪽 버튼 클릭시 : 왼쪽에서 들어옴(left: -100% -> 0)
            else{
                // 마지막 li 맨 앞으로 이동 + 동시에 left: -100% 만들기 / 그리고 나서 left: 0 애니
                tg.prepend(tg.find("li").last())
                .css({left:"-100%"})
                .animate({left: "0"}, 400);
            } //////////// else : 왼쪽버튼인 경우 //////////////////

            // 3. 배너와 일치하는 불릿에 클래스 "on" 넣기 + 나머지는 빼기
            // 대상 : .indic li
            // eq(순번) -> 오른쪽 이동시 1, 왼쪽 이동시 0
            // isB값으로 오른쪽은 true(숫자 1로 변환됨), 왼쪽은 false(0으로 변환됨)로 이미 만들어 둠
            $(".indic li").eq(tg.find("li").eq(isB).attr("data-seq"))
            .addClass("on").siblings().removeClass("on");
            // : 순서가 바뀌는 슬라이드에 고유 순번 속성인 data-seq값을 읽어옴

        }); //////// click /////////

    }); ///////////////// jQB ////////////////

} ////////////////////// jqFn 함수 : 로드 구역 함수화하기 //////////////////////////////




// [ 반복되는 리스트 코드 생성용 컴포넌트 ] /////////////////////
function MakeList(props){
    // props.rec은 개별 레코드값(객체형식), idx는 유일키값 (뷰JS의 v-for문에서 유일키값 권고사항이었듯이 여기도 마찬가지임)

    // 리턴하기
    return(
        <li data-seq={props.idx}>
            <img className="banimg" src={props.rec["src"]} alt="배너" />
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    );
} //////////////// MakeList 컴포넌트 /////////////////////





// [ 배너 출력용 컴포넌트 ] : 메인 컴포넌트 ////////////////////////////////////
function Ban(props){
    // props.cat은 배너데이터 구분 속성명
    const sel_data = ban_data[props.cat];
    // sel_data에 담긴 값은 data/banner.js의 객체의 배열값임

    // 리턴하기
    return(
        <div className="banner">
            {/* 이동 슬라이드 */}
            <ul className="slider">
                {/* 담는 거 for문 쓰면 반복+축적해야하니까 복잡스러움!~ 그래서 맵()을 쓰는 것임 + key속성(유일키값)을 쓰기 */}
                {sel_data.map((x, i)=><MakeList rec={x} key={i} idx={i} />)}
            </ul>
            {/* 이동버튼 + 슬라이드 불릿 : 단, 슬라이드가 2장 이상일 때만 보이게 함 */}
            {
                // 조건식 && 코드 : 조건식이 true일 때 코드가 출력됨
                sel_data.length > 1 &&
                <>
                    {/* 양쪽 이동 버튼 */}
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button>
                    {/* 불릿 인디케이터 */}
                    <ol className="indic">
                        {
                            sel_data.map((x, i)=>
                                <li className={i==0?'on':''} key={i}></li>
                            )
                        }
                    </ol>
                </>
            }
            {/* JS / jQuery 로드 구역 호출! */}
            {jqFn()}
        </div>
    );
} ///////////////////// Ban 컴포넌트 //////////////////////////

// 내보내기
export default Ban;