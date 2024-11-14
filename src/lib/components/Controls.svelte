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
  export let options, loadInstruments, settings, setDimensions, reRenderChart, chartTheme, changeStyle, customBackground;
</script>

<Row>
  <Column>
      <h2>Controls</h2>

      <h3>Audio and duration</h3>
      <Row>
        <Column>
          <Select labelText="Voiceover mode" bind:selected={options.chartMode} >
              <SelectItem value="fully accessible" text="fully accessible" />
              <SelectItem value="human does voiceover" text="human does voiceover" />
              <SelectItem value="no voiceover" text="no voiceover" />
          </Select> 
        </Column>
        <Column>
        <Slider bind:value={options.duration} min={2} max={40} labelText="Duration (sec)"/>
        </Column>
        <Column>
        <Select inline labelText="Lowest note" bind:selected={options.low} >
          {#each notes as note}
            <SelectItem value={note.Frequency} text={note.Text} />
          {/each}
        </Select> 
        </Column>
        <Column>
        <Select inline labelText="Highest note" bind:selected={options.high} >
          {#each notes as note}
            <SelectItem value={note.Frequency} text={note.Text} />
          {/each}
        </Select>
        </Column>
       
      </Row>

      <Row>
        <Column>
          <Select labelText="Audio rendering" bind:selected={options.audioRendering} >
            <SelectItem value="discrete" text="Discrete/staccato" />
            <SelectItem value="categorical" text="Categorical" />
            <SelectItem value="continuous" text="Continuous/legato" />
          </Select> 
        </Column>
        <Column>
          <RadioButtonGroup legendText="Play sequentially or simultaneously" bind:selected={options.simultaneous}>
            <RadioButton labelText="Sequential" value={false} />
            <RadioButton labelText="Simultaneous" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          <RadioButtonGroup legendText="Invert audio scale" bind:selected={options.invertAudio}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          <RadioButtonGroup legendText="Scale to notes" bind:selected={options.scaleNotes}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
      </Row>

      <Row>
        <Column>
          <RadioButtonGroup legendText="Enable x axis cues" bind:selected={options.timeClickEnabled}>
            <RadioButton labelText="No" value={false} />
            <RadioButton labelText="Yes" value={true} />
          </RadioButtonGroup>
        </Column>
        <Column>
          {#if options.timeClickEnabled}
          <Slider bind:value={options.timeClick} min={2} max={100} labelText="Kick every N values"/>
          {/if}
        </Column>
      </Row>

      <h3>Instruments</h3>
      <Row>
      {#each options.selectedInstruments as selectedInstrument}  
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
          <Select inline labelText="Size preset" on:change={setDimensions}>
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
            bind:value={settings.textScaling}
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
            bind:value={settings.marginleft}
            invalidText="Number must be between 0 and 200"
            label="Margin left"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={settings.marginright}
            invalidText="Number must be between 0 and 200"
            label="Margin right"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={settings.margintop}
            invalidText="Number must be between 0 and 200"
            label="Margin top"
            on:input={reRenderChart}
          />
        </Column>
        <Column>
          <NumberInput
            min={0}
            max={200}
            bind:value={settings.marginbottom}
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
        <RadioButtonGroup legendText="Position ticker" bind:selected={settings.positionCounter}>
          <RadioButton labelText="On" value={true} />
          <RadioButton labelText="Off" value={false} />
        </RadioButtonGroup>
        </Column>
      </Row>

      <h3>Animation</h3>
      <Row>
        <Column>
          <Select labelText="Animation style" bind:selected={options.animationStyle} >
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