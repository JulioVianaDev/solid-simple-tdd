import pgPromise from "pg-promise";
import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import { GenerateInvoices, Input } from "../src/GenerateInvoices";
import { PgPromiseAdapter } from "../src/PgPromiseAdapter";
import { DatabaseConnection } from "../src/DatabaseConnection";

let connection: DatabaseConnection;

beforeAll(() => {
    connection = new PgPromiseAdapter();
})
test("Deve gerar as notas fiscais por regime de caixa", async () => {
    const contractRepository = new ContractDatabaseRepository(connection);
    const generateInvoices = new GenerateInvoices(contractRepository);
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
    const contractRepository = new ContractDatabaseRepository(connection);
    const generateInvoices = new GenerateInvoices(contractRepository)
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
    const contractRepository = new ContractDatabaseRepository(connection);
    const generateInvoices = new GenerateInvoices(contractRepository)
    const input: Input = {
        month: 2,
        year: 2022,
        type: "accrual" // "accrual" | "cash"
    }

    const output = await generateInvoices.execute(input);
    expect(output[0].date).toBe("2022-02-01");
    expect(output[0].amount).toBe(500)
})

afterAll(() => {
    connection.close()
})
