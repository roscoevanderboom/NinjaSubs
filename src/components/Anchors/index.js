import React from "react";

export default (props) => {
    const { text, href } = props;
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={href}>
            {text}
        </a>
    )
}