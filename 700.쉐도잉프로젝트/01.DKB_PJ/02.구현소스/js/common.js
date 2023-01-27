// 도깨비 PJ 공통 JS - common.js //


console.log("커몬!!!!");

// 햄버거 버튼 요소 (자바스크립트 구역에서 요소를 잡아오기(?))
var ham = document.querySelector(".ham");
console.log("햄버거있니?", ham);

// 햄버거 요소에 이벤트 설정하기
ham.onclick = chgMenu;
// <button class = "ham" onclick = "chgMenu()">로 설정한 것과 동일함!
// 이퀄 오른쪽에 괄호()를 하면 함수가 바로 실행되므로 하지 말 것!!!!!!!
// 주의!! 할당하는 부분(이퀄의 오른쪽 부분)에 함수를 쓸 때 소괄호()를 쓰면, 함수가 바로 실행되어버리니까 안돼!




/**************************************************************
    함수명 : chgMenu
    기능 : 전체 메뉴 보이기/숨기기
**************************************************************/
function chgMenu(){
    // 1. 호출확인
    console.log("나야나~~");

    // 2. 대상선정(뭐를 바꿀건데?) : .top요소
    var tg = document.querySelector(".top");

    // 3. 변경할 내용 : 대상에 클래스'on'을 넣기
    tg.classList.toggle("on");
    
} //// chgMenu 함수 끝 /////////////////

/*********************************************************************
    [ JS 클래스관련하여 컨트롤하는 내장 객체 ]

(1) classList 객체
-요소에 클래스를 넣거나 빼는 등의 필요한 작업을 하는 객체

-관련 메서드
1. add(클래스명) : 클래스를 추가함
2. remove(클래스명) : 클래스를 제거함
3. toggle(클래스명) : 클래스 추가/제거함
4. contains(클래스명) : 클래스가 있으면 true / 없으면 false 반환함
5. replace(이전클래스명, 변경클래스명) : 특정 클래스를 다른 클래스로 변경해줌

-클래스 추가, 제거시에 콤마','로 구분하여 여러개의 클래스를 한번에 추가하거나 제거할 수 있다!
ex) 요소.classList.add("tt", "cc", "dd") => 한번에 tt, cc dd클래스를 추가함
ex) 요소.classList.remove("bb", "ee") => 한번에 bb와 ee클래스를 제거함

*********************************************************************/