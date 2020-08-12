require("dotenv").config({
    path:process.env.NODE_ENV==="test" ? ".env.test" : ".env"
});

module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'postgres',
    storage:'./__test__/database.sqlite',
    operatorAliases:false, 
    define : {
      timestamps:true, //add campos createdAt e updatedAt na tabela para termos o controle de quando foi criado e atualizado 
      underscored:true,
      underscoredAll:true
    }
}