import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

import styles from './button.module.scss'

export interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
    ariaLabel?: string
    dataTestId?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <div className={styles.buttonContainer}>
            <BootstrapButton
                data-testid="button"
                variant={props.variant}
                aria-label={props.ariaLabel}
                onClick={props.onClick}
                style={props.style}
            >
                {props.label}
            </BootstrapButton>
        </div>
    )
}

export default Button
