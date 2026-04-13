"use client"
import useSWR from "swr";

async function fetchAPI(key) {
    const response = await fetch(key);
    const responseBody = await response.json();
    return responseBody;
}


export default function StatusPage() {
    return (
        <>
        <h1>Status</h1>
        <UpdatedAt/>
        <Dependencies/>
        </>
    );
}

function UpdatedAt() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000
    });

    let updatedAtText = "Loading...";

    if (!isLoading && data) {
        updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    }

    return <div>Last Update: {updatedAtText}</div>
}

function Dependencies() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
        revalidateOnMount: true
    });

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    return (
            <>
                <h3>Database</h3>
                <div>Version: {data.dependencies.database.version}</div>
                <div>Opened connections: {data.dependencies.database.opened_connections}</div>
                <div>Max connections: {data.dependencies.database.max_connections}</div>
            </>
        );
}