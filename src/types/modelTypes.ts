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
    isValidated: boolean;
    isBlacklisted: boolean;
    noOfFollowers: number;
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


export interface MovieAttributes {
    id: string;
    title: string;
    publishedDate: number;
    description: string;
    moviePoster: string;
    movieProducer: string;
    ownerId: string;
    genre: string;
  }