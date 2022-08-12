<script lang="ts">
  // import wheelContent from "src/content/wheel.json";
  import wheelContent from "src/functions/filter";
  import { selection, selectionTweened } from "src/functions/wheel-selection";
  import { fade } from 'svelte/transition';
  import { onDestroy, SvelteComponent, createEventDispatcher } from "svelte";
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

  const dispatch = createEventDispatcher();
  let container: HTMLDivElement;
  let containerHeight: number;

  const handleWheel = (event: WheelEvent) => {
    let toDispatch: { deltaY: number }
    if (containerHeight !== container.scrollHeight &&
      ((container.scrollTop > 0 &&
        container.scrollTop + containerHeight < container.scrollHeight) ||
        ((container.scrollTop == 0 && event.deltaY > 0) ||
          (container.scrollTop + containerHeight >= container.scrollHeight
            && event.deltaY < 0)))
    ) {
      toDispatch = { deltaY: 0 };
    } else {
      toDispatch = event;
    }
    dispatch("wheelNoScroll", toDispatch);
  }
</script>

<div
  class="container flex"
  on:wheel={handleWheel}
  bind:this={container}
  bind:clientHeight={containerHeight}
>
  {#key $selection}
  <div class="flex content-box" transition:fade>
    <div>
      <h1>{wheelContent[$selection].name}</h1>
      <div class="flex sub-box">
        <span style="filter: invert(0.35); display: inline;">
          <span>
            <TablerIcon
              icon="clock"
              alt="Date created"
              width={20}
              style="vertical-align: bottom"
            />
            {dateHandler(wheelContent[$selection].date)}
          </span>
          <span style="margin-left: 0.2em; margin-right: 0.2em;">
            {"⸱"}
          </span>
          <span>
            <TablerIcon
              icon="tag"
              alt="Tags"
              width={20}
              style="vertical-align: bottom"
            />
            {wheelContent[$selection].tags.join(", ").replaceAll("-", " ").toLowerCase()}
          </span>
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
    border-radius: 6px;
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
    margin: 3vh;
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
