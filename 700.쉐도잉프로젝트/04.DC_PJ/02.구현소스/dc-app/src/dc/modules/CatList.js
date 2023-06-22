// CatList 모듈 JS - CatList.js

import $ from 'jquery';
import '../css/catlist.css';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function CatList(props){
    // 선택 데이터
    let sdt = props.dt;


    return(
        <>
            {/* 모듈 코드 */}
            <ul className='clist'>
                {
                    
                    sdt.map((v, i)=>
                        <li key={i}>
                            <img src={v.tmsrc} alt={v.cname} />
                            <h3>{v.cname}</h3>
                        </li>
                    )
                }
            </ul>
            {/* {console.log(sdt)} */}
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// CatList //////////////////


// 내보내기
export default CatList;