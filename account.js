// File: account.js

class Account {
    constructor(accountNumber, balance = 0) {
      this.accountNumber = accountNumber;
      this._balance = balance;
    }
  
    deposit(amount) {
      this._balance += amount;
    }
  
    withdraw(amount) {
      if (amount <= this._balance) {
        this._balance -= amount;
      } else {
        console.log("Insufficient funds");
      }
    }
  
    get balance() {
      return this._balance;
    }
  
    toString() {
      return `Account Number: ${this.accountNumber}, Balance: $${this.balance.toFixed(2)}`;
    }
    
  }
  