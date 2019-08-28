const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    accounts: [],
    wallets: [],
    trader: null,
    tradings: [],
    currencies: [],
    customer: null,
    amountTrader: null,
    amountForex: null,
    outstandings: []
};

const reducer = function (state = initialState, action) {
    switch (action.type) {
        // ACCOUNTS
        case 'FETCH_ACCOUNTS_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_ACCOUNTS_FULFILLED':
            return { ...state, fetching: false, fetched: true, accounts: action.payload.data.data };
            break;
        case 'FETCH_ACCOUNTS_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // WALLETS
        case 'FETCH_WALLETS_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_WALLETS_FULFILLED':
            return { ...state, fetching: false, fetched: true, wallets: action.payload.data.data };
            break;
        case 'FETCH_WALLETS_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // TRADER
        case 'FETCH_TRADER_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_TRADER_FULFILLED':
            return { ...state, fetching: false, fetched: true, trader: action.payload.data.data };
            break;
        case 'FETCH_TRADER_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // TRADING
        case 'FETCH_TRADING_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_TRADING_FULFILLED':
            return { ...state, fetching: false, fetched: true, tradings: action.payload.data.data };
            break;
        case 'FETCH_TRADING_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // CURRENCIES
        case 'FETCH_CURRENCIES_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_CURRENCIES_FULFILLED':
            return { ...state, fetching: false, fetched: true, currencies: action.payload.data.data };
            break;
        case 'FETCH_CURRENCIES_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // CUSTOMER
        case 'FETCH_CUSTOMER_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_CUSTOMER_FULFILLED':
            return { ...state, fetching: false, fetched: true, customer: action.payload.data.data };
            break;
        case 'FETCH_CUSTOMER_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // AMOUNT TRADER
        case 'FETCH_AMOUNTTRADER_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_AMOUNTTRADER_FULFILLED':
            return { ...state, fetching: false, fetched: true, amountTrader: action.payload.data.data.balance };
            break;
        case 'FETCH_AMOUNTTRADER_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // AMOUNT FOREX
        case 'FETCH_AMOUNTFOREX_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_AMOUNTFOREX_FULFILLED':
            return { ...state, fetching: false, fetched: true, amountForex: action.payload.data.data };
            break;
        case 'FETCH_AMOUNTFOREX_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;

        // OUTSTANDING
        case 'FETCH_OUTSTANDING_PENDING':
            return { ...state, fetching: true };
            break;
        case 'FETCH_OUTSTANDING_FULFILLED':
            return { ...state, fetching: false, fetched: true, outstanding: action.payload.data.data };
            break;
        case 'FETCH_OUTSTANDING_REJECTED':
            return { ...state, fetching: false, error: action.payload.data };
            break;
    }

    return state;
}

export default reducer;