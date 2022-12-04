class Service {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    GetAll(page){};
    GetById(id){};
    Create(item){};
    Update(item){};
    Delete(id){};
}

export default Service;
