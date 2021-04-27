import { letterToNumber } from "../helper/letter_converter"
import {createReflector, createRotor, Rotor} from "./rotor"

import wirings from "./wirings"

export interface RotorConfig {
        label: string, 
        initialPosition: number,
    }[]

export const loadReflector = (reflectorLabel: string) => {
    const reflector = wirings.reflectors[reflectorLabel]
    if(!reflector) {
        throw new Error(`No reflector with label: ${reflectorLabel}`)
    }
    return createReflector(reflector)
}

export const loadRotors = (rotorConfig: RotorConfig[]) => {
    const rotors: Rotor[] = []
    rotorConfig.forEach(rotor => {
        const rotorWiring = wirings.rotors[rotor.label]
        if (!rotorWiring) {
            throw new Error(`No rotor with label: ${rotor.label}`)
        }
        rotors.push(createRotor({
            ...rotorWiring,
            ...rotor
        }))
    })
    return rotors
}

export const createRotors = (rotorLabels: string[], initialPositions: string[]) => {
    if(rotorLabels.length !== initialPositions.length) {
        throw new Error(`Number of rotors(${rotorLabels.length}) and initial positions(${initialPositions.length}) do not match!`)
    }
    const rotorConfig: RotorConfig[] = []
    for (let i = 0; i < rotorLabels.length; i++) {
        rotorConfig.push({
            label: rotorLabels[i],
            initialPosition: letterToNumber(initialPositions[i])
        })
    }
    return loadRotors(rotorConfig)
}