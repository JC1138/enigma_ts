import {createEnigmaMachine, EnigmaConfig} from "./enigma_machine"

const config: EnigmaConfig = {
    rotorLabels: ["I", "III", "III"],
    initialPositions: ["A", "C", "A"],
    reflectorLabel: "Reflector A",
    ringSettings: ["A", "B", "C"]
}

const enigmaMachine = createEnigmaMachine(config)

// console.log(enigmaMachine.encode("LZFBD"))

const message = "Hello World".replace(/\s+/g, "").toUpperCase()
const encoded = enigmaMachine.encode(message)
enigmaMachine.reset({})
const decoded = enigmaMachine.encode(encoded)


console.log(`Message: ${message}`)
console.log(`Encoded: ${encoded}`)
console.log(`Decoded: ${decoded}`)
console.log(message === decoded)
