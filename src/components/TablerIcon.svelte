<script lang="ts">
  const tablerUrl = "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/";
  export let icon = "";
  export let alt = "";
  export let style = "";
  export let width = 24;
</script>

<img
  src={tablerUrl + icon + ".svg"}
  alt={alt}
  style={style}
  width={width}
/>
