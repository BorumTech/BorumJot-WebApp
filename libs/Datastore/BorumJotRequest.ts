import BorumRequest from "./BorumRequest";

export default class BorumJotRequest extends BorumRequest {
    static initialize(input: RequestInfo, init?: RequestInit) {
        return new BorumJotRequest(`https://api.jot.bforborum.com/api/v1/${input}`, init);
    }
}