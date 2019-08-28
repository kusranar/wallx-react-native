import axios from 'axios';

export function fetchAmountTrader(cif){
    return {
        type: 'FETCH_AMOUNTTRADER',
        payload: axios.get(`http://104.248.147.193:8070/trader?cif=${cif}`)
    };
}