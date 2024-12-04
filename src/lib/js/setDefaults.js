// Sets the note duration to fit an overall duration for playing back a data series

function getDuration(dataLength) {

  let targetDuration = 20
  let note = 0.20
  // console.log("full length at 0.20", note * dataLength)
  if ((note * dataLength) <=  targetDuration) {
    // return {"note":note, "audioRendering":"discrete"}
    return note
  }

  if ((note * dataLength) > targetDuration) {
    note = 0.1
  }

  if ((note * dataLength) <=  targetDuration) {
    // return {"note":note, "audioRendering":"discrete"}
    return note
  }

  else {
    note = targetDuration / dataLength
    // TBC: set audioRendering to continuous for very long datasets. requires testing
    // return {"note":note, "audioRendering":"discrete"}
    return note
  }

}

// Figure out how to describe the interval for the notes

import { checkNull } from '$lib/js/utils';

function getInterval(settings, xVar, timeSettings) {
  
  // default to the x column name

  let result = xVar

  // user has definted the interval, cool!

  if (checkNull(settings, "interval")) {

    console.log("user has defined the interval")
    result = settings.interval
    
  }

  // no defined interval and it's a date  

  else if (timeSettings) {
    return timeSettings.timescale
  }

  return result

}


export function setDefaults(chartData, options) {
    let suggestedDuration = getDuration(chartData.sheets.data.length)
}