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
            const invoices = contract.generateInvoices(input.month, input.year, input.type);
            for (const invoice of invoices) {
                output.push({ date: moment(invoice.date).format("YYYY-MM-DD"), amount: invoice.amount })
            }
        }
        if (!input.format || input.format === "json") {

            return output
        }
        if (input.format === "csv") {
            const lines: any[] = []
            for (const element of output) {
                const line: string[] = [];

                line.push(element.date)
                line.push(`${element.amount}`)
                lines.push(';')
            }
            return lines.join("\n")
        }
        return []
    }
}

export type Input = {
    month: number,
    year: number,
    type: "accrual" | "cash"
    format?: string
}

export type Output = {
    date: string,
    amount: number
}
