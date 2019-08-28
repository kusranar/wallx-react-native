import axios from 'axios';

export function fetchWallets(cif){
    return {
        type: 'FETCH_WALLETS',
        payload: axios.get(`http://104.248.147.193:8070/account/walletaccounts/${cif}`)
    }
}