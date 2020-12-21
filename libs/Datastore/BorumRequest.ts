export default class BorumRequest extends Request {
    private commonHeaders: HeadersInit = {};
    private init: RequestInit = {};

    constructor(input: RequestInfo, init?: RequestInit) {
        super(input, init);
        this.init = {
            headers: this.commonHeaders
        };
    }

    static initialize(input: RequestInfo, init?: RequestInit) {
        return new BorumRequest(`https://api.bforborum.com/api/${input}`, init);
    }

    authorize(): BorumRequest {
        Object.assign(this.commonHeaders, {
            "authorization": `Basic ${localStorage.getItem("userApiKey")}`
        })

        return this;
    }

    post(body: string): BorumRequest {
        Object.assign(this.init, {
            body,
            method: "POST"
        });
        Object.assign(this.commonHeaders, {
            "content-type": "application/x-www-form-urlencoded"
        })

        return this;
    }

    put(body: string): BorumRequest {
        Object.assign(this.init, {
            body,
            method: "PUT"
        });
        Object.assign(this.headers, {
            "content-type": "application/x-www-form-urlencoded"
        })

        return this;
    }

    delete(body: string): BorumRequest {
        Object.assign(this.init, {
            body,
            method: "DELETE"
        });
        Object.assign(this.headers, {
            "content-type": "application/x-www-form-urlencoded"
        })

        return this;
    }

    makeCancelable(promise: Promise<any>) {
        let hasCanceled_ = false;

        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then(
                (val) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
                (error) =>
                    hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
            );
        });

        return {
            promise: wrappedPromise,
            cancel() {
                hasCanceled_ = true;
            },
        };
    };

    async makeRequest(): Promise<Response> {
        this.init = {
            ...this.init,
            headers: this.commonHeaders
        };

        const response = await fetch(this.url, this.init);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }
}