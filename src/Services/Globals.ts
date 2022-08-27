class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        coupons: 'http://localhost:8080/admin/coupons',
        companies: 'http://localhost:8080/admin/companies'
        // image: "http://localhost:8080/api/cats/images/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        coupons: 'http://localhost:8080/admin/coupons',
        companies: 'http://localhost:8080/admin/companies'

        // image: "http://localhost:8080/api/cats/images/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;