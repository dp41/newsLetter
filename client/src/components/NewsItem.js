import React from 'react';

const NewsItem = React.memo(({ article }) => {
    if (!article) {
        return null;
    }

    const {
        title,
        description,
        url,
        urlToImage,
        publishedAt
    } = article;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <img
                src={urlToImage || '/placeholder.svg?height=200&width=300'}
                alt={title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.svg?height=200&width=300';
                }}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
                <div className="flex justify-between items-center">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Read more
                    </a>
                    <span className="text-sm text-gray-500">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
                </div>
            </div>
        </div>
    );
});

NewsItem.displayName = 'NewsItem';

export default NewsItem;

