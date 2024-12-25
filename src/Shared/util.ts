export const getRatio = () => {
    const {innerWidth, innerHeight} = window
    return innerWidth / innerHeight
}

export const getRandomIntInclusive = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const isObject = (value: unknown): value is object =>
    typeof value === "object" && value !== null && !Array.isArray(value);



/**
 * Эмулятор запроса API
 * @param mockResponse
 * @param mockRequest
 */
export async function apiEmulator<Req, Res> (mockResponse: Res, mockRequest?: Req) {

    console.log("mockRequest: ", mockRequest)

    const emulator  = new Promise<Res>((resolve, reject) => {
        setTimeout(() => {
            const rand = getRandomIntInclusive(1,2)
            if (rand > 1)  reject ({status: "error", error: "SyntaxError: Unexpected token"})
            resolve (mockResponse)
        }, getRandomIntInclusive(1_000, 5_000))
    })

    return  await emulator
}