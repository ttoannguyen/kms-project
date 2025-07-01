import React, { useEffect, useState } from 'react';
import './DataversePage.css';

const DataversePage: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/dataverse') // Gọi endpoint proxy
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi tải nội dung Dataverse');
                }
                return response.text();
            })
            .then(data => setContent(data))
            .catch(error => {
                console.error('Lỗi:', error);
                setError('Không thể tải nội dung Dataverse');
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dataverse-container">
            <h2>Dataverse Content</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default DataversePage;