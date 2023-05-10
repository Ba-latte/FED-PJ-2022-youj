// 서브페이지 뷰엑스 스토어 세팅 JS - store.js

const store = new Vuex.Store({
    state:{
        // 서브 데이터 셋업
        subData:{
            "남성":{
                // 남성메뉴
                menu: [
                    'NEW ARRIVAL',
                    'WINDBREAKER',
                    'BEACH STYLE',
                    'SPORT STYLE'
                ],
                // 배너 개수
                cnt:3,
                // 카테고리명
                cat:"men",
            },
            "여성":{
                // 여성메뉴
                menu: [
                    'NEW ARRIVAL',
                    'SPORTY FASHION',
                    'FREE STYLE',
                    'COMFORTABLE STYLE'
                ],
                // 배너 개수
                cnt:3,
                // 카테고리명
                cat:"women",
            },
            "스타일":{
                // 스타일메뉴
                menu:[
                    'NEW ARRIVAL',
                    'GOLF LIFE',
                    'CAMPING STYLE',
                    'SPORT STYLE'
                ],
                // 배너 개수
                cnt:5,
                // 카테고리명
                cat:"style",
            },
        },
        // 공통처리 메뉴 변수
        menu: [
            'NEW ARRIVAL',
            'WINDBREAKER',
            'BEACH STYLE',
            'SPORT STYLE'
        ],
        // 공통 처리 배너 개수 변수
        cnt: 3,
        // 공통 처리 카테고리명 변수
        cat:"men",
    },
    // state 데이터 변경 메서드 구역
    mutations:{
        
    }
}); //////////////// 뷰엑스 스토어 /////////////////////////////////