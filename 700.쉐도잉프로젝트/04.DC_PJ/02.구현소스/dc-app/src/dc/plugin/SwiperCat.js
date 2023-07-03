import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/* 제이쿼리넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipercat.css";

// import required modules
import { Navigation } from "swiper";
// 데이터 가져오기
import cat_data from "../data/cat";
import { Link } from "react-router-dom";




export default function SwiperCat(props) {
    // 데이터 셋팅
    const sdt = cat_data;
    console.log(sdt);

    return (
        <>
            <Swiper
                // breakpoints 적용 안 될 때 한 화면당 개수를 Hook 변수를 사용함!
                slidesPerView={2}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                // 스와이퍼 사이즈별 슬라이드 개수 변경
                breakpoints={{
                    500: {
                        slidesPerView: 3,
                    },
                    800: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                }}
                className="mySwiper2">
                {sdt.map((v, i) => (
                    /* 저스티스 리그 캐릭터는 idx = 1부터 7까지 : v.idx가 7보다 같거나 작은 데이터만 뿌려라! */
                    Number(v.idx) <= 7 &&
                        <SwiperSlide key={i}>
                            <Link to="/det" 
                            state={
                                {
                                    cname: v.cname,
                                    cdesc: v.cdesc,
                                    facts: v.facts
                                }
                            }>
                                {/*
                                    🔥라우터 Link로 값 전달하기
                                    1. to속성에 루트(/)표시를 넣어야 함!
                                    -이유 : 우리는 /main을 굳이 만들어 쓰기 때문에, 그냥 들어갈 때엔 상관 없지만 로고를 클릭했을 때 /main이 루트 뒤에 표시되므로! 굳이 루트를 표시해줘야함

                                    2. "/det" 라우터 컴포넌트 페이지 호출 시 state 속성값으로 객체를 보내서 값 전달하기
                                    -Link로 데이터 전달할 때에 관한 필기 내용은 13번 참고
                                    -cname : 캐릭터 이름 전달하는 '속성명'이고 값은 v.cname으로 캐릭터 명을 보냄
                                    -cdesc : 캐릭터 설명
                                    -facts : 캐릭터 명세

                                    3. 페이지인 Details.js 컴포넌트에 페이지에서 나타나야 할 데이터 항목을 데이터 속성명과 같은 이름으로 세팅하여(알아보기 쉬우라고) 라우터 전달 state 객체에 담아서 보내기!
                                */}
                                <section className="swinbx2" >
                                    {/* 캐릭터 이미지 영역 */}
                                    <div className="catimg2">
                                        <img src={v.tmsrc} alt={v.cname} />
                                    </div>
                                    {/* 캐릭터 이름 영역 */}
                                    <div className="cattit2">
                                        <h3>{v.cname}</h3>
                                    </div>
                                </section>
                            </Link>
                        </SwiperSlide>
                ))}
            </Swiper>
            {/* breakpoints 적용 안 될 때) 스와이퍼 모듈에 이벤트 입히기! */}
            {/* {evtFn()} */}
        </>
    );
}








