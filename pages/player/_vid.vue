<template>
  <div>

    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.0/skins/default/aliplayer-min.css" />
    <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.9.0/aliplayer-min.js"></script>
    <!-- 定义播放器dom -->
    <div class="prism-player" id="player-con"></div>
  </div>
</template>

<script>
import videoApi from '@/api/video'
export default {
    layout: 'video',
    asyncData({ params, error }){
        return videoApi.getVideoPlayAuth(params.vid)
            .then(response => {
                return {
                    vid: params.vid,
                    playAuth: response.data.data.playAuth
                }
            })
    },
    mounted () {
        new Aliplayer({
            "id": "player-con",
            "vid": this.vid,
            "playauth": this.playAuth,
            "qualitySort": "asc",
            "format": "mp4",
            "mediaType": "video",
            "encryptType": 1,
            "width": "100%",
            "height": "500px",
            "autoplay": true,
            "isLive": false,
            "rePlay": false,
            "playsinline": true,
            "preload": true,
            "controlBarVisibility": "hover",
            "useH5Prism": true
        }, function (player) {
            console.log("The player is created");
        }
        );
    }
}
</script>

<style>

</style>