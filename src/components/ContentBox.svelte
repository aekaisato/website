<script lang="ts">
  // import wheelContent from "src/content/wheel.json";
  import wheelContent from "src/functions/filter";
  import { selection, selectionTweened } from "src/functions/wheel-selection";
  import { fade } from 'svelte/transition';
  import { onDestroy, SvelteComponent } from "svelte";
  import TablerIcon from "./TablerIcon.svelte";
  import { format, parseISO } from "date-fns";
  import fallbackContent from "src/content/wheel-content/fallback-content.svx";

  let svxContent: SvelteComponent;

  // woah is this janky dynamic imports?! heck yeah!
  const unsubSelection = selection.subscribe(async (value) => {
    try {
      svxContent = (await import(`../content/wheel-content/${wheelContent[value].slug}-content.svx`)).default;
    } catch (e) {
      svxContent = fallbackContent;
    }
  });
  onDestroy(unsubSelection);

  const dateHandler = (date: string) => {
    const d = parseISO(date);
    if (!isNaN(d.getDate())) {
      return format(d, "LLLL d, Y");
    } else {
      return "N/A";
    }
  }
</script>

<div class="container flex">
  {#key $selection}
  <div class="flex content-box" transition:fade>
    <div>
      <h1>{wheelContent[$selection].name}</h1>
      <div class="flex sub-box">
        <span style="filter: invert(0.35); display: inline;">
          <TablerIcon
            icon="clock"
            alt="Date created"
            width={20}
            style="vertical-align: bottom"
          />
          {dateHandler(wheelContent[$selection].date)}
        </span>
      </div>
      <svelte:component this={svxContent} />
    </div>
  </div>
  {/key}
</div>

<style>
  .container {
    position: relative;
    overflow: hidden;
    flex: 1;
    justify-content: center;
    align-self: stretch;
    background-color: #ffffff70;
    border-radius: 8px;
    z-index: 1;
    overflow-y: scroll;
  }
  .content-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    margin: 4vh;
  }
  .sub-box {
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.5em;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
</style>
