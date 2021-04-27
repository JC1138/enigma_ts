import {letterToNumber} from "../helper/letter_converter"

export interface PlugBoard {
    map: (letter: number) => number
}

export const createPlugboard = (settings: string[][] = []): PlugBoard => {
    const mapping: number[] = []
    settings.forEach((setting) => {
        const l1 = letterToNumber(setting[0])
        const l2 = letterToNumber(setting[1])
        mapping[l1] = l2
        mapping[l2] = l1
    })
    return {
        map: (letter: number) => mapping[letter] || letter
    }
}