import * as d3 from "d3"
import colorTools from "./colortools"
import ColorScale from "./colorscale"
import { numberFormat, mobileCheck, stackMin, stackMax } from './utils';

export default class chartychart {

    constructor(settings) {
    
      // Chart settings object from the main app call
      this.settings = settings

      // The keys for the data 'columns' ie the series we want to plot
      this.dataKeys = JSON.parse(JSON.stringify(settings.keys))

      // The key for the 
      this.xVar = (settings.xColumn != "") ? (settings.xColumn) : this.dataKeys[0]

      // remove the xVar from the dataKeys
      this.dataKeys.splice(0, 1)
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
  
      let dataKeys = this.dataKeys
  
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
      datum = JSON.parse(JSON.stringify(data))
      
      if (dateFormat != "") {
          isTime = true
          dateParse = d3.timeParse(dateFormat)
        }
    
      if (timeInterval != "") {
      timeInterval = timeInterval
      }
      console.log(xAxisFormat)
      
      if (xAxisFormat != "") {
          xAxisFormat = d3.timeFormat(xAxisFormat)
      } 
      else {
        if (dateParse) {
            xAxisFormat = d3.timeFormat("%d %b '%y")
        }
  
        else {
          xAxisFormat = x => x;
        }
      }    
  
      const keyColor = colorTools.getKeysColors({
          keys: dataKeys,
          userKey: userkey,
          option: { colorScheme : colorScheme }
        })
  
      colors.set(keyColor.keys, keyColor.colors)  
  
      datum.forEach((d) => {
          if (dateParse != "") {
            if (typeof d[xVar] === "string") {
              d[xVar] = dateParse(d[xVar])
            }
          }
          dataKeys.forEach((key, i) => {
            d[key] = +d[key]
          })
          // d.Total = d3.sum(dataKeys, (k) => +d[k])
      })
     
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
    
          xRange = datum.map((d) => d[xVar])
    
        }
  
  
        
        const chartKeyDiv = d3.select("#chartKey") 
        chartKeyDiv.html("")
        
        let chartKeys = JSON.parse(JSON.stringify(dataKeys))
          // console.log(chartKeys)
          chartKeys.forEach((key) => {
              console.log("chartkey", key)
              const keyDiv = chartKeyDiv.append("div").attr("class", "keyDiv")
  
              keyDiv
              .append("span")
              .attr("class", "keyCircle")
              .style("background-color", "rgb(204, 10, 17)")
  
              keyDiv
              .append("span")
              .attr("class", "keyText")
              .text(key)
  
        })
  
      
  
  
      const x = d3.scaleBand()
        .range([0, width])
        .paddingInner(0.2)
  
      x.domain(xRange)
  
      const y = d3.scaleLinear()
        .range([height, 0])
  
      let max = d3.max(datum, (d) => d[dataKeys[0]])  
      let min = d3.min(datum, (d) => d[dataKeys[0]])  
      if (baseline) {
        min = +baseline
      }
  
      y.domain([0, max])
  
      var xAxis
      var yAxis
  
      let tickDivisor = 10
  
      if (datum.length <= 5) {
        tickDivisor = 1
      }
  
      var ticks = x.domain().filter(function (d, i) {
        return !(i % tickDivisor)
      })
      
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
  
      features.selectAll(".bar")
        .data(datum)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d[xVar])
        })
        .style("fill", function () {
          return "rgb(204, 10, 17)"
        })
        .attr("y", function (d) {
          return y(Math.max(d[dataKeys[0]], 0))
          // return y(d[keys[0]])
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return Math.abs(y(d[dataKeys[0]]) - y(0))
  
        })
  
        d3.select("#positionCounterTitle").text(xVar)
        d3.select("#positionCounterValue").text(xAxisFormat(datum[datum.length -1][xVar]))  
  
  
      this.x = x
      this.y = y
      this.xVar = xVar
      this.domainY = this.y.domain()
      // this.domainX = [xVarFormatterPosition(this.x.domain()[0]), xVarFormatterPosition(this.x.domain()[1])]
      this.domainX = [this.x.domain()[0], this.x.domain()[this.x.domain().length - 1]]
      this.margin = {"left":marginleft, "right": marginright, "top":margintop, "bottom":marginbottom}
      this.width = width
      this.height = height
      this.keyOrder = dataKeys
      this.sonicData = datum
      this.features = features
      this.data = datum
      this.xAxisFormat = xAxisFormat
      this.interval = interval
    } // end render
  
  
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
                      return self.y(Math.max(d[self.dataKeys[0]], 0))
                  // return y(d[keys[0]])
                  })
                  .attr("width", self.x.bandwidth())
                  .attr("height", function (d) {
                  return Math.abs(self.y(d[self.dataKeys[0]]) - self.y(0))
          
                  })
  
              d3.select("#features")
              .append("circle")
              .attr("cy", self.y(self.data[i][self.dataKeys[0]]))
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
        // animation(dataKeys)
    }, 1000)
  }  
  
  } // end class