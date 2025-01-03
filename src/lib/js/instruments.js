import { base } from '$app/paths';

let instruments = { 
    "DefaultLine": {
        "Synth":"Synth",
        "Presets":{
            "envelope": {
            "decay": 0,
            "sustain":1,
            "release":0.5
        },
        "oscillator" : {
            "count": 8,
            "spread": 30,
            "type": "sawtooth4"
        }
        }
    },    
    "Cello":{
        "Synth":"FMSynth",
        "Presets":{
            "harmonicity": 3.01,
            "volume":0,
            "modulationIndex": 14,
            "oscillator": {
                "type": "triangle"
            },
            "envelope": {
                "attack": 0.2,
                "decay": 0.3,
                "sustain": 0.1,
                "release": 1.2
            },
            "modulation" : {
                "type": "square"
            },
            "modulationEnvelope" : {
                "attack": 0.01,
                "decay": 0.5,
                "sustain": 0.2,
                "release": 0.1
            }
        }
    },
    "Kalimba":{
        "Synth":"FMSynth",
        "Presets":{
            "harmonicity":8,
            "volume":5,
            "modulationIndex": 2,
            "oscillator" : {
                "type": "sine"
            },
            "envelope": {
                "attack": 0.001,
                "decay": 2,
                "sustain": 0.1,
                "release": 2
            },
            "modulation" : {
                "type" : "square"
            },
            "modulationEnvelope" : {
                "attack": 0.002,
                "decay": 0.2,
                "sustain": 0,
                "release": 0.2
            }
        }
    },
    "ThinSaws":{
        "Synth":"FMSynth",
        "Presets":{
            "harmonicity": 0.5,
            "modulationIndex": 1.2,
            "oscillator": {
                "type": "fmsawtooth",
                "modulationType" : "sine",
                "modulationIndex" : 20,
                "harmonicity" : 3
            },
            "envelope": {
                "attack": 0.05,
                "decay": 0.3,
                "sustain": 0.1,
                "release": 1.2
            },
            "modulation" : {
                "volume" : 0,
                "type": "triangle"
            },
            "modulationEnvelope" : {
                "attack": 0.35,
                "decay": 0.1,
                "sustain": 1,
                "release": 0.01
            }
        }
    },
    "Bah":{
        "Synth":"MonoSynth",
        "Presets":{
            "volume" : 10,
            "oscillator": {
                "type": "sawtooth"
            },
            "filter": {
                "Q": 2,
                "type": "bandpass",
                "rolloff": -24
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.2,
                "release": 0.6
            },
            "filterEnvelope": {
                "attack": 0.02,
                "decay": 0.4,
                "sustain": 1,
                "release": 0.7,
                "releaseCurve" : "linear",
                "baseFrequency": 20,
                "octaves": 5
            }
        }
    },
    "BassGuitar":{
        "Synth":"MonoSynth",
        "Presets":{
            "oscillator": {
                "type": "fmsquare5",
                "modulationType" : "triangle",
                  "modulationIndex" : 2,
                  "harmonicity" : 0.501
            },
            "filter": {
                "Q": 1,
                "type": "lowpass",
                "rolloff": -24
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.4,
                "release": 2
            },
            "filterEnvelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.8,
                "release": 1.5,
                "baseFrequency": 50,
                "octaves": 4.4
            }
        }
    },
    "BrassCircuit":{
        "Synth":"MonoSynth",
        "Presets":{
            "portamento": 0.01,
            "oscillator": {
                "type": "sawtooth"
            },
            "filter": {
                "Q": 2,
                "type": "lowpass",
                "rolloff": -24
            },
            "envelope": {
                "attack": 0.1,
                "decay": 0.1,
                "sustain": 0.6,
                "release": 0.5
            },
            "filterEnvelope": {
                "attack": 0.05,
                "decay": 0.8,
                "sustain": 0.4,
                "release": 1.5,
                "baseFrequency": 2000,
                "octaves": 1.5
            }
        }
    },
    "Pianoetta":{
        "Synth":"MonoSynth",
        "Presets":{
            "oscillator": {
                "type": "square"
            },
            "filter": {
                "Q": 2,
                "type": "lowpass",
                "rolloff": -12
            },
            "envelope": {
                "attack": 0.005,
                "decay": 3,
                "sustain": 0,
                "release": 0.45
            },
            "filterEnvelope": {
                "attack": 0.001,
                "decay": 0.32,
                "sustain": 0.9,
                "release": 3,
                "baseFrequency": 700,
                "octaves": 2.3
            }
        }
    },
    "Wind":{
        "Synth":"Synth",
        "Presets":{
            "portamento" : 0.0,
            "oscillator": {
                "type": "square4"
            },
            "envelope": {
                "attack": 2,
                "decay": 1,
                "sustain": 0.2,
                "release": 2
            }
        }
    },
    "ElectricHarpsicord":{
        "Synth":"Synth",
        "Presets":{
            "portamento" : 0.2,
            "volume": -5,
            "oscillator": {
                "type": "sawtooth"
            },
            "envelope": {
                "attack": 0.03,
                "decay": 0.1,
                "sustain": 0.2,
                "release": 0.02
            }
        }
    },
    "Marimba":{
        "Synth":"Synth",
        "Presets":{
            "oscillator": {
                "partials": [
                    1,
                    0,
                    2,
                    0,
                    3
                ]
            },
            "envelope": {
                "attack": 0.001,
                "decay": 1.2,
                "sustain": 0,
                "release": 1.2
            }
        }
    },
    "Steelpan":{
        "Synth":"Synth",
        "Presets":{
            "oscillator": {
                "type": "fatcustom",
                  "partials" : [0.2, 1, 0, 0.5, 0.1],
                  "spread" : 40,
                  "count" : 3
            },
            "envelope": {
                "attack": 0.001,
                "decay": 1.6,
                "sustain": 0,
                "release": 1.6
            }
        }
    },
    "SuperSaw":{
        "Synth":"Synth",
        "Presets":{
            "oscillator" : {
                "type" : "fatsawtooth",
                "count" : 3,
                "spread" : 30
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.5,
                "release": 0.4,
                "attackCurve" : "exponential"
            }
        }
    },
    "TreeTrunk":{
        "Synth":"Synth",
        "Presets":{
            "oscillator": {
                "type": "sine"
            },
            "envelope": {
                "attack": 0.001,
                "decay": 0.1,
                "sustain": 0.1,
                "release": 1.2
            }
        }

    },
    "Dog Barking":{
        "Synth":"Sampler",
        "Presets":{
            "urls": {
                "F3": `/samples/novelty/dog-barking2.mp3`
            },
            "baseUrl": `${base}`
        }
    },
    "Sad Trombone":{
        "Synth":"Sampler",
        "Presets":{
            "urls": {
                "G3": "trombone3-G3.mp3",
                "C4": "trombone3-C4.mp3",
                "A4": "trombone3-A4.mp3",
                "D5": "trombone3-D5.mp3"
            },
            "baseUrl": `${base}`
        }
    },
    "Car Horn":{
        "Synth":"Sampler",
        "Presets":{
            "urls": {
                "B3": `/samples/novelty/car-horn-B3.mp3`,
                "B4": `/samples/novelty/car-horn-B4.mp3`,
                "B5": `/samples/novelty/car-horn-B5.mp3`
            },
            "baseUrl": `${base}`
        }
    },
    "Piano":{
        "Synth":"Sampler",
        "Presets":{
            "volume":5,
            "urls": {
                "D3": `/samples/piano/piano-D3.mp3`,
                "D2": `/samples/piano/piano-D2.mp3`,
                "E4": `/samples/piano/piano-E4.mp3`,
                "E5": `/samples/piano/piano-E5.mp3`,
                "D1": `/samples/piano/piano-D1.mp3`,
                "D5": `/samples/piano/piano-D5.mp3`,
                "E1": `/samples/piano/piano-E1.mp3`,
                "D4": `/samples/piano/piano-D4.mp3`,
                "E2": `/samples/piano/piano-E2.mp3`,
                "E3": `/samples/piano/piano-E3.mp3`,
                "C4": `/samples/piano/piano-C4.mp3`,
                "B1": `/samples/piano/piano-B1.mp3`,
                "C5": `/samples/piano/piano-C5.mp3`,
                "B3": `/samples/piano/piano-B3.mp3`,
                "C6": `/samples/piano/piano-C6.mp3`,
                "B2": `/samples/piano/piano-B2.mp3`,
                "C2": `/samples/piano/piano-C2.mp3`,
                "C3": `/samples/piano/piano-C3.mp3`,
                "C1": `/samples/piano/piano-C1.mp3`,
                "B5": `/samples/piano/piano-B5.mp3`,
                "B4": `/samples/piano/piano-B4.mp3`,
                "A5": `/samples/piano/piano-A5.mp3`,
                "A4": `/samples/piano/piano-A4.mp3`,
                "A3": `/samples/piano/piano-A3.mp3`,
                "A2": `/samples/piano/piano-A2.mp3`,
                "A1": `/samples/piano/piano-A1.mp3`,
                "F2": `/samples/piano/piano-F2.mp3`,
                "F3": `/samples/piano/piano-F3.mp3`,
                "F1": `/samples/piano/piano-F1.mp3`,
                "G5": `/samples/piano/piano-G5.mp3`,
                "G4": `/samples/piano/piano-G4.mp3`,
                "F4": `/samples/piano/piano-F4.mp3`,
                "G1": `/samples/piano/piano-G1.mp3`,
                "F5": `/samples/piano/piano-F5.mp3`,
                "G3": `/samples/piano/piano-G3.mp3`,
                "G2": `/samples/piano/piano-G2.mp3`,
            },
            "baseUrl": `${base}`
        }
    },
    "Strings":{
        "Synth":"Sampler",
        "Presets":{
            "volume":10,
            "urls": {
                "C5": `/samples/strings/strings-C5.mp3`,
                "C4": `/samples/strings/strings-C4.mp3`,
                "B2": `/samples/strings/strings-B2.mp3`,
                "C6": `/samples/strings/strings-C6.mp3`,
                "B3": `/samples/strings/strings-B3.mp3`,
                "C3": `/samples/strings/strings-C3.mp3`,
                "C2": `/samples/strings/strings-C2.mp3`,
                "B4": `/samples/strings/strings-B4.mp3`,
                "B5": `/samples/strings/strings-B5.mp3`,
                "D2": `/samples/strings/strings-D2.mp3`,
                "D3": `/samples/strings/strings-D3.mp3`,
                "E5": `/samples/strings/strings-E5.mp3`,
                "D5": `/samples/strings/strings-D5.mp3`,
                "E3": `/samples/strings/strings-E3.mp3`,
                "E2": `/samples/strings/strings-E2.mp3`,
                "F3": `/samples/strings/strings-F3.mp3`,
                "F2": `/samples/strings/strings-F2.mp3`,
                "G4": `/samples/strings/strings-G4.mp3`,
                "G5": `/samples/strings/strings-G5.mp3`,
                "F5": `/samples/strings/strings-F5.mp3`,
                "G2": `/samples/strings/strings-G2.mp3`,
                "G3": `/samples/strings/strings-G3.mp3`,
                "A4": `/samples/strings/strings-A4.mp3`,
                "A5": `/samples/strings/strings-A5.mp3`,
                "A2": `/samples/strings/strings-A2.mp3`,
                "A3": `/samples/strings/strings-A3.mp3`
            },
            "baseUrl": `${base}`
        }
    },

    "Cheering":{
        "Synth":"Player",
        "Presets":`/samples/novelty/cheering2.mp3`
    }

}

export { instruments };