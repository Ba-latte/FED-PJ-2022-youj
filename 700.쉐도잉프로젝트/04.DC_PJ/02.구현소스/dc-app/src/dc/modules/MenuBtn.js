// 메뉴 버튼 모듈 JS - MenuBtn.js

// 여기서 쓸 것들만 import 하기
import $ from 'jquery';
import '../css/menubtn.css';
import {Link} from 'react-router-dom';
import menubtn_data from '../data/menubtn';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////


function MakeSlide(props){
    return(
        <>
            <div>
                <div className="imbx">
                    <img src={props.rec["isrc"]} alt="배너이미지" />
                </div>
                <div className="titbx">
                    <h3>{props.rec["tit"].split("^", 1)}</h3>
                    <h2>{props.rec["tit"].split("^", 2)}</h2>
                </div>
                <div className="btnbx">
                    {/* 라우터를 이용한 이동은 반드시 Link를 사용하자! */}
                    <Link to={props.rec["link"]}>
                        <button>{props.rec["btn"]}</button>
                    </Link>
                </div>
            </div>
        </>
    );
}



// 컴포넌트
function MenuBtn(props){

    // 데이터
    const sel_data = menubtn_data;

    return(
        <>
            <section className="menubtn">
                {sel_data.map((x, i)=><MakeSlide rec={x} idx={i} key={i} />)}
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// MenuBtn //////////////////


// 내보내기
export default MenuBtn;