// 3D 태양계 JS - solar3D.js //////// 


window.addEventListener("DOMContentLoaded", ()=>{

    // 호출 완료
    console.log("로딩 완료!");

    /**********************************************************************
        [ 구현 내용 ]
    -축소/확대 버튼을 클릭하면 표기된 배율만큼 태양계 전체를 축소/확대 적용한다
    -이때 클릭된 메뉴는 오버시 변경색을 유지한다

    **********************************************************************/

    // 1.대상선정
    // 이벤트 대상: 축소/확대 메뉴 a요소들 (.tit a)
    const menu = document.querySelectorAll(".tit a");

    // 변경 대상: 태양계 전체를 감싸고 있는 부모요소(.scbx)
    const scbx = document.querySelector(".scbx");

    // console.log(menu, scbx);

    // 2.이벤트 함수 세팅하기
    for(let x of menu){
        // x는 메뉴 각각의 a임
        x.onclick = ()=>{

            // 1.버튼 텍스트 읽어오기
            let btxt = x.innerText;

            // 2.문자데이터 가공하기
            // 내용 : "x 배율" -> x띄어스기 부분을 없앰
            // 문자대체 내장함수 -> replace(바꿀 문자, 바뀔 문자)
            btxt = btxt.replace("X ", "");
            
            console.log(btxt);

            // 3. 배율 적용하기
            // 변경 대상 : scbx변수
            scbx.style.transform = `scale(${btxt})`;

            // 4. 클릭된 메뉴에 클래스 "on" 넣기
            
            // 4-1. 모두 초기화 해놓기
            menu.forEach((ele)=>{
                ele.classList.remove("on");
            });

            // 4-2. 해당 메뉴에만 클래스 넣기
            x.classList.add("on");


        }; //////////////// click 끝 ///////////////////////
    } ///////////////////// for of문 끝 //////////////////////
    


}); ////////////////////// 로드 구역 ////////////////////////