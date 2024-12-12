import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import {
  OtpAttributes,
} from "../../types/modelTypes";
import User from "../users/usersModel";

export class Otp extends Model<OtpAttributes> {}

Otp.init(
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

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Otp",
  }
);
  
export default Otp;
