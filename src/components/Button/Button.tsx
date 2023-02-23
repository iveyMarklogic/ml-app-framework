import React from "react";
import {Button as BootstrapButton} from 'react-bootstrap';

import styles from "./Button.module.scss";

export interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <div>
            <BootstrapButton
                variant={props.variant}
                onClick={props.onClick}>
                {props.label}
            </BootstrapButton>
        </div>
    );
};

export default Button;