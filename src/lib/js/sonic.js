import * as tone from 'tone'
import * as d3 from 'd3' 
import { numberFormatSpeech } from './toolbelt'
import instruments from '$lib/data/instruments.json';
import notes from '$lib/data/notes.json';

const timer = ms => new Promise(res => setTimeout(res, ms))

// The main function for playing a series of data

const trombone2 = {
  "urls": {
    "G3": "trombone2-end-G3.mp3",
    "F5": "trombone2-end-F5.mp3",
    "4": "trombone2-end-B4.mp3",
    "C4": "trombone2-end-C4.mp3",
    "F4": "trombone2-end-F4.mp3",
    "D3": "trombone2-end-D3.mp3"
  },
          "baseUrl": "/"
      }  

export default class sonic {
  
  constructor(settings) {
      this.synths = []
      this.panners = []
      // this.synth2 = null
      this.isPlaying = false
      this.hasRun = false
      this.notes = []
      notes.forEach((note) => {
        this.notes.push(note.Frequency)
      })
  }

  async loadSynths(options) {
    console.log("Loading synths...")
    
    tone.start()
    
    // Setup for dynamic panning
    let pannerRange = [-0.75,0.75]
    if (!options.simultaneous) {
      console.log("yeh?")
      pannerRange = [0,0]
    }

    let pannerScale = d3.scaleQuantize()
      .domain([0,options.selectedInstruments.length - 1])
      .range(pannerRange)

    console.log("pan domain",pannerScale.range())    

    // Loop through the instruments object and make a synth object for each one in this.synths

    options.selectedInstruments.forEach((selectedInstrument,i) => {

      // Set up the things
      console.log(i)
      let settings = instruments[selectedInstrument.instrument]
      let synthType = settings.Synth
      let instrument = selectedInstrument.instrument
      let synthPreset = settings.Presets

      console.log(synthType, instrument)
      console.log("pan value", pannerScale(i))
      // IF not a sample, update array of synths with a new synth object

      let panner = new tone.Panner(pannerScale(i)).toDestination()

      if (synthType != "Sampler" && synthType != "Player") {
          let newSynth = new tone[synthType](synthPreset)
          newSynth.connect(panner);
          this.synths[i] = newSynth
          return true
      }

      // It's a sampler so make a sampler object

      else if (synthType == "Sampler") {

        // let synth = this.synth
        // let synth2 = this.synth2
  
        console.log("Sampler")
  
          if (instrument != "Sad Trombone") {
            synthPreset.onload = () => {
              console.log("samples loaded")
              return true
              }
            let newSynth = new tone[synthType](synthPreset)
            newSynth.connect(panner);
            this.synths[i] = newSynth 
          }
          
          else if (instrument == "Sad Trombone") {
  
            // let load1 = false
            // let load2 = false
  
            // console.log("Loading trombones")
            // synthPreset.onload = () => {
            //   console.log("first trombone loaded")
            //   load1 = true
            //   loadChecher()
            // }
            // this.synth = new tone[synthType](synthPreset).toDestination();
            
            // this.synth2 = new tone.Sampler({
            //   "urls": {
            //       "G4": "trombone3-end-G4.mp3",
            //     },
            //   "baseUrl": "/",
            //   onload: () => {
            //     console.log("second trombone loaded")
            //     load2 = true
            //     loadChecher()
            //   }
  
            // }).toDestination();
      
            // console.log(load1, load2)
            // function loadChecher() {
            //   if (load1 && load2) {
            //     console.log("both loaded")
            //   return true
            //   }
            // }
       
           
          }
  
        }    


    }) 


      // else if (synthType == "Player") {
      //   console.log("player")
      //   this.synth = new tone[synthType](synthPreset).toDestination();
      //   this.synth.loop = true;
      //   // this.synth.autostart = true;

      //   this.synth2 = new tone.Sampler({
      //     "urls": {
      //         "G3": "football.mp3",
      //       },
      //     "baseUrl": "/",
      //     onload: () => {
      //       console.log("loaded football")
      //       return true
      //     }

      //   }).toDestination();

        
      // }

  } // end loadSynth


  beep(freq, options) {

    return new Promise( (resolve, reject) => {
      tone.Transport.stop()
      tone.Transport.cancel()
      
      let synth = this.synths[0]
      synth.unsync()
      
      synth.triggerAttackRelease(freq, 0.5)
      setTimeout(success, 600)
      
      // tone.Transport.position = "0:0:0"
      // tone.Transport.start()
  
      function success () {
        resolve({ status : "success"})
      }
  
  
    }).catch(function(e) {
      console.log(e)
      reject(e);
  
  });
  
  }
  
  speaker(text) {
  
    return new Promise( (resolve, reject) => {
  
    if ('speechSynthesis' in window) {
     
      var msg = new SpeechSynthesisUtterance();
  
      msg.text = text
  
      window.speechSynthesis.speak(msg);
  
      msg.onend = function() {
  
        resolve({ status : "success"})
  
      };
  
    } else {
  
      resolve({ status : "no txt to speach"})
  
    }
  
    }).catch(function(e) {
  
    reject(e);
  
  });
  }
  
