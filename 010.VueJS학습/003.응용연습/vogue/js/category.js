// 보그 PJ 카테고리 페이지 JS - category.js //////

// 🌷1.넘어온 url 받기 : 넘어온 url은 로딩구역 밖에서 받아도 된다!
let pm = location.href;
// : location.href이 이퀄(=)의 오른쪽에 있으면 url주소를 읽어온다!
// : 여기서 "pm"은 parameter의 줄임말로 쓰셨음~ (전달값 변수 의미!)

// 만약 메뉴를 클릭해서 열어서 파라미터가 없는 경우, 물음표로 구분하여 없으면 돌려보내기!
if(pm.indexOf("?") === -1){
    // -1은 없는 경우를 나타냄
    location.href = "index.html";
} ////////////////////// if : 물음표가 없는 경우 /////////////////////////////
// console.log("물음표 위치: ",pm.indexOf("?"));

// 2.문자열 잘라서 값으로 읽어오기
// : 위에 let pm에 할당할때 href의 바로 뒤에서... split()을 써서 잘라서 쓸 수는 없음!
// : 물음표로 잘라서 두번째 값, 이퀄로 잘라서 두번째 값을 가져오는 것임
pm = pm.split("?")[1].split("=")[1];

// 3.pm값 특수문자 복원하기 : 디코딩하기!
pm = decodeURIComponent(pm);

// 4.호출확인
console.log(pm);


////////////////////////////////////// jQB 로딩 구역 ////////////////////////////////////////
$(()=>{
    console.log("jQB 로딩 완료");


    // 뷰JS 데이터 바인딩 코드 /////////////////////
    new Vue({
        // 대상 선정 : 메인 컨텐츠 영역 요소
        el: "#cont",
        data: {
            items: {}, // 제이슨 데이터 루트에 맞춰 중괄호{}를 씀
            // 파라미터로 넘어온 값을 경로값과 비교하기 위해 뷰js 데이터 변수로 세팅한다!
            catName: pm.replace(" & ", "-")
        },
        mounted: function(){
            // 엑시오스로 제이슨 연결하여 데이터 가져오기
            axios.get("./js/mdata.json").then(x=>this.items = x);
        }
    }); /////////////////// Vue ///////////////////////////

}); //////////////////////////// jQB /////////////////////////////////////