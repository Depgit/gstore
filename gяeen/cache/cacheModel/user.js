class CacheUser {
    constructor() {
        this.Id = null;
        this.Phone = null;
        this.Email = null;
        this.Name = null;
        this.Type = null;
    }

    fromString(s) {
        try {
            const parsedData = JSON.parse(s);
            if (parsedData.id !== undefined) {
                this.Id = parsedData.id;
            }
            if (parsedData.phone !== undefined) {
                this.Phone = parsedData.phone;
            }
            if (parsedData.email !== undefined) {
                this.Email = parsedData.email;
            }
            if (parsedData.name !== undefined) {
                this.Name = parsedData.name;
            }
            if (parsedData.type !== undefined) {
                this.Type = parsedData.type;
            }
        } catch (error) {
            return error;
        }
        return null;
    }

    toString() {
        try {
            const val = JSON.stringify({
                id: this.Id,
                phone: this.Phone,
                email: this.Email,
                name: this.Name,
                type: this.Type
            });
            return val;
        } catch (error) {
            return error;
        }
    }
}

export default CacheUser;
