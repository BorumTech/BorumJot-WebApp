import BorumRequest from "./BorumRequest";

export default class BorumJotRequest extends BorumRequest {
    static initialize(input: RequestInfo, init?: RequestInit) {
        if (window.location.hostname === "localhost") {
            return new BorumJotRequest(`http://localhost:8200/v1/${input}`, init);
        } else {
            return new BorumJotRequest(`https://api.jot.borumtech.com/v1/${input}`, init);
        }
    }
}