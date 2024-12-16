import { ResponseDetails } from "../../types/generalTypes";
import validator from "validator";
import { userDatabase, generalHelpers } from "../../helpers";
import { mailUtilities, errorUtilities } from "../../utilities";
import { USERS_APP_BASE_URL } from "../../configurations/envKeys";
import { Roles } from "../../types/modelTypes";
import { v4 } from "uuid";
import otpDatabaseHelpers from "../../helpers/databaseHelpers/otpDatabase.helpers";
import walletDatabaseHelperHelpers from "../../helpers/databaseHelpers/walletDatabaseHelper.helpers";
import followersDatabaseHelpersHelpers from "../../helpers/databaseHelpers/followersDatabaseHelpers.helpers";
import followingsDatabaseHelpersHelpers from "../../helpers/databaseHelpers/followingsDatabaseHelpers.helpers";
import { Transaction } from "sequelize";
import performTransaction from "../../middlewares/databaseTransactions.middleware";

const userRegisterWithEmailService = errorUtilities.withErrorHandling(
  async (userPayload: Record<string, any>): Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const { email, password } = userPayload;

    if (!validator.isEmail(email)) {
      throw errorUtilities.createError("Invalid email", 400);
    }

    const existingUser: any = await userDatabase.userDatabaseHelper.getOne({email}, ['email']);

    if (existingUser) {
      throw errorUtilities.createError(
        "User already exists with this email",
        400
      );
    }

    const userId = v4();

    const { otp, expiresAt } = await generalHelpers.generateOtp();

    const otpId = v4();

    const otpPayload = {
      id: otpId,
      userId,
      otp,
      expiresAt,
      used: false,
    };

    const walletPayload = {
      id: v4(),
      userId,
      totalBalance: 0,
    };

    const followersPayload = {
      id: v4(),
      userId,
      followers: [],
    };

    const followingsPayload = {
      id: v4(),
      userId,
      followings: [],
    };

    const userCreationPayload = {
      id: userId,
      email,
      password: await generalHelpers.hashPassword(password),
      otp: {
        otp,
        otpId,
        expiresAt,
      },
      role: Roles.User,
    };

    const operations = [
      async (transaction: Transaction) => {
        await userDatabase.userDatabaseHelper.create(
          userCreationPayload,
          transaction
        );
      },

      async (transaction: Transaction) => {
        await walletDatabaseHelperHelpers.walletDatabaseHelpers.create(
          walletPayload,
          transaction
        );
      },

      async (transaction: Transaction) => {
        await followersDatabaseHelpersHelpers.followersDatabaseHelpers.create(
          followersPayload,
          transaction
        );
      },

      async (transaction: Transaction) => {
        await followingsDatabaseHelpersHelpers.followingsDatabaseHelpers.create(
          followingsPayload,
          transaction
        );
      },

      async (transaction: Transaction) => {
        await otpDatabaseHelpers.otpDatabaseHelper.create(
          otpPayload,
          transaction
        );
      },
    ];

    await performTransaction.performTransaction(operations);

    const user: any = await userDatabase.userDatabaseHelper.getOne({
      id: userId,
    });

    await mailUtilities.sendMail(
      email,
      `Welcome to Eventyze, your OTP is ${otp}, it expires in 10 minutes`,
      "Eventyze OTP"
    );

    responseHandler.statusCode = 201;
    responseHandler.message = "User created successfully, an OTP has been sent to your mail for email verification";
    responseHandler.data = user;
    return responseHandler;
  }
);

const userVerifiesOtp = errorUtilities.withErrorHandling(
  async (userPayload: Record<string, any>): Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const { otp, userId } = userPayload;

    const projection = ['otp'];

    const user: any = await userDatabase.userDatabaseHelper.getOne(
      { id: userId },
      projection,
      false
    );

    const otpFinder: any = await otpDatabaseHelpers.otpDatabaseHelper.getOne({
      id: user.otp.otpId,
      otp,
    });

    if (!otpFinder || otpFinder.used) {
      throw errorUtilities.createError(
        "Invalid OTP. Please request a new OTP",
        400
      );
    }

    const verify = await generalHelpers.verifyOtp(otpFinder);

    if (!verify) {
      throw errorUtilities.createError(
        "OTP expired. Please request a new OTP",
        400
      );
    }

    const operations = [
      async (transaction: Transaction) => {
        await otpDatabaseHelpers.otpDatabaseHelper.updateOne(
          { id: otpFinder.id },
          { used: true },
          transaction
        );
      },

      async (transaction: Transaction) => {
        await userDatabase.userDatabaseHelper.updateOne(
          { id: userId },
          { otp: null, isVerified: true },
          transaction
        );
      },
    ];

    await performTransaction.performTransaction(operations);

    const mainUser: any = await userDatabase.userDatabaseHelper.getOne({
      id: userId,
    });

    await mailUtilities.sendMail(
      mainUser.email,
      `Welcome to Eventyze, your email has been verified successfully. You can now login and start hosting your events 😊`,
      "Email Verified"
    );

    responseHandler.statusCode = 200;
    responseHandler.message = "Account verified successfully";
    responseHandler.data = mainUser;
    return responseHandler;
  }
);

