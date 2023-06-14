<script lang="ts">
  import { getMetadata, updateTokenName, type Token } from "../stores/tokens";

  export let token: Token;
  let editMode = false;
  let tokenName = token.text.plainText;
  const toggleEdit = () => {
    editMode = !editMode;
  };

  $: {
    if (tokenName !== token.text.plainText) {
      updateTokenName(token, tokenName);
    }
  }
</script>

{#if getMetadata(token)?.player}
  <span class="text-md">{tokenName}</span>
{:else}
  {#if editMode}
    <input class="input input-sm" bind:value={tokenName} />
  {:else}
    <span class="text-md">{tokenName}</span>
  {/if}
  <button class="btn btn-xs btn-info" on:click={toggleEdit}>
    {#if editMode}
      Done
    {:else}
      Edit
    {/if}
  </button>
{/if}
