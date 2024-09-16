import { DatabaseConnection } from "./DatabaseConnection";
import pg from "pg-promise"

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any;
    constructor(
    ) {
        this.connection = pg()("postgres://julio:tomate@localhost:5432/julio")
    }
    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}
