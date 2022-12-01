class Globals {
}

class DevelopmentGlobals extends Globals {
    public urls = {
        coupons: 'http://localhost:9090/api/allCoupons/',
        admin: 'http://localhost:9090/api/admin',
        companies: 'http://localhost:9090/api/companies',

        customers: 'http://localhost:9090/api/customers',

        login: 'http://localhost:9090/api/login',
        register: 'http://localhost:9090/api/register',
        // users: '%PUBLIC_URL%/images/users/',
        // astronaut: '%PUBLIC_URL%/images/Astronaut/jpg/',
        // categories: '%PUBLIC_URL%/images/categories/jpg/'
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        coupons: "",
        admin: '/admin',
        companies: '/companies',
        customers: '/customers',
        login: '/login',
        register: '/register',
        // users: '%PUBLIC_URL%/Assets/Users/',
        // astronaut: '%PUBLIC_URL%/Assets/Astronaut/jpg/',
        // categories: '%PUBLIC_URL%/Assets/Categories/jpg/'
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;