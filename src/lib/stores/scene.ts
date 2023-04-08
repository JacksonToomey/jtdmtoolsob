import OBR, { type Metadata } from "@owlbear-rodeo/sdk";
import { readable } from "svelte/store";

import { ID } from "../constants";

export const SCENE_METADATA_KEY = `${ID}/scenemetadata`;

export interface SceneMetadata {
  inCombat?: boolean;
  currentInitiative?: number;
  rounds?: number;
}

export const scene = readable<SceneMetadata>({}, (set) => {
  OBR.scene.onReadyChange(async (ready) => {
    if (ready) {
      const metadata = await OBR.scene.getMetadata();
      const sceneMetadata = (metadata[SCENE_METADATA_KEY] ||
        {}) as SceneMetadata;
      set(sceneMetadata);
    }
  });
  OBR.scene.onMetadataChange((metadata) => {
    const sceneMetadata = (metadata[SCENE_METADATA_KEY] || {}) as SceneMetadata;
    set(sceneMetadata);
  });
});
