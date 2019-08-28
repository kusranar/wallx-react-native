export default class Account{
    constructor(accountNumber, balance, cashtag, openDate, idStatusType, cif){
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.cashtag = cashtag;
        this.openDate = openDate;
        this.idStatusType = idStatusType;
        this.customer = cif;
    }
}