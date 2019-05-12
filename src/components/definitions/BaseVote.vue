<template>
    <div id="basevote">
        <div class="divide">
                    <span class="icon fa-2x" v-on:click="vote('add')">
                        <i class="fas fa-caret-up"></i>
                    </span>
        </div>
        <div class="divide">
            <p> {{ nbLike || 1024 }}</p>
        </div>
        <div class="divide">
                    <span class="icon fa-2x" v-on:click="vote('reduce')">
                        <i class="fas fa-caret-down"></i>
                    </span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "BaseVote",
    props: {
      nbVote: Number,
      nbMaxLike: Number
    },
    data: () => ({
      nbLike: null
    }),
    methods: {
      vote(operande) {
        if (operande === 'add') {
          this.addNbVote()
          return
        }
        if (operande === 'reduce') {
          this.reduceNbVote()
          return
        }
        console.log('Bad operande, received', operande)
      },
      addNbVote() {
        this.nbLike++
        this.sendVote()
      },
      reduceNbVote() {
        this.nbLike--
        this.sendVote()
      },
      sendVote() {
        console.log('sendVote = ', this.nbLike)
        this.$emit('emitVote', this.nbLike)
      }
    },
    mounted() {
      this.nbLike = this.nbVote
    }
  }
</script>

<style scoped lang="scss">
    #basevote {
        margin-top: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .icon {
        cursor: pointer;
    }
    .divide {
        margin: 0.2em 0;
    }
    p {
        font-size: 1.5em;
        font-weight: bold;
    }
</style>
