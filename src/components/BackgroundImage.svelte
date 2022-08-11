<script lang="ts">
  import wheelContent from "src/content/wheel.json";
  import { selection, selectionTweened } from "src/functions/wheel-selection";
  import { fade } from 'svelte/transition';

  const imgFolder = "/bg-img/"
  const fallback = imgFolder + "fallback.webp";

  //@ts-ignore
  const handleError = (err) => {  err.target.src = fallback; }
</script>

<div class="container flex">
  {#key $selection}
  <img
    src={imgFolder + wheelContent[$selection].slug + ".webp"}
    alt={"Screenshot of " + wheelContent[$selection].name}
    width="100%"
    height="100%"
    class="obj-fit-cover img-blur"
    on:error={handleError}
    transition:fade={{
      duration: 400,
    }}
    draggable={false}
  />
  {/key}
</div>

<style>
  .container {
    position: relative;
    overflow: hidden;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
  }
  .obj-fit-cover {
    object-fit: cover;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .img-blur {
    filter: blur(20px) brightness(0.7);
    transform: scale(1.1);
    overflow: hidden;
  }
</style>
