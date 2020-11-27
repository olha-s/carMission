import { LOAD_NAVBAR } from "./actions";

const initialState = {
    data: [{
            textContent: "О нас",
            disabled: false,
            id: "navbar_about-us",
            sectionId: "#about-us"
        },
        {
            textContent: "Этапы работы",
            disabled: false,
            id: "navbar_work-stages",
            sectionId: "#work-stages"
        },
        {
            textContent: "Пакеты услуг",
            disabled: false,
            id: "navbar_service-packs",
            sectionId: "#service-packages"
        },
        {
            textContent: "Отзывы",
            disabled: false,
            id: "navbar_reviews",
            sectionId: "#reviews"
        },
        {
            textContent: "Блог",
            disabled: false,
            id: "navbar_blog",
            sectionId: "#blog"
        },
        {
            textContent: "Каталог авто",
            disabled: false,
            id: "navbar_car-catalog",
            sectionId: "#car-catalog"
        },
        {
            textContent: "Калькулятор",
            disabled: false,
            id: "navbar_calculator",
            sectionId: "#calculator"
        },
        {
            textContent: "Связаться с нами",
            disabled: false,
            id: "navbar_contacts",
            contacts: "+38(063)436-07-42, Киев, ул. Предславинская 35, корпус 21, офис 331",
            onClick: "openModal",
            sectionId: "#footer"
        }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NAVBAR:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export default reducer;

