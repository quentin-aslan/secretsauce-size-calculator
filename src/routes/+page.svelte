<script lang="ts">
	import logo from '$lib/images/logo.svg'
	import logoText from '$lib/images/logo-text.svg'
	import Autoselect from "$lib/components/Autoselect.svelte";
	import type {Brand} from "$lib/types/brand";
	import type {Category} from "$lib/types/category";

	const brands: Brand[] = [
		{
			"id": "gabriella-rossi-cashmere",
			"name": "GABRIELLA ROSSI CASHMERE"
		},
		{
			"id": "geox",
			"name": "Geox"
		},
		{
			"id": "gina-tricot",
			"name": "Gina Tricot"
		},
		{
			"id": "giuseppe-zanotti-design",
			"name": "Giuseppe Zanotti Design"
		},
		{
			"id": "gottex",
			"name": "Gottex"
		},
		{
			"id": "gucci",
			"name": "Gucci"
		}
	]

	const categories: Category[] = [
		{
			"id": "activewear",
			"name": "Activewear"
		},
		{
			"id": "dresses",
			"name": "Dresses"
		},
		{
			"id": "jackets--and--blazers",
			"name": "Jackets & Blazers"
		},
		{
			"id": "jeans",
			"name": "Jeans"
		},
		{
			"id": "knits--and--sweaters",
			"name": "Knits & Sweaters"
		},
		{
			"id": "leggings",
			"name": "Leggings"
		},
		{
			"id": "outerwear",
			"name": "Outerwear"
		},
		{
			"id": "pants",
			"name": "Pants"
		},
		{
			"id": "shorts",
			"name": "Shorts"
		},
		{
			"id": "skirts",
			"name": "Skirts"
		},
		{
			"id": "tops",
			"name": "Tops"
		}
	]

	let brandSelected = $state<string | null>(null)
</script>

<svelte:head>
	<title>Secret Sauce Calculator Size</title>
	<meta name="author" content="Quentin Aslan" />
	<meta name="contact" content="contact@quentinaslan.com" />
</svelte:head>

<div class="font-manrope max-w-sm mx-auto p-4 bg-global-gray rounded-2xl shadow border border-[#E7E7E782]">
	<!-- Header -->
	<div class="bg-primary rounded-t-2xl -m-4 mb-4 p-4 flex items-center space-x-2">
			<img src="{logo}" alt="Logo of Size Calculator, it's a big S" />
			<img src="{logoText}" alt="Text Size Calculator" />

	</div>

	<!-- Form -->
	<div class="space-y-4 flex flex-col gap-2">
		<Autoselect data={brands} placeholder="Select a brand" />

		<Autoselect data={categories} placeholder="Select a category" />

		<div class="flex flex-row gap-2 items-center justify-center ">
			<span>My size is</span>
			<input
					type="number"
					class="w-32 h-10 px-2 text-center focus:outline-none focus:ring-2 focus:ring-primary bg-white "
			/>
			<span>inches.</span>
		</div>

		<button class="bg-secondary hover:bg-secondary/80 text-gray-800 py-2 px-4 rounded-xl shadow-md shadow-black/25 cursor-pointer mx-auto">
			CALCULATE
		</button>
	</div>
</div>
