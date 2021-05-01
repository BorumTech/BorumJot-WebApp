import BorumRequest from "./BorumRequest";

export default class BorumJotRequest extends BorumRequest {
    static initialize(input: RequestInfo, init?: RequestInit) {
        // return new BorumJotRequest(`https://api.jot.borumtech.com/api/v1/${input}`, init);
        return new BorumJotRequest(`http://localhost:8200/v1/${input}`, init);
    }
}