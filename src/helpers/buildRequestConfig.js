export default function RequestConfig(endpoint, method, headers, body) {
    return {
        url: `/${endpoint}`,
        method: method,
        headers: buildHeaders(),
        data: body
    };
}
const buildHeaders = () => {
    return {
        Authorization: `Bearer`
    };
};
//# sourceMappingURL=buildRequestConfig.js.map