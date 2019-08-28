import axios from 'axios';

export function fetchCurrencies(){
    return {
        type: 'FETCH_CURRENCIES',
        payload: axios.get(`http://104.248.147.193:8070/currencies?description=USD`)
    };
}