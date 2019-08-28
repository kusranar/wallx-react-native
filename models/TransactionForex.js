export default class TransactionForex{
    constructor(idTransactionForex, buySell, date, potensialPoinLose, pointLose, amount, rate, amountAfterSell, idTrader, currency){
        this.idTransactionForex = idTransactionForex;
        this.buySell = buySell;
        this.date = date;
        this.potensialPoinLose = potensialPoinLose;
        this.pointLose = pointLose;
        this.amount = amount;
        this.rate = rate;
        this.amountAfterSell = amountAfterSell;
        this.idTrader = idTrader;
        this.currency = currency;
    }
}