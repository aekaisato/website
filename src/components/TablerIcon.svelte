<script lang="ts">
  const tablerUrl = "https://unpkg.com/@tabler/icons@2.17.0/icons/";
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
