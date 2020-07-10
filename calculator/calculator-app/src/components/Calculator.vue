<template>
  <b-card class="mt-4 p-0">
    <div class="output-screen p-2 d-flex align-items-center">
      {{ secondOperand || firstOperand || 0 }}
    </div>
    <div class="button-container">
      <b-row no-gutters>
        <b-col>
          <b-button block @click="clear" variant="warning">
            C
          </b-button>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-button @click="appendCharacter(1)">1</b-button>
        <b-button @click="appendCharacter(2)">2</b-button>
        <b-button @click="appendCharacter(3)">3</b-button>
        <b-button
          :class="{'active-operator': operator === '+'}"
          variant="warning"
          @click="updateOperator('+')"
        >
          +
        </b-button>
      </b-row>

      <b-row no-gutters>
        <b-button @click="appendCharacter(4)">4</b-button>
        <b-button @click="appendCharacter(5)">5</b-button>
        <b-button @click="appendCharacter(6)">6</b-button>
        <b-button
          :class="{'active-operator': operator === '-'}"
          variant="warning"
          @click="updateOperator('-')"
        >
          -
        </b-button>
      </b-row>

      <b-row no-gutters>
        <b-button @click="appendCharacter(7)">7</b-button>
        <b-button @click="appendCharacter(8)">8</b-button>
        <b-button @click="appendCharacter(9)">9</b-button>
        <b-button
          :class="{'active-operator': operator === '*'}"
          variant="warning"
          @click="updateOperator('*')"
        >
          x
        </b-button>
      </b-row>

      <b-row no-gutters>
        <b-button @click="appendCharacter(0)">0</b-button>
        <b-button @click="appendCharacter('.')">.</b-button>
        <b-button @click="eval">=</b-button>
        <b-button
          :class="{'active-operator': operator === '/'}"
          variant="warning"
          @click="updateOperator('/')"
        >
          /
        </b-button>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import { evaluate } from 'mathjs'

export default {
  data() {
    return {
      firstOperand: '',
      secondOperand: '',
      operator: ''
    }
  },
  methods: {
    eval() {
      const { firstOperand, secondOperand, operator } = this
      this.firstOperand = evaluate(firstOperand + operator + secondOperand).toString()
      this.secondOperand = ''
      this.operator = ''
    },
    appendCharacter(char) {
      let currentOperand = this.operator ? 'secondOperand' : (
        'firstOperand'
      )

      if (char === '.') {
        if (!this.firstOperand.includes('.')) {
          this[currentOperand] += char
        }
      } else {
        this[currentOperand] += char
      }
    },
    updateOperator(op) {
      if (this.operator) {
        this.eval()
      }
      this.operator = op
    },
    clear() {
      this.firstOperand = ''
    }
  }
}
</script>

<style lang="scss" scoped>
$orange: #ffc107;
$dark-gray: #6c757d;

.output-screen {
  height: 60px;
  border: 1px solid #000;
}
.btn {
  width: 60px;
  height: 60px;
  border: 1px solid #000;
  border-radius: 0;
  background-color: $dark-gray;
  &.btn-block {
    width: 100%;
  }
  &:hover {
    border: 1px solid #000;
    background-color: darken($dark-gray, 8%);
  }
}
.btn-warning {
  background-color: $orange;
  &:hover {
    background-color: darken($orange, 8%);
  }
  &.active-operator {
    background-color: darken($orange, 8%);
  }
}
.card {
  width: 242px;
  border: 1px solid #000;
  border-radius: 0;
}
.card-body {
  padding: 0;
}
</style>
