import * as d3 from "d3"

export function getJson(url) {
    return fetch(`${url}`).then(r => r.json())
  }
  
export function getTemplate(path) {
  return fetch(`${path}`).then(r => r.text())
}
  
export function swapArray(arr) {
  return arr[0].map((col, i) => arr.map(row => row[i]));
}

export function uniqueArray(arr) {
  return arr.filter((d, i) => i === arr.indexOf(d));
}

export function getEveryNth(arr, n) {
  return arr.filter((_, index) => index % n === 0);
}  

// getBrowser tells us the browser so we can adjust the web speech API settings as needed

export function getBrowser() {
  let browserInfo = navigator.userAgent;
  let browser;
  if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
    browser = 'Opera';
  } else if (browserInfo.includes('Edg')) {
    browser = 'Edge';
  } else if (browserInfo.includes('Chrome')) {
    browser = 'Chrome';
  } else if (browserInfo.includes('Safari')) {
    browser = 'Safari';
  } else if (browserInfo.includes('Firefox')) {
    browser = 'Firefox'
  } else {
    browser = 'unknown'
  }
    return browser;
}
  

export function checkNull(obj, key) {
  let result = null
  if (obj) {
    if (key in obj) {
      if (obj[key] != "") {
        return obj[key]
      }
    }
    return result
  }
  else {
    return result
  }
}



export function makeSafe(s) {
  return s.replace(/^[^a-z]+|[^\w:.-]+/gi, "_");
}


// eg let merged = merge(defaults, chartData)

