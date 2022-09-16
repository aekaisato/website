<script lang="ts">
  import ProjectWheel from "src/components/ProjectWheel.svelte";
  import AboutMeBox from "src/components/AboutMeBox.svelte";
  import { selection, selectionTweened } from "src/functions/wheel-selection";
  // import wheelContent from "src/content/wheel.json";
  import wheelContent, { slugToIndex } from "src/functions/filter";
  import BackgroundImage from "src/components/BackgroundImage.svelte";
  import ContentBox from "src/components/ContentBox.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  const SCROLL_THRESHOLD = 50;

  let viewportW: number;
  let viewportH: number;

  const newHashFromIndex = (index: number) => {
    // if this is changed also change it in ProjectWheel
    goto(`#${wheelContent[index].slug}`);
  }

  const updatePlus = (x: number = 1) => {
    // selectionTweened.update(n => (n + 1) % wheelContent.length); // wraparound
    selectionTweened.update((n) => {
      const i = Math.min((n + x), wheelContent.length - 1);
      newHashFromIndex(i);
      return i;
    });
  }

  const updateMinus = (x: number = 1) => {
    // selectionTweened.update(n => n <= 0 ? wheelContent.length + (n - 1) : (n - 1)); // wraparound
    selectionTweened.update((n) => {
      const i = Math.max((n - x), 0);
      newHashFromIndex(i);
      return i;
    });
  }

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key == "j" || e.key == "ArrowDown") {
      updatePlus();
    } else if (e.key == "k" || e.key == "ArrowUp") {
      updateMinus();
    }
  }

  const handleScroll = (e: WheelEvent | { detail: { deltaY: number, deltaMode: number } }) => {
    let deltaY = 0;
    let deltaMode = 0;
    if (typeof e.detail == "object") { // hopefully this is stable lol
      deltaY = e.detail.deltaY;
      deltaMode = e.detail.deltaMode;
    } else {
      deltaY = (<WheelEvent>e).deltaY;
      deltaMode = (<WheelEvent>e).deltaMode;
    }
    additiveUntimedDebounce(deltaY);
  }

  let dySum = 0;
  let sumTimer: any;
  const additiveUntimedDebounce = (deltaY: number) => {
    const threshold = SCROLL_THRESHOLD;
    clearTimeout(sumTimer);
    setTimeout(() => {
      dySum = 0;
    }, 300);
    dySum += deltaY;
    if (Math.abs(dySum) >= threshold) {
      registerScroll(dySum);
      dySum = dySum % threshold;
    }
  }

  const registerScroll = (deltaY: number) => {
    const threshold = SCROLL_THRESHOLD;
    let fn;
    if (deltaY >= threshold) {
      fn = updatePlus;
    } else if (deltaY <= -threshold) {
      fn = updateMinus;
    }
    if (fn != undefined) {
      const x = Math.floor(Math.sqrt(Math.abs(deltaY) / threshold));
      fn(x);
    }
  }

  const changeHash = (hash: string) => {
    const slug = hash.substring(hash.lastIndexOf("#") + 1);
    const index = slugToIndex[slug];
    if (index) {
      selectionTweened.set(index);
    }
  }

  const handleHashChange = (event: HashChangeEvent) => {
    changeHash((new URL(event.newURL)).hash);
  }

  onMount(() => { 
    changeHash($page.url.hash)
    const bypassRedirect = $page.url.searchParams.get("bypass-redirect") === "true";
    if (!bypassRedirect && viewportW < viewportH) {
      location.href = "/simple";
    }
  })
</script>

<svelte:head>
  <title>Aiden Sato // aekai</title>
  <meta name="description" content="Portfolio page for Aiden Sato" />
</svelte:head>

<noscript>
  <p>This page uses JavaScript. Please enable JavaScript and refresh the page. Additionally, you can go to the simplified version of this page <a href="/simple">here</a>, although it still uses JavaScript to render, something I'm currently looking for a way to rectify. Thanks.</p>
</noscript>

<div class="container flex" bind:clientHeight={viewportH} bind:clientWidth={viewportW}>
  <div class="bg-img-box flex" on:wheel|preventDefault={handleScroll}>
    <BackgroundImage />
  </div>
  <div class="project-wheel flex" on:wheel|preventDefault={handleScroll}>
    <ProjectWheel />
  </div>
  <div class="index-content flex">
    <div class="flex index-content-top">
      <ContentBox on:wheelNoScroll={handleScroll}/>
    </div>
    <div class="flex index-content-bottom">
      <div class="whatever-box flex" on:wheel|preventDefault={handleScroll}>
      </div>
      <div class="about-me-box flex">
        <AboutMeBox />
      </div>
    </div>
  </div>
</div>

<style>
  :global(p, div, span) {
    font-family: uncut_sansregular;
  }
  :global(h1, h2, h3, h4, h5) {
    font-family: uncut_sansbold;
  }
  :global(.flex) {
    display: flex;
  }
  .container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    flex: 1;
    background-color: #555555;
  }
  .project-wheel {
    flex: 1;
  }
  .index-content {
    flex: 3;
    flex-direction: column;
  }
  .index-content-top {
    flex: 3;
    margin: 3vh;
  }
  .index-content-bottom {
    flex: 1;
    margin-bottom: 3vh;
    flex-direction: row;
  }
  .whatever-box {
    flex: 1;
    margin-left: 3vh;
    margin-right: 1.5vh;
    z-index: 1;
  }
  .about-me-box {
    flex: 1;
    margin-right: 3vh;
    margin-left: 1.5vh;
  }
  .bg-img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>

<svelte:window on:keydown={handleKeypress} on:hashchange={handleHashChange} />
