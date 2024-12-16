import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import User from "../users/usersModel";
import { EventAttributes } from "../../types/modelTypes";

export class Events extends Model<EventAttributes>{}

Events.init(
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

      attendees: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: true,
          defaultValue: [],
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventAd: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      Duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      coverImage: {
        type: DataTypes.STRING,
        allowNull: false,
      }

  },
  {
    sequelize: database,
    tableName: "Events",
  }
);

export default Events;
