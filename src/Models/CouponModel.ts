export class CouponModel {
    public id?: number;
    public companyID?: number;
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
        companyID?: number,
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
        this.companyID = companyID;
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