// Search 모듈 JS - Search.js

import $ from 'jquery';
import { useState } from 'react';
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



// 컴포넌트
function Search(){

    // 데이터 선택하기
    // 👉 데이터 정렬을 반영하기 위해 정렬 상태값을 같이 설정해주도록 함!
    // 👉 데이터 구성 : [배열데이터, 정렬상태값]
    // 👉 그래서 정렬 상태값을 업데이트 해서 바뀌는 거라고 알려주면 됨
    // 👉 여기서 최초의 정렬 상태값을 2로 함
    // 👉 이렇게 설정하는 이유 :Hook 상태관리는 데이터 정렬만 변경될 경우, 배열 데이터가 변경되지 않은 것으로 인식함. 그래서 배열로 묶어주면 전체를 한 세트라고 생각하고 그 세트 안의 일부가 바뀌면 바뀐거라 생각하기 때문에 묶어주는 것임
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