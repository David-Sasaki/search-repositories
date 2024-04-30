const getFieldsFromJsonList = (jsonList: any[]) => {
    return jsonList.map((item) => ({
        createdAt: item["created_at"] || "",
        description: item["description"] || "",
        language: item["language"] || "",
        license: item["license"] === null ? "" : item["license"]["name"] || "",
        name: item["name"] || "",
        owner: item["owner"] == null ? "" : item["owner"]["login"] || "",
        score: item["score"] || "",
        size: item["size"] || "",
        url: item["url"] || "",
        watchersCount: item["watchers_count"] || "",
    }));
};

export default getFieldsFromJsonList;
