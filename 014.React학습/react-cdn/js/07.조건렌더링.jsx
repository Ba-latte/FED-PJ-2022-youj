///////////////////////////////////////
// 07. 조건 렌더링 + 리스트 렌더링 JSX //
///////////////////////////////////////

// 리액트에서는 조건부로 구성요소를 렌더링 할 수 있다!

////////////////////////////////////////
// 1. if문을 사용하여 조건부 렌더링하기 //
////////////////////////////////////////


// 선택적으로 로딩하도록 컴포넌트를 2개 만들기

// 1번 컴포넌트
function MakeDev(){
    return <h1>나는 개발자야!</h1>;
} //////////////// MakeDev컴포넌트 /////////////////

// 2번 컴포넌트
function LostDev(){
    return <h1>개발자가 뭐지?</h1>;
} //////////////// LostDev컴포넌트 /////////////////


// 3번 컴포넌트
function MakeImg(props){
    return <img src={props.isrc} alt={props.ialt} />;
} ////////////// MakeImg 컴포넌트 //////////////////



// 출력 메인 컴포넌트 ///////////////////////////
// 위의 2가지 컴포넌트 중에 선택적으로 출력하기
function Developer(props){ // 호출시 전달되는 속성 props
    const isNow = props.isDev; // true/false를 가지고 들어옴
    
    
    // 조건문
    if(isNow){
        return(
            <React.Fragment>
                <MakeDev />
                <MakeImg isrc={props.isrc} ialt={props.ialt} />
            </React.Fragment>
        );
    }
    // else문 없이도 if문에 들어가면 return때문에 컴포넌트를 나감!!
    return(
        <React.Fragment>
            <LostDev />
            <MakeImg isrc={props.isrc} ialt={props.ialt} />
        </React.Fragment>
    );


} ///////////////////// Developer 컴포넌트 ///////////////////////////////////


// 이미지경로 배열
const wisrc = [
    "https://cdn.imweb.me/thumbnail/20220426/3c9de3b89f5aa.jpg",
    "https://img4.tmon.kr/cdn3/deals/2021/07/15/4500036162/original_4500036162_front_f8dfd_1626343427production.jpg",
];

// [ 컴포넌트 호출하기1 ]
ReactDOM.render(<Developer 
isDev={true} 
isrc={wisrc[0]}
ialt="히히 케이크다"/>, 
document.querySelector("#root1"));

// [ 컴포넌트 호출하기2 ]
ReactDOM.render(<Developer isDev={false}
isrc={wisrc[1]}
ialt="떡볶이는 아는데 ㅎㅎ" />, 
document.querySelector("#root2"));


/****************************************************************************************
    [ 2. if문이 아닌 조건 표현하기 ]
-조건식 && JSX 표현식
-조건이 true일때만 && 뒤의 JSX 표현식이 출력됨
****************************************************************************************/

////////////////////////////////////////
////// 2. if문이 아닌 조건 표현하기 //////
////////////////////////////////////////

// 2-1. 제목을 찍기 위한 타이틀 컴포넌트
function Title(props){
    // 컴포넌트 호출시 속성으로 tit 세팅!

    return<h1>🤗개발자가 좋아하는 {props.tit}</h1>;

} ///////////////// Title 컴포넌트 //////////////////

// https://img-cf.kurly.com/shop/data/goodsview/20220425/gv20000306582_1.jpg

// 음식 리스트
// const foods = [
//     "스파게티",
//     "짬뽕",
//     "냉면",
//     "케이크",
//     "하겐다즈",
// ];
// 👀만약 아무것도 없는 리스트가 들어온다면?
const foods = [];

// 2-2.반복 리스트를 위한 컴포넌트 //////////////////
function FoodList(props){
    // 음식명을 fname에 담아서 보내주기
    return <li>개발자는 {props.fname} 좋아해🥰</li>
} ////////////////// FoodList 컴포넌트 //////////////////


// 2-3.개발자 선호 음식 리스트 출력 컴포넌트 ///////////////
function WishList(props){ // wlist 속성에 담아서 보내주기!
    // 위시리스트 담기
    const myfood = props.wlist;

    // 코드 리턴
    return (
        <React.Fragment>
            <Title tit="음식" />
            {/* 음식 위시리스트의 길이가 0보다 클 때만 출력 (하고 싶음) */}
            {
                myfood.length > 0 &&
                <div>
                    <h2>
                        개발자가 좋아하는 음식은 모두 {myfood.length}가지 입니다.
                    </h2>
                    <ul>
                        {
                            // 배열변수.map() 메서드 사용
                            // -> map(변수=>{표현식})
                            // 변수는 화살표 함수 안으로 배열값 전달함
                            myfood.map(x=><FoodList fname={x} />)
                        }
                    </ul>
                </div>
            }
        {/* 다른 경우 출력은 별도의 JSX 출력 중괄호 구역에 코딩하기 */}
        {
            myfood.length == 0 && 
            <h2>아직 개발자음식 리스트가 업데이트 되지않았음!</h2>
        }
        </React.Fragment>
    );
} /////////////////// WishList 컴포넌트 //////////////////



// 컴포넌트 출력하기
ReactDOM.render(<WishList wlist={foods} />, document.querySelector("#root3"));



// 좀 더 복잡한 리스트를 출력하는 컴포넌트 //////////////////

// 전달할 배열변수 //
const movs = [
    {
        year:"2021",
        mtit:"영화1"
    },
    {
        year:"2022",
        mtit:"영화2"
    },
    {
        year:"2023",
        mtit:"영화3",
    },
];

// 개발자가 좋아하는 영화 - 찍기!
// 컴포넌트 구성하여 찍기

/***************************************
[ 출력 형태 ]
개발자가 좋아하는 영화
개발자가 좋아하는 영화는 최근3년간 아래와 같습니다.
021년도 영화1
2022년도 영화2
2023년도 영화3

***************************************/


