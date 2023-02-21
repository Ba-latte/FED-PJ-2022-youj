// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

function loadFn(){
    // 0.호출 확인
    console.log("로딩 완료!");

    // 💕슬라이드 li리스트
    let slist = document.querySelectorAll("#slide>li");
    // : 잘라내기로 li순번이 뒤섞이므로 블릿 변경 매칭을 위한 고유한 순번을 '사용자정의' 속성(data-)으로  만들어주기!!

    slist.forEach((ele,idx)=>{
        // data-seq 라는 사용자정의 속성을 만들어서 집어넣기
        ele.setAttribute("data-seq",idx);
    }); ////// forEach ///////////

    // 1.대상 선정
    // 1-1.이벤트 대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");
    // console.log(abtn);
    // 1-2.변경 대상 : #slide
    const slide = document.querySelector("#slide");
    // 1-3.블릿 대상 : .indic
    const indic = document.querySelectorAll(".indic li");
    // console.log(indic);


    // 🍓4-1.광클 금지 변수 만들기
    let prot = 0;
    // : 0 - 허용 / 1 - 불허용
    // : 함수 바깥에 만들어서 상대적으로 전역변수로 만들고, 공간을 확보함

    // 2.슬라이드 변경 함수 만들기 - 할당형 함수로 만들기
    // 호출시 seq에 들어오는 값 중에서 1은 오른쪽, 0은 왼쪽임!!
    const goSlide = (seq)=>{
        // 확인
        // console.log("슬라이드고우!", seq);
        


        // 🍓4.광클 금지 설정하기
        // : 계속 쉼없이 클릭하면 이미지가 버벅거리면서 잘 안넘어가진다! 그걸 방지하기 위함!!
        // how)방문 잠그고 못들어오게 해주면 됨! -> 못들어가 돌아가! -> 리턴!
        console.log("못들어갔어!!!!!");
        // 🍓4-2.광클금지 설정하기
        if(prot) return;
        prot = 1;
        // if문으로 제어해서 한명만 들어가구 바로 방문을 잠가버려!
        console.log("난 들어왔어!!!");
        // 정해진 시간이 지난 후 (슬라이드 넘어가는 트랜지션 시간이 지난 후), 다시 방문 열어주기!
        setTimeout(() => {
            prot = 0;
            // 방문 열어주기!
        }, 400);
        // tip) 그리고 시간같은건 바뀔 수 있으니까 변수로 처리해주면 더 굿굿~!



        // 2-0.현재의 슬라이드 li 수집하기
        let clist = slide.querySelectorAll("li");
        // : clist : current list 현재 리스트 의미함

        // 2-1. 방향에 따른 분기
        // 2-1-1. 오른쪽 버튼 클릭시 : seq===1
        if(seq){
            
            // 확인
            console.log("오른!");

            // (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            // 나타나도록 슬라이드 박스의 left값을
            // -100%로 변경시킨다.
            slide.style.left = "-100%";
            // 📢->> 딱 한번만 이동하게 세팅해두기
            slide.style.transition = "left .4s ease-in-out";
    
    
            // (2) 슬라이드 이동후!!! 
            setTimeout(()=>{
                // : 0.4초 지나고 슬라이드가 이동한 후 말함
                
                // (2-1)바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨뒤로 보낸다!
                slide.appendChild(clist[0]);
    
                // (2-2)동시에 left값을 0으로 변경한다!
                slide.style.left="0";
    
                // (2-3)밖의 첫번째 li를 잘라서 맨뒤로 보내면서 동시에 left값을 0으로 바꾸는걸...이렇게 움직이는 걸 굳이 보여줄 필요 없기 때문에 트랜지션을 없애주면 됨
                slide.style.transition = "none";
    

            },400); /////////////////// 타임 아웃 끝 ///////////////////
        } ////////////////////// if문 : 오른쪽 클릭시 /////////////////////////////
        
        // 2-1-2. 왼쪽 버튼 클릭시 : seq===0
        else{

            // 확인
            console.log("왼!");

            // (1) 왼쪽버튼 클릭시 이전 슬라이드가 나타나도록 하기위해 우선 맨뒤 li를 맨앞으로 이동한다 
            // slide.insertBefore(넣을놈, 넣을놈전놈);
            // slide.insertBefore(맨끝 li, 맨앞 li);
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            
            // (2) 동시에 left값을 -100%로 변경한다.
            slide.style.left = "-100%";
            // : 안 튀게 만들기 위함
            // ->>이때 트랜지션도 없애줘야, 바깥쪽에서는 트랜지션이 없어서 팍팍 튀지 않는다;;
            // (처음에만 없지, 한번 실행후부터는 생기므로.....)
            slide.style.transition = "none";

            // (3) 그 후 left값을 0으로 애니메이션하여 슬라이드가 왼쪽에서 들어온다.
            // slide.style.left = "0";
            // : 이렇게 해두면 너무 빛으 속도로...해서.. 변함이 없어보여;; 그래서 코딩공간을 구분하면! 그러면 조금이라도 시차가 생김!! -> 이때 사용하는 게 setTimeout이래!
            // 📢📢쌤왈: 동일 속성인 left가 같은 코딩 처리 공간에서 동시에 있으므로, 이것을 분리해야 효과가 있다! 이때 쓰는게 setTimeout임!!
            setTimeout(()=>{
                slide.style.left = "0";
                slide.style.transition = "left .4s ease-in-out";
            }, 0); ///////////////////// 타임 아웃 ////////////////////////////

        } //////////////////////// else문 : 왼쪽 클릭시 //////////////////////////////////


        // 5.현재 슬라이드 순번과 같은 불릿 표시하기
        // 대상 : .indic li -> indic 변수
        // indic[순번].classList.add("on")
        // 현재 순번을 모르겠으니까 ㅋㅋㅋ 현재 순번 콘솔에 찍어보기
        // 5-1.현재 배너 리스트 업데이트 하기!!
        clist = slide.querySelectorAll("li");
        // 오른쪽 클릭시 두번째 슬라이드[1] -> 즉 (seq===1)
        // 왼쪽 클릭시 첫번째 슬라이드[0] -> 즉 (seq===0)
        // ->>>>> seq순번과 읽어올 슬라이드의 순번이 일치한다!!

        // 5-2.방향별로 읽어올 슬라이드를 순번으로 "data-seq"값 읽어오기
        let cseq = clist[seq].getAttribute("data-seq")
        console.log("현재 순번: ", cseq);


        // 5-4.블릿 초기화하기
        for(let x of indic) x.classList.remove("on");

        // 5-3.읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on")




    }; //////////////// goSlide 함수 끝 /////////////////////

    // 3.대상에 이벤트 설정하기
    // : abtn버튼 클릭하면 
    abtn.forEach((ele, idx)=>{
        ele.onclick = ()=>{
            goSlide(idx);
        }; //////////// onclick 끝 ///////////////
    }); //////////////////////// forEach 끝 /////////////////////////////

} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////