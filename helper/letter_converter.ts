export const letterToNumber = (letter: String) => letter.charCodeAt(0) - 65

export const numberToLetter = (num: number) => String.fromCharCode(num + 65)
