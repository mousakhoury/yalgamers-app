<script>
	import { t,locale } from "$lib/stores/i18n";

    import img1 from "$lib/assets/banner-sidepreview-1.png";
    import img2 from "$lib/assets/banner-sidepreview-2.png";
    import img3 from "$lib/assets/banner-sidepreview-3.png";
    import img4 from "$lib/assets/banner-sidepreview-4.png";
    import {bannerImg} from "./store.js"

    const imgList =[img1,img2,img3,img4]

    function handleClick(index){
        $bannerImg = imgList[index]
    }
    
</script>
<div class={`flex justify-center items-center flex-col gap-[10px] ${$$props.class}`}>
    {#each imgList as image, index } 
        <button type="hidden" on:click = {()=>handleClick(index)}> 
            <img class="rounded-xl" height=100px src={image} alt="sidepreview"  />
        </button>     
    {/each}
</div>