<script lang="ts">
  import { getMetadata, orderedTokens } from "../stores/tokens";
  import Gminitiativecard from "./gminitiativecard.svelte";
</script>

{#each $orderedTokens as token, index (token.id)}
  <Gminitiativecard {token} {index} />
{/each}
