// import * as d3 from 'd3' // You can replace with only d3-scale and d3-array if you're not already using d3 for your charts
// import notes from './notes.json';

import * as Tone from 'tone'
import * as d3 from 'd3' 
import { xvarFormatSpeech, numberFormatSpeech, getEveryNth, getBrowser, checkNull } from './utils'
import instruments from '$lib/data/instruments.json';
import notes from '$lib/data/notes.json';
import { browser } from '$app/environment';


const dateMap = {
  "%Y":"Year",
  "%y":"Year",
  "%B":"Month",
  "%b":"Month",
}


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
  
  
  const clickSettings = {
    "envelope": {
      "attack": 0,
      "decay": 0.1,
      "sustain":0,
      "release":0.1
    },
    "oscillator": 
      {
          "modulationFrequency": 0.2,
          "type": "sine"
      }
   
  }

const timer = ms => new Promise(res => setTimeout(res, ms))

// settings are required for the chart to work, until we can add in the type detection code from Yacht Charter

const default_colors = d3.scaleOrdinal(['red'])

const default_settings = {
    "xColumn": null,
    "audioRendering": null,
    "invertY":null,
    "type":null,
    "interval":null,
    "xFormat": {
        "date": null,
        "string": null,
        "number": null,
        "status": "",
        "type": null
    }
  }


/**
 * 
 * NoisyChart is the main class which sets up the required synths, key shortcuts, control buttons, and plays the audio
 * 
 **/

class NoisyChart {
  
    constructor({chartSettings=default_settings, noisyChartSettings=null, dataKeys=[], animationID=null, x=null, y=null, colors=default_colors}) {

      // sets the destination for audio output, either speakers: tone.Destination or recorder
        this.destination = Tone.Destination

        // This array will hold all of our synths
        this.synths = []
        
        this.kickDrum = null
        this.click = null

        this.panners = []
        // this.synth2 = null

        this.xTimeClicks = []

        this.settings = chartSettings
        this.options = noisyChartSettings
        this.data = chartSettings.data
        
        // Playback and cursoring stuff
        this.currentKey = null
        this.currentIndex = 0
        this.isPlaying = false
        this.inProgress = false

        this.note = 0.2
        
        this.sonicData = {}

        // Stores the scale stuff for the sonification, comes from the chart code
        // this.domainX = null
        // this.domainY = null

        // The 'x axis' identifier
        this.xVar = null

        this.scale = null
        this.dataKeys = null

        this.furniturePlaying = false
        this.furniturePaused = false
        this.usedCursor = false
        this.keys = dataKeys
        this.interactionAdded = false

        this.animateCircle = null
        this.animateDiscrete = null
        this.chartAnimation = null

        this.chartID = 'chart'

        // Musical note frequencies
        this.notes = []


        if (browser) {
            this.speech = window.speechSynthesis
        }
        
        notes.forEach((note) => {
        this.notes.push(note.Frequency)
        })

  }

  setAnimateCircle(animateCircle) {
    this.animateCircle = animateCircle
  }

  // setAnimateDiscrete(animateDiscrete) {
  //   this.animateDiscrete = animateDiscrete
  // }

  setChartAnimation(animationFunction) {
    this.chartAnimation = animationFunction
  }


