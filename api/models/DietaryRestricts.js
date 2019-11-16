'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class DietaryRestricts extends Model { }

    DietaryRestricts.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              len: [10],
              notEmpty: true,
              allownull: false,
            }
          },
        
         
    }, {
        sequelize,
        modelName: 'DietaryRestricts'
    });

    
    DietaryRestricts.associate = (models) => {
        // associations can be defined here
        models.DietaryRestricts.belongsToMany(models.Users, {through: 'Users_DietaryRestricts'});

    };

    return DietaryRestricts;
    
};