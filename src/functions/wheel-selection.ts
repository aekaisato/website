import { tweened } from "svelte/motion";
import { quadInOut } from "svelte/easing";
import { derived, writable } from "svelte/store";
import { slugToIndex } from "./filter";
import type { LoadEvent } from "@sveltejs/kit";

let initialSelection = 0;

// const hash = window.location.hash;
// const slug = hash.substring(hash.lastIndexOf("#") + 1);
// const index = slugToIndex[slug];
// if (index) {
//   initialSelection = index;
// }

export const selectionTweened = tweened(initialSelection, {
  duration: 400,
  easing: quadInOut
});

export const selection = derived(selectionTweened,
  $selectionTweened => Math.round($selectionTweened));

const selectionHistory: number[] = [];
export const previousSelection = derived(selection, 
  $selection => {
    selectionHistory.push($selection);
    return selectionHistory.length >= 2 ? selectionHistory[selectionHistory.length - 2] : null;
  });
