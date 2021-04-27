import {Rotor, Reflector} from "./rotor"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export type RotorBox = {
    encode: (letter: number) => number
    printState: () => void
}

export const createRotorBox = (rotors: Rotor[], reflector: Reflector): RotorBox => { 
    const encode = (letter: number) => {
        for (let i = 0; i < rotors.length; i++) {
            if(!rotors[i].rotate()) break
        }
        let encoded = letter
        rotors.forEach((rotor) => {
            encoded = rotor.encode(encoded)
        })
        encoded = reflector.map(encoded)
        for (let i = rotors.length - 1; i >= 0; i--) {
            encoded = rotors[i].encode(encoded, true)
        }
        return encoded
    }
    const printState = () => {
        rotors.forEach(rotor => {
            rotor.printState()
        })
    }

    return {
        encode,
        printState
    }
}