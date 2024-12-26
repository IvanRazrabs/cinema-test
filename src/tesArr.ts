const obj1 = {
    a: 1,
    b: "2"
}


class C {
    a: number
    b: string
    c: string
    constructor(a: number, b: string) {
        this.a = a
        this.b = b
        this.c = "3"
    }

    get four () {
        return this.a + this.b
    }

    six () {
        return this.a + this.b + this.c
    }
}

const obj2 = new C(1, "2")

const arr = []

console.log(arr.toString())