// 공통 데이터 - 상단, 하단 영역 : common.js


/* GNB 메뉴 데이터 구성하기 */
const gnb_data = [
    // {
    //     txt:"Home",
    //     link:"/",
    // },
    {
        txt:"CHARACTERS",
        link:"/ct",
    },
    {
        txt:"COMICS",
        link:"/co1",
        sub:[
            {
                txt:"LATEST COMICS",
                link:"/co1",
            },
            {
                txt:"DC UNIVERSE INFINITE",
                link:"/co2",
            },
            {
                txt:"ALL COMICS SERIES",
                link:"/co3",
            },
        ],
    },
    {
        txt:"MOVIES & TV",
        link:"/mv",
        sub:[
            {
                txt:"DC MOVIES",
                link:"/mv",
            },
            {
                txt:"DC SERIES",
                link:"/mv",
            },
            {
                txt:"DC ON HBO MAX",
                link:"/mv",
            },
        ],
    },
    {
        txt:"GAMES",
        link:"/gm",
    },
    {
        txt:"NEWS",
        link:"/nw",
    },
    {
        txt:"VIDEO",
        link:"/vd",
    },
    {
        txt:"OPINION",
        link:"/board",
    },
];
// 👆 지금은 메뉴가 하이라키 구조가 아니고 단층 구조, 단순 나열, 명확한 상태라서 배열로 씀

/* bmenu 메뉴 데이터 구성하기 */
const bmenu = [
    {
        txt: "Privacy Policy",
        link: "https://www.warnermediaprivacy.com/policycenter/b2c/WM/",
    },
    {
        txt: "Terms",
        link: "https://www.dcuniverseinfinite.com/terms?_gl=1*5nxhg2*_gcl_au*MTk3OTgxNzUwMi4xNjgzMTc3NDg3",
    },
    {
        txt: "Ad Choices",
        link: "https://www.warnermediaprivacy.com/policycenter/b2c/wm/",
    },
    {
        txt: "Accessibility",
        link: "https://policies.warnerbros.com/terms/en-us/#accessibility",
    },
    {
        txt: "Cookie Settings",
        link: "https://www.dc.com/#compliance-link",
    },
];


// 내보내기
export {gnb_data, bmenu};