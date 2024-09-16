import ContractRepository from "./ContractRepository";

import pg from "pg-promise"
import { DatabaseConnection } from "./DatabaseConnection";
import Contract from "./ContractType";
import { Payment } from "./PaymentType";

export default class ContractDatabaseRepository implements ContractRepository {

    constructor(readonly connection: DatabaseConnection) {
    }

    async list(): Promise<Contract[]> {
        const contracts: Contract[] = [];
        const contractsData = await this.connection.query('select * from julio.contract', []);
        for (const contractData of contractsData) {
            const contract = new Contract(contractData.description, contractData.amount, contractData.periods, contractData.id_contract, contractData.date,)
            const paymentsData = await this.connection.query('select * from julio.payment where id_contract = $1', [contract.id_contract])
            for (const paymentData of paymentsData) {
                contract.addPayment(new Payment(paymentData.date, paymentData.amount, paymentData.idPayment, paymentData.idContract))
            }
            contracts.push(contract)
        }
        return contracts
    }
}
