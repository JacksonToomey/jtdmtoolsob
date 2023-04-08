<script lang="ts">
  import { getMetadata, updateMeta, type Token } from "../stores/tokens";

  export let token: Token;
  let show = false;
  let damage: number[];
  const handleShowClick = () => {
    show = !show;
  };
  $: {
    damage = getMetadata(token)?.damage || [];
  }

  const handleRemove = (index: number) => {
    const newDamageLeft = damage.slice(0, index);
    const newDamageRight = damage.slice(index + 1);
    updateMeta(token, { damage: [...newDamageLeft, ...newDamageRight] });
  };
</script>

<button on:click={handleShowClick} class="btn btn-secondary btn-xs"
  >{show ? "Hide" : "Show"} Damage</button
>
{#if show}
  <table class="table table-compact table-fixed">
    <thead>
      <tr>
        <th>Damage</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {#each damage as d, i (i)}
        <tr>
          <td>{d}</td>
          <td
            ><button
              on:click={() => {
                handleRemove(i);
              }}
              class="btn btn-error btn-sm w-full">X</button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
