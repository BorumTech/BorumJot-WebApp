export default class BorumRequest extends Request {
    commonHeaders: HeadersInit = {};
    private init: RequestInit = {};

    constructor(input: RequestInfo, init?: RequestInit) {
        super(input, init);
        this.init = {
            headers: this.commonHeaders
        };
    }

    static initialize(input: RequestInfo, init?: RequestInit) {
        return new BorumRequest(`https://api.borumtech.com/api/${input}`, init);
    }

    authorize(): BorumRequest {
        Object.assign(this.commonHeaders, {
            "authorization": `Basic ${getCookie("apiKey")}`
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

    async makeRequest(abortController: AbortController = new AbortController()): Promise<Response> {
        this.init = {
            ...this.init,
            headers: this.commonHeaders,
            signal: abortController.signal
        };

        // Abort the request if it takes too long to give a response
        // setTimeout(() => abortController.abort(), 20000)

        const response = await fetch(this.url, this.init);
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        }

        let { error } = await response.json();

        throw new Error(error.message);
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }