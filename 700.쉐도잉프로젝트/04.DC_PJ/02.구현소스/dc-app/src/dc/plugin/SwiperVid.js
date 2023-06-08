import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// CSS 가져오기
import "./swipervid.css";

// import required modules
import { Navigation} from "swiper";

// 데이터 가져오기
import swipervid_data from "../data/swipervid";


// [ 컴포넌트 만들기 ]
export default function SwiperVid(props) {
    // 데이터 세팅
    const sdt = swipervid_data;

    // 리턴하기
    return (
        <>
            <Swiper
                navigation={true}
                slidesPerView={4}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {/* 데이터 갯수만큼 스와이퍼 반복시키기 */}
                {
                    sdt.map((v,i)=>
                        <SwiperSlide key={i}>
                            <div className="container">
                                <div className="imgbx">
                                    <img src={v.isrc} alt={v.tit + ' ' + '동영상 이미지'} />
                                </div>
                                <div className="catbx">
                                    <h4 className="cat">{v.cat}</h4>
                                </div>
                                <div className="titbx">
                                    <h3 className="tit">{v.tit}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
}


