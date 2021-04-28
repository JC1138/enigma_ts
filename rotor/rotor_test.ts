import {createRotor, createReflector, Rotor, getMapper} from "./rotor"
import {letterToNumber, numberToLetter} from "../helper/letter_converter"

import {createRotors, loadReflector} from "./rotor_loader"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const testConfigs = {
    none: {
        rotorLabels: ["none"],
        initialPositions: ["A"],
        ringSettings:["A"]
    },
    zero: {
        rotorLabels: ["I", "II", "III"],
        initialPositions: ["A", "A", "A"],
        reflectorLabel: "Reflector A",
        ringSettings: ["A", "A", "A"]
    }
}

const testZeroNoRotate = () => {
    const {rotorLabels, initialPositions, reflectorLabel, ringSettings} = testConfigs.zero
    const rotors = createRotors(rotorLabels, initialPositions, ringSettings)
    const reflector = createReflector(reflectorLabel)

    const testCases = [
        [
            ["A", "E"],
            ["E", "S"],
            ["S", "G"]
        ]
    ]
    testCases.forEach((testCase) => {
        testCase.forEach(([input, expected], i) => {
            const encoded = numberToLetter(rotors[i].encode(letterToNumber(input)))
            _assertEquals(encoded, expected)
        })
    })
}

const _assertEquals = (actual: any, expected: any) => {
    const result = actual === expected && "PASS" || "FAIL"
    console.log(`[${result}]: actual=${actual}, expected=${expected}`)
}


const testRotorPositions = () => {
    const {rotorLabels, initialPositions, ringSettings} = testConfigs.zero
    const rotor = createRotors(rotorLabels, initialPositions, ringSettings)[0]


    const steps = [
        ["e", "A", "A"],
        ["r"],
        ["e", "A", "B"],
        ["r"],
        ["e", "A", "C"]
    ].forEach(step => {
        const [instuc, letter, expected] = step
        if (instuc === "e") {
            _assertEquals(alphabet[rotor.encode(alphabet.search(letter))], expected)
        }
        if (instuc === "r") rotor.rotate()
    })
    
}

const testMapper = () => {
    const mapper = getMapper(alphabet)
    const steps = [
        [0, 0, 0],
        [1, 0, 1],
        [2, 0, 2],
        [3, 0, 2],
        [4, 0, 2],
        [5, 0, 2],
    ].forEach(step => {
        const [offset, input, expected] = step
        const actual = mapper(input, false, offset)
        _assertEquals(actual, expected)
    })
}

testMapper()


// testZeroNoRotate()
