<script lang="ts">
  import wheelContent from "src/content/wheel.json";
  import { selection, selectionTweened } from "src/functions/wheel-selection";

  export const maxOnScreen = 7; // this should be odd

  const calculateOpacity = (index: number, dummy: any = null) => {
    dummy = dummy;
    return 1 / Math.pow(3, Math.abs(index - $selectionTweened));
  }

  const calculatePositionX = (index: number, dummy: any = null) => {
    dummy = dummy;
    // very small brain way of doing this lol
    return 8 - Math.pow(Math.abs(index - $selectionTweened), 1.4);
  }

  const calculatePositionY = (index: number, dummy: any = null) => {
    dummy = dummy;
    return 50 + ((index - $selectionTweened) * (100 / maxOnScreen));
  }

  const calculateFontSize = (index: number, dummy: any = null) => {
    dummy = dummy;
    const selectedSize = 2;
    const otherSize = 1.5;
    return selectedSize - ((selectedSize - otherSize) * Math.min(1, Math.abs(index - $selectionTweened)));
  }

  // uses css scale property as to prevent lines from shifting as size changes
  const calculateFontScale = (index: number, dummy: any = null) => {
    dummy = dummy;
    const otherScale = 0.75;
    return 1 - ((1 - otherScale) * Math.min(1, Math.abs(index - $selectionTweened)));
  }

  let containerWidth: number;

  const getShortName = (wheelItem: {name: string, "short-name"?: string}) => {
    return wheelItem["short-name"] ? wheelItem["short-name"] : wheelItem.name;
  }
</script>

<div class="container flex" bind:clientWidth={containerWidth}>
  <div class="absolute giant-circle">
  </div>
  <div class="flex title-list">
    {#each wheelContent as wc, i}
      <div 
        class="absolute title-box"
        style={`left: ${calculatePositionX(i, $selectionTweened)}vh; top: ${calculatePositionY(i, $selectionTweened)}vh; transform: translateY(-50%); max-width: calc(${containerWidth}px - 8vh)`}
        on:click={() => selectionTweened.set(i)}
      >
        <h2
          class="title-text unselect"
          style={`opacity: ${calculateOpacity(i, $selectionTweened)}; transform: scale(${calculateFontScale(i, $selectionTweened)})`}
        >{getShortName(wc)}</h2>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    position: relative;
    overflow: hidden;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-self: stretch;
    z-index: 1;
  }
  .absolute {
    position: absolute;
  }
  .giant-circle {
    background-color: black;
    border-radius: 50%;
    top: 50%;
    margin-top: -205vh;
    width: 410vh;
    height: 410vh;
    left: -403.7vh;
    opacity: .5;
  }
  .title-list {
    flex-direction: column;
  }
  .title-text {
    color: white;
    font-size: 2em;
    transform-origin: center left;
  }
  .unselect {
    user-select: none;
  }
</style>
