<template>
	<div class="main-container">
		<section class="header"></section>
		<section class="sidebard"></section>
		<section class="sub-page-wrapper">
			<div class="page-content">
        <router-view></router-view>
      </div>
		</section>
		<section class="footer"></section>
	</div>
</template>

<script>
export default {
	name: "MainLayout"
}
</script>

<style>

</style>