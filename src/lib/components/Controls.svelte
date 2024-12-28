<script>
   import {
    Row,
    Column,
    Slider,
    Select,
    SelectItem,
    RadioButton,
    RadioButtonGroup,
    NumberInput,
    TextArea,
    TextInput
  } from "carbon-components-svelte";
  import instruments from '$lib/data/instruments.json';
  import notes from '$lib/data/notes.json';
  import sizePresets from '$lib/data/sizes.json';
  export let noisyChartSettings, loadInstruments, chartSettings, setDimensions, reRenderChart, updateOptions, chartTheme, changeStyle, customBackground;
</script>

<Row>
  <Column>
      <h2>Controls</h2>

      <h3>Audio and duration</h3>
      <Row>
        <Column>
          <Select labelText="Voiceover mode" bind:selected={noisyChartSettings.chartMode} on:change={updateOptions}>
              <SelectItem value="fully accessible" text="fully accessible" />
              <SelectItem value="human does voiceover" text="human does voiceover" />
              <SelectItem value="no voiceover" text="no voiceover" />
          </Select> 
        </Column>
        <Column>
        <Slider bind:value={noisyChartSettings.duration} min={2} max={40} labelText="Duration (sec)" on:change={updateOptions}/>
        </Column>
        <Column>
        <Select inline labelText="Lowest note" bind:selected={noisyChartSettings.low} on:change={updateOptions}>
          {#each notes as note}
            <SelectItem value={note.Frequency} text={note.Text} />
          {/each}
        </Select> 
        </Column>
        <Column>
        <Select inline labelText="Highest note" bind:selected={noisyChartSettings.high} on:change={updateOptions}>
          {#each notes as note}
            <SelectItem value={note.Frequency} text={note.Text} />
          {/each}
        </Select>
        </Column>
       
      </Row>

      <Row>
        <Column>
          <Select labelText="Audio rendering" bind:selected={noisyChartSettings.audioRendering} on:change={updateOptions}>
            <SelectItem value="discrete" text="Discrete/staccato" />
            <SelectItem value="categorical" text="Categorical" />
            <SelectItem value="continuous" text="Continuous/legato" />
          </Select> 
        </Column>
        <Column>
          <RadioButtonGroup legendText="Play sequentially or simultaneously" bind:selected={noisyChartSettings.simultaneous} on:change={updateOptions}>
            <RadioButton labelText="Sequential" value={false} />
            <RadioButton labelText="Simultaneous" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          <RadioButtonGroup legendText="Invert audio scale" bind:selected={noisyChartSettings.invertAudio} on:change={updateOptions}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          <RadioButtonGroup legendText="Scale to notes" bind:selected={noisyChartSettings.scaleNotes} on:change={updateOptions}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
      </Row>

      <Row>
        <Column>
          <RadioButtonGroup legendText="Enable x axis cues" bind:selected={noisyChartSettings.timeClickEnabled} on:change={updateOptions}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          {#if noisyChartSettings.timeClickEnabled}
          <Slider bind:value={noisyChartSettings.timeClick} min={2} max={100} labelText="Kick every N values" on:change={updateOptions}/>
          {/if}
        </Column>
        <Column>
     
          <TextInput placeholder="" bind:value={noisyChartSettings.interval} labelText="Each note is a:" on:change={updateOptions}/>
        
        </Column>
      </Row>

      <h3>Instruments</h3>
      <Row>
      {#each noisyChartSettings.selectedInstruments as selectedInstrument}  
      <Column>
        <Select inline labelText="{selectedInstrument.seriesName}" on:change={loadInstruments} bind:selected={selectedInstrument.instrument}>
          {#each Object.keys(instruments) as instrument}
            <SelectItem value={instrument} text={instrument} />
          {/each}
        </Select>
      </Column>
     {/each} 
    </Row>
      <h3>Size and layout</h3>

      <Row>
        <Column>
          <Select inline labelText="Size preset" on:change={(event) => setDimensions(event.target.value)}>
            {#each sizePresets as preset}
              <SelectItem value={preset.Sizes} text={preset.Text} />
            {/each}
          </Select>
        </Column>
        <Column>
          <NumberInput
            min={1}
            max={5}
            step={0.1}
            bind:value={chartSettings.textScaling}
            invalidText="Number must be between 1 and 5"
            label="Text scaling"
            on:input={reRenderChart}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={chartSettings.marginleft}
            invalidText="Number must be between 0 and 200"
            label="Margin left"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={chartSettings.marginright}
            invalidText="Number must be between 0 and 200"
            label="Margin right"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={chartSettings.margintop}
            invalidText="Number must be between 0 and 200"
            label="Margin top"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={chartSettings.marginbottom}
            invalidText="Number must be between 0 and 200"
            label="Margin bottom"
            on:input={reRenderChart}
          />
        </Column>

      </Row>

      <h3>Style</h3>
      <Row>
        <Column>
          <Select labelText="Theme" bind:selected={chartTheme} on:change={changeStyle}>
              <SelectItem value="guardian" text="guardian" />
              <SelectItem value="the-crunch" text="The Crunch" />
              <SelectItem value="greenscreen" text="greenscreen" />
              <SelectItem value="darkmode" text="dark mode" />
          </Select> 
        </Column>

        <Column>
            <TextInput placeholder="Paste a URL to an image file" bind:value={customBackground} labelText="Custom background"/>
        </Column>  
     
      </Row>

      <h3>Annotations and labels</h3>
      <Row>
        <Column>
        <RadioButtonGroup legendText="Position ticker" bind:selected={chartSettings.positionCounter}>
          <RadioButton labelText="On" value={true} />
          <RadioButton labelText="Off" value={false} />
        </RadioButtonGroup>
        </Column>
      </Row>

      <h3>Animation</h3>
      <Row>
        <Column>
          <Select labelText="Animation style" bind:selected={noisyChartSettings.animationStyle} >
            <SelectItem value="playthrough" text="Play through" />
            <SelectItem value="static" text="Static" />
          </Select> 
        </Column>
      </Row>

      <h3>Script output</h3>
      <Row>
        <Column>
          <TextArea labelText="Voiceover script output" placeholder="Voiceover script will go here..." id="voiceOverScript" />
        </Column>
      </Row>    

  </Column>
</Row>