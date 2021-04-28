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
    ringSetting: number
    initialPosition: number
}

export const getMapper = (wiring: string, ringSetting: number = 0) => {
    const mapping: number[] = []
    const reverseMapping: number[] = []
    for (let i = 0; i < wiring.length; i++) {
        const toI = letterToNumber(wiring.charAt(i))
        mapping[i] = toI
        reverseMapping[toI] = i
    }
    const bounds = keepInBounds(wiring.length)
    return (letter: number, reverse = false, curPosition = 0) => {
        // Offset letter input based on current rotor position 
        // e.x. If rotorPos = "C" and input = "D", then effective input is "D"-"C"="A"
        //         rotorPos = "C"     input = "A",      effective input == bounds("A"-"C") = "Z" + 1 - 2 = "Y"
        let mapIdx = bounds(letter - curPosition + ringSetting)
        const mapLetter = (!reverse && mapping || reverseMapping)[mapIdx] // Get next letter
        return  bounds(mapLetter + curPosition - ringSetting) // Offset mapped letter based on current position
    }
}

export const keepInBounds = (upperBound: number) => (num: number) => 
    num < 0 && upperBound + num 
    || num % upperBound

export const createReflector = (wiring: string): Reflector => {
    const mapper = getMapper(wiring)
    return  {
        map: (letter: number) => mapper(letter)
    }
}

export const createRotor = ({mapping, notch , label, ringSetting, initialPosition }: RotorSettings): Rotor => {
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
    console.log("Calling getMapper" + label)
    const mapper = getMapper(mapping, ringSetting)

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