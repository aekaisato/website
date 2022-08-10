<script lang="ts">
  import ProjectWheel from "src/components/ProjectWheel.svelte";
  import AboutMeBox from "src/AboutMeBox.svelte";
  import { selection, selectionTweened } from "src/stores/wheel-selection";
  import wheelContent from "src/content/wheel.json";

  const updatePlus = () => {
    // selectionTweened.update(n => (n + 1) % wheelContent.length); // wraparound
    selectionTweened.update(n => Math.min((n + 1), wheelContent.length - 1)); // deadend
  }

  const updateMinus = () => {
    // selectionTweened.update(n => n <= 0 ? wheelContent.length + (n - 1) : (n - 1)); // wraparound
    selectionTweened.update(n => Math.max((n - 1), 0)); // deadend
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
</script>

<svelte:head>
  <title>Aiden Sato // aekai</title>
  <meta name="description" content="Portfolio page for Aiden Sato" />
</svelte:head>

<div class="container flex" on:wheel={handleScroll}>
  <div class="project-wheel flex">
    <ProjectWheel />
  </div>
  <div class="index-content flex">

  </div>
  <div class="about-me flex">
    <AboutMeBox />
  </div>
</div>

<style>
  :global(p) {
    font-family: uncut_sansregular;
  }
  :global(h1, h2, h3, h4, h5) {
    font-family: uncut_sansbold;
  }
  :global(.flex) {
    display: flex;
  }
  .container {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    flex: 1;
    background-color: #555555;
  }
  .about-me {
    position: absolute;
    right: 3vh;
    bottom: 3vh;
    width: 35vw;
    height: 25vh;
    flex: 1;
  }
  .project-wheel {
    flex: 1;
  }
  .index-content {
    flex: 3;
  }
</style>

<svelte:window on:keydown={handleKeypress} />
