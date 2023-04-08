<script lang="ts">
  import { getMetadata, type Token } from "../stores/tokens";

  export let token: Token;
</script>

<div>
  0 / <input
    class="input input-primary input-xs w-12"
    value={getMetadata(token)?.hp || 0}
  />
</div>
<div>124.12%</div>
