const defaultSql = `
  CREATE TABLE IF NOT EXISTS member (
    idx integer primary key,
    id, pw, email, name, belong
  );
`

const Model = new class {
  init () {
    Model.db = openDatabase('20180927', '1.0', 'Test DB', 2 * 1024 * 1024)
    Model.query(sql)
  }
  query (sql, arr = [], await = true) {
    return new Promise(resolve => {
      Model.db.transaction(tx => { tx.executeSql(sql, arr, (tx, res) => { resolve(res) }, (tx, error) => { console.log(error)}) })
    })
  }
}

export default Model