const userLogin = errorUtilities.withErrorHandling(
  async (loginPayload: Record<string, any>) => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const { email, password } = loginPayload;

    const projection = [
      'password',
      'id',
      'email',
      'isVerified',
      'isBlacklisted',
      'role',
      'numberOfEventsHosted',
      'numberOfEventsAttended',
      'bio',
      'userImage',
      'country',
      'subscriptionPlan',
      'interests',
      'noOfFollowers',
      'noOfFollowings',
      'refreshToken',
    ];

    const filter = { email };

    const existingUser: any = await userDatabase.userDatabaseHelper.getOne(
      filter,
      projection
    );

    if (!existingUser) {
      throw errorUtilities.createError(
        `User with email ${email} does not exist`,
        404
      );
    }

    if (!existingUser.isVerified) {
      throw errorUtilities.createError(
        `${email} is not verified. Please request a new OTP to verify your account`,
        400
      );
    }

    if (existingUser.isBlacklisted) {
      throw errorUtilities.createError(
        `Account Blocked, contact admin on eventyzze@gmail.com`,
        400
      );
    }

    const verifyPassword = await generalHelpers.validatePassword(
      password,
      existingUser.password
    );

    if (!verifyPassword) {
      throw errorUtilities.createError("Incorrect Password", 400);
    }

    const tokenPayload = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = await generalHelpers.generateTokens(tokenPayload, "2h");
    const refreshToken = await generalHelpers.generateTokens(
      tokenPayload,
      "30d"
    );

    let mailMessage = "";
    let mailSubject = "";

    const dateDetails = generalHelpers.dateFormatter(new Date());

    if (!existingUser.refreshToken) {
      mailMessage = `Welcome to Eventyze ${
        existingUser.name ? existingUser.name : ""
      }! <br /><br />

          We're excited to have you on board. Eventyze is your go-to platform for discovering, organizing, and sharing amazing events. Whether you're attending or hosting, we're here to make your experience seamless and enjoyable. <br /> <br />

          If you have any questions or need help getting started, feel free to reach out to our support team. We're always here to assist you. <br /> <br />

          Let's make some unforgettable moments together!`;

      mailSubject = `Welcome to Eventyze ${
        existingUser.name ? existingUser.name : ""
      }`;
    } else {
      mailSubject = "Activity Detected on Your Account";
      mailMessage = `Hi ${
        existingUser.name ? existingUser.name : ""
      },
      There was a login to your account on ${dateDetails.date} by ${
        dateDetails.time
      }.<br /><br /> If you did not initiate this login, contact our support team to restrict your account. If it was you, please ignore.`;
    }

    existingUser.refreshToken = refreshToken;

    await existingUser.save();

    const userWithoutPassword =
      await userDatabase.userDatabaseHelper.extractUserDetails(existingUser);

    delete userWithoutPassword.refreshToken;

    await mailUtilities.sendMail(existingUser.email, mailMessage, mailSubject);

    responseHandler.statusCode = 200;

    responseHandler.message = "Welcome back" + `${existingUser.name ? existingUser.name : ""}`;

    responseHandler.data = {
      user: userWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return responseHandler;
  }
);

const userResendsOtpService = errorUtilities.withErrorHandling(
  async (resendPayload: Record<string, any>) => {

    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const { email } = resendPayload;

    const user:any = await userDatabase.userDatabaseHelper.getOne({email}, ['email', 'id', 'otp', 'isVerified'])

    if(!user){
      responseHandler.statusCode = 404;
      responseHandler.message = "User not found, please register";
      return responseHandler;
    }

    if(user.isVerified){
      responseHandler.statusCode = 400;
      responseHandler.message = "Account already verified, please login";
      return responseHandler;
    }


    const otpDetails = user.otp

    if(new Date(otpDetails.expiresAt) > new Date()){

      await mailUtilities.sendMail(
        email,
        `Welcome to Eventyze, your OTP is ${otpDetails.otp}, it expires soon`,
        "Eventyze OTP"
      );

      responseHandler.statusCode = 200;
      responseHandler.message = "OTP has been resent successfully, please check your mail";
      return responseHandler;

    }

    const { otp, expiresAt } = await generalHelpers.generateOtp();

    const otpId = v4();

    const otpPayload = {
      id: otpId,
      userId: user.id,
      otp,
      expiresAt,
      used: false,
    };

    const userUpdatePayload = {
      otp: {
      otp,
      otpId,
      expiresAt,
      }
    }

    const operations = [
      async (transaction: Transaction) => {
        await otpDatabaseHelpers.otpDatabaseHelper.create(
          otpPayload,
          transaction
        );
      },

      async (transaction: Transaction) => {
        await userDatabase.userDatabaseHelper.updateOne(
          { id: user.id },
          userUpdatePayload,
          transaction
        );
      },
    ]

    await performTransaction.performTransaction(operations);

     await mailUtilities.sendMail(
        email,
        `Welcome to Eventyze, your OTP is ${otp}, it expires in 10 minutes`,
        "Eventyze OTP"
      );

      responseHandler.statusCode = 200;
      responseHandler.message = "OTP has been resent successfully, please check your mail";
      return responseHandler;

  })