  async loadSynths(options) {
    console.log("Loading synths...")
    
    Tone.start()
    
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

    this.kickDrum = new Tone.MembraneSynth().connect(this.destination);

    this.click = new Tone.Synth(clickSettings).connect(this.destination);

    // this.kickDrum.triggerAttackRelease("C2", "16n")  
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

      let panner = new Tone.Panner(pannerScale(i)).connect(this.destination);

      if (synthType != "Sampler" && synthType != "Player") {
          let newSynth = new Tone[synthType](synthPreset)
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
            let newSynth = new Tone[synthType](synthPreset)
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

    // this.beep(500)

  } // end loadSynth
  
  beep(freq) {
    return new Promise( (resolve, reject) => {
      Tone.Transport.stop()
      Tone.Transport.cancel()
      
      let synth = this.synths[0]
      
      synth.unsync()
      // console.log("freq", freq)
      synth.triggerAttackRelease(freq, 0.5)
      setTimeout(success, 500)
  
      function success () {
        resolve({ status : "success"})
      }
  
  
    })
  
  }
  
  speaker(text) {
  
    return new Promise( (resolve, reject) => {
    let self = this

    // check if speechSynthesis is supported

    if ('speechSynthesis' in window) {
      // clear any current speech

      var msg = new SpeechSynthesisUtterance();
      
      msg.text = text
      msg.lang = 'en-GB'

      // Speech synthesis is very quirky in different browsers, hence we tweak the settings
      // I don't know why but Firefox's default voice for en-US is an awful robot?

      let browser = getBrowser()

      if (browser == 'Firefox') {
        msg.rate = 1.1
        msg.lang = 'en-AU'
      }

      if (browser == 'Safari') {
        msg.rate = 1.1
      }
      
      self.speech.speak(msg);
  
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

  setupSonicData({data, options, keys = [], exclude = []}) {
    console.log("Setting up data and synth")
    
    let self = this
    self.options = options
    console.log("options",self.options)
    const xFormat = this.settings.xFormat

    if (self.settings.audioRendering) {
      self.audioRendering = self.settings.audioRendering
    }

    let rowLength = data.length
    let dataCols = Object.keys(data[0]).slice(1)
    let numberCols = dataCols.length
    let dataLength = rowLength * numberCols

    self.note = self.options.duration / dataLength
    // console.log("note", self.note)
    // console.log("data", self.data)
    
    // set up the data structure we need, and the keys of data to be sonified

    let synths = self.synths
    let click = self.click
  
    var hasRun = self.hasRun
    let dataKeys = Object.keys(data[0])

    self.xVar = dataKeys[0]

    // console.log("time settings", self.timeSettings)
    // console.log("interval", self.interval)

    let allDataValues = []
    let hideNullValues = false
    
    // Check if chart code set specific keys, otherwise just use the keys from the data

    if (keys.length === 0) {
        keys = dataKeys.slice(1)
    }

    // make keys available to other methods

    self.dataKeys = keys
    self.currentKey = keys[0]
    
    // To store the highest and lowest data objects
    // console.log("data", data)
    let xVar = self.xVar
    self.lowestVal = {"key":keys[0], "value":data[0][keys[0]], [xVar]:data[0][self.xVar]}
    self.highestVal = {"key":keys[0], "value":data[0][keys[0]], [xVar]:data[0][self.xVar]}


    // Format the data as needed, add to the sonicData dict
    keys.forEach(function(key) {
        self.sonicData[key] = []
        data.forEach((d, i) => {
        if (d[key] != null) {

            let newData = {}
            newData[self.xVar] = d[self.xVar]
            newData[key] = d[key]
            newData.sonic_index = i
            self.sonicData[key].push(newData)
            allDataValues.push(d[key])

            if (newData[key] > self.highestVal.value) {
              self.highestVal['key'] = key
              self.highestVal['value'] = d[key]
              self.highestVal[xVar] = d[self.xVar]
            }

            if (newData[key] < self.lowestVal.value) {
              self.lowestVal['key'] = key
              self.lowestVal['value'] = d[key]
              self.lowestVal[xVar] = d[self.xVar]
            }
           
        } else if (!hideNullValues) {
            let newData = {}
            newData[self.xVar] = d[self.xVar]
            newData[key] = d[key]
            newData.sonic_index  = i
            self.sonicData[key].push(newData)
        }
        })
    })

    // Reset xTimeClicks
    
    self.xTimeClicks = []

    let xAxisValues = []
    data.forEach((d, i) => {
      xAxisValues.push(d[xVar])
    })

    if (self.settings.timeClick) {
      self.xTimeClicks = getEveryNth(xAxisValues, self.settings.timeClick)
    }
    

    // Setting the scale range for linear scale
    
    let range = [self.options.low,self.options.high]
    console.log("range", range)
    // console.log("allDataValues", allDataValues)
    // console.log("sonicData", self.sonicData)
    // console.log("highestVal", self.highestVal)
    // console.log("lowestVal", self.lowestVal)
  
    self.settings.domainY = d3.extent(allDataValues)
    self.settings.domainX = d3.extent(data, d => d[self.xVar])

    // Invert if needed
    // ranked charts use inverted scale, eg bird of the year
    // https://interactive.guim.co.uk/embed/superyacht-testing/index.html?key=1WVTOMn-2BPVPUahzMzCM4H1inPM6oCT8w17GE5giDe8&location=docsdata
    

    if (self.options.invertAudio) {

        console.log("inverting")
        range = range.reverse()
    }
    
    // console.log(scaleLinear())
    // console.log("range", range, "domain", self.domainY)
    
    self.scale = d3.scaleLinear()
      .domain(self.settings.domainY)
      .range(range)

    // If we're clamping the scale to musical notes, use a range of actual frequency values
    
        if (self.options.scaleNotes) {
          console.log("Clamping to notes")
          let bottom = this.notes.findIndex(e => e == self.options.low)
          let top = this.notes.findIndex(e => e == self.options.high)
          range = this.notes.slice(bottom, top + 1)
    
          if (self.options.invertAudio) {
            range = range.reverse()
          }
    
        }
        // console.log("range", range)
        // let scale = null 
        
        // If we're using a scale of discrete notes, use scaleQuantize
    
        if (self.options.scaleNotes) {
          self.scale = d3.scaleQuantize()
            .domain(self.settings.domainY)
            .range(range)
        }
    
        // Otherwise default to linear
    
        else {
          self.scale = d3.scaleLinear()
          .domain(self.settings.domainY)
          .range(range)
        }


    self.synthLoaded = true    
}

 playAudio = (noiseKeys) => {
    return new Promise(async (resolve, reject) => {
      console.log("options", this.options)
      let self = this
      Tone.Transport.stop()
      Tone.Transport.cancel()

      noiseKeys.forEach(async function(dataKey) {  
        let keyIndex = self.dataKeys.indexOf(dataKey)
        console.log("keyIndex", keyIndex)
        console.log("note", self.note)
        // let halfway = self.sonicData[dataKey]
        console.log(`Setting up the transport for ${dataKey}`)
        // Clear the transport
        console.log("audioRendering",self.audioRendering, self.synths[keyIndex])
       
        
        // syncs the synth to the transport

        if (self.options.audioRendering == "discrete" || self.options.audioRendering == "continuous") {  
          self.synths[keyIndex].sync()
          self.click.sync()
        }

        // else if (self.options.audioRendering == "continuous") {  
        //   self.synths[keyIndex].unsync()
        //   self.click.sync()
        // }


        
        let data = self.sonicData[dataKey]

        // Check if the cursor has been used, slice to the current position
        // console.log("current index",self.currentIndex)
        if (self.currentIndex != 0) {
          data = data.slice(self.currentIndex)
          // console.log(data)
        }

        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          self.currentKey = dataKey
          
          if (self.options.audioRendering == "discrete") {
              
              if (d[dataKey]) {
                  self.synths[keyIndex].triggerAttackRelease(self.scale(d[dataKey]), self.note, self.note * i)
              }
              
              else {
                self.click.triggerAttackRelease(440, self.note, self.note * i)
              }

              Tone.Transport.schedule(function() {
                self.currentIndex = d.sonic_index
                if (self.options.animationStyle == 'playthrough') {
                  if (d[dataKey]) {
                    self.chartAnimation(self.note, dataKey, d.sonic_index, data.length)
                  }
                }
                // console.log(self.currentIndex)
                }, i * self.note);
          } // end discrete

          else if (self.options.audioRendering == "continuous") {
            console.log("making continuous noise")
            console.log(data.length)
            if (i == 0) { 
              self.synths[keyIndex].triggerAttackRelease(self.scale(d[dataKey]), data.length * self.note, 0)
              self.chartAnimation(self.note, dataKey, d.sonic_index, data.length)
            }
            else {
                
                Tone.Transport.schedule(function(){
                  self.synths[keyIndex].frequency.rampTo(self.scale(d[dataKey]), self.note);
                  self.chartAnimation(self.note, dataKey, d.sonic_index, data.length)
                }, i * self.note);
            }
            self.currentIndex = d.sonic_index
          }  


          else if (self.options.audioRendering == "categorical") {
              // console.log("categorical")
              
              await self.speaker(d[self.xVar])
              if (self.animationID) {
                self.animateCursor(dataKey,i, null)
              } 
            
              let thing2 = await self.beep(self.scale(d[dataKey]))
          }
      
        }

        // Reads out the middle X value halfway through the series

        // let halfway = Math.floor(data.length / 2)
        // Tone.Transport.schedule(function(){
        //   console.log("the start")
        //   self.speaker(xvarFormatSpeech(data[halfway][self.xVar], self.timeSettings.suggestedFormat))
        // }, halfway * self.note);


          // resolve after the last note is played

        Tone.Transport.schedule(function(){
          console.log("the end")
          // self.speaker(xvarFormatSpeech(data[data.length - 1][self.xVar], self.timeSettings.suggestedFormat))
          self.currentIndex = 0
          self.isPlaying = false
          if (!self.options.simultaneous) {
            resolve({ status : "success"})
          }
          
        }, data.length * self.note);
      
        // set inprogress to false after the last note of the last data series is played

        if (keyIndex === self.dataKeys.length -1) {
          Tone.Transport.schedule(function(){
            console.log("the actual end")

            self.inProgress = false
            self.usedCursor = false
            if (self.options.simultaneous) {
              resolve({ status : "success"})
            }
            }, data.length * self.note);
        }
    
        // console.log(Tone.Transport)
        

      }); // End of noiseKeys loop
    
      Tone.Transport.position = "0:0:0"  
      Tone.Transport.start()
      self.inProgress = true
      self.isPlaying = true



    }); // End of promise

  }  // End of playAudio

 playFurniture = () => { 
    return new Promise((resolve, reject) => {
    let self = this
    async function blah() {

      // uncomment to make testing synth / audio context faster  
      // await self.beep(440)    
      
      // This is what you're working on  

      let lowestY = self.settings.domainY[0]
      let highestY = self.settings.domainY[1]


        // if (self.settings.invertAudio) {
        //   lowestY = self.settings.domainY[1]
        //   highestY = self.settings.domainY[0]
        // }
      
  
      let lowestX = self.settings.domainX[0]
      let highestX = self.settings.domainX[1]

      let lowestXStr = lowestX
      let highestXStr = highestX

      if (self.settings.cols[0].type == "date") {
        lowestXStr = xvarFormatSpeech(lowestX , self.settings.xAxisDateFormat)
        highestXStr = xvarFormatSpeech(highestX, self.settings.xAxisDateFormat)
      }
  
      let lowestYStr = lowestY
      let highestYStr = highestY
      if (typeof lowestY == 'number') {
          lowestYStr = numberFormatSpeech(lowestY)
          highestYStr = numberFormatSpeech(highestY)
      }

      self.furniturePlaying = true
    
    console.log("chart mode", self.options.chartMode)
        
    if (self.options.chartMode === "fully accessible") {
        const text1 = await self.speaker(`The lowest value on the chart is ${lowestYStr}, and it sounds like `)
        
       
        self.animateCircle(self.lowestVal[self.xVar],self.lowestVal.value, self.lowestVal.key)
        
        // console.log("lowestY", lowestY, self.scale(lowestY))

        const beep1 = await self.beep(self.scale(lowestY))        
    
        await timer(1200);
    
        const text2 = await self.speaker(`The highest value on the chart is ${highestYStr}, and it sounds like `)
 
        self.animateCircle(self.highestVal[self.xVar],self.highestVal.value, self.highestVal.key)
        
        const beep2 = await self.beep(self.scale(highestY))
    
        await timer(1200);
    
        if (self.audioRendering == "discrete" || self.audioRendering == "continuous") {
            const text3 = await self.speaker(`Each note is a ${self.settings.interval}, and the chart goes from ${lowestXStr} to ${highestXStr}`)
        }  
    } 

    else if (self.options.chartMode === "human does voiceover") {
        self.animateCircle(self.lowestVal[self.xVar],self.lowestVal.value, self.lowestVal.key)
        const beep1 = await self.beep(self.scale(lowestY))        
        await timer(1200);
        
        self.animateCircle(self.highestVal[self.xVar],self.highestVal.value, self.highestVal.key)
        const beep2 = await self.beep(self.scale(highestY))
        await timer(1200);
    }    

      self.furniturePlaying = false
      resolve({ status : "success"})
      
    }  
    
    blah()  
    
  })
}

  async playPause() { 
    let self = this

    // This needs to be here to make Safari work because of its strict autoplay policies

    Tone.context.resume()

    console.log("isPlaying", self.isPlaying, "inProgress", self.inProgress, "usedCursor", self.usedCursor, "furniturePlayer", self.furniturePlaying, "furniturePaused", self.furniturePaused)
    
    // Audio has not played through, so start with the furniture

    if (!self.runOnce && !self.inProgress && !self.furniturePlaying) {
      console.log("playing furniture")
      Tone.start()
      console.log("currentIndex", self.currentIndex, self.synths)
      self.synths[self.currentIndex].context.resume();
      self.runOnce = true
      // self.inProgress = true
      
      await self.playFurniture()
    }
    
    // Furniture is playing, so clear speech on second press

    else if (self.furniturePlaying && !self.furniturePaused) {
      console.log("pausing furniture")
  
      self.speech.pause()
      self.furniturePaused = true
      
    }
    else if (self.furniturePlaying && self.furniturePaused) {
      self.speech.resume()
      self.furniturePaused = false
    }

    // it's not playing, and not paused so play it from the start
  
    if (!self.isPlaying && !self.inProgress && !self.usedCursor && !self.furniturePlaying) {
      console.log("playing")
      // self.isPlaying = true
      // self.inProgress = true
      
      // Check if simultaneous of sequential

      if (self.options.simultaneous == false) {

        for await (const key of this.dataKeys) {
          console.log("dataKey",key)
          // setTimeout(async () => {

          let speakKey = await self.speaker(`${key}`)
          await self.playAudio([key])

          // },100)
        }
  
      }

      else if (self.options.simultaneous == true) {
        console.log("simultaneous", this.dataKeys)     
        await self.playAudio(this.dataKeys)
      }


    }
  
    // Function to resume after using the cursor here

    else if (!self.isPlaying && self.inProgress && self.usedCursor) {
      console.log("playing from cursor")
      // self.isPlaying = true
      // self.inProgress = true
      console.log("yeh")
      
      let currentKeyIndex = self.dataKeys.indexOf(self.currentKey)
      console.log(currentKeyIndex)
      for (let i = currentKeyIndex; i < self.dataKeys.length; i++) {
        self.currentKey = self.dataKeys[i]
        let speakKey = await self.speaker(`${self.currentKey}`)
        await self.playAudio([self.currentKey])
      }

    }

    // it is playing so pause 
  
    else if (self.isPlaying && self.inProgress) {
      console.log("pause")
      self.isPlaying = false
      Tone.Transport.pause();
    }
  
    // it has been paused, so restart 
  
    else if (!self.isPlaying && self.inProgress) {

      console.log("restart")
      self.isPlaying = true
      Tone.Transport.start();
    }
    
  }	

  // increment the position of the current data index up by one, then play the datapoint

  async moveCursor(direction) {

    let self = this
    console.log("timeSettings",self.timeSettings)

    self.usedCursor = true
    self.isPlaying = false
    self.inProgress = true

    console.log("Move cursor", direction)
    
    Tone.Transport.pause();

    self.currentIndex = self.currentIndex + direction
   
    if (self.currentIndex >= self.sonicData[self.currentKey].length) {
      self.currentIndex = 0
    }

    if (self.currentIndex < 0) {
      self.currentIndex = self.sonicData[self.currentKey].length - 1
    }

    let currentData = self.sonicData[self.currentKey][self.currentIndex]
    // console.log("currentData", currentData)
    let currentX = currentData[self.xVar]
    let currentY = currentData[self.currentKey]

    function playCursorAudio() {
      self.speaker(xvarFormatSpeech(currentX, self.settings.xAxisDateFormat))
      self.speaker(numberFormatSpeech(currentY))
      
      self.animateCircle(currentX,currentY,self.currentKey)
      
      self.beep(self.scale(currentY))
    }

    if (self.speech.speaking) {
        self.speech.cancel()

        setTimeout(() => {
          playCursorAudio()
      }, 100);

    }

    else {
      playCursorAudio()
    }

  
  

  }

  moveSeries(direction) {
    let self = this

    self.usedCursor = true
    self.isPlaying = false
    self.inProgress = true
    
    // console.log("Move series", direction)
    
    Tone.Transport.pause();

    let currentKeyIndex = self.dataKeys.indexOf(self.currentKey)
    // console.log("Old key", self.currentKey, "old key index", currentKeyIndex)
    currentKeyIndex = currentKeyIndex + direction

    if (currentKeyIndex >= self.dataKeys.length) {
      currentKeyIndex = 0
    }

    if (currentKeyIndex < 0) {
      currentKeyIndex = self.dataKeys.length - 1
    }

    self.currentKey = self.dataKeys[currentKeyIndex]
    let currentData = self.sonicData[self.currentKey][self.currentIndex]
    // console.log("currentData", currentData)
    let currentX = currentData[self.xVar]
    let currentY = currentData[self.currentKey]

    // console.log("New key", self.currentKey, "new key index", currentKeyIndex)
    self.speaker(self.currentKey)
    self.speaker(numberFormatSpeech(currentY))
    
    self.animateCircle(currentX,currentY,self.currentKey)
    
    self.beep(self.scale(currentY))
  }

  restart() {
    console.log("restart")
    let self = this
    Tone.Transport.pause();
    self.isPlaying = false
    self.inProgress = false
    self.runOnce = false
    self.furniturePlaying = false
    self.furniturePaused = false
    self.usedCursor = false
    self.currentKey = self.dataKeys[0]
    self.currentIndex = 0

    self.playPause();
  }

  handleKeyPress = (e) => {
    let self = this
    
    console.log(e.code)

    // Check if synth stuff has been setup yet, if not set it up once

    if (e.code === "Space") {
      this.playPause()
    }

    if (e.code === "KeyD") {
      console.log("keyd")
      self.moveCursor(1)
    }

    if (e.code === "KeyA") {
      self.moveCursor(-1)
    }

    if (e.code === "KeyW") {
      self.moveSeries(1)
    }

    if (e.code === "KeyS") {
      self.moveSeries(-1)
    }

    if (e.code === "KeyR") {
      self.restart()
    }
  }

  // Adds the interactivity to the chart

  addInteraction(buttonContainer=null) {

    let self = this

    if (!self.interactionAdded) {

      if (self.chartID) {
        // Select the chart container

        let chart = document.getElementById('interactionZone')

        // Makes the chart focusable with tab or screenreader

        chart.tabIndex = 0

        // Loads Tone on a click so we don't get annoying audio API errors

        // chart.addEventListener('click', (e) => {
        //   if (!self.synthLoaded) {
        //     self.setupSonicData(self.data, self.keys)
        //   }
        // })

        // Set up the hotkey / keyboard shortcut listeners

        chart.addEventListener('keypress', this.handleKeyPress)

      }

      // An array for all the control buttons we need to make

      const buttons = [
        {id:'play', text:"play/pause", function:() => self.playPause()},
        {id:'restart', text:"restart", function:() => self.restart()},
        {id:'datumNext', text: "cursor forward", function:() => self.moveCursor(1)},
        {id:'datumPrevious', text: "cursor back", function:() => self.moveCursor(-1)},
        {id:'seriesNext', text: "series forward", function:() => self.moveSeries(1)},
        {id:'seriesBack', text: "series back", function:() => self.moveSeries(1)}
      ]

      // User has specific an ID for a container for the buttons, so add the buttons

      if (buttonContainer) {

        let container = document.getElementById(buttonContainer)

        // Remove the old buttons, if there are any

        container.innerHTML = ""

        // Make the buttons

        buttons.forEach((button) => {
          let newButton = document.createElement('button');
          newButton.textContent = button.text;
          newButton.onclick = button.function;
          newButton.id = button.id;
          newButton.id = button.id;
          container.appendChild(newButton);
        });

        // Add special interaction to the spacebar

        let btn = document.getElementById("play");
    
        btn.addEventListener('keyup', (e) => {
    
          if (e.code === "Space") {
            e.preventDefault();
          }
    
        })
      }

    // Let noisycharts know we added the interactive stuff so we don't do it twice

    self.interactionAdded = true;  

    }
  
  }  

//   animateCursor(key, i, len) {

//     let self = this
//     let data = self.sonicData[key]
//     let chartType = self.settings.type
//     // console.log(self.x)

//     let y = self.y(data[i][key])
//     let x = self.x(data[i][self.xVar])

//     if (chartType == 'horizontalbar') {
//       y = self.y(data[i][self.xVar])
//       x = self.x(data[i][key])
//     }
    
//     d3.select(`#${self.chartID}`)
//         .append("circle")
//         .attr("cy", y + self.yBand / 2)
//         .attr("fill", self.colors(key))
//         .attr("cx", x + self.xBand / 2)
//         .attr("r", 0)
//         .style("opacity", 1)
//         .transition()
//         .duration(300)
//         .attr("r",40)
//         .style("opacity",0)
//         .remove()
  
//   }

//   animateCircle(cx, cy, key=null) {
//     // console.log("cx", cx, "cy", cy)
//     let self = this
//     let chartType = self.settings.type
//     if (!key) {
//       key = self.currentKey
//     }

//     let y = cy
//     let x = cx

//     if (chartType == 'horizontalbar') {
//       y = cx
//       x = cy
//     }

//     d3.select(`#${self.chartID}`)
//         .append("circle")
//         .attr("cy", self.y(y) + self.yBand / 2)
//         .attr("fill", self.colors(key))
//         .attr("cx", self.x(x) + self.xBand / 2)
//         .attr("r", 0)
//         .style("opacity", 1)
//         .transition()
//           .duration(300)
//           .attr("r",40)
//           .style("opacity",0)
//           .remove()
  

//   }


}

export default NoisyChart