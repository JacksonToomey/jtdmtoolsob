import { writable } from "svelte/store";

const playerTypeStore = writable<"GM" | "PLAYER">("PLAYER");

export default playerTypeStore;
