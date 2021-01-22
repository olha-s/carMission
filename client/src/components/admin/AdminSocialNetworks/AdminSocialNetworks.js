import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../generalComponents/Button/Button";
import "./AdminSocialNetworks.scss";
import { getSocialNetworks } from "../../../store/socialNetworks/selectors";
import AdminSocialNetworksItem from "../AdminSocialNetworksItem/AdminSocialNetworksItem";


const AdminSocialNetworks = () => {
    const [items, setItems] = useState([]);
    const data = useSelector(getSocialNetworks);
    const mainClassName = "admin-networks";

    const createNewItem = () => (
        <AdminSocialNetworksItem
            isEnabled={true}
            name=""
            namePlaceholder="Введите название соцсети"
            url=""
            urlPlaceholder="Введите ссылку на соцсеть"
            iconSrc=""
            iconSrcPlaceholder="Укажите адрес к иконке соцсети"
            className={mainClassName}
            isNew
            key={Date.now()}
        />
    )

    useEffect(() => {
    
        const socNetList = () => data.map((i, index) => (
            <AdminSocialNetworksItem
                isEnabled = {i.isEnabled}
                name = {i.name}
                id = {i.id || i._id}
                url = {i.url}
                iconSrc = {i.iconSrc}
                className={mainClassName}
                key = {index}
            />
        ))

        setItems(socNetList());
    
    }, [data])

    const addNewItem = () => {
        const form = createNewItem();
    
        const updated = items.map((i) => i);
        updated.push(form);
        setItems(updated);
    };


    return (
        <div className={mainClassName}>
            <SectionHeading className={`${mainClassName}__main-header`} text="Социальные сети" />
            <div className={`${mainClassName}__menu`}>{items}</div>
            <Button className={`${mainClassName}__add-btn`} text="+" onClick={addNewItem} />
        </div>
    );
};

export default AdminSocialNetworks;