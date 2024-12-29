<main class="{chartTheme}">
    <Content>
      <Grid>
        <Row>
          <Column>
            <h1>Noisycharts Composer</h1>
            <p>This thing makes audio charts and animates them</p>
          </Column>
        </Row>

        <!-- Chart data input -->
        <Row>
  
          <Column>
            <h2>1. Import your data</h2>
              <Tabs>
                <Tab label="Paste your data" />
                <Tab label="Import Yacht chart" />
                  <svelte:fragment slot="content">
                    <TabContent>
                      
                      <TextArea labelText="Make sure your data is clean before your drop it" placeholder="Paste your data here"
                      invalidText="What is going on with your data?" bind:value={txtToJson}/>

                      <Button on:click={() => checkDataInput(txtToJson)} disabled={txtToJson === ''}>
                        Load data
                      </Button>

                    </TabContent>
                    <TabContent>
                      <Row>
                      <Column>
                        <TextInput placeholder="Paste" bind:value={inputURL}/>
                      </Column>
                      <Column>
                          <Button on:click={loadData} disabled={inputURL === ''}>
                            Load chart
                          </Button>
                      </Column>   
                     </Row>
                    </TabContent>
                  </svelte:fragment>
              </Tabs>
        
          </Column>
        
        </Row>
        
        <!-- Chart type selection -->
        <Row>
          <Column>
            <h2>2. Select your chart type</h2>
            {#each activeCharts as chart, i}
            <div class="chartBlock" class:active={chart.active} on:click={() => createChart({chart}, 'buttons')}>
              <div class="chart-interior">{chart.type}</div>
            </div>
            {/each}
          </Column>
        </Row>

        <Row>
          <Column>
          <h2>2. Edit and play chart</h2>
          <div class="colorWrapper" id="interactionZone">  
            <div class="chartMaker" style="width: {width}px;">
              <div id="chartWrapper" class="container {chartTheme}" style="{cssVarStyles}">
                  <div class="row" id="furniture">
                    <div class="chartTitle row" id="chartTitle"  style="font-size: {20 * chartSettings.textScaling}px;"><span class="colouredTitle" bind:innerHTML={chartSettings.title} contenteditable="true">{chartSettings.title}</span> </div>
                    {#if chartSettings.subtitle}
                    <div class="subTitle row" id="subTitle" style="font-size: {16 * chartSettings.textScaling}px;" contenteditable="true">{chartSettings.subtitle}</div>
                    {/if}
                    {#if chartSettings.chartKey}
                    <div id="chartKey"></div>
                    {/if}
                  </div>
                {#if chartType}
                    <div id="chartContainer"  style="width: {width}px; height:{chartHeight}px;">
              
                        <div id="positionCounter" draggable="true" class="draggable {noisyChartSettings.positionCounter ? 'show' : 'hide'}" >
                          <div id="positionCounterTitle" style="font-size: {12 * chartSettings.textScaling}px;"></div>
                          <div id="positionCounterValue" class="noto" style="font-size: {20 * chartSettings.textScaling}px;"></div>
                        </div>
            
                      <svg width={width} height={chartHeight} id="chart" overflow="hidden">
                        <g transform="translate({chartSettings.marginleft},{chartSettings.margintop})" id="features"></g>
                      </svg>
                    </div>
  
                    {:else}
                    <div style="width: {width}px; height:{chartHeight}px;" class="placeHolder"><p class="loading">{statusMessage}</p></div>
                  {/if}
                  <div class="row footer" id="footer">
                    <div class="sourceText">
                      {#if watermark}<span>A <b>noisychart</b> by @nickevershed </span>{/if}{#if chartSettings.source}Source: <span id="sourceText" contenteditable="true">{chartSettings.source}</span>{/if}
                    </div>
                  </div>     
                </div>
            </div>
          </div>  
          </Column>
        </Row>
        {#if chartMaker}
          <Row>
            <Column>
              
              <Button on:click={playChart} disabled='{!loader}'>
                Play chart
              </Button>
              
            </Column>
            <Column>
              
              <!-- <Button on:click={exportAudio} disabled='{!loader}'>
                Export audio
              </Button> -->
              
            </Column>
          </Row>
          <Controls bind:noisyChartSettings loadInstruments={loadInstruments} bind:chartSettings setDimensions={setDimensions} reRenderChart={reRenderChart} updateOptions={updateOptions} bind:chartTheme changeStyle={changeStyle} bind:customBackground />
        {/if}
      </Grid>
    </Content>
    <div class="mainFooter"></div>
  </main>
  
  <script>
    import {
      Button,
      Content,
      Grid,
      Row,
      Column,
      TextInput,
      Tabs,
      Tab,
      TabContent,
      TextArea
    } from "carbon-components-svelte";
    import { onMount } from 'svelte';
    import { schema } from 'newsroom-dojo';
    import { getJson, merge, config, analyseTime, getDuration } from '$lib/js/utils';
    import { setDefaults } from "$lib/js/setDefaults";
    import { convertData } from "$lib/js/convertData";
    import { checkData, parseDataInput, arrToJson, givePrompt } from "$lib/js/parseDataInput"
    import { checkDatasetShape, checkDataIsFormattedForChartType } from "$lib/js/checkDatasetShape"
    import { dragger } from '$lib/js/dragger';
    import NoisyChart from "$lib/js/sonicV2"
    import Controls from '$lib/components/Controls.svelte'
    // load the json with an import statement
    import chartTypes from '$lib/data/chartTypes.json';
    // console.log(linechartJson.sheets)
    // SUV
    // let inputURL = "https://docs.google.com/spreadsheets/d/1hxk6BFGjfsbTV8uRqlJWCvuiqZXUyqAgPrQXU08bVuk/edit#gid=0"

    // Polling

    let inputURL = "https://docs.google.com/spreadsheets/d/1HqFpDPomxnanDcMf92c8-f2m6STKO8ua9wtAUCbPjtw/edit?gid=0"

    let templatesLoaded = false;
    async function loadJson(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load JSON');
        return await response.json();
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }

    // Houses
    // let inputURL = "https://docs.google.com/spreadsheets/d/1l6ERsxHPrsc1eBkoaV1WTsNuASKWLQCs_uzh-QdtRmI/edit#gid=0"
  
    // Horizontalbar testing
  
    // let inputURL = "https://docs.google.com/spreadsheets/d/12dBkU8rPdLNqVjRh3U2z1kB_SWXN9QQtYjFsTuDhZd0/edit#gid=1214286233"
  
    // let inputURL = "https://docs.google.com/spreadsheets/d/1EeblzY_1VdKR9TPg_USDSeaPdCeS9s0JLyhGGbeGrvY/edit"
  
    // Cavoodle demo
    // let inputURL = "https://docs.google.com/spreadsheets/d/1v4hMVF7qyn36yQy4e_ZE2FNvxc3QgwymDOWZM2dHw-Q/edit#gid=2083681420"
  
    
    /**
     * @type {RequestInfo | URL | null}
     */
    let chartURL = null

    let statusMessage = "Waiting to load chart..."
    let loader = false
    let watermark = false

    // Chart settings object 

    let chartSettings = {"title":"This is a headline", 
                  "subtitle":"This is a subtitle", 
                  "source":"The source text",
                  "margintop":10, 
                  "marginbottom":20, 
                  "marginleft":50, 
                  "marginright":20, 
                  "chartKey":true, 
                  "textScaling":1}

    /**
     * @type {string | null} 
     */
    let chartType = null
    let chartData = {
      "sheets": {}
    }

    // Because we still support the legacy google sheets json output data format, each object like settings etc needs to be the first element of an array
    chartData.sheets['template'] = [chartSettings]

    let chartDataTypes = []
    let activeCharts = chartTypes.filter(d => d.noisycharts_supported)
    let dataIsValid = false
    let txtToJson = "Year	Passenger	Light commercial	SUV\n2012-01-01	51.9	17.83	27.5\n2013-01-01	49.9	18	29.35\n2014-01-01	47.75	17.78	31.65\n2015-01-01	44.63	17.23	35.35\n2016-01-01	41.27	18.48	37.43\n2017-01-01	37.8	19.9	39.16\n2018-01-01	32.8	20.64	42.95\n2019-01-01	29.7	21.23	45.48\n2020-01-01	24.2	22.42	49.59\n2021-01-01	21.1	24.12	50.65\n2022-01-01	18.8	23.71	53.14"
    let prompt = ""
    let width = 620
    let height = 480
    let chartHeight = 480
    let chartMaker = null
    let supportedCharts = ['linechart', 'verticalbar', 'horizontalbar']
    let soundPalette = ['Kalimba', 'Cello']
    let sonic = null;
    let chartTheme = 'the-crunch'
    let firstSynthLoad = false
    let dataConverted = false
    /**
     * @type {null}
     */
    let customBackground = null
    $: axisText = 14 * chartSettings.textScaling
    $: footerText = 12 * chartSettings.textScaling
    $: axisPad = 12 * chartSettings.textScaling
    $: lineStroke = Math.max(2 * chartSettings.textScaling, 4)
    $: cssVarStyles = `--axis-text:${axisText}px;--axis-pad:${axisPad}px;--footer-text:${footerText}px;--line-stroke:${lineStroke}px;background-image: url("${customBackground}");background-size: cover;`;
    
    // Sonification and animation option object, linked to the svelte controls
    
    let noisyChartSettings = {
      audioRendering: "discrete",
      chartMode:'no voiceover',
      duration: 5,
      low: 130.81,
      high: 523.25,
      simultaneous: false,
      pauseDuration:1000,
      invertAudio:false,
      selectedInstruments:[{seriesName: "Series 1", instrument: "Kalimba"}],
      scaleNotes: false,
      animationStyle: 'playthrough',
      timeClickEnabled:false,
      timeClick:null,
      interval:null,
      recording:false,
      positionCounter:false
    }
  

  // Parses chart data from an input string  

  // $: checkDataInput(txtToJson)

  function checkDataInput(txt) {

    prompt = ""
      
    if (txt != "" && checkData(txt)) {

      // Parses the pasted text input
      // The resulting obect has information about the data, like the inferred data type of each column, date formats, etc
      // This is important for setting sensible default options

      let resp = parseDataInput(txt)

      chartDataTypes = resp

      let data = arrToJson(resp)
      
      // console.log("resp",resp)
     
      let specs = checkDatasetShape(data, resp.type, resp.head)
      // console.log("specs", specs)
      chartDataTypes.datasheet = specs

      // Sets the date time defaults

      for (const col of chartDataTypes.type) {

        if (col.list[0] == "date") {
          chartSettings.dateFormat = col.format
          // chartSettings.xAxisDateFormat = col.format
          break
        }

      }
    

      let filteredByShape = chartTypes.filter(d => d.config[specs.shape] && d.noisycharts_supported)

      let newActiveCharts = filteredByShape.filter(d => checkDataIsFormattedForChartType(d, specs.frequencies))
      let newActiveChartsArray = newActiveCharts.map((x) => x.type)
      
      activeCharts.forEach(d => {
  
        if (newActiveChartsArray.includes(d.type)) {
          // console.log("yeg")
          d.active = true
        }
      })

      // Svelte needs this to know the array has been updated   
      activeCharts = activeCharts;

      // console.log(activeCharts)

      chartData.sheets.data = data
      chartData.sheets.cols = specs.specs

      //console.log(orderJsonObjectByColumns(resp.head,data))

      dataIsValid = true
      dataConverted = false
      prompt = 'Click the next step button to proceed'

    } else {

      dataIsValid = false;

      prompt = (txt.length > 0) ? givePrompt(txt) : ''

    }
  }



    // Loads chart data from a URL
  
    function loadData() {
      // console.log(inputURL)
      chartMaker = {}
      // console.log("chartMaker",chartMaker)
      let chartJSONKey = null
      dataConverted = false
      // is it a google docs url? Later make this write JSON for a public sheet
  
      if (inputURL.includes("docs.google.com")) {
        chartJSONKey = inputURL.split("/")[5]
        // console.log(chartJSONKey)
        chartURL = `https://interactive.guim.co.uk/docsdata/${chartJSONKey}.json`
      }
  
      // is it a yacht URL
  
      if (inputURL.includes("interactive.guim.co.uk")) {
        
        // is it a front-end chart URL

        if (inputURL.includes("embed"))  {
          let docKey = inputURL.split("key=")[1].split("&location=")[0]
          let docLocation = inputURL.split("&location=")[1]
          chartURL = `https://interactive.guim.co.uk/${docLocation}/${docKey}.json`
        }
        
        else {
          chartURL = inputURL
        }
        
      }
  
      if (chartURL) {
        fetch(chartURL)
        .then((response) => response.json())
        .then((results) => { 
          
          // Update chart data with the spreadsheet/json data
          chartData = results
          let chartType = results['sheets']['chartId'][0]['type']
          let chartSettings = {chart: activeCharts.filter((d) => d.type === chartType)[0]}
          // noisyChartSettings = setDefaults(chartData, noisyChartSettings)
          createChart(chartSettings, 'yachtURL')

        });
  
  
      }
    }
  
    async function createChart(chartObj, from) {

      chartType = chartObj.chart.type
      
      // Get the chart type
  
      console.log("chartType", chartType)
      // check if it's a supported chart type
  
      if (supportedCharts.includes(chartType)) {
  
        if (chartType == "horizontalbar") {
          noisyChartSettings.audioRendering = "categorical"
          noisyChartSettings.positionCounter = false
          // noisyChartSettings.invertAudio = true
        }
  
        // Gets the default settings for each chart from a json file
        // If json is in the public directory 

        let defaults = await getJson(`/templates/${chartType}.json`)
     
        // Merges the default settings with any we have from a remote Google doc
  
        let merged = merge(defaults, chartData)
        
        // console.log("merged",merged)

        // Parsing the settings from the merged object into a single settings object, converting things etc
  
        chartSettings = config(merged.sheets)
  
        // console.log("settings1", chartSettings)

        let dataSchema = schema(chartSettings.data);
        
        if (dataConverted == false) {
          convertData(chartSettings.data, chartSettings)
          dataConverted = true
        }

        // console.log("convertedData", settings.data)
        // dateformat has been set so lets work out a good default interval etc

        if (chartSettings.dateFormat != "") {
          let dateTimeResults = analyseTime(chartSettings.data, chartSettings)
          // console.log(dateTimeResults)
          noisyChartSettings.interval = String(dateTimeResults.interval) + " " + dateTimeResults.timescale
          chartSettings.xAxisDateFormat = dateTimeResults.suggestedFormat
        }

        // Resize as needed, tell all the things what to do
  
        let furnitureHeight = document.querySelector("#furniture").getBoundingClientRect().height + document.querySelector("#footer").getBoundingClientRect().height
        chartHeight = height - furnitureHeight
        chartSettings.width = width
        chartSettings.height = chartHeight
        chartSettings.chartKey = true
        // chartSettings.positionCounter = true
        chartSettings.textScaling = 1

        // settings.timeClick = 10
        // If no color scheme set by user for the chart and no userkey set, then use the color scheme selected
  
        if (chartSettings.colorScheme == "" && chartSettings.userkey.length == 0) {
          chartSettings.colorScheme = chartTheme
        }
  
        // Make an instrument per data series, like a color palette
  
        let dataSeries = chartSettings.keys.slice(1)
  
        dataSeries.forEach((series,i) => {
          noisyChartSettings.selectedInstruments[i] = {seriesName: series, instrument: "Kalimba"}
        })
  
        noisyChartSettings.duration = getDuration(chartSettings.data)
        // console.log("note",noisyChartSettings.note)
        sonic = new NoisyChart({chartSettings:chartSettings, noisyChartSettings:noisyChartSettings})
        sonic.setupSonicData({data:chartSettings.data, options:noisyChartSettings})
        // Set up synths and load samples
  
        loader = sonic.loadSynths(noisyChartSettings)
  
        // Render the chart by importing the specified chart module
  
        import(`$lib/js/${chartType}.js`).then((chartModule) => {   
            chartMaker = new chartModule.default(chartSettings)
            chartMaker.render()
            // sonic.test(chartMaker.test)
            sonic.setAnimateCircle(chartMaker.makeCircle)

            if (noisyChartSettings.audioRendering == 'discrete') {
              sonic.setChartAnimation(chartMaker.animateDiscrete)
            }

            else if (noisyChartSettings.audioRendering == 'continuous') {
              sonic.setChartAnimation(chartMaker.animateContinuous)
            }

            sonic.addInteraction()

            let draggies = document.querySelectorAll(".draggable");
            draggies.forEach(item => {
              dragger(item,  document.querySelectorAll("#chartContainer")) 
            }) 
        })
      }
  
      else {
        statusMessage = `Chart type ${chartType} not supported`
      }
      
    } // end setupChart
  
    function playChart() {
      // console.log("noisyChartSettings", noisyChartSettings)
      // chartMaker.play(noisyChartSettings, sonic)
      
      chartMaker.resetAnimation(noisyChartSettings)
      sonic.playPause()
    }
  
    function exportAudio() {
      // console.log("noisyChartSettings", noisyChartSettings)
      chartMaker.play(noisyChartSettings, sonic)
    }
  
    function loadInstruments(event) {
      if (event) {
        console.log("loading...")
        loader = sonic.loadSynths(noisyChartSettings)
      }
    }
  
    function changeStyle(event) {
      // console.log("changeStyle")
      if (chartSettings.userkey.length == 0) {
        // console.log(chartTheme)
        chartSettings.colorScheme = chartTheme
        chartMaker.render(chartSettings)
        
        // if (chartTheme == "the-crunch") {
        //   customBackground = "https://interactive.guim.co.uk/embed/aus/2023/texture-looped.gif"
        // }
      }
  
    }
  
    function setDimensions(value) {
      if (value) {
        // console.log(value)
        width = Number(value.split(",")[0])
        height = Number(value.split(",")[1])
        let ratio = width / 620
        chartSettings.textScaling = ratio
        chartSettings.marginbottom = chartSettings.marginbottom * ratio
        chartSettings.marginleft = chartSettings.marginleft * ratio
        chartSettings.marginright = chartSettings.marginright * ratio
        chartSettings.margintop = chartSettings.margintop * ratio
  
        // console.log("ratio", ratio)
        setTimeout(() => {
          let furnitureHeight = document.querySelector("#furniture").getBoundingClientRect().height + document.querySelector("#footer").getBoundingClientRect().height
          // console.log("furny height", furnitureHeight)
          chartHeight = height - furnitureHeight
          chartSettings.width = width
          chartSettings.height = chartHeight
          // chartSettings.width = width
          // chartSettings.height = height
          chartMaker.render(chartSettings)
        },500)
        
      }
    } 
    
    function reRenderChart() {
      chartMaker.render(chartSettings)
    }

    function updateOptions() {
      if (chartMaker && sonic) {
        if (noisyChartSettings.audioRendering == 'discrete') {
              sonic.setChartAnimation(chartMaker.animateDiscrete)
            }

        else if (noisyChartSettings.audioRendering == 'continuous') {
          sonic.setChartAnimation(chartMaker.animateContinuous)
        }
      }
      sonic.setupSonicData({data:chartSettings.data, options:noisyChartSettings})
    }
  
  </script>
  
  
  <style lang="scss" global>

    @import "carbon-components-svelte/css/white.css"; 
    @import "$lib/css/chart.css";
    @import "$lib/css/fonts.css";
    @import "$lib/css/noto.css";
    @import "$lib/css/guardian.css";
    @import "$lib/css/darkmode.css";
    @import "$lib/css/greenscreen.css";
    @import "$lib/css/the-crunch.css";
    
    .chartSans {
      font-size: 0.9rem;
      color: #767676;
      font-family: "Guardian Text Sans Web", "Agate Sans", sans-serif;
    }
    
    .tick text {
      font-size: var(--axis-text);
      line-height: 1em;
      font-family: "Guardian Text Sans Web", "Agate Sans", sans-serif;
    }
  
    .addTick {
      font-size: var(--axis-text);
      line-height: 1em;
      font-family: "Guardian Text Sans Web", "Agate Sans", sans-serif;
    }
  
    .dataLine {
      stroke-width: var(--line-stroke);
    }
  
    .keyText {
      font-size: var(--footer-text);
    }
  
    .keyCircle {
      width: var(--footer-text);
      height: var(--footer-text);
    }
  
    #positionCounterValue {
      font-size: var(--pos-counter-text);
    }
  
    .footer  {
      font-size: var(--footer-text);
    }

    .chartBlock {
      width: 20%;
      height: 0px;
      padding-bottom: 20%;
      color:white;
      float:left;
      position: relative;

      .chart-interior {
        position: absolute;
        left: 10px;
        right:10px;
        top: 10px;
        bottom: 10px;
        background-color: lightgrey;
        padding: 10px;
        cursor: pointer;
      }
    }
  
    .chartBlock.active {
      .chart-interior {
          background-color: #0f62fe;
      }
    }

  </style>
  
  