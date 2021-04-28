import { letterToNumber } from "../helper/letter_converter"
import {createReflector, createRotor, Rotor} from "./rotor"

import wirings from "./wirings"

export interface RotorConfigs {
        label: string, 
        initialPosition: number,
        ringSetting: number,
    }[]

export const loadReflector = (reflectorLabel: string) => {
    const reflector = wirings.reflectors[reflectorLabel]
    if(!reflector) {
        throw new Error(`No reflector with label: ${reflectorLabel}`)
    }
    return createReflector(reflector)
}

export const loadRotors = (rotorConfigs: RotorConfigs[]) => {
    const rotors: Rotor[] = []
    rotorConfigs.forEach(rotorConfig => {
        const rotorWiring = wirings.rotors[rotorConfig.label]
        if (!rotorWiring) {
            throw new Error(`No rotor with label: ${rotorConfig.label}`)
        }
        rotors.push(createRotor({
            ...rotorWiring,
            ...rotorConfig
        }))
    })
    return rotors
}

export const createRotors = (rotorLabels: string[], initialPositions: string[], ringSettings: string[]) => {
    if(rotorLabels.length !== initialPositions.length || rotorLabels.length !== ringSettings.length) {
        throw new Error(`Number of rotors(${rotorLabels.length}), initial positions(${initialPositions.length}) and ring settings ${ringSettings.length} do not match!`)
    }
    const rotorConfig: RotorConfigs[] = []
    for (let i = 0; i < rotorLabels.length; i++) {
        rotorConfig.push({
            label: rotorLabels[i],
            initialPosition: letterToNumber(initialPositions[i]),
            ringSetting: letterToNumber(ringSettings[i])
        })
    }
    return loadRotors(rotorConfig)
}