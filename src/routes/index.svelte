<script>
  import ProjectWheel from "src/components/ProjectWheel.svelte";
  import AboutMeBox from "src/AboutMeBox.svelte";
</script>

<svelte:head>
  <title>Aiden Sato // aekai</title>
  <meta name="description" content="Portfolio page for Aiden Sato" />
</svelte:head>

<div class="container">
  <ProjectWheel />
  <div class="about-me">
    <AboutMeBox />
  </div>
</div>

<style>
  :global(p) {
    font-family: uncut_sansregular
  }
  .container {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
  .about-me {
    position: absolute;
    right: 3vh;
    bottom: 3vh;
    width: 35vw;
    height: 25vh;
    display: flex;
    flex: 1;
  }
</style>
