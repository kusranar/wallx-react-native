export default class Currency {
    constructor(idCurrency, ccyBase, ccyDestination, date, buy, sell, description){
        this.idCurrency = idCurrency;
        this.ccyBase = ccyBase;
        this.ccyDestination = ccyDestination;
        this.date = date;
        this.buy = buy;
        this.sell = sell;
        this.description = description;
    }
}