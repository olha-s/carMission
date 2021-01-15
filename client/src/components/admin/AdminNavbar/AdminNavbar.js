import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getNavbarData } from "../../../store/navbar/selectors";
import AdminNavarItem from "../AdminNavbarItem/AdminNavarItem";
import SectionHeading from "../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../generalComponents/Button/Button";
import "./AdminNavbar.scss";


const AdminNavbar = () => {
    const [navbarList, setNavbarList] = useState([]);
    const [sectionsNumberInNavbar, setSectionsNumberInNavbar] = useState([]);
    const [sectionsLinkArr, setSectionsLinkArr] = useState([])

    const navbarData = useSelector(getNavbarData);
    const mainClassName = "admin-navbar";
    const nextNum = navbarData.length + 1;
    const sortByNumberInNavbar = (arr) => arr.sort((a, b) => +a.numberInNavbar > +b.numberInNavbar ? 1 : -1);

    const allNumbersInNavbar = (arr) => arr.map((e) => ({ value: e.numberInNavbar, label: e.numberInNavbar}));
    const sectionsLink = (arr) => arr.map((e) => ({ value: e.sectionId, label: e.sectionId})).filter(e => e.value !== undefined)

    const createNewFormItem = () => {
        const newItemNumber = { value: nextNum, label: nextNum};
        sectionsNumberInNavbar.push(newItemNumber);
        return <AdminNavarItem
                className={mainClassName}
                textContentPlaceholder="Введите название секцию"
                textContent=""
                headerLocationPlaceholder="Выберите расположение"
                headerLocation=""
                footerLocationPlaceholder="Выберите расположение"
                footerLocation=""
                numberInNavbar={nextNum}
                sectionIdPlaceholder="Выберите секций"
                sectionId=""
                sectionsArr={sectionsLinkArr}
                sectionsNumberInNavbar={sectionsNumberInNavbar}
                isNew
                key={Date.now()}
            />
    }

    useEffect(() => {
        sortByNumberInNavbar(navbarData);

        const numbers = allNumbersInNavbar(navbarData);
        const links = sectionsLink(navbarData)

        const mapFormToRender = () => {
            return navbarData.map(({ textContent, contacts, footerLocation, headerLocation, _id, id, sectionId, numberInNavbar, disabled }) => (
                <AdminNavarItem
                    className={mainClassName}
                    textContent={textContent}
                    headerLocation={headerLocation}
                    footerLocation={footerLocation}
                    contacts={contacts}
                    numberInNavbar={numberInNavbar}
                    sectionId={sectionId}
                    disabled={disabled}
                    id={id || _id}
                    key={_id}

                    sectionsArr={links}
                    sectionsNumberInNavbar={numbers}
                />
            ));
        };
        setSectionsLinkArr(links)
        setSectionsNumberInNavbar(numbers);
        setNavbarList(mapFormToRender());
    }, [navbarData]);
    
    const handleAddItem = () => {
        const form = createNewFormItem();
    
        const updated = navbarList.map((i) => i);
        updated.push(form);
        setNavbarList(updated);
        setSectionsNumberInNavbar(allNumbersInNavbar(updated));
    };
    
    return (
        <div className={mainClassName}>
            <SectionHeading className={`${mainClassName}__main-header`} text="Пункты меню" />
            <div className={`${mainClassName}__menu`}>{navbarList}</div>
            <Button className={`${mainClassName}__add-btn`} text="+" onClick={handleAddItem} />
        </div>
    );
};

export default AdminNavbar;