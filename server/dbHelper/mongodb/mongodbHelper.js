const {
    dbInfo
} = require("../../config/server.config.js");
const MongoClient = require('mongodb').MongoClient;
class mongodbHelper {
    /***连接数据库***/
    connection() {
        return new Promise(function (resolve, reject) {
            var url = `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.dbName}`;
            MongoClient.connect(url, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }, function (err, db) {
                if (err) {
                    reject(err);
                }
                console.log("连接成功！", url);
                resolve(db);
            });
        })
    }
    /**关闭数据库连接
     *db:数据库实例
     ***/
    close(db) {
        db.close;
    }
    /**创建集合
     * db:数据库实例
     * collectionName：集合名称
     * **/
    createCollection(collectionName) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.createCollection(collectionName, function (err, res) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(1);
                });
            }).catch(err => {
                reject(err);
            })

        })
    }
    /**添加一条数据
     * collectionName：集合名称
     * data：数据，Object
     * */
    insertOne(collectionName, data) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.collection(collectionName).insertOne(data, function (err, res) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(1);
                });
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**添加多条数据
     *collectionName：数据集合
     *datas：数据，Array
     ****/
    insertMany(collectionName, datas) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.collection(collectionName).insertMany(datas, function (err, res) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(datas.length);
                });
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**查询
     *collectionName：集合名称
     *search：查询条件
     * **/
    find(collectionName, search) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.collection(collectionName).find(search).toArray(function (err, result) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**修改数据
     * collectionName：表名
     * query：查询条件，Object
     * update：更新的数据，Object
     * option={upsert, multi}
     */
    update(collectionName, query, update) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.collection(collectionName).updateOne(query, {
                    $set: update
                }, function (err, res) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(1);
                });
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**修改数据
     * collectionName：表名
     * query：查询条件，Object
     * update：更新的数据，Object
     * option={upsert, multi}
     */
    delete(collectionName, obj) {
        return new Promise((resolve, reject) => {
            this.connection().then(db => {
                var dbase = db.db(dbInfo.dbName);
                dbase.collection(collectionName).remove(obj, function (err, res) {
                    db.close();
                    if (err) {
                        reject(err);
                    }
                    resolve(1);
                });
            }).catch(err => {
                reject(err);
            })
        });
    }
}


module.exports = mongodbHelper