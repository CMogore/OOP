// File: main.js

document.addEventListener('DOMContentLoaded', function () {
    const createAccountForm = document.getElementById('create-account-form');
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');
  
    createAccountForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const accountType = createAccountForm.elements['account-type'].value;
      const accountNumber = createAccountForm.elements['account-number'].value;
      const initialBalance = parseFloat(createAccountForm.elements['initial-balance'].value);
  
      if (accountType === 'regular') {
        //add new reqular account
        const account = new Account(accountNumber, initialBalance);
        displayAccount(account);
      } else if (accountType === 'savings') {
        const interestRate = 5; // Example interest rate (5%)
        //add new savings account
        const savingsAccount = new SavingsAccount(accountNumber, initialBalance, interestRate);
        const interestAdded = savingsAccount.addInterest(); // Add interest automatically
        displayAccount(savingsAccount, interestAdded);
      }
  
      createAccountForm.reset();
    });
  
    depositForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const accountNumber = depositForm.elements['deposit-account-number'].value;
      const depositAmount = parseFloat(depositForm.elements['deposit-amount'].value);
  
      const account = findAccount(accountNumber);
      if (account) {
        //deposit in account
        account.deposit(depositAmount);
        updateAccount(account);
      } else {
        alert('Account not found');
      }
  
      depositForm.reset();
    });

    withdrawForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const accountNumber = withdrawForm.elements['withdraw-account-number'].value;
        const withdrawAmount = parseFloat(withdrawForm.elements['withdraw-amount'].value);
    
        const account = findAccount(accountNumber);
        if (account) {
          if (account.balance >= withdrawAmount) {
            //withdraw from account
            account.withdraw(withdrawAmount);
            updateAccount(account);
          } else {
            alert('Insufficient funds');
          }
        } else {
          alert('Account not found');
        }
    
        withdrawForm.reset();
      });
  
  
    function displayAccount(account) {
        const accountsContainer = document.getElementById('accounts-container');
        const accountDiv = document.createElement('div');
        accountDiv.className = 'account';
        accountDiv.textContent = account.toString();
        accountDiv.dataset.accountNumber = account.accountNumber; 
        accountDiv.dataset.accountType = account instanceof SavingsAccount ? 'savings' : 'regular';
        accountDiv.dataset.balance = account.balance;
        if (account instanceof SavingsAccount) {
          accountDiv.dataset.interestRate = account.interestRate;
        }
        accountsContainer.appendChild(accountDiv);
      }
      
  
    function updateAccount(account) {
      const accountDiv = document.querySelector(`.account[data-account-number="${account.accountNumber}"]`);
      if (accountDiv) {
        accountDiv.textContent = account.toString();
      }
    }
  
    function findAccount(accountNumber) {
      const accountDiv = document.querySelector(`.account[data-account-number="${accountNumber}"]`);
      if (accountDiv) {
        const accountType = accountDiv.dataset.accountType;
        if (accountType === 'savings') {
          return new SavingsAccount(accountNumber, parseFloat(accountDiv.dataset.balance), parseFloat(accountDiv.dataset.interestRate));
        } else {
          return new Account(accountNumber, parseFloat(accountDiv.dataset.balance));
        }
      }
      return null;
    }
  });
  