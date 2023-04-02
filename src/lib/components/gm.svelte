<script lang="ts">
  import OBR from "@owlbear-rodeo/sdk";
  import { getMetadata, type Token } from "../stores/tokens";

  export let token: Token;
  const handleInitiativeCountChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const newInitiative = parseFloat(target.value);
    if (isNaN(newInitiative)) return;
    OBR.scene.items.updateItems([token.id], (items) => {
      if (items.length === 0) return;
      const item = items[0];
      getMetadata(item).initiativeCount = newInitiative;
    });
  };
</script>

<div>
  <div>{token.text.plainText}</div>
  <div class="flex flex-row items-center justify-between w-full gap-2">
    <div class="w-1/4">
      <input
        class="input input-primary input-xs w-full"
        value={getMetadata(token)?.initiativeCount || 0}
        on:change={handleInitiativeCountChange}
      />
    </div>
    <div class="w-1/4">
      <input
        class="input input-primary w-full input-xs"
        value={getMetadata(token)?.ac || 10}
        on:change={handleInitiativeCountChange}
      />
    </div>
    <div class="w-1/2">
      {1}/<input class="input input-primary input-xs w-2/3" />
    </div>
    <input class="input input-primary input-xs w-1/4" />
    <button class="btn btn-xs btn-primary w-1/4">Add</button>
  </div>
</div>
