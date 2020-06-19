new Vue({
  el: '#app',
  data: {
    quotes,
    currentQuote: quotes[0],
    animating: false
  },
  methods: {
    newQuote: function() {
      const num = Math.floor(Math.random() * quotes.length)
      this.currentQuote = quotes[num]
    }
  },
  updated: function() {
    this.animating = true
    setTimeout(() => {
      this.animating = false
    }, 1000)
  }
})
