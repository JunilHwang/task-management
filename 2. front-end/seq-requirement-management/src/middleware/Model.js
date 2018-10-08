
const Model = class {
  static setDB () {
    const db = openDatabase('20180927', '1.0', 'Test DB', 2 * 1024 * 1024)
    Model.db = db
    return db
  }
  static init () {
    Model.query(`
      CREATE TABLE IF NOT EXISTS member (
        idx integer primary key, id, pw, email, name, belong
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS project (
        idx integer primary key, writer, subject, description, uri, star, date integer
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS member_in_project (
        pidx integer, midx integer, type integer
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS member_in_card (
        cidx integer, midx integer, type integer
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS c_category (
        idx integer primary key, pidx integer, title
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS card (
        idx integer primary key,
        pidx integer,
        writer,
        manage,
        reg_date integer,
        com_date integer,
        title,
        category integer,
        parent integer,
        content,
        state integer
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS issue (
        idx integer primary key,
        cidx integer,
        od integer,
        depth integer,
        parent integer,
        content,
        date integer,
        writer integer
      );
    `)
  }
  static query (sql, arr = []) {
    const db = Model.db || Model.setDB()
    return new Promise(resolve => {
      db.transaction(
        tx => {
          tx.executeSql(
            sql,
            arr,
            (tx, res) => { resolve(res) },
            (tx, error) => { throw (error) }
          )
        }
      )
    })
  }
}
Model.init()

export default Model
