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
                          <Button on:click={loadChart} disabled={inputURL === ''}>
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
          <div class="colorWrapper">  
            <div class="chartMaker" style="width: {width}px;">
              <div id="chartWrapper" class="container {chartTheme}" style="{cssVarStyles}">
                  <div class="row" id="furniture">
                    <div class="chartTitle row" id="chartTitle"  style="font-size: {20 * settings.textScaling}px;"><span class="colouredTitle" bind:innerHTML={settings.title} contenteditable="true">{settings.title}</span> </div>
                    {#if settings.subtitle}
                    <div class="subTitle row" id="subTitle" style="font-size: {16 * settings.textScaling}px;" contenteditable="true">{settings.subtitle}</div>
                    {/if}
                    {#if settings.chartKey}
                    <div id="chartKey"></div>
                    {/if}
                  </div>
                {#if chartType}
                    <div id="chartContainer"  style="width: {width}px; height:{chartHeight}px;">
              
                        <div id="positionCounter" draggable="true" class="draggable {settings.positionCounter ? 'show' : 'hide'}" >
                          <div id="positionCounterTitle" style="font-size: {12 * settings.textScaling}px;"></div>
                          <div id="positionCounterValue" class="noto" style="font-size: {20 * settings.textScaling}px;"></div>
                        </div>
            
                      <svg width={width} height={chartHeight} id="chart" overflow="hidden">
                        <g transform="translate({settings.marginleft},{settings.margintop})" id="features"></g>
                      </svg>
                    </div>
  
                    {:else}
                    <div style="width: {width}px; height:{chartHeight}px;" class="placeHolder"><p class="loading">{statusMessage}</p></div>
                  {/if}
                  <div class="row footer" id="footer">
                    <div class="sourceText">
                      {#if watermark}<span>A <b>noisychart</b> by @nickevershed </span>{/if}{#if settings.source}<span id="sourceText" contenteditable="true">{settings.source}</span>{/if}
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
              
              <!-- <Button on:click={recordAudio} disabled='{!loader}'>
                Export audio
              </Button> -->
              
            </Column>
          </Row>
          <Controls bind:options loadInstruments={loadInstruments} bind:settings setDimensions={setDimensions} reRenderChart={reRenderChart} bind:chartTheme changeStyle={changeStyle} bind:customBackground />
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
    import { getJson, merge, config } from '$lib/js/toolbelt';
    import { checkData, parseDataInput, arrToJson, givePrompt } from "$lib/js/parseDataInput"
    import { checkDatasetShape, checkDataIsFormattedForChartType } from "$lib/js/checkDatasetShape"
    import { dragger } from '$lib/js/dragger';
    import Sonic from "$lib/js/sonic"
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
    let watermark = true
    let settings = {"title":"This is a headline", 
                  "subtitle":"This is a subtitle", 
                  "source":"The source text",
                  "margintop":10, 
                  "marginbottom":20, 
                  "marginleft":50, 
                  "marginright":20, 
                  "chartKey":true, 
                  "positionCounter":false, 
                  "textScaling":1}

    /**
     * @type {string | null} 
     */
    let chartType = null
    let chartData = {
      "sheets": {}
    }

    chartData.sheets['template'] = settings

    let chartDataTypes = []
    let activeCharts = chartTypes.filter(d => d.noisycharts_supported)
    let dataIsValid = false
    let txtToJson = "Year	Passenger	Light commercial	SUV\n2012-01-01	51.9	17.83	27.5\n2013-01-01	49.9	18	29.35\n2014-01-01	47.75	17.78	31.65\n2015-01-01	44.63	17.23	35.35\n2016-01-01	41.27	18.48	37.43\n2017-01-01	37.8	19.9	39.16\n2018-01-01	32.8	20.64	42.95\n2019-01-01	29.7	21.23	45.48\n2020-01-01	24.2	22.42	49.59\n2021-01-01	21.1	24.12	50.65\n2022-01-01	18.8	23.71	53.14"
    let prompt = ""
    let width = 620
    let height = 480
    let chartHeight = 480
    let chartMaker = {}
    let supportedCharts = ['linechart', 'verticalbar', 'horizontalbar']
    let soundPalette = ['Kalimba', 'Cello']
    let sonic = new Sonic
    let chartTheme = 'the-crunch'
    /**
     * @type {null}
     */
    let customBackground = null
    $: axisText = 14 * settings.textScaling
    $: footerText = 12 * settings.textScaling
    $: axisPad = 12 * settings.textScaling
    $: lineStroke = Math.max(2 * settings.textScaling, 4)
    $: cssVarStyles = `--axis-text:${axisText}px;--axis-pad:${axisPad}px;--footer-text:${footerText}px;--line-stroke:${lineStroke}px;background-image: url("${customBackground}");background-size: cover;`;
    let options = {
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
      timeClick:null
    }
  

  // Parses chart data from an input string  

  // $: checkDataInput(txtToJson)

  function checkDataInput(txt) {

    prompt = ""
      
    if (txt != "" && checkData(txt)) {

      let resp = parseDataInput(txt)

      chartDataTypes = resp

      let data = arrToJson(resp)

      console.log("Here be dragons")
      
      console.log(resp)

      let specs = checkDatasetShape(data, resp.type, resp.head)

      chartDataTypes.datasheet = specs

      let filteredByShape = chartTypes.filter(d => d.config[specs.shape] && d.noisycharts_supported)

      let newActiveCharts = filteredByShape.filter(d => checkDataIsFormattedForChartType(d, specs.frequencies))
      let newActiveChartsArray = newActiveCharts.map((x) => x.type)
      
      activeCharts.forEach(d => {
  
        if (newActiveChartsArray.includes(d.type)) {
          console.log("yeg")
          d.active = true
        }
      })

      // Svelte needs this to know the array has been updated   
      activeCharts = activeCharts;

      console.log(activeCharts)

      chartData.sheets.data = data
      chartData.sheets.cols = specs.specs

      //console.log(orderJsonObjectByColumns(resp.head,data))

      dataIsValid = true

      prompt = 'Click the next step button to proceed'

    } else {

      dataIsValid = false;

      prompt = (txt.length > 0) ? givePrompt(txt) : ''

    }
  }



    // Loads chart data from a URL
  
    function loadChart() {
      console.log(inputURL)
      chartMaker = {}
      console.log("chartMaker",chartMaker)
      let chartJSONKey = null
  
      // is it a google docs url? Later make this write JSON for a public sheet
  
      if (inputURL.includes("docs.google.com")) {
        chartJSONKey = inputURL.split("/")[5]
        // console.log(chartJSONKey)
        chartURL = `https://interactive.guim.co.uk/docsdata/${chartJSONKey}.json`
      }
  
      // is it a yacht URL
  
      if (inputURL.includes("interactive.guim.co.uk")) {
        chartURL = inputURL
      }
  
      if (chartURL) {
        fetch(chartURL)
        .then((response) => response.json())
        .then((results) => { 
          
          // Update chart data with the spreadsheet/json data
          chartData = results
          let chartType = results['sheets']['chartId'][0]['type']
          let chartSettings = {chart: activeCharts.filter((d) => d.type === chartType)[0]}
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
          options.audioRendering = "categorical"
          settings.positionCounter = false
          // options.invertAudio = true
        }
  
        // Gets the default settings for each chart from a json file
        // If json is in the public directory 
        let defaults = await getJson(`/templates/${chartType}.json`)
     
        // Merges the default settings with any we have from a remote Google doc
  
        let merged = merge(defaults, chartData)
        
        // Parsing the settings from the merged object into a single settings object, converting thing etc
  
        settings = config(merged.sheets)
  
        console.log("settings",settings)
  
        // Resize as needed, tell all the things what to do
  
        let furnitureHeight = document.querySelector("#furniture").getBoundingClientRect().height + document.querySelector("#footer").getBoundingClientRect().height
        chartHeight = height - furnitureHeight
        settings.width = width
        settings.height = chartHeight
        settings.chartKey = true
        // settings.positionCounter = true
        settings.textScaling = 1

        // settings.timeClick = 10
        // If no color scheme set by user for the chart and no userkey set, then use the color scheme selected
  
        if (settings.colorScheme == "" && settings.userkey.length == 0) {
          settings.colorScheme = chartTheme
        }
  
        // Make an instrument per data series, like a color palette
  
        let dataSeries = settings.keys.slice(1)
  
        dataSeries.forEach((series,i) => {
          options.selectedInstruments[i] = {seriesName: series, instrument: "Kalimba"}
        })
  
        // Set up synths and load samples
  
        loader = sonic.loadSynths(options)
  
        // Render the chart by importing the specified chart module
  
        import(`$lib/js/${chartType}.js`).then((chartModule) => {   
            chartMaker = new chartModule.default(settings)
            chartMaker.render()
            
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
      // console.log("Options", options)
      chartMaker.play(options, sonic)
    }
  
    function exportAudio() {
      // console.log("Options", options)
      chartMaker.play(options, sonic)
    }
  
    function loadInstruments(event) {
      if (event) {
        loader = sonic.loadSynths(options)
      }
    }
  
    function changeStyle(event) {
      console.log("changeStyle")
      if (settings.userkey.length == 0) {
        console.log(chartTheme)
        settings.colorScheme = chartTheme
        chartMaker.render(settings)
        
        // if (chartTheme == "the-crunch") {
        //   customBackground = "https://interactive.guim.co.uk/embed/aus/2023/texture-looped.gif"
        // }
      }
  
    }
  
    function setDimensions(event) {
      if (event) {
        console.log(event)
        width = Number(event.detail.split(",")[0])
        height = Number(event.detail.split(",")[1])
        let ratio = width / 620
        settings.textScaling = ratio
        settings.marginbottom = settings.marginbottom * ratio
        settings.marginleft = settings.marginleft * ratio
        settings.marginright = settings.marginright * ratio
        settings.margintop = settings.margintop * ratio
  
        console.log("ratio", ratio)
        setTimeout(() => {
          let furnitureHeight = document.querySelector("#furniture").getBoundingClientRect().height + document.querySelector("#footer").getBoundingClientRect().height
          console.log("furny height", furnitureHeight)
          chartHeight = height - furnitureHeight
          settings.width = width
          settings.height = chartHeight
          // settings.width = width
          // settings.height = height
          chartMaker.render(settings)
        },500)
        
      }
    } 
    
    function reRenderChart() {
      chartMaker.render(settings)
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
  
  