const quotes = [
    {
        quote: "Be a good listener. Your ears will never get you in trouble.",
        author: "Frank Tyger",
    },
    {
        quote: "한 국가의 위대함과 도덕적 진보는 동물이 받는 대우로 가늠할 수 있다.",
        author: "마하트마 간디"
    },
    {
        quote: "인류라는 거대 집단이 갖춰야 할 결점을 상쇄하는 유일한 장점은 각자 노력하는 짧은 순간 동안 가장 관심있고 하기 쉬운 일에 한결같이 충실한 것이다.",
        author: "조지프 콘래드",
    },
    {
        quote: "Do not fear death so much, but rather the inadequate life.",
        author: "Bertolt Brecht",
    },
    {
        quote: "Nothing is stronger than habit.",
        author: "Ovid",
    },
    {
        quote: "못 가진 것에 대한 욕망으로 가진 것을 망치지 말라. 하지만 지금 가진 것이 한때는 바라기만 했던 것 중 하나였다는 것도 기억하라.",
        author: "에피쿠로스",
    },
    {
        quote: "습관의 사슬은 너무 가벼워서 깨지기 전까지는 느껴지지 않는다.",
        author: "워런 버핏",
    },
    {
        quote: "Be entirely tolerant or not at all; follow the good path or the evil one. To stand at the crossroads requires more strength than you possess.",
        author: "Heinrich Heine",
    },
    {
        quote: "Keep true to the dreams of thy youth.",
        author: "Friedrich von Schiller",
    },
    {
        quote: "가장 현명한 사람은 자신만의 방향을 따른다.",
        author: "에우리피데스",
    },
];

const imgs = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
];


window.addEventListener("DOMContentLoaded", ()=>{

    const quote = document.querySelector("#quote span:first-child");
    const author = document.querySelector("#quote span:last-child");
    const bg = document.body;
    
    // console.log(quotes[0]);
    
    // console.log(quotes[Math.floor(Math.random()*10)]);
    // console.log(quotes[Math.floor(Math.random()*quotes.length)]);
    
    const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];
    const todaysbgi = imgs[Math.floor(Math.random()*imgs.length)];
    
    console.log(todaysQuote);
    
    quote.innerText = todaysQuote.quote;
    author.innerText = todaysQuote.author;

    bg.style.background = `url(../../../imgs/${todaysbgi}) no-repeat center/cover`;

});