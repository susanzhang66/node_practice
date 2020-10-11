const Sequelize = require('sequelize');
module.exports.initModel = async sequelize => {
  //暗号：哈希算法
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
    // id : {  // 自增主键
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true
    // },
    name: Sequelize.STRING,
    email: Sequelize.STRING
  })
  const Product = sequelize.define("Product", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
  })

  User.hasMany(Product)
  sequelize.sync().then(
    async result => {
        // 初始化数据
        let user = await User.findByPk(1)
        if (!user) {
            user = await User.create({
                name: 'Sourav',
                email: 'sourav.dey9@gmail.com'
            })
        } 
    })

    return { User, Product }

} 
