export interface Wiring {
    rotors: {
        [key: string]: {
            mapping: string,
            notch: string[]
        }
    }
    reflectors: {
        [key: string]: string
    }
}

export default {
    rotors: {    
        "none": {
            mapping: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            notch: ["A"]
        },
        "I": {
            mapping: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
            notch: ["Q"]
        },
        "II": {
            mapping: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
            notch: ["E"]
        },
        "III": {
            mapping: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
            notch: ["V"]
        },
        "IV": {
            mapping: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
            notch: ["J"]
        },
        "V": {
            mapping: "VZBRGITYUPSDNHLXAWMJQOFECK",
            notch: ["Z"]
        },
        "VI": {
            mapping: "JPGVOUMFYQBENHZRDKASXLICTW",
            notch: ["Z, M"]
        },
        "VII": {
            mapping: "NZJHGRCXMYSWBOUFAIVLPEKQDT",
            notch: ["Z, M"]
        },
        "VIII": {
            mapping: "FKQHTLXOCBJSPDZRAMEWNIUYGV",
            notch: ["Z, M"]
        }
    },
    reflectors: {
        "Reflector A": "EJMZALYXVBWFCRQUONTSPIKHGD"
    }
} as Wiring
