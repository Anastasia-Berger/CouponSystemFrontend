class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        coupons: 'http://localhost:9090/api/admin/coupons',
        admin: "http://localhost:9090/api/admin",
        companies: "http://localhost:9090/api/companies",
        customers: "http://localhost:9090/api/customers",
        login: "http://localhost:9090/api/login"

        // image: "http://localhost:8080/api/cats/images/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        coupons: 'http://localhost:9090/api/admin/coupons',

        admin: "http://localhost:9090/api/admin",
        companies: "http://localhost:9090/api/companies",
        customers: "http://localhost:9090/api/customers",
        login: "http://localhost:9090/api/login"

        // image: "http://localhost:8080/api/cats/images/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;