export function merge(to, from) {
  
      for (const n in from) {
          // console.log(n)
          if (typeof to[n] != 'object') {
            to[n] = from[n];
          } else if (typeof from[n] == 'object') {
              to[n] = merge(to[n], from[n]);
          }
      }
      return to;
};
  
  export function contains(a, b) {
  
      if (Array.isArray(b)) {
          return b.some(x => a.indexOf(x) > -1);
      }
  
      return a.indexOf(b) > -1;
  }
  
  export function commas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  export function getMargins(settings) {
  
        let margins = {
          top: settings["margintop"],
          right: settings["marginright"],
          bottom: settings["marginbottom"],
          left: settings["marginleft"]
        }
  
      return margins
  }
  
  export function mobileCheck() {
  
      var windowWidth = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
      )
  
      return windowWidth < 610 ? true : false
  }
  
  export function getLongestKeyLength($svg, keys, isMobile, lineLabelling) {
      if (lineLabelling) {
          d3.select("#dummyText").remove()
          const longestKey = keys.sort(function (a, b) {
              return b.length - a.length
          })[0]
          const dummyText = $svg
              .append("text")
              .attr("x", -50)
              .attr("y", -50)
              .attr("id", "dummyText")
              .attr("class", "annotationText")
              .style("font-weight", "bold")
              .style("font-size", "15px")
              .text(longestKey)
        let dummyWidth = dummyText.node().getBBox().width
        return dummyWidth
          
      }
      return 0
  }
  
  export function numberFormat(num) {
      if ( num > 0 ) {
          if ( num >= 1000000000 ) { 
  
              if ((num / 1000000000) % 1 == 0) {
                  return ( num / 1000000000 ) + 'bn' 
              }
              else {
                  return ( num / 1000000000 ).toFixed(1) + 'bn' 
              }
              
              }
          if ( num >= 1000000 ) { 
  
              if (( num / 1000000 ) % 1 == 0) {
                return ( num / 1000000 ) + 'm' 
              }  
              else {
                return ( num / 1000000 ).toFixed(1) + 'm' 
              }
              
              }
          if ( num >= 1000 ) {
  
              if (( num / 1000 ) % 1 == 0) {
                return ( num / 1000 ) + 'k' 
              }
  
              else {
                return ( num / 1000 ).toFixed(1) + 'k' 
              }
            }
          if (num % 1 != 0) { 
              return num
            }
          else { return num }
      }
      if ( num < 0 ) {
          var posNum = num * -1;
          if ( posNum >= 1000000000 ) return [ "-" + String(( posNum / 1000000000 ).toFixed(1)) + 'bn'];
          if ( posNum >= 1000000 ) return ["-" + String(( posNum / 1000000 ).toFixed(1)) + 'm'];
          if ( posNum >= 1000 ) return ["-" + String(( posNum / 1000 ).toFixed(1)) + 'k'];
          else { return num }
      }
      return num;
  }
  
  export function numberFormatSpeech(num) {
    if ( num > 0 ) {
        if ( num >= 1000000000 ) { 

            if ((num / 1000000000) % 1 == 0) {
                return ( num / 1000000000 ) + ' billion' 
            }
            else {
                return ( num / 1000000000 ).toFixed(1) + ' billion' 
            }
            
            }
        if ( num >= 1000000 ) { 

            if (( num / 1000000 ) % 1 == 0) {
              return ( num / 1000000 ) + 'm' 
            }  
            else {
              return ( num / 1000000 ).toFixed(1) + ' million' 
            }
            
            }
        // if ( num >= 1000 ) {

        //     if (( num / 1000 ) % 1 == 0) {
        //       return ( num / 1000 ) + 'k' 
        //     }

        //     else {
        //       return ( num / 1000 ).toFixed(1) + ' thousand' 
        //     }
        //   }
        if (num % 1 != 0) { 
            return num
          }
        else { return num }
    }
    if ( num < 0 ) {
        var posNum = num * -1;
        if ( posNum >= 1000000000 ) return [ "-" + String(( posNum / 1000000000 ).toFixed(1)) + ' billion'];
        if ( posNum >= 1000000 ) return ["-" + String(( posNum / 1000000 ).toFixed(1)) + ' million'];
        else { return num }
    }
    return num;
}



  export function mustache(template, self, parent, invert) {
    var render = mustache
    var output = ""
    var i
  
    function get (ctx, path) {
      path = path.pop ? path : path.split(".")
      ctx = ctx[path.shift()]
      ctx = ctx != null ? ctx : ""
      return (0 in path) ? get(ctx, path) : ctx
    }
  
    self = Array.isArray(self) ? self : (self ? [self] : [])
    self = invert ? (0 in self) ? [] : [1] : self
    
    for (i = 0; i < self.length; i++) {
      var childCode = ''
      var depth = 0
      var inverted
      var ctx = (typeof self[i] == "object") ? self[i] : {}
      ctx = Object.assign({}, parent, ctx)
      ctx[""] = {"": self[i]}
      
      template.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,
        function(match, code, y, z, close, invert, name) {
          if (!depth) {
            output += code.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,
              function(match, raw, comment, isRaw, partial, name) {
                return raw ? get(ctx, raw)
                  : isRaw ? get(ctx, name)
                  : partial ? render(get(ctx, name), ctx)
                  : !comment ? new Option(get(ctx, name)).innerHTML
                  : ""
              }
            )
            inverted = invert
          } else {
            childCode += depth && !close || depth > 1 ? match : code
          }
          if (close) {
            if (!--depth) {
              name = get(ctx, name)
              if (/^f/.test(typeof name)) {
                output += name.call(ctx, childCode, function (template) {
                  return render(template, ctx)
                })
              } else {
                output += render(childCode, name, ctx, inverted) 
              }
              childCode = ""
            }
          } else {
            ++depth
          }
        }
      )
    }
    return output
  }
  
  export function createElement(element, attribute, inner) {
    if (typeof(element) === "undefined") {
      return false;
    }
    if (typeof(inner) === "undefined") {
      inner = "";
    }
    var el = document.createElement(element);
    if (typeof(attribute) === 'object') {
      for (var key in attribute) {
        el.setAttribute(key, attribute[key]);
      }
    }
    if (!Array.isArray(inner)) {
      inner = [inner];
    }
    for (var k = 0; k < inner.length; k++) {
      if (inner[k].tagName) {
        el.appendChild(inner[k]);
      } else {
        el.appendChild(document.createTextNode(inner[k]));
      }
    }
    return el;
  }
  
  export function getURLParams(paramName) {
    var params = ""
    if (top !== self) {
      params = window.location.search.substring(1).split("&")
    } else {
      params = window.parent.location.search.substring(1).split("&")
    }
  
    for (let i = 0; i < params.length; i++) {
      let val = params[i].split("=")
      if (val[0] == paramName) {
        return val[1]
      }
    }
    return null
  
  }
  
  export function preflight(array, chart) {
  
    let charts = array.map(item => item.type)
  
    return (chart=="") ? false :
    (contains(charts,chart)) ? chart : false ;
  
  }
  
  export function getMinMax(array) {
  
    let range =  d3.extent(array)
    let min = 0
    let max = range[1]
    let status = false
  
    if (range[0] < 0) {
  
      range[0] = Math.floor(range[0])
          
      range[1] = Math.ceil(range[1])
            
      max = (Math.abs(range[0]) > range[1]) ? Math.abs(range[0]) : range[1]
  
      min = -max
  
      status = true
  
    }
  
    return { min : min , max : max , status : status }
  
  }
  
  export function bufferize(min, max, buff=5) {
    const buffer = ((max - min) / 100) * buff
    return [min - buffer, max + buffer]
  }
  
  export function textPadding(d) {
    if (d.y2 > 0) {
      return 12
    } else {
      return -2
    }
  }
  
  export function textPaddingMobile(d) {
    if (d.y2 > 0) {
      return 12
    } else {
      return 4
    }
  }
  
  export function stackMin(serie) {
    return d3.min(serie, function (d) {
      return d[0]
    })
  }
  
  export function stackMax(serie) {
    return d3.max(serie, function (d) {
      return d[1]
    })
  }
  
  export function config(data) {
  
    let keys = Object.keys(data)
  
    let settings = {}
  
    settings.modules = {}
  
    settings.height = 0
  
    settings.width = 0
  
    settings.isMobile = null
  
    settings.colors = null
  
    settings.datum = []
  
    for (let key of keys) {
  
      if (key == "template" || key == "options" || key == "chartId" ) {
  
        let special_keys = Object.keys(data[key][0])
  
        for (let special_key of special_keys) {
  
          settings[special_key.replace('-', '')] = data[key][0][special_key]
        
        }
  
      } else {
  
        if (key == 'data') {
  
          let dataKeys = Object.keys(data[key][0])
  
          settings.keys = dataKeys
  
          // for (let row of data[key]) {
  
          //   for (let cell of dataKeys) {
          //     if (row[cell] === "") 
          //     row[cell] = (typeof row[cell] === "string" && !isNaN(row[cell])) ? +row[cell] : row[cell]
  
          //   }
            
          // }
  
        }
  
        settings[key] = data[key]
  
      }
  
    }
  
    let curated = Object.keys(settings)
  
    for (const setting of curated) {
  
      // Convert strings to numbers
  
      if (contains(['marginleft','marginright','margintop','marginbottom', 'numCols', 'height', 'x_axis_cross_y', 'maxHeight'], setting)) {
  
        settings[setting] = (isNaN(settings[setting])) ? settings[setting] : +settings[setting]
  
      }
  
      // Convert booleans
  
      if (contains(['enableShowMore','aria', 'enableSearch', 'enableSort', 'enableScroll', 'zero_line_x', 'zero_line_y', 'lineLabelling'], setting)) {
  
        settings[setting] = (settings[setting].toLowerCase() == 'false') ? false : true
  
      }
  
    }
  
    // console.log(Object.keys(settings))
  
    // console.log(settings)
  
    return settings
  
  }
  
  export function validate(value, type) {
  
    return (typeof value == type) ? true : false
  
  }
  
  export function validateString(value, array=[]) {
  
    let status = (typeof value == 'string') ? true : false
  
    if (array.length > 0) {
  
      status = (status && contains(array, value)) ? true : false
  
    }
  
    if (value == "") {
  
      status = false
  
    }
  
    return status
  
  }


  export function analyseTime(data, settings) {
    let results = {}
    results.interval = null
    results.timescale = null
    results.suggestedFormat = null
    let xVar = null 
    let dataKeys = Object.keys(data[0])
    let xColumn = checkNull(settings, 'xColumn')
    if (!xColumn) {
      xVar = dataKeys[0]
    }
    else {
      xVar = xColumn
    }
  
    let time1 = data[0][xVar]
    let time2 = data[1][xVar]
   
    let timeDiff = Math.abs(time2 - time1); // difference in milliseconds
  
    // Define time constants
    const ONE_HOUR = 1000 * 60 * 60;
    const ONE_DAY = ONE_HOUR * 24;
    const ONE_WEEK = ONE_DAY * 7;
    const ONE_MONTH = ONE_DAY * 28; // approximate
    const ONE_QUARTER = ONE_MONTH * 3; // approximate
    const ONE_YEAR = ONE_DAY * 365;
  
    // Determine the appropriate time unit and strftime format
    if (timeDiff < ONE_DAY) {
      results.interval = timeDiff / ONE_HOUR;
      results.timescale = 'hour';
      results.suggestedFormat = '%H:%M'; // hours and minutes
    } else if (timeDiff < ONE_WEEK) {
      results.interval = timeDiff / ONE_DAY;
      results.timescale = 'day';
      results.suggestedFormat = '%d %b'; // day and month
    } else if (timeDiff < ONE_MONTH) {
      results.interval = timeDiff / ONE_WEEK;
      results.timescale = 'week';
      results.suggestedFormat = '%d %b'; // week of the year
    } else if (timeDiff < ONE_QUARTER) {
      results.interval = timeDiff / ONE_MONTH;
      results.timescale = 'month';
      results.suggestedFormat = '%B %Y'; // month and year
    } 
    else if (timeDiff < ONE_YEAR) {
      results.interval = timeDiff / ONE_QUARTER;
      results.timescale = 'quarter';
      results.suggestedFormat = '%B %Y'; // month and year
    }
    else {
      results.interval = Math.round(timeDiff / ONE_YEAR);
      results.timescale = 'year';
      results.suggestedFormat = '%Y'; // year
    }
  
    return results;
  
  }
  
  function yearText(year) {

    if (year.length !=4) {
      console.log("Error, not a year string")
      return year
    } 
  
    else {
      let partOne = year.slice(0,2)
      let partTwo = year.slice(2,4)
      let checkZero = year.slice(2,3)
  
      if (year != "2000" && partTwo == "00") {
        
        partTwo = "hundred"
      }
  
      else if (year == "2000") {
        partOne = "two thousand"
        partTwo  = ""
      }
  
      else if (checkZero == "0") {
  
        let lastNum = year.slice(3,4)
        partTwo = "oh " + lastNum
      }
  
      return `${partOne} ${partTwo}`
    }	
    
  }
  
  export function xvarFormatSpeech(xVar, format) {
    // check for date objects
    // console.log(xVar, format)
    if (typeof xVar == "object") {
      
      let timeFormatter = d3.timeFormat(format)
      let result = timeFormatter(xVar)
      if (format == "%Y") {
        result = yearText(result)
      }
      return result
    }
    
    else {
      return xVar
    }
  
  }

  // Sets the note duration to fit an overall duration for playing back a data series

  export function getDuration(data) {

    let rowLength = data.length
    let dataCols = Object.keys(data[0]).slice(1)
    let numberCols = dataCols.length
    let dataLength = rowLength * numberCols
  
    // console.log("dataLength", dataLength)
    let targetDuration = 20
    let newDuration = 20
    let note = 0.20
    
    // // console.log("full length at 0.20", note * dataLength)
    if ((note * dataLength) <=  targetDuration) {
      // return {"note":note, "audioRendering":"discrete"}
      return note * dataLength
    }
  
    if ((note * dataLength) > targetDuration) {
      note = 0.1
    }

    if ((note * dataLength) <=  targetDuration) {
      // return {"note":note, "audioRendering":"discrete"}
      return note * dataLength
    }

    else {
      note = targetDuration / dataLength
      // TBC: set audioRendering to continuous for very long datasets. requires testing
      // return {"note":note, "audioRendering":"discrete"}
      return note * dataLength
    }
  
  }