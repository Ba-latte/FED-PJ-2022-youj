// 06.Event JSX

/************************************************************* 
    [ 리액트 이벤트 ]
    1. 일반 HTML DOM 이벤트와 마찬가지로 사용자이벤트 사용가능함
    2. 이벤트 종류: click, change, mouseover 등 일반이벤트
    3. 이벤트 표기법: 캐믈케이스 - 첫글자소문자 단어마다 대문자
    예) onclick -> onClick
    4. 이벤트 핸들러 : 중괄호 안에 작성(중괄호는 JSX표현식영역)
    예) onclick="getIt()" => onClick={getIt}
*************************************************************/


///////////////// [ 전체 이벤트를 적용할 컴포넌트 구성하기 ] /////////////////////
function EventShow(){

    // 컴포넌트에서 사용하는 내부용 함수는 할당형 함수로 작성하기(할당형 익명함수)
    // 1. 소원이 무엇이냐 실행 함수 //////////////////////////
    const aladin = (lamp)=>{
        // lamp-알라딘 주인공 이미지 경로
        console.log("aladin함수: ", lamp);
        // 1. #tbox인 요소의 내부에 h1 요소 넣기
        document.querySelector("#tbox").innerHTML += `
            <h1 class="tit">소원이 무엇이냐?</h1>
        `;

        // 2. 소원이 무엇이냐 타이틀박스 CSS 구성하기
        let tit = document.querySelector(".tit");
        tit.style.cssText = `
            width: 50%;
            padding: 50px 0;
            margin: 0 auto;
            border: 2px solid lime;
            transition: all 2s 1s;
            opacity: 0;
        `;

        // 이런식으로 쓸 수도 있음! (주된 방식은 아님)
        setTimeout(()=>{
            tit.style.cssText = `
                width: 50%;
                padding: 50px 0;
                margin: 0 auto;
                border: 2px solid lime;
                transition: all 2s 1s;
                opacity: 1;

                border-radius: 50%;
                transform: translateY(-200px);
                font-size: 40px;
                color: white;
                background-color: rgba(0, 0, 0, .5);
            `;
        }, 500); ////////// setTimeout /////////////

        // 3. 램프 가져오기 버튼을 3초 뒤에 보이게 만들기
        setTimeout(()=>{
            document.querySelectorAll("button")[0].style.display="inline-block";
        }, 3000);

        // 4. 별도의 요소인 #ala에 이미지 생성하는 컴포넌트 출력하기
        ReactDOM.render(<AlaLamp isrc={lamp} />, document.querySelector("#ala"));



    }; //////////// aladin 함수 //////////////

    // 2. 램프 가져오기 함수 ////////////////////////////
    const getIt = ()=>{
        // (1)램프 선택 : 컴포넌트 구성요소에 넣음
        let lamp = document.querySelector(".lamp");

        // (2)램프 이미지 넣기
        lamp.innerHTML = `
            <img src="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3168457870/B.png" alt="램프" />
        `;

        // (3)램프 초기 세팅 및 애니메이션 설정하기
        lamp.querySelector("img").style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            width: 200px;
            border-radius: 50%;
            transition: 2s;
        `;
        setTimeout(()=>{
            lamp.querySelector("img").style.cssText = `
                position: absolute;
                top: 310px;
                right: calc(50% - 100px);
                width: 200px;
                border-radius: 50%;
                transform: rotate(720deg);
                transition: 2s ,right 1s 2s;
            `;
        },500);
        
        // (4)소원빌기 버튼을 3초 뒤에 보이게 만들기
        setTimeout(()=>{
            document.querySelectorAll("button")[1].style.display="inline-block";
        }, 3000);


    }; /////////////////// getIt 함수 ////////////////////////


    // 3. 소원빌어 페라리 얻기 함수 ////////////////////////////
    const getIt2 = (ss)=>{
        // ss-페라리 이미지 경로

        // 이미 만들어져있는 #ferrari의 루트를 만들고, 그걸 랜더링하는 방법으로도 사용 가능함
        const ferrari = ReactDOM.createRoot(document.getElementById("ferrari"));
        // Ferrari컴포넌트 호출함!
        ferrari.render(<Ferrari isrc={ss} />);

    }; /////////////////// 소원빌어 페라리 얻기 함수 //////////////////



    // 컴포넌트의 리턴은 가장 아래쪽에 위치함 (리턴을 만나는 순간 돌아가기 때문에 리턴을 마지막에 쓰는 것)
    return(
        <React.Fragment>
            <div id="tbox" style={{textAlign:"center"}}>
                {/* 소원을 말해봐 이미지 출력 : onmouseover 이벤트 적용 */}
                <img src="https://images.chosun.com/resizer/SFIqPKffr3HQHoHFOxKvnN-L2YU=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NVMCI5M33KHBCY4JVHDPWRCBYY.jpg" alt="지니" onMouseOver={()=>{
                    aladin("./images/ala4.jpg");
                }} />
            </div>
            
            {/* 램프가 들어갈 요소 */}
            <div className="lamp"></div>

            {/* 버튼들 */}
            <button onClick={getIt}>램프 가져오기😎</button> <br />
            {/* 파라미터를 보내는 함수 호출하려면 익명함수를 만들고 그 함수영역 안에서 파라미터를 넣은 함수 호출해야함 */}
            <button onClick={()=>{getIt2("https://www.pngplay.com/wp-content/uploads/13/Ferrari-458-Transparent-PNG.png")}}>소원 빌기~! 페라리 주세요~!</button>
        </React.Fragment>
    );
} ///////////// EventShow 컴포넌트 //////////////////


////////// [ 알라딘 램프 이미지 출력 컴포넌트 ] //////////////////////
function AlaLamp(props){
    // 이미지 경로를 props로 받기
    return <img src={props.isrc} alt="알라딘 램프" />;

} //////////////// AlaLamp 컴포넌트 /////////////////


////////// [ 페라리 이미지 출력 컴포넌트 ] //////////////////////
function Ferrari(props){
    return (
        <img id="car" src={props.isrc} alt="페라리" title="클릭하면 시운전해요🚗" onClick={move} />
    );
} //////////////// Ferrari 컴포넌트 /////////////////


// 일반 함수로 구현한 페라리 움직이기 ////////////
let one = 1;
function move() {
    console.log(one);
    let car = document.getElementById("car");

    // 삼항연산자로 왔다갔다하면서 트랜지션함
    car.style.transform = one ? "translateX(150%) scale(2)" : "translateX(0) scale(1)";
    car.style.transition = "2s ease-in-out";

    one?one=0:one=1;
} ///////////// move함수 ///////////////////




///////// [ 최초 컴포넌트 출력하기 ] /////////////////
ReactDOM.render(<EventShow />, document.querySelector("#root"));