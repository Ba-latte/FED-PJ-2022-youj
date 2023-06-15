// 회원관련 기능 함수 JS - fnMem.js




// [로컬스토리지 클리어 ] ///////////////
const clearData = () => {
    // 로컬스토리지 비우기
    localStorage.clear();

    console.log("로컬스토리지 클리어");
}; /////////////// clearData ///////////////

// [ 로컬스토리지 초기 체크 세팅 : 없으면 만들어! ] ///////////////
const initData = () => {
    // 처리 프로세스를 실행시켜주기
    // alert("처리 페이지로 이동!");

    // [ 만약 로컬스토리지에 "mem-data"항목이 null(빈 값)이면 이 항목 만들어주기 ]
    if (localStorage.getItem("mem-data") === null) {
        localStorage.setItem(
            "mem-data",
            `
                [
                    {
                        "idx": "1",
                        "uid": "tomtom",
                        "pwd": "1111",
                        "unm": "Tom",
                        "eml": "tom@gmail.com"
                    }
                ]
            `
        );
    } ////////////// if : 로컬스토리지 항목 존재 체크 //////////////
}; /////////////// initData ///////////////


// 내보내기 : 여러개 내보낼 경우 중괄호{} 즉 객체에 담아서 내보냄
export { clearData, initData };
