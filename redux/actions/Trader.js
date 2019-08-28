import axios from 'axios';

export function fetchTrader(cif){
    return {
        type: 'FETCH_TRADER',
        payload: axios.get(`http://104.248.147.193:8070/trader?cif=${cif}`)
    };
}