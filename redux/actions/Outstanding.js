import axios from 'axios';

export function fetchOutstanding(idTrader){
    return {
        type: 'FETCH_OUTSTANDING',
        payload: axios.get(`http://104.248.147.193:8070/trader/outstanding?idtrader=${idTrader}`)
    };
}