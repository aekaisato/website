<script lang="ts">
  import aboutMeContent from "src/content/about-me.txt?raw";
  import TablerIcon from "src/components/TablerIcon.svelte";
  import socialLinks from "src/content/social-links.json";
</script>

<div class="container flex">
  <div class="flex content-box">
    <p class="text-content">
      {aboutMeContent}
    </p>
    <p class="text-content">
      To view a simplified version of this page, click <a href="/simple">here</a>.
    </p>
  </div>
  <div class="flex link-box">
    {#each socialLinks as sl}
      <div class="flex">
        <a
          href={sl.link}
          target="_blank"
          rel="noopener noreferrer"
          class="flex invert"
        >
          <TablerIcon
            icon={sl.icon}
            alt={sl.name}
          />
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    background-color: black;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-self: stretch;
    border-radius: 6px;
    z-index: 1;
  }
  .content-box {
    flex: 7;
    overflow-y: auto;
    flex-direction: column;
    justify-content: space-between;
  }
  .link-box {
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .invert {
    filter: invert();
  }
  .text-content {
    margin: 5%;
    color: white;
    font-size: smaller;
    line-height: 150%;
  }
</style>
