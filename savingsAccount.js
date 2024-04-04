// File: savingsAccount.js

class SavingsAccount extends Account {
    constructor(accountNumber, balance = 0, interestRate) {
      super(accountNumber, balance);
      this.interestRate = interestRate;
    }
  
    addInterest() {
      const interest = this.balance * this.interestRate / 100;
      this.deposit(interest); // Using deposit method to add interest to balance
    }
    toString() {
        return `Savings Account Number: ${this.accountNumber}, Balance: $${this.balance.toFixed(2)}, Interest Rate: ${this.interestRate}%`;
      }
  }
  