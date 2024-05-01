const fetchRepositories = async (query: string, page: number, pageSize: number) => {
    const url = `${process.env.REACT_APP_GITHUB_BASE_URL}?q="${query}"&page=${page}&per_page=${pageSize}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data:  ${error}`);
    }
};

export default fetchRepositories;
