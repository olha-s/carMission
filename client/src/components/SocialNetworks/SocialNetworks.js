import React, { useState, useEffect } from "react";
import SocialNetworksItem from "../SocialNetworksItem/SocialNetworksItem";
import axios from "axios";
import { facebook } from "./SocialNetworksIcons/facebook";
import { instagram } from "./SocialNetworksIcons/instagram";
import { telegram } from "./SocialNetworksIcons/telegram";
import { youtube } from "./SocialNetworksIcons/youtube";
import "./SocialNetworks.scss";

const SocialNetworks = ({
    className
}) => {
    const [items, setItems] = useState([]);
    const findIcon = (name) => {
        switch (name) {
            case "facebook":
                return facebook
            case "instagram":
                return instagram
            case "telegram":
                return telegram
            case "youtube":
                return youtube
            default:
                console.error(`Нет иконки для такой соц сети - ${name}`);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setItems(
        await axios("/api/social-networks")
                .then(res => res.data)
        )
    }

    const linkItems = items.map(e =>
        e.isEnabled ? <SocialNetworksItem
                src={findIcon(e.name)}
                listClassName={`${className}-item`}
                className={`${className}--${e.name}`}
                url={e.url}
                id={`${e.name}-link`}
                key={e._id || e.id}
            /> : console.log("wtf?")
    )
    return (
        <ul className={className}>
            {linkItems}
        </ul>
    );

};

export default SocialNetworks;
