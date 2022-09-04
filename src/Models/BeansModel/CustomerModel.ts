import { CouponModel } from "./CouponModel";

export class CustomerModel {
    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public password?: string;
    public coupons?: CouponModel[];
    public imageUrl?: string;
  
    public constructor(
      id?: number,
      firstName?: string,
      lastName?: string,
      email?: string,
      password?: string,
      coupons?: CouponModel[],
      imageUrl?: string
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.coupons = coupons;
      this.imageUrl = imageUrl;
    }
  }