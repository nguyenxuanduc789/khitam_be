class db {
    constructor() {
        this.query = '';
    }

    select(fields) {
        this.query += `SELECT ${fields.join(', ')}`;
        return this;
    }

    from(table) {
        this.query += ` FROM ${table}`;
        return this;
    }

    where(conditions) {
        this.query += ' WHERE';
        Object.keys(conditions).forEach((key, index) => {
            const value = conditions[key];
            const operator = index === 0 ? '' : ' AND';
            this.query += `${operator} ${key} = '${value}'`;
        });
        return this;
    }

    join(table, condition) {
        this.query += ` JOIN ${table} ON ${condition}`;
        return this;
    }

    execute() {
        console.log('Executing query:', this.query);
        this.query = '';
    }
}
module.exports = db