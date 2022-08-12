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

  const newHashFromIndex = (index: number) => {
    goto(`#${wheelContent[index].slug}`);
  }
  const updatePlus = () => {
    // selectionTweened.update(n => (n + 1) % wheelContent.length); // wraparound
    selectionTweened.update((n) => {
      const i = Math.min((n + 1), wheelContent.length - 1);
      newHashFromIndex(i);
      return i;
    });
  }

  const updateMinus = () => {
    // selectionTweened.update(n => n <= 0 ? wheelContent.length + (n - 1) : (n - 1)); // wraparound
    selectionTweened.update((n) => {
      const i = Math.max((n - 1), 0);
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

  // eventually may want more sophisticated scroll handling,
  // but this works fine for now, i guess.
  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      updatePlus();
    } else if (e.deltaY < 0) {
      updateMinus();
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

  onMount(() => { changeHash($page.url.hash) })
</script>

<svelte:head>
  <title>Aiden Sato // aekai</title>
  <meta name="description" content="Portfolio page for Aiden Sato" />
</svelte:head>

<div class="container flex">
  <div class="bg-img-box flex" on:wheel|preventDefault={handleScroll}>
    <BackgroundImage />
  </div>
  <div class="project-wheel flex" on:wheel|preventDefault={handleScroll}>
    <ProjectWheel />
  </div>
  <div class="index-content flex">
    <div class="flex index-content-top">
      <ContentBox />
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
