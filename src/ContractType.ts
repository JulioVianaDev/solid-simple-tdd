import { Payment } from "./PaymentType";

export default class Contract {
    private payments: Payment[];
    constructor(
        readonly description: string,
        readonly amount: number,
        readonly periods: number,
        readonly id_contract: string,
        readonly date: Date
    ) {
        this.payments = [];
    }
    addPayment(payment: Payment) {
        this.payments.push(payment);
    }
    getPayments() {
        return this.payments;
    }
}
