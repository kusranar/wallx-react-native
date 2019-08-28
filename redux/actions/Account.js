import axios from 'axios';

export function fetchAccounts(cif){
    return {
        type: 'FETCH_ACCOUNTS',
        payload: axios.get(`http://104.248.147.193:8070/customer/accounts/${cif}`)
    };
}