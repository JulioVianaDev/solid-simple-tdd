import { GenerateInvoices } from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais",async()=>{
    const generateInvoices = new GenerateInvoices();
    const res = await generateInvoices.execute()
    expect(res.length).toBe(0)
})