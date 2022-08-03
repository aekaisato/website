<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import wheelData from "src/content/wheel.json";

  let selected = 0;
  let fullHeight: number;
  let windowHeight: number;
  // $: elementHeight = fullHeight / (wheelData.length * 3);
  let scrollBox: Element;

  const scrollToItem = (index: number) => {
    const elementHeight = (fullHeight / 3) / (wheelData.length * 3);
    const scrollPos = (fullHeight / 3) + (index * elementHeight) - (windowHeight / 2) + (elementHeight * 1.5);
    // console.log(scrollAmount)
    scrollBox.scrollTo({ top: scrollPos, behavior: "smooth" });
  }

  const checkScrollLoop = (event: any) => {
    const locationY = event.target.scrollTop;
    if (locationY > (2 * fullHeight / 3)) {
      console.log("scroll up")
      // @ts-ignore
      scrollBox.scrollTo({ top: locationY - (fullHeight / 3), behavior: "instant" });
    } else if (locationY < (fullHeight / 3)) {
      console.log("scroll down")
      // @ts-ignore
      scrollBox.scrollTo({ top: locationY + (fullHeight / 3), behavior: "instant" });
    }
  }

  afterUpdate(() => {
    scrollToItem(selected)
  })
</script>

<div style="overflow-y: scroll; height: 100%" bind:this={scrollBox} bind:clientHeight={windowHeight} on:scroll={checkScrollLoop}>
  <div bind:clientHeight={fullHeight}>
    {#each Array(3) as a, j}
      {#each wheelData as wheelItem, i (wheelItem.slug)}
        <div style="height: 12vh; display: flex; flex-direction: column; justify-content: center">
          {#if i == selected}
            <div style="font-size: 4vh">
              {wheelItem.name}
            </div>
          {:else}
            {wheelItem.name}
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</div>
