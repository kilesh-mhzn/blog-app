import { useState } from 'react';

export function ReadMore({ children = 100 }) {
    const text = children;
    const [readMore, setReadMore] = useState(false);
    const result = readMore ? text : text.slice(0, 50);
    function toggle() {
        setReadMore(!readMore);
    }

    return (
        <>
            <p>
                {result}
                {text.length > 50 && (
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={toggle}
                    >
                        {readMore ? ' Read Less' : ' ... Read More'}
                    </span>
                )}
            </p>
        </>
    );
}

export function TextEllipsis({ children = 100 }) {
    const text = children;
    const result = text.length > 50 ? text.slice(0, 50) + '...' : text;
    return (
        <>
            <p>{result}</p>
        </>
    );
}

export function TagsControl({ children }) {
    const tags = children;
    const displayTags = 4;
    // const result = tags.length>displayTags? tags.slice(0,2)+`...+${(tags.length-displayTags)} more`:tags
    const result = tags.length > displayTags && tags.slice(0, displayTags);
    return (
        <>
            <p className="space-x-2">
                {tags.length > displayTags ? (
                    <>
                        {result.map((tag, index) => {
                            return (
                                <span
                                    key={index}
                                    className={
                                        'rounded bg-gray-200 text-slate-900 p-1'
                                    }
                                >
                                    {tag}
                                </span>
                            );
                        })}
                        <span className="text-slate-500 text-sm">
                            +{tags.length - displayTags} more
                        </span>
                    </>
                ) : (
                    tags.map((tag, index) => {
                        return (
                            <span
                                key={index}
                                className="rounded bg-gray-200 text-slate-900 p-1"
                            >
                                {tag}
                            </span>
                        );
                    })
                )}
            </p>
        </>
    );
}
