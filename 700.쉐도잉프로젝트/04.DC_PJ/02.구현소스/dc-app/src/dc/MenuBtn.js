// 메뉴 버튼 모듈 JS - MenuBtn.js

// 여기서 쓸 것들만 import 하기
import $ from 'jquery';
import './css/menubtn.css';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////



// 컴포넌트
function MenuBtn(){
    return(
        <>
            <section className="menubtn">
                <div>
                    <div className="imbx">
                        <img src="./images/menubtn1.jpg" alt="배너이미지" />
                    </div>
                    <div className="titbx">
                        <h3>WORLDS COLLIDE</h3>
                        <h2>THE FLASH IS ONLY IN THEATERS JUNE 16</h2>
                    </div>
                    <div className="btnbx">
                        <button>TICKETS ON SALE NOW</button>
                    </div>
                </div>
            </section>
            {/* 바깥에 빈 루트를 만들고 JS 로드 함수 포함시키기 */}
            {jqFn()}
        </>
    );
} ////////////////// MenuBtn //////////////////


// 내보내기
export default MenuBtn;