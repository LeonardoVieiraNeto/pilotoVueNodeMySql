module.exports = (sequelize, DataTypes) => {
  let entity = sequelize.define("user", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'ID_USUARIO'
    },
    keyUser: {
      type: DataTypes.INTEGER(11),
      field: 'KEYUSER'
    },
    nome: {
      type: DataTypes.STRING(200),
      field: 'NOME'
    },
    usuario: {
      type: DataTypes.STRING(30),
      field: 'USUARIO'
    },
    senha: {
      type: DataTypes.STRING(150),
      field: 'SENHA'
    },
    ativo: {
      type: DataTypes.CHAR(1),
      type: DataTypes.BOOLEAN,
      field: 'ATIVO'
    },
    email: {
      type: DataTypes.STRING(100),
      field: 'EMAIL'
    },
    telefone: {
      type: DataTypes.STRING(20),
      field: 'TELEFONE'
    },
    dataCriacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'DATA_CRIACAO'
    },
    dataExpiracao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'DATA_EXPIRACAO'
    },
    superUser: {
      type: DataTypes.CHAR(1),
      field: 'SUPERUSER'
    },
    tecnico: {
      type: DataTypes.CHAR(1),
      field: 'TECNICO'
    },
    financeiro: {
      type: DataTypes.CHAR(1),
      field: 'FINANCEIRO'
    },
    administrativo: {
      type: DataTypes.CHAR(1),
      field: 'ADMINISTRATIVO'
    },
    tipoMenu: {
      type: DataTypes.CHAR(1),
      field: 'TIPO_MENU'
    },
    informativo: {
      type: DataTypes.CHAR(1),
      field: 'INFORMATIVO'
    },
  }, {
    tableName: 'CNF_USUARIO',
    timestamps: false
  })

  return entity;
};