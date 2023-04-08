import type { Image, Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { derived, writable } from "svelte/store";
import { METADATA_KEY } from "../constants";

export type Token = Image;
export type TokenMeta = {
  inInitiative: boolean;
  groupNumber: number;
  hp?: number;
  ac?: number;
  initiativeCount?: number;
  damage: number[];
  player?: boolean;
};

export const getMetadata: (item: Item) => TokenMeta | undefined = (
  item: Item
) => {
  return item.metadata[METADATA_KEY] as TokenMeta | undefined;
};
export const tokens = writable<Token[]>([]);
export const groupTokens = derived(tokens, ($tokens) =>
  $tokens.reduce((acc, token) => {
    if (acc[token.name]) {
      return {
        ...acc,
        [token.name]: acc[token.name] + 1,
      };
    }
    return {
      ...acc,
      [token.name]: 1,
    };
  }, {} as Record<string, number>)
);

export const orderedTokens = derived(tokens, ($tokens) =>
  [...$tokens].sort((a, b) => {
    const ameta = getMetadata(a);
    const bmeta = getMetadata(b);
    if (!ameta && !bmeta) return 0;
    if (!ameta) return 1;
    if (!bmeta) return -1;
    return (bmeta.initiativeCount || 0) - (ameta.initiativeCount || 0);
  })
);

export const updateMeta = (token: Token, changes: Partial<TokenMeta>) => {
  OBR.scene.items.updateItems([token.id], (items) => {
    if (items.length < 1) return;
    const item = items[0];
    const tokenMeta = getMetadata(item);
    item.metadata = {
      ...item.metadata,
      [METADATA_KEY]: {
        ...tokenMeta,
        ...changes,
      },
    };
  });
};
