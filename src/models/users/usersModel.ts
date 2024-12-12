import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import {
  UserAttributes,
  Roles,
  SubscriptionPlans,
  AccountStatus,
} from "types/modelTypes";

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        name: "unique_userName",
        msg: "Username already in use, please choose another",
      },
    },

    // catch (error) {
    //   if (error.name === 'SequelizeUniqueConstraintError') {
    //     console.error(error.errors[0].message); // Logs: "Username already in use"
    //     throw new Error('Username already in use'); // Rethrow or handle as needed
    //   }

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_e,ail",
        msg: "Email already in use",
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(Roles)),
      allowNull: false,
      validate: {
        isIn: [Object.values(Roles)],
      },
    },

    numberOfEventsHosted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    numberOfEventsAttended: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isBlacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    subscriptionPlan: {
      type: DataTypes.ENUM(...Object.values(SubscriptionPlans)),
      allowNull: false,
      validate: {
        isIn: [Object.values(SubscriptionPlans)],
      },
      defaultValue: SubscriptionPlans.Free,
    },

    accountStatus: {
      type: DataTypes.ENUM(...Object.values(AccountStatus)),
      allowNull: false,
      validate: {
        isIn: [Object.values(AccountStatus)],
      },
      defaultValue: AccountStatus.Active,
    },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    interests: {
      type: DataTypes.ARRAY,
      allowNull: true,
    },

    noOfFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    noOfFollowings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    otp: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      validate: {
        isObject(value:Record<string, any>) {
          if (value && (typeof value !== "object" || Array.isArray(value))) {
            throw new Error("Otp must be an object with `otp`, otpId and `expiresAt`");
          }
        },
      },
    },
  },
  {
    sequelize: database,
    tableName: "User",
  }
);

export default User;
