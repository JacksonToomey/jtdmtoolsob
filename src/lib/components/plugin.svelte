<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    getMetadata,
    orderedTokens,
    tokens,
    type Token,
    type TokenMeta,
  } from "../stores/tokens";
  import OBR, { isImage, type Item } from "@owlbear-rodeo/sdk";
  import { METADATA_KEY } from "../constants";
  import playerType from "../stores/playerType";
  import { initialize } from "../contextMenu";
  import Player from "./player.svelte";
  import Gm from "./gm.svelte";

  const filterToken = (item: Item) =>
    item.layer === "CHARACTER" && isImage(item);
  const filterInitiative = (item: Item) =>
    filterToken(item) && getMetadata(item)?.inInitiative;

  let unsubItemsChange = () => {};
  let unSubScene = () => {};
  onMount(async () => {
    const items = await OBR.scene.items.getItems();
    tokens.set(items.filter(filterInitiative) as Token[]);
    unsubItemsChange = OBR.scene.items.onChange((items) => {
      tokens.set(items.filter(filterInitiative) as Token[]);
    });
    unSubScene = OBR.scene.onReadyChange(async (isReady) => {
      if (isReady) {
        const items = await OBR.scene.items.getItems();
        tokens.set(items.filter(filterInitiative) as Token[]);
      }
    });
    if ($playerType === "PLAYER") return;
    initialize();
  });
  onDestroy(() => {
    unsubItemsChange();
    unSubScene();
  });
</script>

<main class="p-2">
  {#each $orderedTokens as token, i (token.id)}
    <div class="py-4 flex flex-row items-center w-full px-2">
      {#if $playerType === "PLAYER"}
        <Player />
      {:else}
        <Gm {token} />
      {/if}
    </div>
    {#if i < $orderedTokens.length - 1}
      <div class="divider p-0 m-0" />
    {/if}
  {/each}
</main>
