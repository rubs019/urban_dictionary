<template>
  <div id="search-component" class="control has-icons-left has-icons-right">
    <!-- Liste de defintions -->
    <div class="content">
      <ul
        v-if="resultList"
        v-click-outside="{
          exclude: ['input'],
          handler: 'onClose'
        }"
      >
        <!-- On affiche la liste que si nous avons des résultats -->
        <router-link
          tag="li"
          v-for="(expression, index) in filteredExpressionsFromBDD"
          :key="index"
          :to="{ name: 'OneDefinition', params: { name: expression.name } }"
        >
          {{ expression.name }}
        </router-link>
      </ul>
    </div>

    <input
      ref="input"
      class="input is-rounded"
      type="text"
      placeholder="SEARCH"
      v-model="userInput"
    />
    <!-- Icone de gauche -->
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
    <!-- Icone de droite -->
    <router-link tag="div" to="/random" class="random-icon">
      <i class="fas fa-random"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "searchComponent",
  data() {
    return {
      userInput: null,
      expressionsFromBDD: []
    };
  },
  methods: {
    filterWithLowerCase: function(expression) {
      return expression.name.toLowerCase() === this.userInput;
    },
    onClose() {
      this.expressionsFromBDD = [];
    }
  },
  computed: {
    filteredExpressionsFromBDD: function() {
      if (this.expressionsFromBDD.length === 0) return [];
      return this.expressionsFromBDD.filter(this.filterWithLowerCase);
    },
    resultList: function() {
      return this.filteredExpressionsFromBDD.length !== 0;
    }
  },
  mounted() {
    this.expressionsFromBDD = [
      { name: "Tchoin" },
      { name: "Afro-Trap" },
      { name: "Kahwa" },
      { name: "En Esprit" },
      { name: "Etre Stein" }
    ];
  }
};
</script>

<style scoped lang="scss">
$myGrey: #7b7b7b;
#search-component {
  position: relative; // Utiliser pour placer correctement l'icone random
}
.input {
  border: none;
  box-shadow: none;
  color: $myGrey;
  font-weight: bold;
}
.random-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
  color: #dbdbdb;
  &:hover {
    color: $myGrey;
  }
}
.content {
  z-index: 999;
  background-color: white;
  width: 93%;
  color: #909090;
  border-width: 0 1px 1px 1px;
  position: absolute;
  top: 2.2em;
  left: 1em;
  ul {
    list-style-type: none;
    margin: 0;
  }
  li {
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: $myGrey;
      color: white;
    }
  }
}
</style>
