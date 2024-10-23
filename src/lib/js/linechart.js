import * as d3 from "d3"
import { getLongestKeyLength, numberFormat, numberFormatSpeech, makeSafe } from './toolbelt';
import colorTools from "$lib/js/colortools"
import ColorScale from "$lib/js/colorscale"
import schemes from '$lib/data/colorschemes.json'

// import * as tone from 'tone'
// import { playAudio } from "./sonic"

// const Sonic =  new sonic()
const timer = ms => new Promise(res => setTimeout(res, ms))

export default class lineChart {

    constructor(settings) {
        this.settings = settings
        this.spareKeys = JSON.parse(JSON.stringify(settings.keys))
		this.xVar = (settings.xColumn != "") ? (settings.xColumn) : this.spareKeys[0]
		this.spareKeys.splice(0, 1)
        this.keyOrder = []
        this.sonicData = {}
        this.x = null
        this.y = null
        this.margin = null
        this.domain = null
        this.width = settings.width
        this.height = settings.height
        this.data = null
    }

    render(newSettings) {

        let { modules, 
            height, 
            width, 
            isMobile, 
            colors, 
            datum, 
            data,
            key, 
            keys, 
            title, 
            subtitle, 
            source, 
            dateFormat, 
            yScaleType, 
            xAxisLabel, 
            yAxisLabel,
            xAxisFormat, 
            interval,
            baseline, 
            tooltip, 
            periodDateFormat, 
            marginleft, 
            margintop, 
            marginbottom, 
            marginright, 
            minX, 
            minY, 
            maxY,
            footnote, 
            enableShowMore, 
            aria, 
            colorScheme, 
            lineLabelling, 
            type, 
            userkey, 
            periods, 
            labels, 
            dropdown, 
            x_axis_cross_y,
            breaks,
            lines,
            invertY,
            xColumn,
            yColumn,
            $tooltip,
            $labels,
            $enableShowMore,
            $dropdown,
            textScaling } = (newSettings) ? newSettings : this.settings
            
        datum = JSON.parse(JSON.stringify(data))
        console.log("datum", datum)
        let chartWidth = width
        let chartHeight = height
        width = width - marginleft - marginright
        height = height - margintop - marginbottom

        // I don't think direct labelling works for animated charts?

        lineLabelling = false

        // this.spareKeys = JSON.parse(JSON.stringify(keys))
        // console.log(this.spareKeys)
        let y = d3.scaleLinear()
            .rangeRound([height, 0])
        
        if (invertY === "TRUE") {
            y = d3.scaleLinear()
            .rangeRound([0, height])
        }
        
        console.log("key", key)
        let lineGenerators = {}
        let hideNullValues = "yes"
        let chartValues = []
        let chartKeyData = {}
        let x
        let xVar = this.xVar
        let spareKeys = this.spareKeys
        var self = this
        const svg = d3.select("#chart")
        const features = d3.select("#features")
        const chartKeyDiv = d3.select("#chartKey")    

        features.selectAll("*").remove();

        colors = new ColorScale()
      
        console.log("colorScheme", colorScheme)
        const keyColor = colorTools.getKeysColors({
            spareKeys: self.spareKeys,
            userKey: userkey,
            option: { colorScheme : colorScheme }
        })
      
        console.log("userkey", userkey)
        colors.set(keyColor.spareKeys, keyColor.colors)
      
        if (breaks != "") {
            hideNullValues = breaks
        }
      
        if (yScaleType != "") {
            y = d3[yScaleType]()
            .range([0, height])
            .nice()
        }
      
        const parseTime = (dateFormat!="") ? d3.timeParse(dateFormat) : ""
        // console.log("parseTime", parseTime)
        const parsePeriods = (periodDateFormat!="") ? d3.timeParse(periodDateFormat) : ""
      
        marginright = marginright + getLongestKeyLength(svg, spareKeys, isMobile, lineLabelling)

		width = chartWidth - marginright - marginleft
		// svg.attr("width", this.width + this.margin.left + this.margin.right)

        console.log(width, height, marginleft, marginright)  

        if (parseTime && typeof xVar == "string") {
            x = d3.scaleTime()
            .rangeRound([0, width])
        } else if (!(xVar instanceof Date)) {
            x = d3.scaleLinear()
            .rangeRound([0, width])
        }
      
        spareKeys.forEach((key) => {
            // console.log(key)
            lineGenerators[key] = d3
            .line()
            .x((d) => x(d[xVar]))
            .y((d) => y(d[key]))
    
            if (hideNullValues === "yes") {
            lineGenerators[key].defined( (d) => d)
            }
        
            // get all chart values for each key
            datum.forEach((d) => {
            if (typeof d[key] == "string") {
                if (d[key].includes(",")) {
                if (!isNaN(d[key].replace(/,/g, ""))) {
                    d[key] = +d[key].replace(/,/g, "")
                    chartValues.push(d[key])
                }
                } else if (d[key] != "") {
                if (!isNaN(d[key])) {
                    d[key] = +d[key]
                    chartValues.push(d[key])
                }
                } else if (d[key] == "") {
                    d[key] = null
                }
            } else {
                chartValues.push(d[key])
            }
            })
        })
    
        if (lineLabelling === false) {
      
              chartKeyDiv.html("")
            
              let chartKeys = JSON.parse(JSON.stringify(spareKeys))
                // console.log(chartKeys)
                chartKeys.forEach((key) => {
                    console.log("chartkey", key)
                    const keyDiv = chartKeyDiv.append("div").attr("class", "keyDiv")
        
                    keyDiv
                    .append("span")
                    .attr("class", "keyCircle")
                    .style("background-color", () => colors.get(key))
        
                    keyDiv
                    .append("span")
                    .attr("class", "keyText")
                    .text(key)
      
              })
      
            }
      
        datum.forEach((d) => {
            if ((parseTime && typeof d[xVar] == "string") || (parseTime && typeof d[xVar] == "number")) {
                console.log("parsing")
                d[xVar] = parseTime(d[xVar])
            }
        })
     
        spareKeys.forEach((key) => {
            chartKeyData[key] = []
            datum.forEach((d) => {
            if (d[key] != null) {
                let newData = {}
                newData[xVar] = d[xVar]
                newData[key] = d[key]
                chartKeyData[key].push(newData)
            } else if (hideNullValues === "yes") {
                chartKeyData[key].push(null)
            }
            })
        })

        labels.forEach((d) => {
            if (parseTime && typeof d.x == "string") {
            d.x = parseTime(d.x)
            }
    
            if (typeof d.y == "string") {
            d.y = +d.y
            }
    
            if (typeof d.offset == "string") {
            d.offset = +d.offset
            }
        })
    
        if (lines) {
            lines.forEach((d) => {
            if (parseTime && typeof d.x1 == "string") {
                d.x1 = parseTime(d.x1)
                d.x2 = parseTime(d.x2)
            }
    
            if (typeof d.y1 == "string") {
                d.y1 = +d.y1
                d.y2 = +d.y2
            }
    
            })
        }
    
        periods.forEach((d) => {
            if (typeof d.start == "string") {
            if (parsePeriods != "") {
    
                d.start = parsePeriods(d.start)
                if (d.end != "") {
                    d.end = parsePeriods(d.end)
                    d.middle = new Date((d.start.getTime() + d.end.getTime()) / 2)
                } else {
                    d.middle = d.start
                }
                
            } else {
                d.start = +d.start
    
                if (d.end != "") {
                d.end = +d.end
                d.middle = (d.end + d.start) / 2
                } else {
                    d.middle = d.start
                }
            }
            }
        })
      
        const max = (maxY && maxY !== "")
            ? parseInt(maxY)
            : d3.max(chartValues)
    
        const min = (minY && minY !== "")
            ? parseInt(minY)
            : d3.min(chartValues)
    
        x.domain(d3.extent(datum, (d) => d[xVar]))
    
        y.domain([min, max])
        
        const xTicks = Math.round((width/textScaling) / 110)
    
        const yTicks = (yScaleType === "scaleLog") ? 3 : 5
        // const yTicks = 10
        const xAxis = d3.axisBottom(x)
            .ticks(xTicks)

        // let xVarFormatter = null
        let xVarFormatterPosition = null

        // if (parseTime == "") {
        //     xVarFormatter = d3.format("d")
        //     xVarFormatterPosition = d3.format("d")
        // } else {
        //     if (dateFormat == "%Y") {
        //         console.log("yep")
        //         xVarFormatter = d3.timeFormat("%Y")
        //         xVarFormatterPosition = d3.timeFormat("%Y")
        //     }
        //     else {
        //         xVarFormatter = d3.timeFormat("%b %y")
        //         xVarFormatterPosition = d3.timeFormat("%d %b %y")
        //     }
            
        // }

        if (xAxisFormat != "") {
            xAxisFormat = d3.timeFormat(xAxisFormat)
            xVarFormatterPosition = d3.timeFormat(xAxisFormat)
            }
        else {
          if (parseTime) {
            if (dateFormat == "%Y") {
                xAxisFormat = d3.timeFormat("%Y")
                xVarFormatterPosition = d3.timeFormat("%Y")
            }
            else {
                xAxisFormat = d3.timeFormat("%d %b '%y")
                xVarFormatterPosition = d3.timeFormat("%d %b '%y")
            }
          }

          else {
            console.log("aaa")
            xAxisFormat = x => x;
            xVarFormatterPosition = x => x;
          }
        }    

        
        xAxis.tickFormat(xAxisFormat)
        
        const yAxis = d3
            .axisLeft(y)
            .tickFormat((d) => numberFormat(d))
            .ticks(yTicks)
            .tickSize(-width)  
    
        d3.selectAll(".periodLine").remove()
        d3.selectAll(".periodLabel").remove()
      
        d3.select("#positionCounterTitle").text(xVar)
        d3.select("#positionCounterValue").text(xVarFormatterPosition(datum[datum.length -1][xVar]))

        features
            .selectAll(".periodLine .start")
            .datum(periods)
            .enter()
            .append("line")
            .attr("x1", (d) => x(d.start))
            .attr("y1", 0)
            .attr("x2", (d) => x(d.start))
            .attr("y2", height)
            .attr("class", "periodLine mobHide start")
            .attr("opacity", (d) => (d.start < x.domain()[0]) ? 0 : 1)
            .attr("stroke-width", 1)
      
        features
            .selectAll(".periodLine .end")
            .datum(periods.filter(b => b.end != ""))
            .enter()
            .append("line")
            .attr("x1", (d) => x(d.end))
            .attr("y1", 0)
            .attr("x2", (d) => x(d.end))
            .attr("y2", height)
            .attr("class", "periodLine mobHide end")
            .attr("opacity", (d) => (d.end > x.domain()[1]) ? 0 : 1)
            .attr("stroke-width", 1)
      
        features
            .selectAll(".periodLabel")
            .datum(periods)
            .enter()
            .append("text")
            .attr("x", (d) => {
              if (d.labelAlign == "middle") {
                return x(d.middle)
              } else if (d.labelAlign == "start") {
                return x(d.start) + 5
              }
            })
            .attr("y", -5)
            .attr("text-anchor", (d) => d.labelAlign)
            .attr("class", "periodLabel mobHide")
            .attr("opacity", 1)
            .text((d) => d.label)
      
        features.append("g")
            .attr("class", "y dashed axis")
            .call(yAxis)
            .style("stroke-dasharray", "2 2") 
            .attr("stroke-width", 3) 

        if (invertY === "TRUE") {
            features.append("line")
            .attr("x1", x(x.domain()[0]))  
            .attr("y1", y(min))
            .attr("x2",  x(x.domain()[1]))
            .attr("y2", y(min))
            .attr("class",  "zero dashed")
            .style("stroke-dasharray", "2 2") 
            .attr("stroke-width", 3) 

            features
                .append("text")
                .attr("class", "addTick")
                .attr("x", -10)
                .attr("y", y(min))
                .attr("dy", "0.32em")
                .text(min)  
        }    

      
        features
            .append("g")
            .attr("class", "x axis")
            .attr("transform", () => (x_axis_cross_y != "") ? "translate(0," + y(x_axis_cross_y) + ")" : "translate(0," + height + ")")
            .call(xAxis)
      
        features
            .select(".y .domain")
            .remove()    
      
        features
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text(yAxisLabel)
      
        features
            .append("text")
            .attr("x", width)
            .attr("y", height - 6)
            .attr("text-anchor", "end")
            .text(xAxisLabel)
      
        // d3.selectAll(".tick line")
        // .attr("stroke", "#767676")
    
        // d3.selectAll(".tick text")
        // .attr("fill", "#767676")
    
        // d3.selectAll(".domain")
        // .attr("stroke", "#767676")
      
        d3.selectAll(".x .tick text")
            .attr("y", `${textScaling * 10}`)

            d3.selectAll(".y .tick text")
            .attr("x", `-${textScaling * 8}`)
        
        d3.selectAll(".addTick")
            .attr("x", `-${textScaling * 8 + 5}`)

        if (lines) {
            features
            .selectAll(".line")
            .data(lines)
            .enter()
            .append("line")
            .attr("x1", (d) => {
                return x(d.x1)
            })
            .attr("y1", (d) => y(d.y1))
            .attr("x2", (d) => x(d.x2))
            .attr("y2", (d) => y(d.y1))
            .attr("class", "line")
            .attr("stroke-dasharray", "2,4")
            .attr("stroke-width", 3)  
    
            features
            .selectAll(".lineText")
            .data(lines)
            .enter()
            .append("text")
            .attr("x", (d) => x(d.x1))
            .attr("y", (d) => y(d.y1) - 5)
            .attr("class", "lineText")
            .attr("opacity", 1)
            .style("font-size", `${textScaling * 12}px`)
            .text((d) => d.text)  
    
        } 
      
        // var keyOrder = []
      
        // console.log(spareKeys)
      
        spareKeys.forEach((key) => {

            let idKey = makeSafe(key)
    
            let clippy = features
                .append("clipPath")
                .attr("id", `${idKey}_clip`)
                .attr("class", "clippy") 
    
            clippy
                .append("rect")
                .attr("width", width)
                .attr("y", -5)
                .attr("height", height + 10)    

            features
                .append("path")
                .datum(chartKeyData[key])
                .attr("fill", "none")
                .attr("class", "dataLine")
                .attr("id", `${idKey}_line`)
                .attr("clip-path", `url(#${idKey}_clip)`)
                .attr("stroke", (d) => colors.get(key))
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 4)
                .attr("d", lineGenerators[key])

            
    
            const tempLabelData = chartKeyData[key].filter((d) => d != null)
            let lineLabelAlign = "start"
            let lineLabelOffset = 0
    
            this.keyOrder.push(key)
            this.sonicData[key] = tempLabelData

            features
                .append("circle")
                .attr("cy", (d) => y(tempLabelData[tempLabelData.length - 1][key]))
                .attr("fill", (d) => colors.get(key))
                .attr("cx", (d) => x(tempLabelData[tempLabelData.length - 1][xVar]))
                .attr("r", 8)
                .attr("class", `${idKey}_label linelabels`)
                .style("opacity", 1)
    
            // if (!isMobile && lineLabelling) {
            if (lineLabelling) { 
    
            features
                .append("text")
                .attr("class", `lineLabels ${idKey}_label`)
                .style("font-weight","bold")
                .style("font-size","15px")
                .attr("y", (d) => y(tempLabelData[tempLabelData.length - 1][key]) + 4 + lineLabelOffset)
                .attr("x", (d) => x(tempLabelData[tempLabelData.length - 1][xVar]) + 5)
                .style("opacity", 1)
                .attr("text-anchor", lineLabelAlign)
                .attr("fill", (d) => colors.get(key))
                .text((d) => key)
    
            }
    
        })
 
