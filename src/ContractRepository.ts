import Contract from "./ContractType";

export default interface ContractRepository {
    list(): Promise<Contract[]>
}


