<script lang="ts">
  import { scene } from "../stores/scene";
  import type { Token } from "../stores/tokens";
  import Gmac from "./gmac.svelte";
  import Gmdamage from "./gmdamage.svelte";
  import Gmhealth from "./gmhealth.svelte";
  import Gminitiativecount from "./gminitiativecount.svelte";
  import Tokenname from "./tokenname.svelte";

  export let token: Token;
  export let index: number;
  let ref: HTMLElement;
  let current = false;
  $: {
    current = $scene?.currentInitiative === index;
  }
  $: {
    if (current) {
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
</script>

<div
  bind:this={ref}
  class="card mb-2"
  class:bg-neutral={true}
  class:bg-primary={false}
>
  <div class="card-body p-2">
    <div class="card-title justify-between">
      <Gminitiativecount {token} />
      <Tokenname {token} />
      Edit
    </div>
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
  </div>
</div>
