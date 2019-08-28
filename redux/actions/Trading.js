import axios from 'axios';

export function fetchTradings(idTrader){
    return {
        type: 'FETCH_TRADING',
        payload: axios.get(`http://104.248.147.193:8070/transactionf?idtrader=${idTrader}`)
    }; 
}