import * as d3 from "d3"
import colorTools from "$lib/js/colortools"
import ColorScale from "$lib/js/colorscale"
import schemes from '$lib/data/colorschemes.json'
import { numberFormat, mobileCheck, stackMin, stackMax } from '$lib/js/utils';
import * as tone from 'tone'
import Sonic from "./sonic"
export default class Stackedbar {

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
    this.features = null
    this.data = null
  }

  render() {

    let { modules, 
          height, 
          width, 
          isMobile, 
          colors, 
          datum, 
          data, 
          keys, 
          calcs, 
          title, 
          subtitle, 
          source, 
          dateFormat, 
          timeInterval,
          dateParse,
          xAxisLabel, 
          yAxisLabel, 
          tooltip, 
          baseline,
          interval,
          periodDateFormat, 
          xAxisFormat,
          xAxisDateFormat,
          x_axis_cross_y,
          xColumn,
          yColumn,
          marginleft, 
          margintop, 
          marginbottom, 
          marginright, 
          footnote, 
          minY,
          trendline, 
          enableShowMore, 
          aria, 
          colorScheme, 
          type, 
          labels, 
          userkey, 
          dropdown, 
          periods,
          $tooltip,
          $labels,
          $enableShowMore,
          $dropdown,
          textScaling } = this.settings

    console.log("settings", this.settings)
    let spareKeys = this.spareKeys
    // console.log("spareKeys",spareKeys)
    
    // TO FIX: Temporary hack to limite vertical bar to only one data series. Replace and support stacked bar chart

    // spareKeys = spareKeys.slice(0,1)
    console.log("spareKeys", spareKeys)
    isMobile = mobileCheck()

    let chartWidth = width
    let chartHeight = height
    width = width - marginleft - marginright
    height = height - margintop - marginbottom
    
    let xVar = this.xVar
    let isTime = false

    const svg = d3.select("#chart")
    const features = d3.select("#features")
    features.selectAll("*").remove()
    colors = new ColorScale()
    datum = data
    
    if (dateFormat != "") {
        isTime = true
        dateParse = d3.timeParse(dateFormat)
      }
  
    if (timeInterval != "") {
      timeInterval = timeInterval
    }
    console.log("xAxisFormat", xAxisFormat, xAxisDateFormat)
    
    if (xAxisDateFormat != "") {
        xAxisFormat = d3.timeFormat(xAxisDateFormat)
    } 
    else {
      if (dateParse) {
          xAxisFormat = d3.timeFormat("%d %b '%y")
      }

      else {
        console.log("aaa")
        xAxisFormat = x => x;
      }
    }    

    console.log("colorScheme",colorScheme)
    const keyColor = colorTools.getKeysColors({
        keys: spareKeys,
        userKey: userkey,
        option: { colorScheme : colorScheme }
      })

    colors.set(keyColor.keys, keyColor.colors)  
    console.log(colors.get([spareKeys[0]]))

    datum.forEach((d) => {
      d.Total = d3.sum(spareKeys, (k) => +d[k])
    })  

    console.log("datum",datum)

    // datum.forEach((d) => {
    //     if (dateParse != "") {
    //       if (typeof d[xVar] === "string") {
    //         d[xVar] = dateParse(d[xVar])
    //       }
    //     }
    //     spareKeys.forEach((key, i) => {
    //       d[key] = +d[key]
    //     })
    //     // d.Total = d3.sum(spareKeys, (k) => +d[k])
    // })
   
    let xRange

    if (timeInterval != "") {

        if (timeInterval == "year") {
          xRange = d3.timeYear
          .range(datum[0][xVar], d3.timeYear
          .offset(datum[datum.length - 1][xVar], 1))
        }
  
        if (timeInterval == "day") {
          xRange = d3.timeDay
          .range(datum[0][xVar], d3.timeDay
          .offset(datum[datum.length - 1][xVar], 1))
        }
  
        if (timeInterval == "month") {
          xRange = d3.timeMonth
          .range(datum[0][xVar], d3.timeMonth
          .offset(datum[datum.length - 1][xVar], 1))
        }
  
        if (timeInterval == "week") {
          xRange = d3.timeWeek
          .range(datum[0][xVar], d3.timeWeek
          .offset(datum[datum.length - 1][xVar], 1))
        }
  
      } else {
        console.log("mapping xRange")
        xRange = datum.map((d) => d[xVar])
  
      }
      
      const chartKeyDiv = d3.select("#chartKey") 
      chartKeyDiv.html("")
      
      // let chartKeys = JSON.parse(JSON.stringify(spareKeys))
      //   // console.log(chartKeys)
      //   chartKeys.forEach((key) => {
      //       console.log("chartkey", key)
      //       const keyDiv = chartKeyDiv.append("div").attr("class", "keyDiv")

      //       keyDiv
      //       .append("span")
      //       .attr("class", "keyCircle")
      //       .style("background-color", "rgb(204, 10, 17)")

      //       keyDiv
      //       .append("span")
      //       .attr("class", "keyText")
      //       .text(key)

      // })

    
      var layers = d3.stack()
      .offset(d3.stackOffsetDiverging)
      .keys(spareKeys)(datum)
  
      layers.forEach(function(layer) {
        layer.forEach(function(subLayer) {
          subLayer.group = layer.key
          subLayer.groupValue = subLayer.data[layer.key]
          subLayer.total = subLayer.data.Total
        })
      })


    let extent = [d3.min(layers, stackMin), d3.max(layers, stackMax)]  
    
    console.log("layers",layers)  
    console.log("extent", extent)

    const x = d3.scaleBand()
      .range([0, width])
      .paddingInner(0.2)

    console.log("xRange", xRange)  

    x.domain(xRange)

    const y = d3.scaleLinear()
      .range([height, 0])


    let xVarFormatterPosition = null
  
    if (xAxisDateFormat != "") {
        xAxisFormat = d3.timeFormat(xAxisDateFormat)
        xVarFormatterPosition = d3.timeFormat(xAxisDateFormat)
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
        xAxisFormat = x => x;
        xVarFormatterPosition = x => x;
      }
    }    




    // let max = d3.max(datum, (d) => d[spareKeys[0]])  
    // let min = d3.min(datum, (d) => d[spareKeys[0]])  

    // if (baseline) {
    //   min = +baseline
    // }

    y.domain(extent)

    var xAxis
    var yAxis

    let tickDivisor = 10

    if (datum.length <= 5) {
      tickDivisor = 1
    }

    var ticks = x.domain().filter(function (d, i) {
      return !(i % tickDivisor)
    })
    
    console.log("ticks",ticks)

    if (isMobile) {
      ticks = x.domain().filter(function (d, i) {
        return !(i % 20)
      })
    }

    if (isMobile) {

      xAxis = d3.axisBottom(x).tickValues(ticks).tickFormat(xAxisFormat)
      
      yAxis = d3.axisLeft(y).tickFormat(function (d) {
        return numberFormat(d)
      }).ticks(5)
    } else {
      xAxis = d3.axisBottom(x).tickValues(ticks).tickFormat(xAxisFormat)
      yAxis = d3.axisLeft(y).tickFormat(function (d) {
        return numberFormat(d)
      }).ticks(5)
    }

    features.append("g")
      .attr("class", "x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    features.append("g")
      .attr("class", "y")
      .call(yAxis)

    d3.selectAll(".y .tick line")
      .style("stroke-dasharray", "2 2")  
      .attr("x2", width)
    
    d3.selectAll(".y path").style("stroke-width", "0")   

    d3.selectAll(".tick line")
    .attr("stroke", "#767676")

    d3.selectAll(".tick text")
    .attr("fill", "#767676")

    d3.selectAll(".x .tick text")
      .attr("y", `${textScaling * 10}`)

      d3.selectAll(".y .tick text")
      .attr("x", `-${textScaling * 8}`)

    d3.selectAll(".domain")
    .attr("stroke", "#767676")

    // features.selectAll(".bar")
    //   .data(datum)
    //   .enter().append("rect")
    //   .attr("class", "bar")
    //   .attr("x", function (d) {
    //     return x(d[xVar])
    //   })
    //   .style("fill", function () {
    //     return colors.get(spareKeys[0])
    //   })
    //   .attr("y", function (d) {
    //     return y(Math.max(d[spareKeys[0]], 0))
    //     // return y(d[keys[0]])
    //   })
    //   .attr("width", x.bandwidth())
    //   .attr("height", function (d) {
    //     return Math.abs(y(d[spareKeys[0]]) - y(0))

    //   })

    const layer = features
    .selectAll("layer")
    .data(layers, (d) => d.key)
    .enter()
    .append("g")
    .attr("class", (d) => "layer " + d.key)
    .style("fill", (d, i) => colors.get(d.key))
    
    layer
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.data[xVar]))
    .attr("y", (d) => y(d[1]))
    .attr("class", "barPart")
    .attr("title", (d) => d.data[d.key])
    .attr("data-group", (d) => d.group)
    .attr("data-count", (d) => d.data[d.key])
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", (d) => {
      let band = x.bandwidth()
      return (band < 4) ? band : band - 2
    }) //x(data[data.length - 1][xColumn]) / data.length


      d3.select("#positionCounterTitle").text(xVar)
      d3.select("#positionCounterValue").text(xAxisFormat(datum[datum.length -1][xVar]))  


    this.x = x
    this.y = y
    this.xVar = xVar
    this.domainY = this.y.domain()
    // this.domainX = [xVarFormatterPosition(this.x.domain()[0]), xVarFormatterPosition(this.x.domain()[1])]
    this.domainX = [this.x.domain()[0], this.x.domain()[this.x.domain().length - 1]]
    this.xVarFormatterPosition = xVarFormatterPosition
    this.margin = {"left":marginleft, "right": marginright, "top":margintop, "bottom":marginbottom}
    this.width = width
    this.height = height
    this.keyOrder = spareKeys
    this.sonicData = datum
    this.features = features
    this.data = datum
    this.colors = colors
    this.xAxisFormat = xAxisFormat
    this.interval = interval
    this.xVarFormatterPosition = xVarFormatterPosition
  } // end render


   animateDiscrete = (note, key, i, len) => {
  
          const self = this
          let filterData = self.sonicData.slice(0,i+1)
            let bars = self.features.selectAll(".bar").data(filterData)
            bars.exit().remove()
            bars.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                return self.x(d[self.xVar])
                })
                .style("fill", function () {
                return self.colors.get(self.spareKeys[0])
                })
                .attr("y", function (d) {
                    return self.y(Math.max(d[self.spareKeys[0]], 0))
                // return y(d[keys[0]])
                })
                .attr("width", self.x.bandwidth())
                .attr("height", function (d) {
                return Math.abs(self.y(d[self.spareKeys[0]]) - self.y(0))
        
                })

            d3.select("#features")
            .append("circle")
            .attr("cy", self.y(self.data[i][self.spareKeys[0]]))
            .attr("fill", self.colors.get(self.spareKeys[0]))
            .attr("cx", self.x(self.data[i][self.xVar]) + self.x.bandwidth()/2)
            .attr("r", 0)
            .style("opacity", 1)
            .transition()
            .duration(300)
            .attr("r",40)
            .style("opacity",0)
            .remove()   
  
  }

    makeCircle = (cx, cy, key=null) => {
          
          const self = this
          // console.log(cx,cy,key, self.x(cx), self.y(cy), self.colors.get(key))
          d3.select("#features")
              .append("circle")
              .attr("cy", self.y(cy))
              .attr("fill", self.colors.get(key))
              .attr("cx", self.x(cx) + self.x.bandwidth()/2)
              .attr("r", 0)
              .style("opacity", 1)
              .transition()
              .duration(500)
              .attr("r",40)
              .style("opacity",0)
              .remove()
      
      }
  

  resetAnimation(options) {
    const self = this
    d3.select("#positionCounterValue")
                .text(self.xVarFormatterPosition(self.data[0][self.xVar]))
  }

  play(options, sonic) {
    console.log("Playing bar chart")
    console.log("sonicData", this.sonicData)
    const timer = ms => new Promise(res => setTimeout(res, ms))
    const note = (options.duration / this.sonicData.length) * 1000
    console.log("options", options)
    const self = this

    let blah = self.features.selectAll(".bar")
    blah.remove()

    d3.select("#positionCounterValue")
    .text(self.data[0][self.xVar])
    
    function newAnimateDiscrete(key, i) {
             d3.select("#positionCounterValue")
                .text(self.xAxisFormat(self.data[i][self.xVar]))
    
            let filterData = self.sonicData.slice(0,i+1)
            let bars = self.features.selectAll(".bar").data(filterData)
            bars.exit().remove()
            bars.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                return self.x(d[self.xVar])
                })
                .style("fill", function () {
                return "rgb(204, 10, 17)"
                })
                .attr("y", function (d) {
                    return self.y(Math.max(d[self.spareKeys[0]], 0))
                // return y(d[keys[0]])
                })
                .attr("width", self.x.bandwidth())
                .attr("height", function (d) {
                return Math.abs(self.y(d[self.spareKeys[0]]) - self.y(0))
        
                })

            d3.select("#features")
            .append("circle")
            .attr("cy", self.y(self.data[i][self.spareKeys[0]]))
            .attr("fill", "rgb(204, 10, 17)")
            .attr("cx", self.x(self.data[i][self.xVar]) + self.x.bandwidth()/2)
            .attr("r", 0)
            .style("opacity", 1)
            .transition()
            .duration(300)
            .attr("r",40)
            .style("opacity",0)
            .remove()   
    }

    
    setTimeout(() => {   
      sonic.playAudio(options, this.domainY, this.domainX, this.interval, this.data, this.keyOrder, null, newAnimateDiscrete)
      // animation(spareKeys)
  }, 1000)
}  

} // end class