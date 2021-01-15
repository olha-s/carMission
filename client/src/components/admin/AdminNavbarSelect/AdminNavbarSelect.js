import React from "react";
import Select from "react-select";

const AdminNavbarSelect = ({
    onChange, options, value, className
}) => {
    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    }

    return (
        <Select
            className={className}
            value={defaultValue(options, value)}
            onChange={value => {
                onChange(value)
            }} options={options}
        />
    );
};

export default AdminNavbarSelect;