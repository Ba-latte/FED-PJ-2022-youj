// 배너 컴포넌트 - Ban.js


// 이 파트에서만 쓰는 CSS 임포트하기
import "./css/ban.css";
// 배너 데이터 임포트하기
import ban_data from "./data/banner";


// [ 반복되는 리스트 코드 생성용 컴포넌트 ] /////////////////////
function MakeList(props){
    // props.rec은 개별 레코드값(객체형식), idx는 유일키값 (뷰JS의 v-for문에서 유일키값 권고사항이었듯이 여기도 마찬가지임)

    // 리턴하기
    return(
        <li>
            <img className="banimg" src={props.rec["src"]} alt="배너" />
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    );
} //////////////// MakeList 컴포넌트 /////////////////////



// [ 배너 출력용 컴포넌트 ] ////////////////////////////////////
function Ban(props){
    // props.cat은 배너데이터 구분 속성명
    const sel_data = ban_data[props.cat];
    // sel_data에 담긴 값은 data/banner.js의 객체의 배열값임

    // 리턴하기
    return(
        <div className="banner">
            <ul className="slider">
                {/* 담는 거 for문 쓰면 반복+축적해야하니까 복잡스러움!~ 그래서 맵()을 쓰는 것임 + key속성(유일키값)을 쓰기 */}
                {sel_data.map((x, i)=><MakeList rec={x} key={i} />)}
            </ul>
        </div>
    );
} ///////////////////// Ban 컴포넌트 //////////////////////////

// 내보내기
export default Ban;