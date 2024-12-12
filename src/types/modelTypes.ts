//================= USER ================//
export interface UserAttributes {
    id: string;
    phone: string;
    fullName: string;
    userName: string;
    email: string;
    password:string;
    role: string;
    refreshToken: string;
    numberOfEventsHosted: number;
    numberOfEventsAttended: number;
    bio: string;
    userImage: string;
    country: string;
    subscriptionPlan: string;
    accountStatus: string;
    interests: any;
    isVerified: boolean;
    isBlacklisted: boolean;
    noOfFollowers: number;
    otp: string;
}

export enum Roles {
    User = "User",
    Host = "Host",
    SuperAdmin = "SuperAdmin",
    FinanceAdmin = "FinanceAdmin",
    PeopleAdmin = "PeopleAdmin",
    ProcessAdmin = "ProcessAdmin"
}

export enum SubscriptionPlans {
    Free = "Free",
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
}

export enum AccountStatus {
    Active = "Active",
    Frozen = "Frozen",
    Deactivated = "Deactivated"
}



//===========OTP=============//

export interface OtpAttributes {
    id: string
    userId: string;
    otp: string;
    expiresAt: Date
    used: boolean
  }


//=============== WALLETS ================//

export interface WalletAttributes {
    id: string
    userId: string;
    totalBalance: number;
  }

//=============== FOLLOWERS && FOLLOWINGS =============//

export interface FollowerAttributes {
    id: string;
    userId: string;
    followers: string[];
}

export interface FollowingAttributes {
    id: string;
    userId: string;
    followings: string[];
}