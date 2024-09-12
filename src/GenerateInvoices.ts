import pg from "pg-promise"
import moment from "moment";
export class GenerateInvoices {
    async execute(input: Input): Promise<Output[]> {
        const connection = await pg()("postgres://julio:tomate@localhost:5432/julio")
        const contracts = await connection.query('select * from julio.contract', []);
        const output: Output[] = []
        for (const contract of contracts) {
            if (input.type === "cash") {


                const payments = await connection.query('select * from julio.payment where id_contract = $1', [contract.id_contract])
                for (const payment of payments) {
                    if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                    output.push({ date: moment(payment.date).format("YYYY-MM-DD"), amount: +payment.amount })
                }
            }
            if (input.type === "accrual") {
                let period = 0;
                while (period <= contract.periods) {
                    const date = moment(contract.date).add(period++, "months").toDate();
                    if (date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue
                    const amount = parseFloat(contract.amount) / contract.periods;
                    output.push({ date: moment(date).format("YYYY-MM-DD"), amount })
                }
            }
        }
        await connection.$pool.end();
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
