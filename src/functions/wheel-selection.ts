import { tweened } from "svelte/motion";
import { quadInOut } from "svelte/easing";
import { derived } from "svelte/store";

export const selectionTweened = tweened(0, {
  duration: 400,
  easing: quadInOut
});

export const selection = derived(selectionTweened,
  $selectionTweened => Math.round($selectionTweened));
