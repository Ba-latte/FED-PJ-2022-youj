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
    return <img src={props.isrc} alt={props.ialt} title={props.ialt} />;
} ////////////// MakeImg 컴포넌트 //////////////////



// 출력 메인 컴포넌트 ///////////////////////////
// 위의 2가지 컴포넌트 중에 선택적으로 출력하기
function Developer(props){ // 호출시 전달되는 속성 props
    const isNow = props.isDev; // true/false를 가지고 들어옴
    
    
    // 조건문 : isNow를 if문으로 조건을 걸어 분기하여 각 경우에 각기 다른 컴포넌트를 선택하여 출력하도록 함
    if(isNow){
        return(
            <React.Fragment>
                {/* MakeDev 컴포넌트 선택 출력함 */}
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

// 👀음식 리스트!!
const foods = [
    "스파게티",
    "짬뽕",
    "냉면",
    "케이크",
    "하겐다즈",
];
// 👀만약 아무것도 없는 리스트가 들어온다면?
// const foods = [];

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
            {/* 경우1) 음식 위시리스트의 길이가 0보다 클 때만 출력 */}
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
        {/* 경우2) 다른 경우 출력은 별도의 JSX 출력 중괄호 구역에 코딩하기 */}
        {
            myfood.length == 0 && 
            <h2>아직 개발자음식 리스트가 업데이트 되지않았음!</h2>
        }
        </React.Fragment>
    );
} /////////////////// WishList 컴포넌트 //////////////////



// 컴포넌트 출력하기
ReactDOM.render(<WishList wlist={foods} />, document.querySelector("#root3"));





////////////////////// [ 좀 더 복잡한 리스트를 출력하는 컴포넌트 ] ///////////////////////////////////////

// 전달할 배열변수 //
const movs = [
    {
        year:"2021",
        mtit:"알라딘"
    },
    {
        year:"2022",
        mtit:"범죄도시2"
    },
    {
        year:"2023",
        mtit:"아바타2",
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


// 2-2.반복 리스트를 위한 컴포넌트 //////////////////
function MovieList(props){
    // year-영화개봉년도 / mname-영화명
    return <li>{props.year}년도 {props.mname}😀</li>
} ////////////////// MovieList 컴포넌트 //////////////////

// 2-3.개발자 선호 영화 리스트 출력 컴포넌트 ///////////////
function WishList2(props){ // wlist 속성에 담아서 보내주기!
    // 위시리스트 담기
    const mymv = props.wlist;

    // 코드 리턴
    return (
        <React.Fragment>
            <Title tit="영화" />
            {/* 경우1) 영화 위시리스트의 길이가 0보다 클 때만 출력 */}
            {
                mymv.length > 0 &&
                <div>
                    <h2>
                        개발자가 좋아하는 영화는 최근 {mymv.length}년간 아래와 같습니다.
                    </h2>
                    <ul>
                        {
                            // 배열변수.map() 메서드 사용
                            // 배열값으로 객체가 들어가 있으므로 각 배열값은 객체의 속성으로 지정함
                            // x.year, x.mtit
                            mymv.map(x=><MovieList year={x.year} mname={x.mtit} />)
                        }
                    </ul>
                </div>
            }
        {/* 경우2) 다른 경우 출력은 별도의 JSX 출력 중괄호 구역에 코딩하기 */}
        {
            mymv.length == 0 && 
            <h2>아직 개발자 영화 리스트가 업데이트 되지않았습니다😒</h2>
        }
        </React.Fragment>
    );
} /////////////////// WishList2 컴포넌트 //////////////////


// 컴포넌트 출력하기
ReactDOM.render(<WishList2 wlist={movs} />, document.querySelector("#root4"));



/****************************************************************
    3. 조건 연산자(삼항 연산자)를 사용하여 조건부 랜더링하기
****************************************************************/

// 명화 데이터
const worksrc = {
    "피카소":"https://m.theartin.net/web/product/big/201907/30c5a0fdd153bfdfdc8f19b2f4166fa8.jpg",
    "모네":"https://dimg.donga.com/wps/NEWS/IMAGE/2015/12/11/75316598.3.jpg"
};

// 개발자가 좋아하는 그림(명화) 찍기

// 3-1. 타이틀과 그림 찍기 컴포넌트 /////////////////////
// 구성 : 작가이름 + 작품이미지
// 데이터 : 작가이름(painter), 이미지경로(작가이름의 객체 worksrc 이용), 작품명(wname)
function MakeWork(props){
    return(
        <div>
            <h2>{props.painter}</h2>
            <img src={worksrc[props.painter]} alt={props.wname} style={{width:"400px"}} title={props.wname} />
        </div>
    );
} /////////////// MakeWork 컴포넌트 ///////////////////

// 3-2. 전체 출력 컴포넌트 //////////////////////////
// 구성 : 전체 타이틀(Title 컴포넌트) + 변경버튼 + 작가와 그림 출력(MakeWork 컴포넌트)
// 특이사항 : 변경버튼 클릭시 MakeWork 컴포넌트의 데이터를 변경하여 다시 출력하도록 함
function ExpComp(props){ // isChg는 true/false값 받는 속성임
    // [ 🥰후크를 사용한 상태변수로 만들기 ]
    const [result, setResult] = React.useState(props.isChg);

    // 🥰원래 : let result = props.isChg;
    // isChg 속성은 true/false 데이터를 전달하여 MakeWork 컴포넌트의 변경 여부를 결정함

    // result에 담긴 true/false값을 반대로 전환하기 : 한번은 피카소,한번은모네 이렇게 토글처럼 전환되게 함
    const again = ()=>{
        // [ 🥰후크 상태변수의 업데이트는 set변수를 사용함 ]
        setResult(!result);

        // 🥰원래 : result = !result;

        console.log("result값 반대로 전환하기: ", result);
    }; ////////////// again 함수 ///////////////////


    // 리턴은 맨 마지막에
    return (
        <React.Fragment>
            {/* 1.큰제목 */}
            <Title tit={"명화"} />
            
            {/* 2.변경 버튼 : 클릭시 again함수를 호출함 */}
            <button onClick={again}>작가변경!!!</button>

            {/* 3.작품 출력 : 삼항연산자로 작품변경하기 */}
            {
                result ? <MakeWork painter="피카소" wname="우는 여인" /> : <MakeWork painter="모네" wname="양산을 쓴 여인" />
            }
        </React.Fragment>
    );
} //////////////////// ExpComp 컴포넌트 ///////////////////


// 컴포넌트 출력하기
ReactDOM.render(<ExpComp isChg={false} />, document.querySelector("#root5"));


/***************************************************************************************

    [ 리액트 훅크 : React Hook ]
-일반적으로 리액트에 사용되는 변수는 처음에 컴포넌트에 전달돼서 초기 세팅에 활용됨
-그런데 이 변수가 변경될 경우 컴포넌트에 변경이 자동적으로 이루어지지 않음
-이런 종류의 변수 업데이트가 가상DOM과 실제 DOM에 바로 반영되도록 실시간으로 감시하는 역할을 하는 리액트의 기술내용을 담고 있는 것이 Hook임

1.목적 : 어떤 특정 데이터가 변경될 때 이 데이터를 할당하여 사용하고 있는 컴포넌트의 변경이 반영되도록 하고자 할 때 Hook를 사용함
2.구현 방법 :
    1) 노드JS SPA 개발환경에서는 상단에 import useState 를 함
    -> CDN 환경에서는 React.useState 를 사용함
    2) 코딩 방법 : useState() 메서드 사용하기
        배열변수 = useState(초기값)
        -> CDN 에서는 배열변수 = React.useState(초기값)

        -일반형
        const [변수명, set변수명] = useState(초기값)
        -> set변수명 작성시 변수명 첫글자를 대문자로 쓰면 됨
        ex) 변수명이 myname이라면 setMyname 이라고 쓰면 됨

        -> set변수명(값) : 메서드형태로 후크변수의 값을 세팅함

    3) 작동 원리
    -useState에 쓴 초기값이 배열변수 첫번째 변수에 할당됨
    -코드에서 set변수명에 값을 할당하면 useState메서드가 이것을 체크하여 이 변수를 사용한 다른 부분의 업데이트를 실행함
    -예컨대 컴포넌트 내부에 사용한 경우, 컴포넌트가 업데이트됨

    4) 사용 결과
    -별도의 메서드 호출 없이 후크 상태변수를 사용한 곳이 자동으로 변경될 때마다 다시 갱신되는 것을 확인할 수 있음
    ->뷰JS의 리액티브 데이터와 매우 유사함

***************************************************************************************/
