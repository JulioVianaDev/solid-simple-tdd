import { GenerateInvoices, Input } from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais por regime de caixa", async () => {
    const generateInvoices = new GenerateInvoices();
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
    const generateInvoices = new GenerateInvoices();
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
    const generateInvoices = new GenerateInvoices();
    const input: Input = {
        month: 2,
        year: 2022,
        type: "accrual" // "accrual" | "cash"
    }

    const output = await generateInvoices.execute(input);
    expect(output[0].date).toBe("2022-02-01");
    expect(output[0].amount).toBe(500)
})