// const adminRegistrationService = errorUtilities.withErrorHandling(async (userPayload: Record<string, any>) => {

//     const responseHandler: ResponseDetails = {
//       statusCode: 0,
//       message: "",
//     };

//     const { name, email, password, phone } = userPayload;

//     if (!validator.isMobilePhone(phone, "en-NG")) {
//       throw errorUtilities.createError("Invalid phone number", 400);
//     }

//     if (!validator.isEmail(email)) {
//       throw errorUtilities.createError("Invalid email", 400);
//     }

//     const existingAdmin = await userDatabase.userDatabaseHelper.getOne({
//       email,
//     });
//     if (existingAdmin) {
//       throw errorUtilities.createError("Admin already exists with this email", 400);
//     }

//     const payload = {
//       name,
//       email,
//       password: await generalHelpers.hashPassword(password),
//       phone,
//       role: "Admin",
//       isVerified: true,
//     };

//     const newUser = await userDatabase.userDatabaseHelper.create(payload);

//     const userWithoutPassword = await userDatabase.userDatabaseHelper.extractUserDetails(newUser)

//     delete userWithoutPassword.refreshToken

//     responseHandler.statusCode = 201;
//     responseHandler.message = "Admin registered successfully";
//     responseHandler.data = userWithoutPassword;
//     return responseHandler;

// });

// const verifyUserAccount = errorUtilities.withErrorHandling(async (verificationToken: string): Promise<any> => {

//   const responseHandler: ResponseDetails = {
//     statusCode: 0,
//     message: "",
//   };

//   const verify: any = await generalHelpers.verifyRegistrationToken(verificationToken);

//   const user = await userDatabase.userDatabaseHelper.getOne({_id:verify.id});

//   if (!user) {
//     throw errorUtilities.createError("User not found", 404);
//   }

//   if (user.isVerified) {
//     throw errorUtilities.createError("User is already verified", 400);
//   }

//   await userDatabase.userDatabaseHelper.updateOne(
//     { _id:user._id }, { $set: { isVerified: true } }
//   )

//   responseHandler.statusCode = 200;
//   responseHandler.message = "User verified successfully";

//   return responseHandler;

// });

// const resendVerificationLinkService = errorUtilities.withErrorHandling(async (email: string): Promise<any> => {

//   const responseHandler: ResponseDetails = {
//     statusCode: 0,
//     message: "",
//   };

//   const user = await userDatabase.userDatabaseHelper.getOne({email});

//   if (!user) {
//     throw errorUtilities.createError(`${email} does not exist`, 404);
//   }

//   if (user.isVerified) {
//     throw errorUtilities.createError("User is already verified", 400);
//   }

//   const tokenPayload = {
//     id: user._id,
//     role: user.role,
//     email: user.email,
//   };

//   const verificationToken = await generalHelpers.generateTokens(
//     tokenPayload,
//     "1h"
//   );
//   await mailUtilities.sendMail(user.email, "Click the button below to verify your account", "PLEASE VERIFY YOUR ACCOUNT", `${USERS_APP_BASE_URL}/verification/${verificationToken}`);

//   const userWithoutPassword = await userDatabase.userDatabaseHelper.extractUserDetails(user)

//   delete userWithoutPassword.refreshToken

//   responseHandler.statusCode = 200;
//   responseHandler.message = "A verification mail has been sent to your account, please click on the link in the mail to verify your account. The link is valid for one hour only. Thank you.";
//   responseHandler.data = userWithoutPassword;
//   return responseHandler;

// })

export default {
  userRegisterWithEmailService,
  userVerifiesOtp,
  userLogin,
  userResendsOtpService,
  // adminRegistrationService,
  // userLogin,
  // verifyUserAccount,
  // resendVerificationLinkService
};
