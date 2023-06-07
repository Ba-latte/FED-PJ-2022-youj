// VidIntro 컴포넌트용 데이터 - vidintro.js
/*
    [ 데이터 조건 ]
-link 속성 값 세팅시 하나의 링크만 세팅할 것!
-링크가 있을 경우 sum 또는 desc 속성값에 단 하나의 *표시만 어디든지 넣는다!
*/

const vidintro_data = {
    "main": {
        "vsrc": "https://www.youtube.com/embed/jprhe-cWKGs",
        "stit": "FEATURED VIDEO",
        "btit": "THE FLASH - FINAL TRAILER",
        "sum": "Are YOU ready? THE FLASH - Only in Theaters June 16.",
        "desc": "Advance tickets available now! * hub for tickets and showtimes!",
        /* 👉 링크 삽입 부분을 특수문자(*)로 자리 표시함 */
        "link": ["Visit our official Flash","https://www.dc.com/theflash"],
        /* 👉 실제 링크 정보 : 배열로 처리함! 배열[링크가 걸릴 글자, 링크의 url주소] */
    },
    "CHARACTERS": {
        "vsrc": "",
        "stit": "",
        "btit": "",
        "sum": "",
        "desc": "",
        "link": "",
    },
    "COMICS": {
        "vsrc": "https://www.youtube.com/embed/uGGjQH4YLPU",
        "stit": "FEATURED VIDEO",
        "btit": "WELCOME TO THE DAWN OF DC - COMIC TRAILER",
        "sum": "",
        "desc": `Welcome to the Dawn of DC! In this yearlong storytelling initiative, DC is forging the future one hero at a time with epic new series, new creative teams and new battles to fight across the DC Universe in comics including Superman, Harley Quinn, Green Arrow and many more. Experience the action in this trailer, featuring the incredible art of Jeff Spokes!`,
        "link": "",
    },
    "MOVIES": {
        "vsrc": "https://www.youtube.com/embed/r51cYVZWKdY",
        "stit": "FEATURED VIDEO",
        "btit": "THE FLASH – OFFICIAL TRAILER 2",
        "sum": "Watch worlds collide in trailer 2 for The Flash - Only in Theaters June 16.",
        "desc": `Warner Bros. Pictures presents The Flash, directed by Andy Muschietti (the IT films, Mama). Ezra Miller reprises their role as Barry Allen in the DC Super Hero’s first-ever standalone feature film.`,
        "link": "",
    },
    "GAMES": {
        "vsrc": "https://www.youtube.com/embed/bFmeHsaYn8Y",
        "stit": "FEATURED VIDEO",
        "btit": 'Suicide Squad: Kill the Justice League Official CO-OP GAMEPLAY - "NO MATTER THE COST"',
        "sum": "Stop The Flash and rescue Lex Luthor in the process. No matter the cost.",
        "desc": `Suicide Squad: Kill the Justice League is available May 26, 2023 on PS5, Xbox Series X|S, and PC. Learn more: *`,
        "link": ["https://www.suicidesquadgame.com/en-us","https://www.suicidesquadgame.com/en-us"],
    },
    "NEWS": {
        "vsrc": "",
        "stit": "",
        "btit": "",
        "sum": "",
        "desc": "",
        "link": "",
    },
    "VIDEO": {
        "vsrc": "https://www.youtube.com/embed/uJ1IEYeHCgE",
        "stit": "FEATURED VIDEO",
        "btit": "THE FLASH - DRONE SHOW AT VIVID SYDNEY",
        "sum": "In case you missed it - The Flash was included as part of the biggest ever opening weekend of * where 1,053 drones were used to create the largest drone show in the southern hemisphere!",
        "desc": "Visit our Flash Hub for all things The Flash and to find tickets and showtimes near you",
        "link": ["Vivid Sydney","https://www.vividsydney.com/"],
    },
    

}


// 내보내기
export default vidintro_data;

