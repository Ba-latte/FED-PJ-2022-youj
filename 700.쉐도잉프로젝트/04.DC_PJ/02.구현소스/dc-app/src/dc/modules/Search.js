// Search 모듈 JS - Search.js

import $ from 'jquery';
import { useState } from 'react';
import '../css/search.css';
import cat_data from '../data/cat';
import CatList from './CatList';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function Search(){

    // 데이터 선택하기
    let [sdt, setSdt] = useState(cat_data);
    // : Hook 데이터로 구성하기
    


    return(
        <>
            {/* 모듈 코드 */}
            <section className='schbx'>
                {/* 1.옵션 선택 박스 */}
                <div className='schopt'>

                </div>
                {/* 2.결과 리스트 박스 */}
                <div className='listbx'>
                    {/* 결과 타이틀 */}
                    <h2 className='restit'>BROWSE CHARACTERS</h2>
                    {/* 정렬 선택 박스 */}
                    <aside className='sortbx'>

                    </aside>
                    {/*
                        캐릭터 리스트 컴포넌트
                        -전달 속성 dt : 리스트 데이터
                    */}
                    <CatList dt={sdt} />
                </div>
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// Search //////////////////


// 내보내기
export default Search;