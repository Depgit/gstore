const PaymentGatewayOrderStatus = {
    Created: "created",
    InProgress: "in_progress",
    Processed: "processed"
};

class Filter {
    constructor() {
        this.from = null;
        this.to = null;
        this.count = null;
        this.skip = null;
        this.authorized = null;
        this.receipt = null;
    }
}

class PaymentGatewayOrder {
    constructor() {
        this.id = null;
        this.amount = null;
        this.amountPaid = null;
        this.amountDue = null;
        this.currency = null;
        this.receipt = null;
        this.details = null;
        this.status = null;
        this.attempts = null;
        this.createdAt = null;
    }
}

class PaymentGatewayOrderRequest {
    constructor() {
        this.amount = null;
        this.currency = null;
        this.receipt = null;
    }
}

class PaymentGatewayPayment {
    constructor() {
        this.id = null;
        this.orderId = null;
        this.amount = null;
        this.currency = null;
        this.receipt = null;
        this.details = null;
        this.captured = null;
        this.status = null;
        this.attempts = null;
        this.createdAt = null;
    }
}

class PaymentGateway {
    init() {
        throw new Error("init method not implemented");
    }

    getName() {
        throw new Error("getName method not implemented");
    }

    async createOrder(p) {
        throw new Error("createOrder method not implemented");
    }

    async fetchOrders(f) {
        throw new Error("fetchOrders method not implemented");
    }

    async fetchOrder(orderId) {
        throw new Error("fetchOrder method not implemented");
    }

    async fetchPaymentsForOrder(orderId) {
        throw new Error("fetchPaymentsForOrder method not implemented");
    }

    async capturePayment(orderId, amount, currency) {
        throw new Error("capturePayment method not implemented");
    }

    async fetchPayment(paymentId) {
        throw new Error("fetchPayment method not implemented");
    }
}

export default {
    PaymentGatewayOrderStatus,
    Filter,
    PaymentGatewayOrder,
    PaymentGatewayOrderRequest,
    PaymentGatewayPayment,
    PaymentGateway
};
