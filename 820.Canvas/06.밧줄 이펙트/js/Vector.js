// 물리 표현 위한 벡터 클래스

export default class Vector{
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }
    // Vector.add()라고 쓸 때
    static add(v1, v2){
        // Vector 인스턴스 생성해서 리턴해주기
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1, v2){
        // Vector 인스턴스 생성해서 리턴해주기
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    // new Vector() -> Vector.add()라고 쓸 때
    add(x, y){
        // 인자를 1개만 받을 경우
        if(arguments.length === 1){
            // x,y값이 아닌, 다른 Vector 인스턴스를 인자로 주는 경우라 이해하기
            this.x += x.x;
            this.y += x.y;
        }
        // 인자를 2개 받을 경우
        else if(arguments.length === 2){
            // x,y값을 인자로 주는 경우임
            this.x += x;
            this.y += y;
        }

        // Vector 인스턴스 바로 사용할 수 있도록 리턴
        return this;
    }
    sub(x, y){
        // 인자를 1개만 받을 경우
        if(arguments.length === 1){
            // x,y값이 아닌, 다른 Vector 인스턴스를 인자로 주는 경우
            this.x -= x.x;
            this.y -= x.y;
        }
        // 인자를 2개 받을 경우
        else if(arguments.length === 2){
            // x,y값을 인자로 주는 경우임
            this.x -= x;
            this.y -= y;
        }

        return this;
    }
    mult(v){
        // 들어오는 인자의 타입이 숫자인 경우
        if(typeof v === "number"){
            this.x *= v;
            this.y *= v;
        }
        // 아닌 경우 = Vector 인스턴스가 들어오는 경우
        else{
            this.x *= v.x;
            this.y *= v.y;
        }

        return this;
    }
    // setXY()의 인자 값으로 Vector 인스턴스의 x, y값 세팅
    setXY(x, y){
        this.x = x;
        this.y = y;

        return this;
    }
    // Vector 인스턴스 사이의 거리 측정
    dist(v){
        const dx = this.x - v.x;
        const dy = this.y - v.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}