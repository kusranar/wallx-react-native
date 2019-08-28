import axios from 'axios';

export function fetchCustomer(cif){
    return {
        type: 'FETCH_CUSTOMER',
        payload: axios.get(`http://104.248.147.193:8070/customer/customer/${cif}`)
    };
}