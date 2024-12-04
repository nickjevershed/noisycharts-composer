import * as d3 from "d3"
import colorTools from "./colortools"
import ColorScale from "./colorscale"
import schemes from './colorschemes.json'
import { numberFormat, mobileCheck, stackMin, stackMax } from './utils';

export default class Horizontalbar {

  constructor(settings) {

    this.settings = settings
  
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

  render(newSettings) {
    console.log("render", newSettings)
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
          autoSort,
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
          xMin,
          marginleft, 
          margintop, 
          marginbottom, 
          marginright,
          maxXticks,
          barLabelsAbove, 
          footnote, 
          yMin,
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
          textScaling } = (newSettings) ? newSettings : this.settings


    let dataKeys = JSON.parse(JSON.stringify(this.settings.keys))
    console.log("yColumn",yColumn)
    if (yColumn === "") {
        yColumn = dataKeys[0]
    }

    if (xColumn === "") {
        xColumn = dataKeys[1]
    }

    dataKeys.splice(0, 1)
    dataKeys = dataKeys.filter(d => d != "Color")
    isMobile = mobileCheck()
    console.log(width,height)
    let chartWidth = width
    let chartHeight = height
    width = width - marginleft - marginright
    height = height - margintop - marginbottom
    
    // let xVar = this.xVar
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
        console.log("aaa")
        xAxisFormat = x => x;
      }
    }    
    console.log("colorScheme", colorScheme)
    const keyColor = colorTools.getKeysColors({
        keys: dataKeys,
        userKey: userkey,
        option: { colorScheme : colorScheme }
      })

    colors.set(keyColor.keys, keyColor.colors)  

    let yNaN = isNaN(datum[0][yColumn])

    datum.forEach((d) => {

        if (typeof d[yColumn] == "string" && !yNaN) {
  
          d[yColumn] = +d[yColumn]
        
        }
  
        if (typeof d[xColumn] == "string" && d[xColumn] != "") {
          d[xColumn] = +d[xColumn]
        }
  
        else if (typeof d[xColumn] == "string" && d[xColumn] == "") {
          d[xColumn] = null
        }
  
      })
   
    if (autoSort != null) {
    if (autoSort == "TRUE") {
        datum = datum.sort((a, b) => d3.descending(+a[xColumn], +b[xColumn]))  
    }

    else {
        // console.log("Not sorting")
    }
    }

    else {
        datum  = datum.sort((a, b) => d3.descending(+a[xColumn], +b[xColumn]))  
    }  


    var x = d3.scaleLinear().range([0, width])
    var y = d3
      .scaleBand()
      .range([0, height])
      .paddingInner(0.45)
      .paddingOuter(0.45)

    y.domain(
        datum.map((d) => {
        return d[yColumn]
      })
      
      )
    
    
    let xMax = d3.max(datum, (d) => { return d[xColumn]})

    if (xMin != "") {
        xMin = +xMin
    }

    else {
        xMin = d3.min(datum, (d) => { return d[xColumn]})
    }

    x.domain([xMin, xMax]).nice()

    var xAxis
    var yAxis

    yAxis = d3.axisLeft(y)

    xAxis = d3.axisBottom(x)
      .tickFormat(function (d) {
      return numberFormat(d)
    })
    if (isMobile && maxXticks != null){
      // REDUCE TICKS TO MAXIMUM NUMBER OF TICKS ON MOBILE
      xAxis.ticks(maxXticks)
    }

    // features
    //   .append("g")
    //   .attr("class", "x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(xAxis)

    features
      .selectAll(".bar")
      .data(datum)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => {
        return x(Math.min(0, d[xColumn]))
        })
      .style("fill", (d) => {
        if (d.Color) {
          return d.Color
        } else {
          return schemes[colorScheme][0]
        }
      })
      .attr("y", (d) => {
        return y(d[yColumn])
        // return y(d[keys[0]])
      })
      .attr("width", (d) => {
        return Math.abs(x(d[xColumn]) - x(0))
      })
      .attr("height", y.bandwidth())


      features
      .selectAll(".barText")
      .data(datum)
      .enter()
      .append("text")
      .attr("class", "barText")
      .attr("x", (d) => {
        
        let pos = (d[xColumn] < 0) ? x(0) + 5  : x(0) - 5
        return pos
        })
      .attr("text-anchor",(d) => {
        let pos 

        pos = (d[xColumn] < 0) ? "start" : "end"
        
        return pos
      })
      .attr("y", (d) => {
        return y(d[yColumn]) + (y.bandwidth() - 4) 
      })
      .style("font-size", `${y.bandwidth()}px`)
      .text((d) => d[yColumn])

    features
      .selectAll(".barNumber")
      .data(datum)
      .enter()
      .append("text")
      .attr("class", "barNumber")
      .style("font-weight", "bold")
      .attr("text-anchor", (d) => {
        if (d[xColumn] > 0) {
          return "start"
        }

        else {
          return "end"
        }
      })
      .attr("x", (d) => {
          if (d[xColumn] > 0) {
            return x(d[xColumn]) + 5
          }

          else {
            return x(d[xColumn]) - 5
          }
          
      })
      .style("fill", "#FFF")
      .attr("y", (d) => y(d[yColumn]) + (y.bandwidth() - 4))
      .style("font-size", `${y.bandwidth()}px`)
      .text((d) => numberFormat(d[xColumn]))

    d3.selectAll(".y .tick").remove()

    this.x = x
    this.y = y
    this.xColumn = xColumn
    this.yColumn = yColumn
    this.domainY = this.y.domain()
    // this.domainX = [xVarFormatterPosition(this.x.domain()[0]), xVarFormatterPosition(this.x.domain()[1])]
    this.domainX = this.x.domain()
    console.log("domainX", this.domainX)
    this.margin = {"left":marginleft, "right": marginright, "top":margintop, "bottom":marginbottom}
    this.width = width
    this.height = height
    this.keyOrder = dataKeys
    this.sonicData = datum
    this.features = features
    this.data = datum
    this.xAxisFormat = xAxisFormat
    this.interval = interval 
    this.colorScheme = colorScheme 
    this.textScaling = textScaling

  } // end render


  play(options, sonic) {
    console.log("Playing bar chart")
    console.log("sonicData", this.sonicData)
    const timer = ms => new Promise(res => setTimeout(res, ms))
    const note = (options.duration / this.sonicData.length) * 1000
    console.log("options", options)
    const self = this

    // let blah = self.features.selectAll(".bar")
    // blah.remove()

    d3.select("#positionCounterValue")
    .text(self.data[0][self.xColumn])
    
    function newAnimateDiscrete(key, i) {

            //  d3.select("#positionCounterValue")
            //     .text(self.xAxisFormat(self.data[i][self.xColumn]))
    
            

            // let filterData = self.sonicData.slice(0,i+1)
            // console.log(filterData)
            // let bars = self.features.selectAll(".bar").data(filterData)
            // bars.exit().remove()
            // bars.enter()
            //     .append("rect")
            //     .attr("class", "bar")
            //     .attr("x", (d) => {
            //       return self.x(Math.min(0, d[self.xColumn]))
            //       })
            //     .style("fill", (d) => {
            //       if (d.Color) {
            //         return d.Color
            //       } else {
            //         return schemes[self.colorScheme][0]
            //       }
            //     })
            //     .attr("y", (d) => {
            //       return self.y(d[self.yColumn])
            //       // return y(d[keys[0]])
            //     })
            //     .attr("width", (d) => {
            //       return Math.abs(self.x(d[self.xColumn]) - self.x(0))
            //     })
            //     .attr("height", self.y.bandwidth())

              d3.select("#features")
                .append("circle")
                .attr("cy", self.y(self.data[i][self.yColumn]) + self.y.bandwidth() /2 )
                .attr("fill", () => {
                  if (self.data[i]['Color']) {
                    return self.data[i]['Color']
                  }
                  else {
                    return schemes[self.colorScheme][0]
                  }
                  
                })
                .attr("cx",  self.x(self.data[i][self.xColumn]))
                .attr("r", 0)
                .style("opacity", 1)
                .transition()
                .duration(300)
                .attr("r", self.textScaling * 40)
                .style("opacity",0)
                .remove()   
    }

    let selected = ['France', 'Portugal', 'Germany','Australia', 'Japan']
    setTimeout(() => {   
      // Reversing the X and Y domain positions
      sonic.playAudio(options,this.domainX, this.domainY, this.interval, this.data, this.keyOrder, null, newAnimateDiscrete, null, selected=selected)
      // animation(dataKeys)
  }, 1000)
}  

} // end class