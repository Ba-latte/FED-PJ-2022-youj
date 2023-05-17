// 뷰 라우터 인스턴스 설정파일 - glist-router.js



// ⭐라우터 템플릿 만들기 (라우터 구성 중요~)
let Glist = {
    template: `
    <section>
        <!-- 필터 옵션 체크박스 구역 -->
        <div id="optbx">
            <label for="men">남성</label>
            <input type="checkbox" id="men" v-model="$store.state.chkarr[0]"
            @change="$store.commit('resCheck')">

            <label for="women">여성</label>
            <input type="checkbox" id="women" v-model="$store.state.chkarr[1]"
            @change="$store.commit('resCheck')">

            <label for="style">스타일</label>
            <input type="checkbox" id="style" v-model="$store.state.chkarr[2]"
            @change="$store.commit('resCheck')">
        </div>
        <!-- 상품리스트박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" 
            v-if="v.cat==$store.state.selnm[0] || v.cat==$store.state.selnm[1] || v.cat==$store.state.selnm[2]">
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[2]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
    </section>
    `,
};

// v-model 디렉티브 속성은 요소 자신의 값이 타겟 값으로 반영되게해준다!
// ->> 변경 데이터의 뷰JS의 동기화기능을 확인!


// v-for에 기술된 v-if 조건에 사이 범위를 넣고 스토어 변수로 컨트롤한다!
// 조건 : v-if="v.idx >= 1 + $store.state.pnum && v.idx <= 10 + $store.state.pnum"
// -> 인덱스 번호가 1이상 10이하 -> 여기에 일정한 수를 더함
// ->> 10씩 더하면 다음 범위가 리스트로 정해짐
// 1~10 -> 10더하기 -> 11 ~ 20 -> 10더하기 -> 21 ~ 30 ....
// ->>>> 페이징 표시 구역의 숫자를 클릭하면 스토어에 있는 페이징용 변수의 값을 바꿔주면 되는 것임!!
let Paging = {
    template: `
    <section>
        <!-- 상품리스트박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" 
            v-if="v.idx >= 1 + $store.state.pnum && v.idx <= 10 + $store.state.pnum">
                [{{v.idx}}]
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[2]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>

        <!-- 페이징 표시 구역 -->
        <div id="paging">
            <a href="#" @click.prevent="$store.commit('updatePaging',0)">
                1
            </a>
            |
            <a href="#" @click.prevent="$store.commit('updatePaging',10)">
                2
            </a>
            |
            <a href="#" @click.prevent="$store.commit('updatePaging',20)">
                3
            </a>
        </div>
    </section>
    `,
};


let More = {
    template: `
    <section>
        <!-- 상품리스트박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" 
            v-if="v.idx >= 1 && v.idx <= 10 + $store.state.mnum">
                [{{v.idx}}]
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[2]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>

        <!-- more버튼 표시 구역 -->
        <div id="more" v-if="$store.state.mbtn">
            <button class="more" @click.prevent="$store.commit('updateMore',30)">
                MORE
            </button>
        </div>
    </section>
    `,
};
// ⭐ :리스트 뿌리는 소스가 다 여기 들어감




// 뷰 라우터 인스턴스 생성하기
const router = new VueRouter({
    routes: [
        // 1.필터 리스트
        {
            path: "/glist",
            component: Glist,
        },
        // 2.페이징 리스트
        {
            path: "/paging",
            component: Paging,
        },
        // 3.모어 리스트
        {
            path: "/more",
            component: More,
        },
    ],
});


// 내보내기
export default router;