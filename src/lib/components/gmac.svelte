<script lang="ts">
  import { getMetadata, updateMeta, type Token } from "../stores/tokens";

  export let token: Token;
  const handleChange = (evt: Event) => {
    const newAC = parseInt((evt.target as HTMLInputElement).value, 10);
    if (isNaN(newAC)) return;
    updateMeta(token, { ac: newAC });
  };
</script>

<input
  class="input input-primary input-xs w-12"
  value={getMetadata(token)?.ac || 0}
  on:change={handleChange}
/>
