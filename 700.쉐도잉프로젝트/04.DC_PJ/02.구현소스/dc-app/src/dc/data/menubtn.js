// 메인페이지 MenuBtn 컴포넌트용 데이터 - menubtn.js
// ->>메인 페이지에서 한번만 사용되므로 객체형으로 페이지별 데이터 구분할 필요가 없음! 따라서 바로 배열형 데이터로 셋업함

const menubtn_data = [
    {
        "isrc": "./images/menubtn1.jpg",
        "tit": "WORLDS COLLIDE^THE FLASH IS ONLY IN THEATERS JUNE 16",
        "btn": "TICKETS ON SALE NOW",
        "link": "/co"
    },
    {
        "isrc": "./images/menubtn2.jpg",
        "tit": "DC SHOP^GET NUTS WITH THE 1/6 SCALE BATMAN FIGURE",
        "btn": "SHOP NEW ARRIVALS",
        "link": "/mv"
    },
    {
        "isrc": "./images/menubtn3.jpg",
        "tit": "DC PRIDE^CELEBRATE WITH LGBTQ CREATORS, CHARACTERS, &...",
        "btn": "VISIT OUR PRIDE HUB",
        "link": "/gm"
    },
    {
        "isrc": "./images/menubtn4.jpg",
        "tit": "DC COMMUNITY^SHARE YOUR DC PRIDE FANWORKS",
        "btn": "SUBMIT YOUR ART",
        "link": "/nw"
    }
];

export default menubtn_data;