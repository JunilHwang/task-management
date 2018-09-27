const Model = class {
  static setDB () {
    const db = openDatabase('20180927', '1.0', 'Test DB', 2 * 1024 * 1024)
    Model.db = db
    return db
  }
  static init () {
    Model.query(`
      CREATE TABLE IF NOT EXISTS member (
        idx integer primary key,
        id, pw, email, name, belong
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
            (tx, error) => { console.log(error) }
          )
        }
      )
    })
  }
}
Model.init()
export default Model