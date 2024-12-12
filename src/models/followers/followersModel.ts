import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import User from "../users/usersModel";
import { FollowerAttributes } from "../../types/modelTypes";

export class Followers extends Model<FollowerAttributes>{}

Followers.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    followers: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: [],
    },

  },
  {
    sequelize: database,
    tableName: "Followers",
  }
);

// Define Associations
User.hasOne(Followers, {
  foreignKey: "userId",
  as: "followers", // User model can access followers through this alias
});

Followers.belongsTo(User, {
  foreignKey: "userId",
  as: "user", // Followers model can access the user through this alias
});

export default Followers;
