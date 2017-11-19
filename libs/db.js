module.exports = function(opts){
    return new Promise((resolve,reject)=>{
        opts.db.query(opts.sql, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    })
}