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

export default Followers;
