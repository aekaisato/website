<script lang="ts">
  import wheelContent from "src/functions/filter";
  //@ts-ignore
  import fallbackContent from "src/content/wheel-content/fallback-content.svx";
  import aboutMeContent from "src/content/about-me.txt?raw";
  import socialLinks from "src/content/social-links.json";

  const getContent = async (slug: string) => {
    let svxContent;
    try {
      svxContent = (await import(`../../content/wheel-content/${slug}-content.svx`)).default;
    } catch (e) {
      svxContent = fallbackContent;
    }
    return svxContent;
  }
</script>

<div class="simple-content">
  <p><i>This is a simplified version of my portfolio page. If you're seeing this, you're likely on a mobile device. If you're on a desktop and would like to view the full-fat page, click <a href="/?bypass-redirect=true">here</a>.</i></p>
  <br />
  <p>{aboutMeContent}</p>
  <div style="display: flex; flex-direction: row; justify-content: space-evenly">
    {#each socialLinks as sl, i}
      <a href={sl.link}>{sl.name}</a>
    {/each}
  </div>
  <br />
  <div>
    <h2>Table of Contents</h2>
    <ol>
      {#each wheelContent as wc, i}
        <li><a href={"#" + wc.slug}>{wc.name}</a></li>
      {/each}
    </ol>
  </div>
  <br />
  {#each wheelContent as wc, i}
    <div id={wc.slug}>
      <h2>{wc.name}</h2>
      {#await getContent(wc.slug)}
        <div />
        {:then content}
        <svelte:component this={content} />
        {:catch error}
        <p>error</p>
      {/await}
      <br />
    </div>
  {/each}
</div>

<style>
  .simple-content {
    margin: 5% auto;
    font-family: "Uncut Sans", uncut-sans, -apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.8;
    max-width: 73%;
  }
  :global(.simple-content * img:not(.lite-youtube-poster), .lite-youtube) {
    border-radius: 6px;
    width: 55%;
    max-height: 35vh;
    object-fit: cover;
    margin: 0 auto;
    display: block;
  }
</style>
