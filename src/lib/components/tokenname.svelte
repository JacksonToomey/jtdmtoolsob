<script lang="ts">
  import type { Token } from "../stores/tokens";

  export let token: Token;
</script>

<span class="text-md">{token.text.plainText}</span>