  playAudio(options, domainY, domainX, interval, data, keys = [], animateCont, animateDisc, makeCircle, selected = []) {
    
    // note duration in seconds
    

    // Re-do domainY and domainX as audio and label domains as X and Y do not make sense for audio?

    const note = options.duration / data.length
    
    console.log("note", note)
    console.log("data", data)
    console.log("domainY",domainY)
    
    // set up the data structure we need, and the keys of data to be sonified

    let sonicData = {}
    let synths = this.synths
    // let synth2 = this.synth2
    var hasRun = this.hasRun
    let dataKeys = Object.keys(data[0])

    let xVar = dataKeys[0]

    let hideNullValues = true
    
    if (keys.length === 0) {
        keys = dataKeys.slice(1)
    }

    console.log(keys)
    keys.forEach(function(key) {
        sonicData[key] = []
        data.forEach((d, i) => {
        if (d[key] != null) {
            let newData = {}
            newData[xVar] = d[xVar]
            newData[key] = d[key]
            newData.sonic_index = i
            sonicData[key].push(newData)
        } else if (!hideNullValues) {
            sonicData[key].push(null)
        }
        })
    })

    // Setting the scale range for linear scale
    
    let range = [options.low,options.high]

    // Invert if needed

    if (options.invertAudio) {
      range = range.reverse()
    }
    
    // If we're clamping the scale to musical notes, use a range of actual frequency values

    if (options.scaleNotes) {
      let bottom = this.notes.findIndex(e => e == options.low)
      let top = this.notes.findIndex(e => e == options.high)
      range = this.notes.slice(bottom, top + 1)

      if (options.invertAudio) {
        range = range.reverse()
      }

    }
    console.log("range", range)
    let scale = null 
    
    // If we're using a scale of discrete notes, use scaleQuantize

    if (options.scaleNotes) {
      scale = d3.scaleQuantize()
        .domain(domainY)
        .range(range)
    }

    // Otherwise default to linear

    else {
      scale = d3.scaleLinear()
      .domain(domainY)
      .range(range)
    }

    // Volume scaling

    let volume = d3.scaleLinear()
      .domain(domainY)
      .range([-12,0])  
    

    function makeNoise(noiseKeys) {
        console.log("makeNoise")
        tone.Transport.stop()
        tone.Transport.cancel()
       
        noiseKeys.forEach(async function(key) {

            let keyI = keys.indexOf(key)
            console.log(keyI)
            let synth = synths[keyI]

            if (options.audioRendering == "discrete") {
              
              synth.sync()

              // if (options.selectedInstrument === "Sad Trombone" || options.selectedInstrument === "Cheering") {
              //   console.log("syncing")
              //   synth2.sync()
              // }

              // synths[i].volume.value = volume(sonicData[key][0][key])
              // synth.start(0)
          
            }
            let filterData = sonicData[key]
            
            if (selected.length > 0) {
              console.log("selected", selected)
              filterData = sonicData[key].filter(d => selected.includes(d[xVar]))
            }
            console.log("filterData2", filterData)
            for (let i = 0; i < filterData.length; i++) {
              const d = filterData[i];
              if (options.audioRendering == "discrete") {
                  
                if (options.selectedInstrument != "Sad Trombone" && options.selectedInstrument != "Cheering") {
                  // synth.volume.value = -12
                  synth.triggerAttackRelease(scale(d[key]), note, note * i)
                  
                  tone.Transport.schedule(function(){
                      animateDisc(key, i, filterData.length)
                      // synth.volume.rampTo(volume(d[key]), note);
                      // synth.volume.value = volume(d[key])
                      // synth.triggerAttackRelease(scale(d[key]), note)
                  }, i * note);

                }
                
                // else if (options.selectedInstrument == "Sad Trombone"){
                 
                //   if (i < sonicData[key].length - 1) {
                //     synth.triggerAttackRelease(scale(d[key]), note, note * i)

                //     tone.Transport.schedule(function(){
                //       animateDisc(key, i)
                //      }, i * note);
                //   }
                //   else if (i == sonicData[key].length - 1) {
                //     console.log("let's hear that wahhhhhh!!")
                //     synth2.triggerAttackRelease(scale(d[key]), note, note * i)
                //     tone.Transport.schedule(function(){
                //       animateDisc(key, i)
                //      }, i * note);
                //   }
              
                // }

                // else if (options.selectedInstrument == "Cheering") {

                //   synth2.triggerAttackRelease(scale(d[key]), note, note * i)

                //   tone.Transport.schedule(function(){

                //     if (i == 0) { 
                //       // synth.volume.value = volume(d[key])
                //       // synth.start(0)
                //     }

                //     else {
              
                //       synth.volume.rampTo(volume(d[key]),note);
                //     }  
                    
                //     animateDisc(key, i, sonicData[key].length)
                //   }, i * note);
                  
                 
                // }

              }

              else if (options.audioRendering == "continuous") {
                console.log("making continuous noise")
                if (i == 0) { 
                  synth.triggerAttackRelease(scale(d[key]), filterData.length * note)
                  animateCont(key)
                }
                else {
                    tone.Transport.schedule(function(){
                    synth.frequency.rampTo(scale(d[key]), note);
                    }, i * note);
                }
              }

              else if (options.audioRendering == "categorical") {
                console.log("categorical")
                if (options.chartMode === "fully accessible") {
                  await self.speaker(d[xVar])
                }
                else {
                  await timer(500);
                }
                animateDisc(key, d.sonic_index, filterData.length)
                let thing2 = await self.beep(scale(d[key]))
                
              }
       
            }


          })
        
        
        
        
          // synth.stop(sonicData[key].length * note + 1)  
        tone.Transport.position = "0:0:0"  
        tone.Transport.start()
        
  
        // synth.stop(sonicData[key].length * note)
        
        function clearSynth() {
          tone.Transport.stop()
          tone.Transport.cancel()
        }
    
    } // end makeNoise

    // check if play data series simultaneously or consecutively

    let isPlaying = this.isPlaying

    let self = this
    async function noiseLoop() {    

      if (!isPlaying) {

        isPlaying = true

        if (options.chartMode === "fully accessible") {

          let lowestY = domainY[0]
          let highestY = domainY[1]

          if (typeof lowestY == 'number') {
            lowestY = numberFormatSpeech(lowestY)
            highestY = numberFormatSpeech(highestY)
          }

          const text1 = await self.speaker(`The lowest value on the chart is ${lowestY}, and it sounds like `)

          makeCircle([data[0][xVar], domainY[0]])  
          const beep1 = await self.beep(scale(domainY[0]))        

          await timer(1200);

          const text2 = await self.speaker(`The highest value on the chart is ${highestY}, and it sounds like `)

          makeCircle([data[0][xVar], domainY[1]])  
          const beep2 = await self.beep(scale(domainY[1]))

          await timer(1200);

          const text3 = await self.speaker(`Each note is a ${interval}, and the chart goes from ${domainX[0]} to ${domainX[1]}`)
        }
        
        else if (options.chartMode === "human does voiceover") {

          // const text1 = await self.speaker(`The lowest value on the chart is ${domain[0]}, and it sounds like `)

          console.log(`The lowest value on the chart is ${domainY[0]}, and it sounds like `)

          makeCircle([data[0][xVar], domainY[0]])  
          const beep1 = await self.beep(scale(domainY[0]))

          await timer(1200);

          // const text2 = await self.speaker(`The highest value on the chart is ${domain[1]}, and it sounds like `)
          console.log(`The highest value on the chart is ${domainY[1]}, and it sounds like `)
          makeCircle([data[0][xVar], domainY[1]])  
          const beep2 = await self.beep(scale(domainY[1]))

          await timer(1200);

        }
        // for await (const datastream of self.keyOrder) {

        // //       d3.select("#playHead")
        // //         .attr("cx",self.x(self.sonicData[datastream][0][xVar]) + self.margin.left)
        // //         .attr("cy",self.y(self.sonicData[datastream][0][datastream]) + self.margin.top)

        // //   const category = await speaker(datastream)

        //   makeNoise(xVar, datastream)

        //   await timer(self.sonicData[datastream].length * note * 1000);

        // }

      if (options.simultaneous == true) {
          console.log("simultaneous")
          makeNoise(keys)
      }
  
      else if (options.simultaneous == false) {
        async function play() {
          console.log("keys", keys)
          for await (const key of keys) {
                console.log(key)
                if (options.chartMode === "fully accessible") {
                  let speakKey = await self.speaker(`${key}`)
                }
                else if (options.chartMode === "human does voiceover") {
                  // leave a pause
                  await timer(1200); 
                }
                // let speakKey = await self.speaker(`${key}`)
                makeNoise([key])
                await timer(sonicData[key].length * note * 1000 + 1000);
           
            }
        }
        play()
       
      }


      await timer(3000);  
      isPlaying = false

      }

    } // end noiseLoop


    noiseLoop()
   

} // end playAudio




}




// if (synthType === 'Sampler') {
//   synthPreset.onload = () => {
//     console.log("samples loaded")
//     if (options.selectedInstrument != "Sad Trombone") {
//       soundLoop()
//     }
//     else {
//       synth2 = new tone.Sampler({
//         "urls": {
//             "F3": "trombone-end-F3.mp3",
//             "B3": "trombone-end-B3.mp3",
//             "C4": "trombone-end-C4.mp3",
//             "G4": "trombone-end-G4.mp3"
//         },
//         "baseUrl": "/",
//         onload: () => {
//           soundLoop()
//         }
//     }).toDestination();
//     }
//   }
//   synth = new tone[synthType](synthPreset).toDestination();
  
// }