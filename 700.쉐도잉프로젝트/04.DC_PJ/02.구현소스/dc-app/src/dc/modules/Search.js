// Search 모듈 JS - Search.js

import $ from 'jquery';
import { useEffect, useState } from 'react';
// CSS
import '../css/search.css';
import cat_data from '../data/cat';
import CatList from './CatList';

// 폰트 어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        
    }); ////////////// jQB //////////////
} ///////////////////// jqFn 함수 /////////////////////


// 최초 원본 데이터 정렬을 오름차순으로 변경하기
// 주의사항 : 컴포넌트 내부에 포함시키지 말 것!
// why) 배열의 정렬 정보가 컴포넌트에 포함될 경우 정렬 변경이 되지 않음 (그 정보가 남아있어서 업데이트를 못 시킨다고 함)
// 👉 따라서 컴포넌트 바깥의 위쪽에서 데이터 정렬이 변경된 원본 배열을 만들어준 것을 컴포넌트 내부에서 사용하도록 하면 기존 정렬의 변경이 반영됨!
cat_data.sort((x, y)=>{
    return x.cname === y.cname ? 0 : x.cname > y.cname ? 1 : -1;
})

// 컴포넌트
function Search(props){ // props.skw - 서치키워드
    // 최초 원본 데이터 정렬을 오름차순으로 변경하기
    // cat_data.sort((x, y)=>{
    //     return x.cname === y.cname ? 0 : x.cname > y.cname ? 1 : -1;
    // })
    // 이렇게 하면 아래에서 만든 소팅이 적용 안 돼ㅠ! 👉 그러니까 바깥쪽에다가 두기!
    // 다른건 상관없는데 소팅만 이런 특징이 있음!





    // 데이터 선택하기
    // 👉 데이터 정렬을 반영하기 위해 정렬 상태값을 같이 설정해주도록 함!
    // 👉 데이터 구성 : [배열데이터, 정렬상태값]
    // 👉 그래서 정렬 상태값을 업데이트 해서 바뀌는 거라고 알려주면 됨
    // 👉 여기서 최초의 정렬 상태값을 2로 함
    // 👉 이렇게 설정하는 이유 :Hook 상태관리는 데이터 정렬만 변경될 경우, 배열 데이터가 변경되지 않은 것으로 인식함. 그래서 배열로 묶어주면 전체를 한 세트라고 생각하고 그 세트 안의 일부가 바뀌면 바뀐거라 생각하기 때문에 묶어주는 것임 (커플링)
    // 정렬 상태값 : 0-오름차순, 1-내림차순 2-정렬전(처음 그 상태)
    let [sdt, setSdt] = useState([cat_data, 2]);
    // sdt[0] : 배열 데이터만 가져가고 싶으면 0번째를 선택하기!



    // 데이터 건수 : Hook 데이터 구성하기
    let [tot, setTot] = useState(cat_data.length);


    // 데이터 검색 함수 ///////////////////////////
    const schList = ()=>{
        // 검색어 대상 변수에 할당
        // 검색 요소 대상 : #schin
        let inp = document.querySelector("#schin");
        // 1. 검색어 읽기
        // 검색어 대상의 값을 또다른 변수에 할당
        let keyword = inp.value;



        // 2.검색어 입력 확인 분기하기
        // if : 비어있는 경우
        if(keyword.trim() == ""){
            // 입력창으로 포커스를 다시 보내주기
            inp.focus();
            
            return;
        }
        console.log("검색어 : ", keyword);



        // 3.데이터 검색하기
        // 배열값 다중검색 메서드 -> filter()
        // 주의! 검색은 항상 원본인 전체 데이터에서 검색할 것!
        // 검색대상 : 전체 원본 데이터인 cat_data
        let newList = cat_data.filter(v => {
            // 키워드 인자의 순번값이 없지 않아? = 있다는 뜻 -> 그럼 true리턴해!
            if(v.cname.toLowerCase().indexOf(keyword) !== -1) return true;
            // 키워드 검색 && alignment 구분 && type 구분 이런식으로 하면 됨

        }); ////////////// filter ///////////////

        console.log("검색 결과 : ", newList);



        // 4.검색 결과 리스트 업데이트하기
        // Hook변수로 등록되어 있는 '데이터 변수'와 '데이터 건수 변수'를 업데이트함
        setSdt([newList, 2]);
        setTot(newList.length);
    }; ///////////// schList 함수 ////////////////




    // [ 입력창에서 엔터키를 누르면 검색 함수 호출하기 ] //////////////////////
    const enterKey = (e)=>{
        // JS 오리지널 문법에서 엔터키는 13번?이었음

        // 이벤트의 key가 엔터키일 때 검색 함수(schList) 호출하도록 if문으로 제어하기
        if(e.key === 'Enter') schList();
    }; //////////////// enterKey 함수 /////////////////////


    // [ 리스트 정렬을 변경하는 함수 ] //////////////////////
    const sortList = (e)=>{
        // 선택옵션값 0 - 오름차순 1 - 내림차순

        // 1.선택 옵션값
        let opt = e.target.value;
        console.log("선택옵션 : ",opt);

        // sdt를 임시 변수에 할당하기 : 배열데이터만 가져와서 담아야 하기 때문에 0번이라 특정함
        let temp = sdt[0];

        console.log("정렬 전) 옵션에 따른 정렬 : ",temp);
        

        // 2.옵션에 따른 정렬 반영하기
        // 방법1) sort()메서드 안에서 사용 ///////////////////////////////////////
        // // opt(옵션값)이 1이면
        // if(opt==1){
        //     // 내림차순
        //     temp.sort((x, y) => x.cname == y.cname ? 0 : x.cname > y.cname ? -1 : 1);
        // } ///////// if : opt 1이면(내림차순) /////////
        // // otp가 0이면
        // else if(opt == 0){
        //     // 오름차순
        //     temp.sort((x, y) => x.cname == y.cname ? 0 : x.cname > y.cname ? 1 : -1);
        // } /////// else : opt 0이면(오름차순) //////////

        // 방법2) sort()메서드 바깥에서 사용 ///////////////////////////////////////
        temp.sort((x, y)=>{
            // opt(옵션값)이 1이면
            if(opt==1){
                // 내림차순
                return x.cname == y.cname ? 0 : x.cname > y.cname ? -1 : 1;
            } ///////// if : opt 1이면(내림차순) /////////
            // otp가 0이면
            else if(opt == 0){
                // 오름차순
                return x.cname == y.cname ? 0 : x.cname > y.cname ? 1 : -1;
            } /////// else : opt 0이면(오름차순) //////////
        });

        console.log("정렬 후) 옵션에 따른 정렬 : ",temp);

        // 3.데이터 정렬 변경한 것을 반영하기
        // setSdt([배열데이터, 정렬상태값])
        setSdt([temp, Number(opt)]);
        // 팁! 후크변수는 상태관리를 계속 하는 놈이라서 원본은 그대로 계속 냅두고 임시변수에 위임해서 관리해주는 것이 좋음~ 후크변수는 계속 깨끗한 상태로 두는 게 좋음!
        // 주의! 후크변수는 정렬(순서)이 바꼈다고 데이터가 바뀐거라고 생각을 안함
        // ex) 우리반 학생들이 앉은 자리를 서로 바꾸어 앉음 -> 하지만 여전히 우리반 학생들임!
        // 👉관리데이터까지 넣어주면 된다고 함 -> 배열로 바꿔주면 된다고 함
        
        
    }; //////////////// sortList 함수 ///////////////


    // [ 체크박스 요소 수집하기 ] ///////////////////////
    // 숨겨둔 체크박스 요소 수집하기
    let chkele = document.querySelectorAll(".chkhdn");


    // [ 체크박스 검색함수 ] ///////////////////////
    // : 컴포넌트가 function 어쩌고 이런식으로 함수형으로 쓰니까,,, 그냥 구분해주려고... 할당형으로 쓴다고 함(?)
    const chkSearch = (e)=>{
        // 1. 체크박스 아이디 구해오기 : 검색항목의 값(ALIGNMENT의 값으로 쓸 예정)
        let cid = e.target.id;
        // 2. 체크박스 체크/언체크 여부 확인하기 : checked 속성을 쓰면 됨 (true/false가 리턴됨)
        let chked = e.target.checked;

        console.log("체크박스 아이디 : ", cid, "체크여부 : ", chked);

        // 임시 변수 만들기 : 기존에 입력된 데이터 가져오기
        // 👉 계속 데이터 변경해서 sdt에 담아왔기 때문에 아래에서 뭔가 작업하기 전에 기존의 데이터를 다른 곳에 담아두는 것임
        let temp = sdt[0];
        console.log("기존에 저장해둔 데이터 : ", temp);

        // 결과 집합 담을 변수 만들기
        let newList = [];

        // 3. 체크박스에 체크된 개수 세기 : 1개 초과시 배열합치기를 할 예정임!
        let num = 0;
        chkele.forEach(v=>{if(v.checked) num++;});
        console.log("체크 개수 : ", num);



        // 4. 체크박스 체크에 따른 분기
        // (1)체크 여부가 true일 때 해당 검색어로 검색하기
        if(chked){
            // 현재 데이터를 변수에 담기 (만약 한번 키워드 검색한 결과를 또 검색하려면 이렇게 원본데이터 ㄱ자ㅕ오면 안된다고 함)
            let nowdt = cat_data.filter(v=>{
                if(v.alignment===cid) return true;
                // : true인 것만 필터가 수집해서 nowdt에 담도록 하기
            }); /////////// filter ///////////

            // 체크 개수가 1 초과일 때 배열 합치기
            // 💥무조건 합치기 하면 적용이 안 됨! if로 구분해서 합쳐줘야 적용이 된다고 함💥
            if(num > 1){
                // 스프레드 연산자(...) 사용하기! : react cdn 파일 > 00.js es6 문법 체크하기에 관련 내용 있음!

                // 기존 데이터(temp) + 새로운 데이터(nowdt) 합치기
                newList = [...temp, ...nowdt];

            } /////////////// if : 1 초과일 때 /////////////
            else{
                // 위에서 만들어둔 결과 집합 변수에다가 현재 데이터 담은 변수의 값을 할당하여 반영하기
                newList = nowdt;
            } ////////// else : 체크 개수가 1일 때 ////////////////


        } ////////////// if : chked가 true일 때 ////////////////
        // (2) 체크 여부가 false일 때 데이터 지우기
        else{
            console.log("지울 데이터 : ", cid);
            // 오리지널 for문 쓰는 경우 
            // 데이터지울 때 forEach를 쓰면 문제가 생김
            // 스플라이스로 지울 땐 꼭 무조건 반드시!!!!! for문 오리지널문을 써야 함!!!!!!!
            for(let i = 0; i < temp.length; i++){
                // 조건은 체크박스 풀린 값
                if(temp[i].alignment === cid){

                    // 배열 지우기 메서드 : splice(순번, 개수)
                    temp.splice(i, 1);
                    
                    
                    // 💥중요!! splice로 지우면 배열 항목 자체가 삭제되므로 for문 돌 때 개수가 줄어들기 때문에 다음번호를 지울 때 ++을 --처리해줘야 함
                    // ex) 2번 데이터 지우면, 2번 데이터의 자리에 3번 데이터가 오므로 "++"해서 3번자리로 가버리면 2번자리에 온 3번데이터 검사하지 못함!
                    i--;


                    // delete temp[i]; 👉 이거 쓸 때 조심하기
                    /****************************************************************************
                        [ delete 사용할 때의 주의사항 ]
                    delete 배열 지우기는 배열의 값만 지우고 그 값은 undefined 처리 된다
                    따라서 리스트 처리시 에러가 날 수 있음
                    이 경우에 꼭 배열 주소 전체를 삭제하는 splice를 사용하도록 한다
                    ****************************************************************************/
                } ////////// if : i번째의 기존데이터의 alignment 항목의 값이 cid와 동일하다면 ///////////
            } /////////////// for문 //////////////////

            // 결과 처리하기 : 삭제 처리된 temp를 결과에 넣기!
            newList = temp;

        } //////////// else : 체크박스 false일 때 ////////////////
        


        // 5. 검색 결과 리스트를 업데이트하기
        // Hook 데이터 변수 업데이트하기
        setSdt([newList], 2);
        // 데이터 건수 변수 업데이트하기
        setTot(newList.length);

    }; ///////////////////// chkSearch 함수 ///////////////////////




    // 🔥 Layout 페이지에서 검색해 들어와서, 검색어가 있는 경우에 검색함수 호출하기!!
    // : 검색함수는 검색어 입력창으로부터 검색어를 가져가므로, 넘어온 검색어는 검색 입력창에 넣은 후 검색함수를 호출하면 됨
    // (여기의 룰이 '여기에 있는 검색입력창 -> 입력 -> 검색결과' 보여주기 이기 때문에!!)
    const linkSearch = ()=>{
        console.log("링크 검색어 : ", props.skw);

        // 빈값 체크하기 : 검색어가 빈값이 아닌 경우
        if(props.skw != ""){
            // 1. 검색창 원상복구하기
            document.querySelector(".searchingGnb").style.display = "none";
            document.querySelector(".searchingGnb+a").style.opacity = "1";

            // 2. 검색페이지 검색창에 키워드 넣기
            document.querySelector(".searching input").value = props.skw;

            // 3. 검색함수 호출하기
            schList();
        } ///////////// if : 검색어가 빈값이 아닌 경우 ///////////////

    }; ////////////////////// linkSearch 함수 ////////////////////////////

    // 🔥 검색어가 있을 때 검색함수 호출은 페이지 로딩 후 체크해주는 useEffect를 활용한다!
    useEffect(linkSearch, []);


    return(
        <>
        {/* 모듈코드 */}
        <section className='schbx'>
            {/* 1. 옵션선택박스 */}
            <div className='schopt'>
                {/* 검색박스 */}
                <div className='searching'>
                    {/* 검색버튼 돋보기아이콘 */}
                    <FontAwesomeIcon 
                    icon={faSearch}
                    className='schbtn'
                    title='Open search'
                    onClick={schList} />
                    {/* 입력창 */}
                    <input id='schin' type='text' 
                    placeholder='Filter by Keyword' onKeyUp={enterKey} />
                </div>
                {/* 체크박스 구역 */}
                <div className='chkbx'>
                    <ul>
                        <li>
                            <h2>
                                ALIGNMENT
                                <span className='spbtn'>＋</span>
                            </h2>
                            {/* 체크박스 리스트 */}
                            <ol>
                                <li>
                                    Heroes
                                    {/*
                                        데이터에 가보면 'ALIGNMENT'항목에 hero가 있는데 이걸 검색하게 하기 위해 id를 hero로 해줌
                                        체크박스 체크/언체크하면 온체인지 이벤트가 바뀜!
                                    */}
                                    <input type='checkbox'
                                    id='hero'
                                    className='chkhdn'
                                    onChange={chkSearch} />
                                    {/* 실제로는 라벨을 클릭하면 체크박스가 바뀌니까 라벨 추가해주기 (라벨의for속성 htmlfor로 바뀜~ id랑 똑같은 이름으로 연결~) */}
                                    <label htmlFor='hero' className='chklb'></label>
                                </li>
                                <li>
                                    It's Complicated
                                    <input type='checkbox'
                                    id='comp'
                                    className='chkhdn'
                                    onChange={chkSearch} />
                                    <label htmlFor='comp' className='chklb'></label>
                                </li>
                                <li>
                                    Villains
                                    <input type='checkbox'
                                    id='villain'
                                    className='chkhdn'
                                    onChange={chkSearch} />
                                    <label htmlFor='villain' className='chklb'></label>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 2. 결과리스트박스 */}
            <div className='listbx'>
                {/* 결과타이틀 */}
                <h2 className='restit'>
                    BROWSE CHARACTERS({tot})
                </h2>
                {/* 정렬선택박스 */}
                <aside className='sortbx'>
                    <select 
                    className='sel' name='sel' id='sel'
                    onChange={sortList}
                    >
                        <option value='0'>A-Z</option>
                        <option value='1'>Z-A</option>
                    </select>
                </aside>
                {/* 캐릭터 리스트 컴포넌트 
                전달속성 dt - 리스트 데이터 */}
                <CatList dt={sdt[0]} />
            </div>
        </section>
        {/* 빈루트를 만들고 JS로드함수포함 */}
        {jqFn()}
        </>
    );
} ////////////////// Search //////////////////


// 내보내기
export default Search;