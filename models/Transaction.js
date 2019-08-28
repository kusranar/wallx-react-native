export default class Transaction{
    constructor(idTransaction, accountDebit, accountCredit, date, description, amount, transactionType, currency, bank){
        this.idTransaction = idTransaction;
        this.accountDebit = accountDebit;
        this.accountCredit = accountCredit;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.transactionType = transactionType;
        this.bank = bank;
    }
}