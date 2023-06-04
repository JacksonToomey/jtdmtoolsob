<script lang="ts">
  import { scene } from "../stores/scene";
  import { getMetadata, type Token } from "../stores/tokens";
  import Tokenname from "./tokenname.svelte";
  import Tokenstatus from "./tokenstatus.svelte";

  export let token: Token;
  let ref: HTMLElement;
  let active = false;
  $: {
    active = $scene.currentInitiativeToken === token.id;
    if (active && ref) {
      ref.scrollIntoView();
    }
  }
</script>

<tr bind:this={ref} class:active>
  <td>{getMetadata(token)?.initiativeCount || 0}</td>
  <td class="whitespace-normal"><Tokenname {token} /></td>
  <td><Tokenstatus {token} /></td>
</tr>
