<script lang="ts">
  import OBR from "@owlbear-rodeo/sdk";
  import { getMetadata, updateMeta, type Token } from "../stores/tokens";
  import { METADATA_KEY } from "../constants";

  export let token: Token;
  const handleChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const newInitiative = parseFloat(target.value);
    if (isNaN(newInitiative)) return;
    updateMeta(token, { initiativeCount: newInitiative });
  };
</script>

<input
  class="input input-primary input-xs w-12"
  value={getMetadata(token)?.initiativeCount || 0}
  on:change={handleChange}
/>
