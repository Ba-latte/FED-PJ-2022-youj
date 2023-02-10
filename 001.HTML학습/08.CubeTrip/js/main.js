// 큐브트립 메인 JS ///////////////////////

/***********************************************************
    [ 구현 요구사항 ]
-도시별 메뉴 버튼을 클릭시, 큐브가 회전한 후
해당 도시의 데이터와 큐브의 도시를 매칭하여 정보를 화면에 출력한다.
***********************************************************/

// 🌷로딩구역 만들기 //////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", loadFn);
function loadFn(){
    // 호출
    console.log("로딩완료!");

    // 🌷1. 대상 선정
    // 1-1. 이벤트 대상 : .city a
    const menu = document.querySelectorAll(".city a");
    // 1-2. 변경 대상1 : .cube (큐브)
    const cube = document.querySelector(".cube");
    // 1-4. 변경대상3 : .cname (도시명)
    const cname = document.querySelector(".cname");
    // 1-5. 변경대상4 : .cinfo (도시정보)
    const cinfo = document.querySelector(".cinfo");
    // 1-6. 변경대상5 : .cbx (도시설명 박스)
    const cbx = document.querySelector(".cbx");

    // 1-7. 호출 확인
    // console.log(btns, cube, cbx);

    // 🌷2. 메뉴에 클릭 이벤트 설정하기 - for of문 돌며 메뉴의 텍스트 읽어오기
    for(let x of menu){ // x는 menu 각각의 a요소

        // 2-1. 클릭 이벤트 설정하기
        x.onclick = () => {


            // 🌷7. 도시정보 박스 숨기기 (트랜지션 없애주기!!!!!) - 초기화시키라는 뜻임
            cbx.style.opacity = "0";
            cbx.transition = "none";
            // 도시정보 부분에 스크롤이 생길 경우, 아래까지 내려서 본 다음에 다른 도시로 가면 스크롤위치가 내려가 있는 문제 발생
            // -> 그래서 스크롤 위치 맨위로 셋팅하기
            cinfo.scrollTo(0,0);
            // : scrollTo(가로스크롤위치,세로스크롤위치) -> 스크롤 이동 메서드!

            // 2-2. 메뉴 텍스트 읽기
            let mtxt = x.innerText;
            // console.log(mtxt);

            // 2-3. 회전값 세팅하기 - 변수 만들어서 거기에 회전(rotate) 넣기
            // 회전값 변수
            let setval;

            // switch문으로 각 케이스에 맞게 회전값 넣어서 회전시키기
            switch(mtxt){
                case "출발": setval = "rotateX(0deg) rotateY(0deg)" ; break;
                case "서울": setval = "rotateX(-90deg) rotateY(-360deg)" ; break;
                case "런던": setval = "rotateX(360deg) rotateY(-90deg)" ; break;
                case "베를린": setval = "rotateX(-360deg) rotateY(90deg)" ; break;
                case "파리": setval = "rotateX(720deg) rotateY(-180deg)" ; break;
                case "뉴욕": setval = "rotateX(450deg) rotateY(360deg)" ; break;
                default: setval = "rotateX(0deg) rotateY(0deg)";
                /* : 무조건 양쪽 방향 전부 다 돌게 하려고 같은 값을 하나도 안 겹치게 만들어둠! */
            } /////////////////// switch문 끝 /////////////////

            // switch문 호출 확인
            // console.log(mtxt + " : " + setval);

            // 🌷3. 회전값 적용하기 (transform에 setval변수값을 할당하면 됨)
            cube.style.transform = setval;
            // 3-1. 트랜지션을 줘서 움직임 적용시키기 (안그러면 그자리에서 바뀜)
            cube.style.transition = "transform 1.5s ease-in-out";

            // 🌷5. 만약! "출발"을 클릭한 경우, 'data.js'파일에 관련 데이터가 없어서 'undefined'가 뜸!!
            // -> 그래서, 출발을 클릭했을 때는 밖으로 빠져나가게 만들어야 함
            // 즉! 아래의 코드를 실행하지 않도록 만들기 - if문 활용
            if(mtxt==="출발"){
                return;
            }

            // 🌷4. 도시 정보 세팅하기
            // : data.js에 세팅된 객체의 속성값이 메뉴의 도시명과 동일함!
            // -> 따라서 이 속성명으로 속성값을 가져와서, 도시정보를 아래 요소에 세팅한다!
            // 변경대상1 : .cname (도시명 -> mtxt변수에 있음)
            // 변경대상2 : .cinfo (도시정보 -> city[mtxt]에 있음)
            // -> innerText로 할당하면 됨
            // ->>>> 이런 걸 '데이터 바인딩'이라고 한다!
            
            // 4-1. 콘솔에 호출확인
            // console.log(city[mtxt]);

            // 4-2. 도시명 넣기
            cname.innerText = mtxt;

            // 4-3. 도시정보 넣기
            cinfo.innerText = city[mtxt];
            console.log(cinfo);

            // 🌷6. 도시 정보 박스 보이기
            // 6-1. 대상 : .cbx
            // 6-2. 내용 : 큐브가 1.5초간 회전한 후에 도시정보 박스가 보여야 한다
            // -> 따라서, 1.5초 후에 코드를 실행하면 된다!
            // ->>setTimeout(함수, 시간)
            setTimeout(()=>{
                // cbx.style.opacity = 1;
                // : 이렇게 숫자로 줘도 나오긴 하지만, 헷갈릴 수 있으니까 그냥 문자로 감싸주자!
                cbx.style.opacity = "1";
                // : 이것만 주니까 너무 팍! 나타나서 안 이쁘니까 트랜지션을 주기로 한다
                cbx.transition = "opacity .8s ease-in-out";
            }, 1500);


        }; ///////////////// click 이벤트 함수 끝 ///////////////////
    } ///////////////////////// for of문 끝 ////////////////////////////
    
} ////////////////////// loadFn 함수 끝 ////////////////////////