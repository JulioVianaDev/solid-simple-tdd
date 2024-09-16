import Contract from "./ContractType";
import Invoice from "./Invoice";

export default interface InvoiceGenerationStrategy {
    generate(contract: Contract, month: number, year: number): Invoice[]
}
