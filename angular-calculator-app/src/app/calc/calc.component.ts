import { Component } from '@angular/core';

interface Sample {
  equal: string,
  result: number
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent {
  historyList: Sample[] = []
  display = '0'
  num1: number | null = null
  operand: string | null = null
  prevValue: string | null = null
  binVal: string | null = null
  hexVal: string | null = null
  lastOper: string | null = null

  numClick(val: number) {
    if (this.display === '0') {
      this.display = val.toString()
    } else {
      this.display = `${this.display}${val}`
    }
  }

  delChar() {
    this.display = this.display.slice(0,-1)
  }

  oper(operand: string) {
    if (this.prevValue && this.prevValue.length > 1 && this.prevValue.split(' ').at(-1) !== '=') {
      this.calculate()
    }

    if (this.prevValue) {
      this.display = `${this.num1} ${operand}`
    }

    this.num1 = parseFloat(this.display)
    this.prevValue = `${this.num1} ${operand}`
    this.operand = operand
    this.display = ' '
  }

  calculate() {
    let a = this.num1
    let b = parseFloat(this.display)
    let sample: Sample
    let result: number
    const prev = this.prevValue ? this.prevValue.split(' ') : null

    if (Number.isNaN(b) && !['√','²'].includes(this.operand)) {
      return
    }

    if (this.prevValue === null || this.display !== ' ' && prev.at(-1) === '=' ) {
      return
    }

    switch (this.operand) {
      case '+':
        result = a + b
        this.prevValue = `${a} ${this.operand} ${b} =`
        break

      case '-':
        result = a - b
        this.prevValue = `${a} ${this.operand} ${b} =`
        break

      case '/':
        result = a / b
        this.prevValue = `${a} ${this.operand} ${b} =`
        break

      case '*':
        result = a * b
        this.prevValue = `${a} ${this.operand} ${b} =`
        break

      case '²':
        result = a * a
        this.prevValue = `${a} ${this.operand} =`
        break

      case '√':
        result = Math.sqrt(a)
        this.prevValue = `${this.operand} ${a} =`
        break
    }

    sample = {
      equal: this.prevValue,
      result: result
    }

    this.historyList.push(...[sample])
    this.lastOper = this.operand
    this.num1 = result
    this.display = result.toString()

    let binResult = (result >>> 0).toString(2)
    while (binResult.length % 4 !== 0) {
      binResult = '0' + binResult
    }

    this.binVal = [...(binResult)].map((d, i) => (i) % 4 == 0 ? ' ' + d : d).join('').trim()
    this.hexVal = `${Number(result.toFixed(0)).toString(16).toLocaleUpperCase()}`
  }

  resetCalc() {
    this.prevValue = null
    this.display = '0'
    this.num1 = null
    this.operand = null
    this.binVal = null
    this.hexVal = null
    this.historyList = []
    this.lastOper = null
  }
}
