export const getPayments = (store) => store.payments.list;
export const getTotalPayments = store => store.payments.total;
export const getPaymentsLoading = store => store.payments.loading;
export const getPaymentsError = store => store.payments.error;