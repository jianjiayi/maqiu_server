/*
 * @Author: big bug
 * @Email: 13121378101@163.com
 * @Date: 2019-04-02 14:29:38
 * @LastEditTime: 2019-04-18 15:38:14
 */

const moment = require('moment');

module.exports = function(sequelize,DataTypes){
    return sequelize.define('cs_user',{
        id:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            comment:'主键id'
        },
        username:{
            type:DataTypes.STRING(50),
            allowNull:false,
            //账号唯一性，登录时使用
            unique:true,
            comment:'用户账号'
        },
        password:{
            type:DataTypes.STRING(128),
            allowNull:false,
            comment:'密码'
        },
        nickname:{
            type:DataTypes.STRING(1000),
            allowNull:true,
            comment:'昵称'
        },
        roles_id:{
            type:DataTypes.CHAR(1),
            allowNull:false,
            defaultValue:2,//普通通用户2，管理员1,超级管理员0
            comment:'角色'
        },
        head_img:{
            type:DataTypes.STRING(1000),
            allowNull:true,
            comment:'头像'
        },
        email:{
            type:DataTypes.STRING(64),
            allowNull:true,
            validate:{
                // 格式必须为邮箱格式
                isEmail:true,
            },
            comment:'邮箱'
        },
        sex: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            defaultValue: '1',
            comment:'性别'
          },
        status:{
            type:DataTypes.CHAR(1),
            allowNull:false,
            defaultValue:true,//默认值true
            comment:'启用状态'
        },
        count:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
            defaultValue:'0',//默认值true
            comment:'登录次数'
        },
        last_login_ip:{
            type:DataTypes.STRING(),
            allowNull:true,
            comment:'最后登录IP'
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
            get(){
                return moment(
                    this.getDataValue('createdAt')
                ).format('YYYY-MM-DD HH:mm:ss');
            },
            comment:'创建时间'
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false,
            get(){
                return moment(
                    this.getDataValue('updatedAt')
                ).format('YYYY-MM-DD HH:mm:ss');
            },
            comment:'更新时间'
        }
    },{
        tableName: 'cs_user',
        timestamps: true,//时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
        // underscored: true,//使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则，如：createdAt在数据库中的字段名会是created_at
        // paranoid: true,//虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
        freezeTableName:true// sequelize会自动使用传入的模型名（define的第一个参数）做为表名
    })
}