import App from "./js/App.js";

const app = new App();

// 윈도우가 로드될 때 리사이즈 메서드 실행
window.addEventListener('load', ()=>{
    app.resize();
    app.render();
});