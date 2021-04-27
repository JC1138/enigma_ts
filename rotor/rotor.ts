import {letterToNumber, numberToLetter} from "../helper/letter_converter"

export type Rotor = {
    label: string
    rotate: () => boolean
    setPosition: (pos: number) => void
    encode: (letter: number, reverse?: boolean) => number
    printState: () => void
}

export type Reflector = {
    map: (letter: number) => number
}

export interface RotorSettings {
    mapping: string,
    notch: string[],
    label: string,
    initialPosition: number
}

export const getMapper = (wiring: string) => {
    const mapping: number[] = []
    const reverseMapping: number[] = []
    for (let i = 0; i < wiring.length; i++) {
        const toI = letterToNumber(wiring.charAt(i))
        mapping[i] = toI
        reverseMapping[toI] = i
    }
    const bounds = keepInBounds(wiring.length)
    console.log(`Mapping Length: ${mapping.length}`)
    return (letter: number, reverse = false, curPosition = 0) => {
        let mapIdx = bounds(letter - curPosition)
        // console.log(`letter: ${letter}, curPosition: ${curPosition}, mapIdx: ${mapIdx}`)
        // const mapIdx = keepInBounds(curPosition + letter, wiring.length)
        const nextLetter =  bounds((!reverse && mapping || reverseMapping)[mapIdx] + curPosition)
        // console.log(nextLetter)
        return nextLetter
    }
}

export const keepInBounds = (upperBound: number) => (num: number) => 
        num < 0 && upperBound + num
        || num < upperBound && num
        || num % upperBound

// console.log("******")
// console.log(keepInBounds(26, 26))
// console.log("******")

export const createReflector = (wiring: string): Reflector => {
    const mapper = getMapper(wiring)
    return  {
        map: (letter: number) => mapper(letter)
    }
}

export const createRotor = ({mapping, notch , label, initialPosition }: RotorSettings): Rotor => {
    let curPosition = initialPosition

    const setPosition = (pos: number) => {
        curPosition = keepInBounds(mapping.length)(pos)
    }

    const rotate = () => {
        let turnNextRotor = false
        notch.forEach(n => {
            if(curPosition === letterToNumber(n))
                turnNextRotor = true
        })
        setPosition(curPosition + 1)
        return turnNextRotor
    }
    const mapper = getMapper(mapping)

    const encode = (letter: number, reverse = false) => mapper(letter, reverse, curPosition)

    const printState = () => {
        console.log(`\nLabel: ${label}, curPosition: ${curPosition}\n`)
    }
    
    // (letter: number, reverse = false) => 
    //     (!reverse && mapping || reverseMapping)[(curPosition + letter)  % wiring.length]


    return {
        label,
        rotate,
        setPosition,
        encode,
        printState
    }
}




        // console.log(wiring)
        // console.log(curPosition)
        // console.log()
        // console.log(`letter: ${letter} curPosition: ${curPosition}`)
        // console.log(`curPosition + letter: ${curPosition + letter}`)
        // console.log(`wiring.length: ${wiring.length}`)
        // console.log(`(curPosition + letter)  % wiring.length: ${(curPosition + letter)  % wiring.length}`)
        // console.log(`mapping[]: ${mapping[(curPosition + letter)  % wiring.length]}` )
        // console.log(`nextIdx: ${nextIdx}\n`)