export function encodeStrBase64(data) {
    return Buffer.from(data).toString('base64')
}

export function decodeStrBase64(data) {
    return Buffer.from(data, 'base64').toString('ascii')
}

export function reverseString(str) {
    return str.split("").reverse().join("");
}

export function encodeCookie(data) {
    let reverseStr = reverseString(data)
    let encodeData = encodeStrBase64(reverseStr)
    return reverseString(encodeData)
}

export function decodeCookie(data) {
    let reverseStr = reverseString(data)
    let decodeStr = decodeStrBase64(reverseStr)
    return reverseString(decodeStr)
}