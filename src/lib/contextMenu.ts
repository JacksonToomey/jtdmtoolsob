import OBR, { type Image } from "@owlbear-rodeo/sdk";
import { ID, METADATA_KEY } from "./constants";
import { getMetadata, groupTokens, type TokenMeta } from "./stores/tokens";
import { get } from "svelte/store";

const getDefaultMeta = () =>
  ({
    inInitiative: false,
    groupNumber: 0,
    damage: [],
  } as TokenMeta);

export const initialize = () => {
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
      let groupMax = get(groupTokens);
      for (let token of context.items) {
        const inInitiative = getMetadata(token)?.inInitiative || false;
        const newInitiative = !inInitiative;
        let newGroupNumber = 0;
        if (newInitiative) {
          const maxGroupNumber = groupMax[token.name] || 0;
          if (maxGroupNumber > 0) {
            newGroupNumber = maxGroupNumber + 1;
          } else {
            newGroupNumber = 1;
          }
          groupMax[token.name] = newGroupNumber;
        }
        OBR.scene.items.updateItems([token.id], (items) => {
          if (items.length === 0) return;
          if (!getMetadata(items[0])) {
            items[0].metadata[METADATA_KEY] = getDefaultMeta();
          }
          const metadata = getMetadata(items[0]);
          metadata.inInitiative = newInitiative;
          if (newInitiative) {
            metadata.groupNumber = newGroupNumber;
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
};
