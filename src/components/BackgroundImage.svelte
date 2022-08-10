<script lang="ts">
  import wheelContent from "src/content/wheel.json";
  import { selection, selectionTweened } from "src/stores/wheel-selection";
  import { tweened } from "svelte/motion";
  import { quadInOut } from "svelte/easing";
  import { fly } from 'svelte/transition';

  const imgFolder = "/bg-img/"
  const fallback = imgFolder + "fallback.webp";

  //@ts-ignore
  const handleError = (err) => {  err.target.src = fallback; }
</script>

<div class="container flex">
  <img
    src={imgFolder + wheelContent[$selection].slug + ".webp"}
    alt={"Screenshot of " + wheelContent[$selection].name}
    width="100%"
    height="100%"
    class="obj-fit-cover img-blur"
    on:error={handleError}
  />
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
  }
  .img-blur {
    filter: blur(25px) brightness(0.7);
    transform: scale(1.1);
    overflow: hidden;
  }
</style>
