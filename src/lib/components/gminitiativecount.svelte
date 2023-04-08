<script lang="ts">
  import { getMetadata, type Token } from "../stores/tokens";

  export let token: Token;
</script>

<input
  class="input input-primary input-xs w-12"
  value={getMetadata(token)?.initiativeCount || 0}
/>
