// VidIntro 컴포넌트 JS - VidIntro.js

import React from 'react';
import $ from 'jquery';
import '../css/vidintro.css';
import vidintro_data from '../data/vidintro';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function VidIntro(props){
    // props.pg - 해당 페이지 데이터 속성명

    // 데이터 선택하기 : Main.js에서 <VidIntro />로 호출할 때 데이터의 구분을 위함
    const sdt = vidintro_data[props.pg];

    // 컴포넌트 안에 할당된 메서드 만들기 : 링크코드 생성 함수
    // desc데이터 또는 sum데이터에서 처리 -> 어떤게 들어올지 모르니까 변수처리해서 파라미터로 받아오게 함
    const lcode = (data)=>{
        // data는 desc/sum 둘 중에 전달됨
        return(
            <>
                {data.split("*")[0]}
                    <a href={sdt.link[1]} target="_blank">
                        {sdt.link[0]}
                    </a> 
                {data.split("*")[1]}
            </>
        );
    } //////////////////////// lcode : 링크코드 생성 함수 //////////////////////

    // 리턴하기
    return(
        <>
            {/* 모듈 코드 */}
            <section className='vidIntroBx'>
                {/* 비디오 파트 */}
                <div className='vidBx'>
                    <iframe src={sdt.vsrc} title={sdt.btit}></iframe>
                </div>
                {/* 타이틀 파트 */}
                <div className='titBx'>
                    <h3 className='stit'>{sdt.stit}</h3>
                    <h2 className='btit'>{sdt.btit}</h2>
                    <p className='sum'>
                        {/* 특수문자(*) 여부에 따라 처리하게 만들기 : indexOf(문자열) -> 없으면 -1 리턴함 */}
                        {
                            sdt.sum.indexOf("*") == -1 ? sdt.sum : lcode(sdt.sum)
                        }
                    </p>
                    <p className='desc'>
                        {/* 특수문자(*)여부에 따라 처리하게 만들기 */}
                        {
                            sdt.desc.indexOf("*") == -1 ? sdt.desc : lcode(sdt.desc)
                        }
                    </p>
                    {/* 관련 링크 있을 경우 표시 */}
                </div>
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// VidIntro //////////////////



// 내보내기
export default VidIntro;