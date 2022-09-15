<script lang="ts">
  // import wheelContent from "src/content/wheel.json";
  import wheelContent from "src/functions/filter";
  import { selection, previousSelection } from "src/functions/wheel-selection";
  import { fade } from 'svelte/transition';
  import { onDestroy, SvelteComponent, createEventDispatcher } from "svelte";
  import TablerIcon from "./TablerIcon.svelte";
  import { format, parseISO } from "date-fns";
  //@ts-ignore
  import fallbackContent from "src/content/wheel-content/fallback-content.svx";
  import "lite-youtube-embed/src/lite-yt-embed.css"; // used in svx content files

  let svxContent: SvelteComponent;
  let scrollMemory: {[key: string]: number} = {};
  let ignoreScrollEvent = false;

  const dispatch = createEventDispatcher();
  let container: HTMLDivElement;
  let containerHeight: number;

  // woah is this janky dynamic imports?! heck yeah!
  const unsubSelection = selection.subscribe(async (value) => {
    try {
      svxContent = (await import(`../content/wheel-content/${wheelContent[value].slug}-content.svx`)).default;
    } catch (e) {
      svxContent = fallbackContent;
    }
  });
  onDestroy(unsubSelection);

  const getScrollHelperHeight = () => {
    const n = scrollMemory[wheelContent[$selection].slug] + containerHeight;
    return isNaN(n) ? 0 : n - 1; // the minus one is to fix a dumb scrollbar thing
  }

  // adapted from https://stackoverflow.com/questions/68047290/how-to-detect-scrollto-has-finished
  const scrollTo = (top: number, element: HTMLElement) => {
    element.scrollTo({top: top, behavior: "smooth"});
    return new Promise<void>(resolve => {
      const resolvePromise = () => {
        element.removeEventListener("scroll", scrollHandler);
        ignoreScrollEvent = false;
        resolve();
      }
      const scrollHandler = () => {
        if (element.scrollTop == top) {
          ignoreScrollEvent = true;
          resolvePromise();
        }
      }
      ignoreScrollEvent = true;
      element.addEventListener("scroll", scrollHandler);
      setTimeout(resolvePromise, 400); // resolve promise if length of transition has passed
    })
  }

  const saveAndRecallScroll = () => {
    if ($previousSelection != null && !ignoreScrollEvent) {
      scrollMemory[wheelContent[$previousSelection].slug] = container.scrollTop;
    }
    const scrollAmt = scrollMemory[wheelContent[$selection].slug];
    scrollTo(scrollAmt ? scrollAmt : 0, container);
  }

  const dateHandler = (date: string) => {
    const d = parseISO(date);
    if (!isNaN(d.getDate())) {
      return format(d, "LLLL d, Y");
    } else {
      return "N/A";
    }
  }

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
  <div class="flex content-box" transition:fade on:introstart={saveAndRecallScroll}>
    <div
      class="scroll-memory-helper"
      style={`min-height: calc(${getScrollHelperHeight()}px - 3vh);`}
    >
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
      <div class="flex svx-box">
        <svelte:component this={svxContent}/>
      </div>
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
    overflow-y: auto;
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
  .svx-box {
    flex-direction: column;
    margin-left: 5%;
    margin-right: 5%;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  :global(.svx-box * lite-youtube, .svx-box > lite-youtube, .svx-box * img, .svx-box > audio, .svx-box * audio) {
    border-radius: 6px;
    width: 55%;
    max-height: 35vh;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }
</style>
