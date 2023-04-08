<script lang="ts">
  import { getMetadata, orderedTokens, tokens } from "../stores/tokens";
  import Playertokenrow from "./playertokenrow.svelte";
  import Tokenname from "./tokenname.svelte";
  import Tokenstatus from "./tokenstatus.svelte";
</script>

<div>
  <table class="table table-fixed w-full">
    <thead>
      <tr>
        <th>Order</th>
        <th>Token</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#each $orderedTokens as token, index (token.id)}
        <Playertokenrow {token} {index} />
      {/each}
    </tbody>
  </table>
</div>
