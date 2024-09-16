import moment from "moment";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ContractRepository from "./ContractRepository";
export class GenerateInvoices {
    constructor(readonly contractRepository: ContractRepository) {

    }
    async execute(input: Input): Promise<Output[]> {
        const output: Output[] = []
        const contracts = await this.contractRepository.list();
        for (const contract of contracts) {
            if (input.type === "cash") {
                for (const payment of contract.getPayments()) {
                    if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                    output.push({ date: moment(payment.date).format("YYYY-MM-DD"), amount: +payment.amount })
                }
            }
            if (input.type === "accrual") {
                let period = 0;
                while (period <= contract.periods) {
                    const date = moment(contract.date).add(period++, "months").toDate();
                    if (date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue
                    const amount = contract.amount / contract.periods;
                    output.push({ date: moment(date).format("YYYY-MM-DD"), amount })
                }
            }
        }
        return output
    }
}

export type Input = {
    month: number,
    year: number,
    type: "accrual" | "cash"
}

export type Output = {
    date: string,
    amount: number
}
