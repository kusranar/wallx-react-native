import axios from 'axios';

export function fetchAmountForex(idTrader){
    return {
        type: 'FETCH_AMOUNTFOREX',
        payload: axios.get(`http://104.248.147.193:8070/amount?idtrader=${idTrader}`)
    };
}