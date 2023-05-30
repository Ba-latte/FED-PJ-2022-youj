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