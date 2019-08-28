export default class Wallet{
    constructor(idWallet, openDate, walletType, account, cif){
        this.idWallet = idWallet;
        this.openDate = openDate;
        this.walletType = walletType;
        this.account = account;
        this.customer = cif;
    }
}