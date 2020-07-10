<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col sm="6" offset-sm="3">
          <Calculator />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>
