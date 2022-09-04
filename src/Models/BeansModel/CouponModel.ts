import { CompanyModel } from "./CompanyModel";

export class CouponModel {
    public id?: number;
    public company?: CompanyModel;
    public category?: string;
    public title?: string;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public amount?: number;
    public price?: number;
    public imageUrl?: string;

    public constructor(
        id?: number,
        company?: CompanyModel,
        category?: string,
        title?: string,
        description?: string,
        startDate?: Date,
        endDate?: Date,
        amount?: number,
        price?: number,
        imageUrl?: string
    ) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}