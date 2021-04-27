import { createPlugboard, PlugBoard } from "./plugboard/plugboard";
import { createReflector, Reflector, Rotor } from "./rotor/rotor";
import {createRotors, loadReflector} from "./rotor/rotor_loader"
import {createRotorBox, RotorBox} from "./rotor/rotor_box"
import { letterToNumber, numberToLetter } from "./helper/letter_converter";

export interface EnigmaConfig {
    rotorLabels?: string[]
    initialPositions?: string[]
    reflectorLabel?: string
    plugboardConnections?: string[][]
}

export interface EnigmaMachine {
    reset: (config: EnigmaConfig) => void
    encode: (message: string) => string
    printState: () => void
}

export const createEnigmaMachine = ({
    rotorLabels,
    initialPositions, 
    reflectorLabel,
    plugboardConnections,
}: EnigmaConfig): EnigmaMachine => {

    let rotors: Rotor[];
    let reflector: Reflector;
    let plugboard: PlugBoard;
    let rotorBox: RotorBox

    const _init = () => {
        if (!(rotorLabels && initialPositions && reflectorLabel)) {
            throw new Error("Not enough information to initialize Enigma Machine!")
        }
        rotors = createRotors(rotorLabels, initialPositions)
        reflector = loadReflector(reflectorLabel)
        plugboard = createPlugboard(plugboardConnections)
        rotorBox = createRotorBox(rotors, reflector)
    }

    _init()

    const reset = ({
        rotorLabels: _rotorLabels, 
        initialPositions: _initialPositions, 
        reflectorLabel: _reflectorLabel, 
        plugboardConnections: _plugboardConnections
    }: EnigmaConfig) => {
        rotorLabels = _rotorLabels || rotorLabels
        initialPositions = _initialPositions || initialPositions
        reflectorLabel = _reflectorLabel || reflectorLabel
        plugboardConnections = _plugboardConnections || plugboardConnections
        _init()
    }

    const encode = (message: string) => {
        let encoded = ""

        for (let i = 0; i < message.length; i++) {
            let encodedNum = letterToNumber(message.charAt(i))
            encodedNum = plugboard.map(encodedNum)
            encodedNum = rotorBox.encode(encodedNum)
            encodedNum = plugboard.map(encodedNum)
            encoded += numberToLetter(encodedNum)
        }
        return encoded
    }

    const printState = () => {
        rotorBox.printState()
    }

    return {
        reset,
        encode,
        printState
    }
}