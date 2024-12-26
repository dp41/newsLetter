import React, { useMemo } from 'react';
import NewsItem from './NewsItem';

const NewsList = React.memo(({ articles }) => {
    const memoizedArticles = useMemo(() => articles, [articles]);

    if (!memoizedArticles || memoizedArticles.length === 0) {
        return <div className="text-center text-xl mt-8">No articles available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memoizedArticles.map((article) => (
                <NewsItem
                    key={article.url || `article-${article.title}-${article.publishedAt}`}
                    article={article}
                />
            ))}
        </div>
    );
});

NewsList.displayName = 'NewsList';

export default NewsList;

