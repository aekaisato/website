<script lang="ts">
  const tablerUrl = "/tabler-icons/";
  export let icon = "";
  export let alt = "";
  export let style = "";
  export let width = 24;
</script>

<img src={tablerUrl + icon + ".svg"} {alt} {style} {width} />
