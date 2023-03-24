<script lang="ts">
  import LiteYouTube from "svelte-lite-youtube-embed";

  export let videoId: string;
  export let videoTitle = "Play YouTube Video";
</script>

<div class="yt-box">
  <LiteYouTube {videoId} {videoTitle} />
  <noscript>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${videoId}`} 
      >{videoTitle}</a
    >
  </noscript>
</div>

<style>
  .yt-box {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
</style>
