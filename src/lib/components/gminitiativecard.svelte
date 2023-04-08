<script lang="ts">
  import OBR from "@owlbear-rodeo/sdk";
  import { scene } from "../stores/scene";
  import type { Token } from "../stores/tokens";
  import { getMetadata } from "../stores/tokens";
  import Gmac from "./gmac.svelte";
  import Gmdamage from "./gmdamage.svelte";
  import Gmhealth from "./gmhealth.svelte";
  import Gminitiativecount from "./gminitiativecount.svelte";
  import Tokenname from "./tokenname.svelte";
  import { METADATA_KEY } from "../constants";
  import Damagelist from "./damagelist.svelte";

  export let token: Token;
  export let index: number;
  let ref: HTMLElement;
  let current = false;
  let isPlayer = false;
  $: {
    isPlayer = Boolean(getMetadata(token)?.player);
  }
  $: {
    current = $scene?.currentInitiative === index && $scene?.inCombat;
  }
  $: {
    if (current) {
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  const handleCheck = () => {
    OBR.scene.items.updateItems([token.id], (items) => {
      if (items.length < 1) return;
      const metadata = items[0].metadata;
      const tokenMeta = getMetadata(items[0]);
      items[0].metadata = {
        ...metadata,
        [METADATA_KEY]: {
          ...tokenMeta,
          player: !Boolean(getMetadata(token)?.player),
        },
      };
    });
  };
</script>

<div
  bind:this={ref}
  class="card mb-2"
  class:bg-neutral={!current}
  class:bg-primary={current}
>
  <div class="card-body p-2">
    <div class="card-title justify-between">
      <Gminitiativecount {token} />
      <Tokenname {token} />
      <input
        class="checkbox checkbox-primary"
        type="checkbox"
        checked={getMetadata(token)?.player}
        on:change={handleCheck}
      />
    </div>
    {#if !isPlayer}
      <Damagelist {token} />
      <table class="table table-compact w-full table-fixed">
        <thead>
          <tr>
            <th>AC</th>
            <th>Health</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Gmac {token} /></td>
            <td><Gmhealth {token} /></td>
            <td>
              <Gmdamage {token} />
            </td>
          </tr>
        </tbody>
      </table>
    {/if}
  </div>
</div>
