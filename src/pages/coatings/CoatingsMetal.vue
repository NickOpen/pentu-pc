<template>
	<div>
		<base-coating :type="type"></base-coating>
	</div>
</template>

<script>

import {COATING_TYPES} from '../../config/sysConstants';
import BaseCoating from './BaseCoating.vue';

export default {
	name: "MetalCoatingPage",
	components: {
		[BaseCoating.name]: BaseCoating
	},
	data(){
		return {
			type: COATING_TYPES.METAL
		}
	}
}
</script>