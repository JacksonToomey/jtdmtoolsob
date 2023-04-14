<script lang="ts">
  import { getMetadata, type Token, type TokenMeta } from "../stores/tokens";

  export let token: Token;
  let meta: TokenMeta;
  type Status =
    | "Unharmed"
    | "Bruised"
    | "Bloodied"
    | "Battered"
    | "Near Death"
    | "Dead";
  let status: Status;

  const getStatus: (damage: number[], hp: number) => Status = (
    damage: number[],
    hp: number
  ) => {
    if (damage.length < 1) {
      return "Unharmed";
    }
    if (hp <= 0) {
      return "Unharmed";
    }
    const totalDamage = damage.reduce((acc, val) => acc + val, 0);
    if (totalDamage >= hp) {
      return "Dead";
    }
    const remaining = 1 - totalDamage / hp;
    console.log(remaining, totalDamage, hp);
    if (remaining > 0.5) {
      return "Bruised";
    }

    if (remaining > 0.25) {
      return "Bloodied";
    }

    if (remaining > 0.1) {
      return "Battered";
    }
    return "Near Death";
  };
  $: {
    meta = getMetadata(token);
  }
  $: {
    status = getStatus(meta.damage || [], meta.hp || 0);
  }
</script>

{#if !meta.player}
  <span
    class="font-bold"
    class:text-amber-400={status === "Bruised"}
    class:text-green-700={status === "Unharmed"}
    class:text-red-200={status === "Bloodied"}
    class:text-red-600={status === "Battered"}
    class:text-red-800={status === "Near Death"}
    class:text-black={status === "Dead"}>{status}</span
  >
{/if}
