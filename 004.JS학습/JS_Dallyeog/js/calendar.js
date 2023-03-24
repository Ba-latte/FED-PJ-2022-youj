// 달력 생성자함수 /////


// 함수 호출 : 함수 안에 있는 애들은 html파일 다 로딩된 후에야 가져올 수 있는 요소들이므로 defer사용함
MakeDallyeok();
// window.addEventListener("DOMContentLoaded", MakeDallyeok);



// 앞에 키워드 new를 안쓰고 그냥 대문자로만 쓰면 일반함수가 됨
function MakeDallyeok(){

    // 선택함수 /////////////////
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);
    // 메시지 //////////////////
    const cg = x => console.log(x);

    // 1.변수 세팅 //////////////////
    // (1)변경할 현재날짜 객체
    const curr_date = new Date();
    // (2)오늘 날짜 객체
    const today = new Date();
    // (3)년도 요소 : .yearTit
    const yearTit = qs(".yearTit");    
    // (4)월 요소 : .monthTit
    const monthTit = qs(".monthTit");    
    // (5)날짜 요소 : .dates
    const dates = qs(".dates");
    
    cg(dates);

    // 2.함수 만들기 /////////////////
    // 🌷(1) 달력 초기화+구성 함수
    const initDallyeok = ()=>{
        // getMonth()정보는 항상 현재 달 숫자보다 1이 작다는 것을 유념할 것! (인덱스 순번이므로!)
        // 1.전달 마지막 날짜(옵션:0) -> 달력 전달의 끝쪽 날짜 표시 위함 (그래야...마지막 날짜로부터 몇개 구해와서 적어두지!)
        const prevLast = new Date(curr_date.getFullYear(), curr_date.getMonth(), 0);

        // 2.현재달 첫째 날짜(옵션:1->이전 달로 세팅!) -> 달력에 이전 달 세팅을 위한 요일을 구하기 위해
        const thisFirst = new Date(curr_date.getFullYear(), curr_date.getMonth(), 1);

        // 3.현재달 마지막 날짜(옵션:0) -> 현재 달력의 날짜 세팅을 위해
        const thisLast = new Date(curr_date.getFullYear(), curr_date.getMonth()+1, 0);

        // 4.년도 출력하기
        yearTit.innerHTML = curr_date.getFullYear();

        // 5.월 출력하기 : 현재 달의 숫자는 getMonth()+1임
        monthTit.innerHTML = curr_date.getMonth()+1;

        // 6.날짜 넣을 배열변수 만들기
        const dset = [];

        // 7.전달 날짜 앞쪽 채우기
        // 조건 : 현재달 첫째 날짜의 요일이 0이 아니면(=일요일이 아니면)!! 내용이 있음
        // cg(thisFirst.getDay());
        if(thisFirst.getDay() !== 0){
            // for문 세팅 : 몇바퀴 돌리니?
            for(let i = 0; i < thisFirst.getDay(); i++){
                // cg(i);
                // 반복 횟수만큼 배열 앞쪽에 추가한다
                // 전달 마지막 날짜부터! -> prevLast 변수에서 getDate하면 됨...!
                dset.unshift(`<span style="color:#ccc" class="bdt">${prevLast.getDate()-i}</span>`);
                // 🥰마지막 날짜 - i증가변수 = 앞에서부터 1씩 작아지는 숫자가 추가됨🥰
                // unshift(): 배열 앞에 값을 추가하는 메서드
            } ////////////// for ///////////////////
        } ///////////////// if ///////////////////
        
        // (2) 현재 월 삽입하기 ////////////////////////////
        // 반복문 구성 : 현재월의 1일부터 마지막 날짜까지 반복해서 배열 추가!
        // 현재 월 마지막 날짜 : thisLast.getDate()
        for(let i = 1; i <= thisLast.getDate(); i++){
            dset.push(i);
        } //////////////////// for //////////////////////////
        

        // (3) 다음달 나머지 칸 삽입하기 : 넉넉하게 2주치를 추가로 잡으려고 함! (굳이 어렵게 계산하지 말고! 나중에 화면에서는 그냥 필요 부분만 잘라서 쓸 거니까!)
        // 반복문 구성 : 1부터 2주 분량정도를 넣는다
        for(let i = 1; i < 14; i++){
            dset.push(`<span style="color:#ccc" class="bdt">${i}</span>`);
        }
        // cg(dset);

        // 화면에 뿌릴 html 변수 
        let hcode = "";

        // (4) html에 날짜 만큼 배열 정보로 세팅하기 : 날짜 뿌리기
        // 7일 * 6주 = 42개
        for(let i = 0; i < 42; i++){
            // 오늘 날짜 표시 : 연월일이 모두 일치하는 날짜에만 표시하기 (클래스 today 부여)
            if(today.getDate()===dset[i] && today.getMonth()===curr_date.getMonth() && today.getFullYear()===curr_date.getFullYear()){
                hcode += `<div class="date today">${dset[i]}</div>`;
            }
            else{
                hcode += `<div class="date">${dset[i]}</div>`;
            }
        } /////////////// for //////////////////

        // (5) 코드 화면에 넣기
        // 대상 : .dates -> dates변수
        dates.innerHTML = hcode;
        

    }; //////////////// initDallyeok //////////////////

    // 할당 함수 호출은 밑에서 호출해야 함!
    initDallyeok();

    ////////////// 🌷(2) 이전 달력 출력하기 함수 /////////////////////////////
    const prevCal = ()=>{
        // 이전 월로 변경하여 initDallyeok 함수 호출!
        // getMonth() : 월 가져오기 / setMonth() : 월 세팅하기
        curr_date.setMonth(curr_date.getMonth()-1);

        initDallyeok();
    }; //////////////////// prevCal ///////////////////////////////
    
    // 버튼에 클릭 설정하기 ///////////////////////////////////////
    qs(".btnL").onclick = prevCal;


    ////////////// 🌷(3) 다음달로 출력하기 함수 /////////////////////////////
    const nextCal = ()=>{
        // 이전 월로 변경하여 initDallyeok 함수 호출!
        // getMonth() : 월 가져오기 / setMonth() : 월 세팅하기
        curr_date.setMonth(curr_date.getMonth()+1);
        
        initDallyeok();
    }; //////////////////// prevCal ///////////////////////////////
    qs(".btnR").onclick = nextCal;
    






} /////////////// MakeDallyeok ////////////////////