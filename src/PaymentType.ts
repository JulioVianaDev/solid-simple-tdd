export class Payment {
    constructor(
        readonly date: Date,
        readonly amount: number,
        readonly idPayment: string,
        readonly idContract: string
    ) { }
}
