// 05.Props JSX

/********************************************************** 
    [ 리액트 Props ]
    1. 리액트 구성요소에 전달되는 인수다!(전달변수)
    2. HTML 속성을 통해서 구성요소에 전달된다
    3. props는 속성이다.
    4. JS 함수에 셋팅되는 전달변수와 HTML속성과 동일함
    5. 컴포넌트로 보내기 위해서는 HTML속성과 동일한 구문사용
**********************************************************/



// [ 자기차를 소개하는 컴포넌트 1 ] ///////////
function Car(props){
    // 일반함수에서는 전달 변수를 여러개 썼으나 컴포넌트에 전달하는 props는 하나로 여러개 사용 가능함
    // 사용법 : props.속성명
    return(
        <React.Fragment>
            <h2>나의 차는 {props.brand}입니다!</h2>
        </React.Fragment>
    );
} /////////////// Car 컴포넌트 ////////////





// [ 자기차를 소개하는 컴포넌트 2 ] //////////
function Car2(props){
    return(
        <React.Fragment>
            <h2>
                모델명은 {props.brand.model}이고 차 색은 {props.brand.color}입니다.
            </h2>
            <img src="./images/ray.png" alt="레이" style={props.brand.opt} />
            {/* 인라인으로 스타일 넣을 때 style={}안에다 써야하고, 그 안은 객체 형식으로 들어가기 때문에 {속성:값}형식으로 넣어야 함! (즉, 중괄호 2번임!) */}
            {/* 
                인라인 스타일시트 넣기 형식 : 
                <태그 style={{객체형식 CSS}}
                ->값은 문자형으로함! {속성:"값"}
            */}
        </React.Fragment>
    );
} //////////// Car2 컴포넌트 ////////////


// [ 위의 두가지 차 소개 컴포넌트를 하위 컴포넌트로 구성하여 새로운 자동차 브랜드 소개 질문-답변형 컴포넌트를 새롭게 구성함 ]

// 차 종류를 물어보고 답하는 컴포넌트 만들기 -> Car 컴포넌트 사용!
function Brand(){
    return(
        <React.Fragment>
            <h1>당신의 차는 무엇이죠?</h1>
            <Car brand="기아 레이" />
            {/* 다른 컴포넌트를 삽입한다! */}
        </React.Fragment>
    );
} /////////// Brand 컴포넌트 /////////////////


// [ 차 정보를 자세히 물어보는 컴포넌트 - Car2 사용! ] ////////////////////////////
function Brand2(props){
    // return 전에 코드를 여러가지로 만들어둔다 : 컴포넌트 안에서 필요한 데이터 가지고 들어오고 그거 요리해서 리턴할 때 사용해~ 라고 하는 방식이 많음!!!!
    // 즉 컴포넌트별로 블록화되어 있음!!!

    // 속성을 객체로 여러개 세팅하기
    const carInfo = [
        {
        color:"라잇블루",
        model:"2023년형",
        opt:{filter:"hue-rotate(0deg)"}
        },
        {
        color:"녹차그린",
        model:"2024년형",
        opt:{
                filter:"hue-rotate(207deg)",
                transform:"rotateY(180deg)"
            },
        },
    ];


    return(
        <React.Fragment>
            <h1>더 자세히 말씀헤 주시겠어요?😒</h1>
            <Car2 brand={carInfo[props.num]} />
        </React.Fragment>
    );
} //////////////// Brand2 컴포넌트 ////////////////////





// [ 랜더링하기 ] //////////////
ReactDOM.render(
    <div>
        <Brand />
        <Brand2 num="0" />
        <Brand2 num="1" />
    </div>,
document.querySelector("#root1"));
// 컴포넌트를 호출시 속성값으로 객체를 사용하려면 중괄호{}안에 객체명을 써줘야함
// 리액트에서 중괄호{}는 표현식 구역임!


