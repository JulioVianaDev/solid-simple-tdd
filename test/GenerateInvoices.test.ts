import { GenerateInvoices } from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais", async () => {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2022,
        type: "cash" // "accrual" | "cash" 
    }

    const output = await generateInvoices.execute(input)
    expect(output.at(0)?.date).toBe("2022-01-05");
    expect(output.at(0)?.date).toBe(6000)
})