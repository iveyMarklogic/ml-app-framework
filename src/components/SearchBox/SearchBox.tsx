
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import styles from './SearchBox.module.scss'
import myImage from '../../assets/img/test.jpg'

export interface SearchBoxProps {
  value?: string
  placeholder?: string
  className?: string
  ariaLabel?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  onEnter?: () => void
}

const SearchBox: React.FC<SearchBoxProps> = (props: SearchBoxProps) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            props.onEnter?.()
        }
    }
    return (
        <div className={`${styles.searchBox} ${props.className?.toString()}`}>
            <InputGroup onKeyDown={handleKeyDown}>
                <Form.Control
                    value={props.value}
                    placeholder={props.placeholder}
                    aria-label={props.ariaLabel}
                    className={styles.searchInputContainer}
                    onChange={props.onChange}
                />
                <InputGroup.Text className={styles.searchActionContainer} onClick={props.onClick} tabIndex={0} data-testid="action-icon-container">
                    <FaSearch onClick={props.onClick} />
                </InputGroup.Text>
            </InputGroup>
            <img src={myImage} alt="My Image" />
        </div>
    )
}

export default SearchBox
