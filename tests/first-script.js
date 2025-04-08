import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
    stages: [{ target: 20, duration: '1m' }],
    thresholds: {
        'http_req_duration': ['p(90)<750', 'p(99)<1500'],
    },
};

export default function () {
    const resp = http.get('https://gorest.co.in/public/v2/users');
    check(resp, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}

    export function handleSummary(data) {
        return {
            "./reports/result.html": htmlReport(data),
        };
}