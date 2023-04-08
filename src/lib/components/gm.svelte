<script lang="ts">
  import { getMetadata, orderedTokens } from "../stores/tokens";
  import Gminitiativecard from "./gminitiativecard.svelte";
</script>

{#each $orderedTokens as token (token.id)}
  <Gminitiativecard {token} />
{/each}
