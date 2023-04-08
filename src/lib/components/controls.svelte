<script lang="ts">
  import OBR from "@owlbear-rodeo/sdk";
  import { scene, SCENE_METADATA_KEY } from "../stores/scene";
  import { orderedTokens } from "../stores/tokens";

  const handleCombatToggle = () => {
    const inCombat = !Boolean($scene?.inCombat);

    OBR.scene.setMetadata({
      [SCENE_METADATA_KEY]: {
        ...$scene,
        inCombat,
        rounds: 1,
      },
    });
  };

  const handleNext = () => {
    let currentLocation = $scene.currentInitiative;
    if (currentLocation === null || currentLocation === undefined) {
      currentLocation = -1;
    }
    let rounds = $scene.rounds;
    if (rounds === null || rounds === undefined) {
      rounds = 1;
    }
    if (currentLocation === $orderedTokens.length - 1) {
      rounds = rounds + 1;
    }
    const newLocation = (currentLocation + 1) % $orderedTokens.length;
    OBR.scene.setMetadata({
      [SCENE_METADATA_KEY]: {
        ...$scene,
        currentInitiative: newLocation,
        rounds,
      },
    });
  };
</script>

<div
  class="flex flex-row items-center justify-around mb-2 sticky top-0 z-50 bg-base-100 p-2"
>
  <button class="btn btn-primary btn-sm" on:click={handleCombatToggle}
    >{$scene?.inCombat ? "End" : "Start"}</button
  >
  {#if $scene?.inCombat}
    <button on:click={handleNext} class="btn btn-primary btn-sm">Next</button>
  {/if}
</div>
