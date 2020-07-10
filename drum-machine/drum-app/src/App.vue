<template>
  <div id="app">
    <header>
      <h3>Drum Machine</h3>
    </header>
    <b-container>
      <b-row>
        <b-col sm="6" offset-sm="3">
          <b-card class="mt-4">
            <b-row class="justify-content-between mx-2">
              <b-form-checkbox v-model="isOn" @change="powerChange" switch size="lg">
                Power
              </b-form-checkbox>
              <b-button @click="stop" variant="outline-info">
                Stop
              </b-button>
              <div class="border rounded-lg px-4 py-2">
                {{ lastPlayed }}
              </div>
            </b-row>
            <b-row class="mx-2 mt-4">
              <label for="volume">Volume</label>
              <b-form-input id="volume" v-model="volume" type="range" min="0" max="5" @change="volChange" />
            </b-row>
            <b-row class="mx-2 mt-4">
              <b-form-checkbox v-model="loop" switch @change="loopChange" size="lg" :disabled=!isOn>
                Loop
              </b-form-checkbox>
            </b-row>
          </b-card>
          <b-card class="my-4">
            <b-row class="justify-content-center">
              <button
                :class="['sound-button border rounded-lg m-1 button',
                  isOn ? 'border-warning' : 'button-disabled' ]"
                v-for="clip in clips"
                :key="clip.name"
                @click="playClip(clip)">
                {{ clip.name }} <br/>
                {{ clip.icon }}
              </button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import clips from './clips'

  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        clips,
        volume: 2,
        isOn: true,
        loop: false,
        lastPlayed: '🎧 No Sound',
        currentAudio: {},
        audio : null
      }
    },
    methods: {
      powerChange(){
        //while the sound is on loop and the power is tur
        stop()
      },
      playClip({ name, icon, url }) {
        this.audio = new Audio(url)
        if (this.isOn) {
          this.stop()

          this.audio.volume = this.volume / 5
          this.audio.loop = this.loop
          this.audio.play()
          this.currentAudio = this.audio
          this.lastPlayed = icon +"\xa0\xa0"+ name
        }
      },
      volChange(){
       //while the sound is on loop and if volumn is modified
       this.audio.volume = this.volume / 5
      },
      stop() {
        try {
          this.currentAudio.pause()
        } catch (err) {
          console.log(err)
        }
      },
      loopChange(){
        //if loop is disabled while sound is being played on a loop
        //stop the music
        this.loop = false;
        try {
          this.currentAudio.pause()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>
<style lang="scss">
  body{
   background: lightblue;
   font-family: sans-serif;
  }
  header{
   text-align: center;
  }
  .sound-button {
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #fcf6e3;
    &:hover {
      cursor: pointer;
      font-size: 28px;
    }
  }
  .button-disabled {
    border-color: gray !important;
    background-color: lightgray;
    &:hover {
      cursor: not-allowed;
      font-size: 1rem;
    }
  }
  .custom-control .custom-control-input:checked::after {
    background-color: green!important;
  }
</style>
