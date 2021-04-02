const sqlite3 = require('sqlite3').verbose();
const chalk = require('chalk');

class database {
    constructor(locatsion) {
        let db = new sqlite3.Database(locatsion, (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log(chalk.blue("[START]") + `Connected to the ${locatsion} database.`);
        });
        this.db = db;
        this.exeQuery("CREATE TABLE IF NOT EXISTS mod(guild text, mUser text, tUser text, mMessage text, tMessage text, type text, reason text, sTime text, eTime text, bool text)", [])
    }
    async getDatabase() {
        return this.db;
    }
    async getFirstRow(sql, parms) {
        return await this.db.get(sql, parms, (err, row) => {
            if (err) {
                console.error(err)
              return null
            }
            return row ? row : null;
        });
    }
    async getRows(sql, parms) {
        let rowsR;
        this.db.all(sql, (err, rows) => {
            if (err) {
                console.error(err)
              throw null;
            }
            rowsR = rows;
        });
        return rowsR;
    }
    async exeQuery(sql, parms) {
        if (parms.length > 0) {
            var i = 1;
            parms.forEach(parm => {
                sql.replace(`%${i}%`, `"` + parm + `"`);
                i++;
            });
        }
        this.db.run(sql)
    }
}

module.exports = {
    database: database,
};