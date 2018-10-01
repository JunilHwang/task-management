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
        idx integer primary key, writer, subject, description, uri, date integer
      );
    `)
    Model.query(`
      CREATE TABLE IF NOT EXISTS projectInMember (
        idx integer primary key, pidx integer, midx integer, type integer
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