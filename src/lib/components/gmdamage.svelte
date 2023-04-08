<script lang="ts">
  import { getMetadata, updateMeta, type Token } from "../stores/tokens";

  export let token: Token;
  let value = "";
  const handleClick = () => {
    const damage = parseInt(value, 10);
    value = "";
    if (isNaN(damage)) return;
    const currentDamage = getMetadata(token)?.damage || [];
    updateMeta(token, { damage: [...currentDamage, damage] });
  };
</script>

<input bind:value class="input input-primary input-xs w-12" />
<button on:click={handleClick} class="btn btn-primary btn-xs">Add</button>
