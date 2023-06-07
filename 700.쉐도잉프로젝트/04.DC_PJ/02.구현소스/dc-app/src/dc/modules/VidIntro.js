// VidIntro 컴포넌트 JS - VidIntro.js

import $ from 'jquery';
import "../css/vidintro.css";
import vidintro_data from '../data/vidintro';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function VidIntro(props){
    // props.pg - 해당 페이지 데이터 속성명
    // props.mm - 디자인 CSS 클래스 "on" 넣기 속성

    // 데이터 선택하기 : Main.js에서 <VidIntro />로 호출할 때 데이터의 구분을 위함
    const sdt = vidintro_data[props.pg];

    // 컴포넌트 안에 할당된 메서드 만들기 : 링크코드 생성 함수
    // desc데이터 또는 sum데이터에서 처리 -> 어떤게 들어올지 모르니까 변수처리해서 파라미터로 받아오게 함
    const lcode = (data) => { // data는 desc/sum 둘중에 전달됨
        return(
            <>
                {data.split('*')[0]}
                <a href={sdt.link[1]} target='_blank'>
                    {sdt.link[0]}
                </a>
                {data.split('*')[1]}            
            </>
        )
    }//////////////////////// lcode : 링크코드 생성 함수 //////////////////////

    // 리턴하기
    return(
        <>
            {/* 모듈코드 */}
            <section className={'vidbox' + ' ' + props.mm}>
                <div>
                    {/* 비디오파트 */}
                    <div className='vb1'>
                    <iframe src={sdt.vsrc} title={sdt.btit}></iframe>
                    </div>
                    {/* 타이틀파트 */}
                    <div className='vb2'>
                        <h3>{sdt.stit}</h3>
                        <h2>{sdt.btit}</h2>
                        <p>
                            {/* 특수문자(*)여부에 따라 처리
                            indexOf(문자열) -> 없으면 -1리턴 */}
                            {
                                sdt.sum.indexOf('*') == -1 ?
                                sdt.sum : lcode(sdt.sum)
                            }
                        </p>
                        <p className='desc'>
                            {/* 특수문자(*)여부에 따라 처리
                            indexOf(문자열) -> 없으면 -1리턴 */}
                            {
                                sdt.desc.indexOf('*') == -1 ?
                                sdt.desc : lcode(sdt.desc)
                            }
                        </p>
                        {/* 링크있을경우 표시 */}
                    </div>
                </div>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
} ////////////////// VidIntro //////////////////



// 내보내기
export default VidIntro;




