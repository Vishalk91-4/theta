import React from "react";

interface Field {
    label: string;
    name: string;
    type: string;
    value: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: { code: string; name: string }[]; // For select type inputs
    id?: string;
}

interface FormFieldProps {
    fields?: Field[];
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ fields, children, style, className }) => (
    <fieldset style={style} className={className}>
        {fields
            ? fields.map((field, index) => (
                <div key={index} id={field.id}>
                    <label>{field.label}</label>
                    {field.type === "select" ? (
                        <select id="fieldSelect" name={field.name} value={field.value} onChange={field.onChange} required={field.required}>
                            <option value="" disabled></option>
                            {field.options?.map((option) => (
                                <option key={option.code} value={option.code}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            required={field.required}
                        />
                    )}
                </div>
            ))
            : children}
    </fieldset>
);

export default FormField;