import Contract from "../src/ContractType"

// teste de unidade
test("deve gerar faturas de um contrato", () => {
    const contract = new Contract("teste", 6000, 12, "213212312", new Date("2022-01-01T10:00:00"));
    const invoice = contract.generateInvoices(1, 2022, "accrual")
    expect(invoice[0].date).toStrictEqual(new Date("2022-01-01T10:00:00"));
    expect(invoice[0].amount).toBe(500)
})
