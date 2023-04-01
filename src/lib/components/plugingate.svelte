<script lang="ts">
  import { onMount } from "svelte";
  import OBR from '@owlbear-rodeo/sdk';
  import playerTypeStore from "../stores/playerType";


  let show = false;
  onMount(() => {
    OBR.onReady(async () => {
      const role = await OBR.player.getRole();
      playerTypeStore.set(role);
      show = true;
    });
  });
</script>

{#if show}
  <slot />
{/if}
