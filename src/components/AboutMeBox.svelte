<script lang="ts">
  import aboutMeContent from "src/content/about-me.txt?raw";
  import TablerIcon from "src/components/TablerIcon.svelte";

  const socialLinks = [
    {
      name: "GitHub",
      link: "https://github.com/aekaisato/",
      icon: "brand-github"
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/channel/UCXFcmOeXm7bcxBG3qPEiOkw",
      icon: "brand-youtube"
    },
    {
      name: "itch.io",
      link: "https://aekaisato.itch.io/",
      icon: "device-gamepad-2"
    }
  ];
</script>

<div class="container flex">
  <div class="flex content-box">
    <p class="text-content">
      {aboutMeContent}
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
    overflow-y: scroll;
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
  }
</style>
