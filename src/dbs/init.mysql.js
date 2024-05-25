const mysql = require('mysql2/promise');
const connectSql = {
    host: process.env.DB_HOST_SQL,
    user:  process.env.DB_HOSTNAME_SQL,
    password:  process.env.DB_PASSWORD_SQL,
    database:  process.env.DB_DATABASE_SQL,
    port:  process.env.DB_PORT_SQL,
};
class Database {
    constructor(config) {
        this.config = config
        this.connection = null
        this.queryString = '';
        this.connect();
    }
    query(query) {
        this.queryString = query
        return this
    }
    async connect() {
        await mysql.createConnection(this.config).then(_ => {
            this.connection =_
        })
        .catch(err => console.log(err))
      
    }
    select(fields) {
        this.queryString += `SELECT ${fields.join(', ')}`;
        return this;
    }

    from(table) {
        this.queryString += ` FROM ${table}`;
        return this;
    }

    where(conditions) {
        this.queryString += ' WHERE';
        Object.keys(conditions).forEach((key, index) => {
            const value = conditions[key];
            const operator = index === 0 ? '' : ' AND';
            this.queryString += `${operator} ${key} = '${value}'`;
        });
        return this;
    }

    join(table, condition) {
        this.queryString += ` JOIN ${table} ON ${condition}`;
        return this;
    }
    joinLeft(table, condition) {
        this.queryString += ` JOIN ${table} ON ${condition}`;
        return this;
    }
    joinRight(table, condition) {   ``
        this.queryString += ` JOIN ${table} ON ${condition}`;
        return this;
    }
    having(condition) {
        this.queryString += `HAVING ${condition}`;
        return this;
    }
    order_by(condition) {
        this.queryString += ` ORDER BY ${condition}`;
        return this;
    }
    limit(limit) {
        this.queryString += ` LIMIT ${limit}`;
        return this;
    }
    offset(offset) {
        this.queryString += ` OFFSET ${offset}`;
        return this;
    }
    insert(table, data) {
        // Data as json format
        let k = [];
        let v = [];
        for (let i in data) {
            k.push(i);
            v.push(`'${data[i]}'`);
        }

        this.queryString = `INSERT INTO ${table} (${k.join(',')}) VALUES (${v.join(',')})`;
        return this;
    }
    update(table, data) {
        let v = [];
        for (let i in data) {
            v.push(`${i}='${data[i]}'`);
        }
        this.queryString = `UPDATE ${table} SET ${v.join(',')} `;
        return this;
    }
    delete(table) {
        this.queryString = `DELETE FROM ${table} `
        return this;
    }

    async execute() {
        try {
            await this.connect()
            console.log(this.queryString)
            const [rows, fields] = await this.connection.query(this.queryString);
            // Xử lý kết quả ở đây
            console.log('Query result:', rows);

            // Đóng kết nối
            this.connection.end();

            // Reset câu truy vấn để sử dụng cho các truy vấn tiếp theo
            this.queryString = '';
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);

            // Đóng kết nối nếu có lỗi
            this.connection.end();
            return error;
        }
    }
    static getInstance(connectSql) {
        console.log(Database.instance)
        if (!Database.instance) {
            Database.instance = new Database(connectSql)
        }
        console.log(123)
        console.log(Database.instance)
        return Database.instance
    }
}
// Sử dụng class Database với kết nối SQL

// const db =  Database.getInstance(connectSql);
const db = Database.getInstance(connectSql);
module.exports = db; 