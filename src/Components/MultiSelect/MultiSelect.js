import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MultiSelect = ({name, customOnBlur, onChange, values, options}) => {
    const animatedComponents = makeAnimated();

    const styleColors = {
        red: '#F65261',
        mid_grey: '#424242',
        white: '#FFFFFF',
        light_grey: '#555555'
    };

    const customStyles = {
        control: () => ({
            backgroundColor: styleColors.light_grey,
            color: styleColors.white,
            display: 'flex',
            borderRadius: '5px',
            padding: '5px 0px'
        }),
        multiValue: styles => {
            return {
                ...styles,
                backgroundColor: styleColors.mid_grey,
                borderRadius: '5px'
            };
        },
        multiValueLabel: styles => ({
            ...styles,
            color: styleColors.white,
            fontSize: '15px',
            opacity: '0.8',
            fontWeight: '400'
        }),
        clearIndicator: styles => ({
            ...styles,
            '&:hover': {
                color: styleColors.red
            }
        }),
        dropdownIndicator: styles => ({
            ...styles,
            '&:hover': {
                color: styleColors.red
            }
        }),
        option: provided => ({
            ...provided,
            backgroundColor: styleColors.light_grey,
            color: styleColors.white,
            borderRadius: '5px',
            '&:hover': {
                backgroundColor: styleColors.red
            }
        }),
        menu: provided => ({
            ...provided,
            backgroundColor: styleColors.light_grey
        })
    };

    const defaultValue = () => {
        let defaultValues = [];

        options.map(option => {
            values.map(value => {
                if (option.label === value)
                    defaultValues = [...defaultValues, option];
            });
        });

        return defaultValues;
    }


    return (
        <Select
            defaultValue={defaultValue()}
            onChange={values => onChange(values.map(value => value.label))}
            onBlur={() => customOnBlur}
            name={name}
            options={options}
            isMulti
            closeMenuOnSelect={false}
            styles={customStyles}
            components={animatedComponents}
        />
    );
}

export default MultiSelect;