<script lang="ts">
  import { isImage, type Image, type Item } from "@owlbear-rodeo/sdk";
  import OBR from "@owlbear-rodeo/sdk";
  import { onDestroy, onMount } from "svelte";
  import playerType from "../stores/playerType";
  const ID = "com.jtoid.dm-tools";
  const METADATA_KEY = `${ID}/metadata`;
  const filterToken = (item: Item) =>
    item.layer === "CHARACTER" && isImage(item);
  const filterInitiative = (item: Item) =>
    filterToken(item) &&
    (item.metadata[METADATA_KEY] as TokenMeta)?.inInitiative;

  const getDefaultMeta = () =>
    ({
      inInitiative: false,
      groupNumber: 0,
      damage: [],
    } as TokenMeta);

  let groupMax = new Map<string, number>();
  $: {
    groupMax = getGroupMax(tokens);
  }
  const getGroupMax = (tokenList: Token[]) => {
    const tokenGroupMax = new Map<string, number>();
    for (let token of tokenList) {
      const currentMax = tokenGroupMax.get(token.name) || 0;
      if (!token.metadata[METADATA_KEY]) {
        token.metadata[METADATA_KEY] = getDefaultMeta();
      }
      const currentNumber =
        (token.metadata[METADATA_KEY] as TokenMeta)?.groupNumber || 0;
      if (currentNumber > currentMax) {
        tokenGroupMax.set(token.name, currentNumber);
      }
    }
    return tokenGroupMax;
  };

  type Token = Image & {};

  type TokenMeta = {
    inInitiative: boolean;
    groupNumber: number;
    hp?: number;
    ac?: number;
    damage: number[];
  };
  let tokens: Token[] = [];
  let unsubItemsChange = () => {};
  onMount(() => {
    unsubItemsChange = OBR.scene.items.onChange((items) => {
      tokens = items.filter(filterInitiative) as Token[];
    });
    if ($playerType === "PLAYER") return;
    OBR.contextMenu.create({
      id: `${ID}/context-menu`,
      icons: [
        {
          icon: "/add.svg",
          label: "Add to initiative",
          filter: {
            every: [
              { key: "layer", value: "CHARACTER" },
              { key: "type", value: "IMAGE" },
              {
                key: ["metadata", METADATA_KEY, "inInitiative"],
                value: true,
                operator: "!=",
              },
            ],
          },
        },
        {
          icon: "/remove.svg",
          label: "Remove from initiative",
          filter: {
            every: [
              { key: "layer", value: "CHARACTER" },
              { key: "type", value: "IMAGE" },
              {
                key: ["metadata", METADATA_KEY, "inInitiative"],
                value: true,
              },
            ],
          },
        },
      ],
      onClick: (context) => {
        const groupMaxCopy = new Map(groupMax);
        for (let token of context.items) {
          const inInitiative = !(
            (token.metadata[METADATA_KEY] as TokenMeta)?.inInitiative || false
          );
          let newGroupNumber = 0;
          if (inInitiative) {
            const maxGroupNumber = groupMaxCopy.get(token.name) || 0;
            if (maxGroupNumber > 0) {
              newGroupNumber = maxGroupNumber + 1;
            } else {
              newGroupNumber = 1;
            }
            groupMaxCopy.set(token.name, newGroupNumber);
          }
          OBR.scene.items.updateItems([token.id], (items) => {
            if (items.length === 0) return;
            if (!items[0].metadata[METADATA_KEY]) {
              items[0].metadata[METADATA_KEY] = getDefaultMeta();
            }

            (items[0].metadata[METADATA_KEY] as TokenMeta).inInitiative =
              inInitiative;
            if (inInitiative) {
              (items[0].metadata[METADATA_KEY] as TokenMeta).groupNumber =
                newGroupNumber;
              if (newGroupNumber === 1) {
                (items[0] as Image).text.plainText = items[0].name;
              } else {
                (
                  items[0] as Image
                ).text.plainText = `${items[0].name} ${newGroupNumber}`;
              }
            }
          });
        }
      },
    });
  });

  onDestroy(() => {
    unsubItemsChange();
  });
</script>

App {$playerType}

{#each tokens as token (token.id)}
  <div>
    {#if $playerType === "GM"}
      GM {token.text.plainText}
    {:else}
      Player {token.text.plainText}
    {/if}
  </div>
{/each}
