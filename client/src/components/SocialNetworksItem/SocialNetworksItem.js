import React from "react";

const SocialNetworksItem = ({
    className, url, id, listClassName, src
}) => {
    return (
        <li className={listClassName}>
            <a className={className} href={url} id={id} target="_blank" rel="noreferrer">
                {src()}
            </a>
        </li>
    );
};

export default SocialNetworksItem;
