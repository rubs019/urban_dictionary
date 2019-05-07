<template>
    <div id="basevote">
        <nav class="level">
            <div class="level-item button has-text-centered is-primary" v-on:click="vote('add')">
                  <span class="icon fa-2x">
                        <i class="fas fa-caret-up"></i>
                    </span>
                <span>Upvote</span>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Vote</p>
                    <p class="title">{{ nbLike }}</p>
                </div>
            </div>
            <div class="level-item button has-text-centered is-primary" v-on:click="vote('reduce')">
                  <span class="icon fa-2x">
                        <i class="fas fa-caret-down"></i>
                    </span>
                <span>Downvote</span>
            </div>
        </nav>
    </div>
</template>

<script>
  export default {
    name: "BaseVoteHorizontal",
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
  };
</script>

<style scoped="scss">
    #basevote {
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
</style>
