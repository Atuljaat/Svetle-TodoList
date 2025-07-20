<script lang="ts">
     import { dndzone } from 'svelte-dnd-action';
     let todos = $props()
</script>

<div use:dndzone={{items:todos,type:'columns'}}>
    
</div>