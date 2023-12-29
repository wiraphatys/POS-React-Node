const config = {
    api_path: "http://localhost:3000",
    token_name: "pos_token",
    getHeaders: () => {
        const token = localStorage.getItem("pos_token");
        return {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
    }
};

export default config;