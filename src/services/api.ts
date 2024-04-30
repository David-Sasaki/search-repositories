const fetchRepositories = async (query: string, page: number, pageSize: number) => {
    console.log("fetching ... ", query, page, pageSize);
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
        console.error('Error fetching data: ', error);
        return null;
    }
};

export default fetchRepositories;
