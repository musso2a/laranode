const Db = require("../../bootstrap/Db.js")

module.exports = class UserController {
    constructor(req, res) {
        this.db = new Db();
        this.req = req
        this.res = res
    }

    async create(name, email, password) {
        const text = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        const values = [name, email, password]
        try {
            const res = await this.db.client.query(text, values)
            console.log("utilisateur crée")
            this.res.write(JSON.stringify(res.rows));
        } catch (err) {
            console.log(err.stack)
        }
        this.res.end()
    }

    async get(id) {
        const results = await this.db.client.query(`SELECT * FROM users WHERE id = ${id}`);
        const user = results.rows;
        this.res.write(JSON.stringify(user));
        this.res.end();
    }
    async all() {
        const results = await this.db.client.query("SELECT * FROM users");
        const users = results.rows;
        this.res.write(JSON.stringify(users));
        this.res.end();
    }

    async delete(id) {
        const text = `DELETE FROM users WHERE id = $1`
        const values = [id]
        try {
            const res = await this.db.client.query(text, values)
            console.log("utilisateur supprimé")
        } catch (err) {
            console.log(err.stack)
        }
    }

    async update(id, name, email, password) {
        const text = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = ${id}`
        const values = [name, email, password]
        try {
            const res = await this.db.client.query(text, values)
            console.log("utilisateur mis a jour")
        } catch (err) {
            console.log(err.stack)
        }
    }


}
