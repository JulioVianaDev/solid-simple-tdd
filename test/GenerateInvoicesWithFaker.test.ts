import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import ContractRepository from "../src/ContractRepository";
import { GenerateInvoices, Input } from "../src/GenerateInvoices";
let generateInvoices: GenerateInvoices;
beforeEach(() => {
    const contractRepository: ContractRepository = {
        async list() {
            return [
                {
                    id: "20202002",
                    description:
                        'Prestação de serviços escolares',
                    amount: 6000,
                    periods: 12,
                    date: new Date('2022-01-01T10:00:00'),
                    payments: [
                        {
                            idContract: "20202002",
                            idPayment: "20101010",
                            amount: 6000,
                            date: new Date('2022-01-05T10:00:00'),
                        }
                    ]
                }
            ]
        },
    };
    //  caso queira por  database instancia a classe com o contractRepository
    generateInvoices = new GenerateInvoices(contractRepository);

})
test("Deve gerar as notas fiscais por regime de caixa", async () => {

    const input: Input = {
        month: 1,
        year: 2022,
        type: "cash" // "accrual" | "cash"
    }

    const output = await generateInvoices.execute(input);
    expect(output[0].date).toBe("2022-01-05");
    expect(output[0].amount).toBe(6000)
})



test("Deve gerar as notas fiscais por regime de competencia 1 mes", async () => {
    const input: Input = {
        month: 1,
        year: 2022,
        type: "accrual" // "accrual" | "cash"
    }

    const output = await generateInvoices.execute(input);
    expect(output[0].date).toBe("2022-01-01");
    expect(output[0].amount).toBe(500)
})
test("Deve gerar as notas fiscais por regime de competencia 2 mes", async () => {
    const input: Input = {
        month: 2,
        year: 2022,
        type: "accrual" // "accrual" | "cash"
    }

    const output = await generateInvoices.execute(input);
    expect(output[0].date).toBe("2022-02-01");
    expect(output[0].amount).toBe(500)
})