        this.x = x
        this.y = y
        this.xVar = xVar
        this.domainY = d3.extent(chartValues)
        this.domainX = [xVarFormatterPosition(this.x.domain()[0]), xVarFormatterPosition(this.x.domain()[this.x.domain().length - 1])]
        this.margin = {"left":marginleft, "right": marginright, "top":margintop, "bottom":marginbottom}
        this.width = width
        this.height = height
        this.data = datum
        this.colors = colors
        this.xVarFormatterPosition = xVarFormatterPosition
        this.interval = interval
        this.colorScheme = colorScheme

        const voText = `The lowest value on the chart is ${this.domainY[0]}, and it sounds like [BONG]. 
The highest value on the chart is ${this.domainY[1]}, and it sounds like [BING].
Each note is a ${this.interval}, and the chart goes from ${this.domainX[0]} to ${this.domainX[1]}`

        d3.select("#voiceOverScript").property("value",voText)


    } // end setup

    
    play(options, sonic) {

        
        console.log("Playing linechart")
        console.log(options)
        const timer = ms => new Promise(res => setTimeout(res, ms))

        // sonic.init(this.sonicData,this.x, this.y, this.xVar, this.keyOrder, this.margin, this.domain, duration/1000)

        // duration of each data point in  MILLISECONDS

        var note = (options.duration / this.sonicData[this.keyOrder[0]].length) * 1000
        
        console.log("note", note)

        // console.log(options, note)
        const self = this
        // console.log("note",note)


        // Clear the chart ready to record

        if (options.animationStyle == "playthrough") {
            d3.selectAll(".clippy rect").attr("width", 0)  
            d3.selectAll(".linelabels").style("opacity", 0)
        }
       
     
        d3.select("#positionCounterValue")
            .text(self.xVarFormatterPosition(self.data[0][self.xVar]))

        var pause = 0

        // animates one circle given x y data in an array 

        function makeCircle(v) {
            console.log("Make circle", v)
            d3.select("#features")
                .append("circle")
                .attr("cy", self.y(v[1]))
                .attr("fill", schemes[self.colorScheme][0])
                .attr("cx", self.x(v[0]))
                .attr("r", 0)
                .style("opacity", 1)
                .transition()
                .duration(1000)
                .attr("r",40)
                .style("opacity",0)
                .remove()
        }


        function newAnimateContinuous(key) {
            let idKey = makeSafe(key)
            let currentClip = d3.select(`#${idKey}_clip rect`)

            // Continous line for continous data

            if (options.audioRendering == "continuous") {
                currentClip.transition()
                    .duration((options.duration * 1000))
                    .ease(d3.easeLinear)
                    .attr("width", self.width)
                    .on("end", function() { d3.selectAll(`.${idKey}_label`).style("opacity", 1)})

            }
        }

        function newAnimateDiscrete(key, i, len) {
            let idKey = makeSafe(key)
            let currentClip = d3.select(`#${idKey}_clip rect`)
    
            // Continous line with little circle pop-ins for discrete data
            var pause = (i === 0) ?  0 : note
            
            d3.select("#features")
                .append("circle")
                .attr("cy", self.y(self.data[i][key]))
                .attr("fill", self.colors.get(key))
                .attr("cx", self.x(self.data[i][self.xVar]))
                .attr("r", 0)
                .style("opacity", 1)
                .transition()
                .duration(300)
                .attr("r",40)
                .style("opacity",0)
                .remove()
            
            d3.select("#positionCounterValue")
                .text(self.xVarFormatterPosition(self.data[i][self.xVar]))

            if (options.animationStyle == "playthrough") {    
                currentClip.transition()
                    .duration(note)
                    .ease(d3.easeLinear)
                    .attr("width", self.x(self.data[i][self.xVar]))
            
                if (i == len - 1) {
                    console.log("yo")
                    currentClip.attr("width", self.width)
                    setTimeout(() => {
                        d3.selectAll(`.${idKey}_label`).style("opacity", 1)
                    }, note)    
                }
         }   

        }

        let spareKeys = this.spareKeys
        // sonic.init(this.sonicData,this.x, this.y, this.xVar, this.keyOrder, this.margin, this.domain, duration/1000)
        
        setTimeout(() => {   
            sonic.playAudio(options, this.domainY, this.domainX, this.interval, this.data, spareKeys,newAnimateContinuous, newAnimateDiscrete, makeCircle)

            // animation(spareKeys)
        }, 2000)
        
        
    } // end update



}