<script lang="ts">
  import { getMetadata, updateMeta, type Token } from "../stores/tokens";
  let totalDamage = 0;
  let percent = 0.0;
  let currentHP = 0;
  $: {
    const damageList = getMetadata(token)?.damage || [];
    totalDamage = damageList.reduce((acc, val) => {
      return acc + val;
    }, 0);
  }
  $: {
    const hp = getMetadata(token)?.hp || 0;
    if (hp === 0) {
      percent = 0.0;
    } else {
      percent = (totalDamage / hp) * 100;
    }
  }
  $: {
    const hp = getMetadata(token)?.hp || 0;
    currentHP = hp - totalDamage;
  }
  export let token: Token;
  const handleChange = (evt: Event) => {
    const newHP = parseInt((evt.target as HTMLInputElement).value, 10);
    if (isNaN(newHP)) return;
    updateMeta(token, { hp: newHP });
  };
</script>

<div>
  {currentHP} /
  <input
    class="input input-primary input-xs w-12"
    value={getMetadata(token)?.hp || 0}
    on:change={handleChange}
  />
</div>
<div>{percent.toFixed(2)}%</div>
