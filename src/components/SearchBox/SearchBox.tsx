
import React, { useState } from 'react'
import { Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import styles from './SearchBox.module.scss'

export interface SearchBoxMenuItem {
    label: string
    value: string[]
    active?: boolean
}

export interface SearchBoxProps {
    value?: string
    placeholder?: string
    className?: string
    ariaLabel?: string
    menuItems?: SearchBoxMenuItem[]
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeMenu?: (menuIndex: number) => void
    onClick?: () => void
    onEnter?: () => void
}

const SearchBox: React.FC<SearchBoxProps> = (props: SearchBoxProps) => {
    const { menuItems = [], onChangeMenu } = props
    const searchInputRef = React.createRef<HTMLInputElement>()
    const [selected, setSelected] = useState<number>(0)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            props.onEnter?.()
        }
    }
    const handleSelect = (e: any): void => {
        setSelected(+e)
        if (searchInputRef.current != null) {
            searchInputRef.current.focus()
        }
        if (onChangeMenu !== null && onChangeMenu !== undefined) {
            onChangeMenu(+e)
        }
    }
    const menuElements = props?.menuItems?.map((item, idex) => {
        const active = selected === idex
        return (
            <Dropdown.Item
                key={`item-${item.label}`}
                eventKey={idex}
                active={active}
            >
                {item?.label}
            </Dropdown.Item>
        )
    })
    return (
        <div className={`${styles.searchBox} ${props.className?.toString()}`}>
            <InputGroup onKeyDown={handleKeyDown}>
                {menuItems.length > 0 &&
                    <DropdownButton
                        variant="info"
                        title={menuItems[selected]?.label}
                        data-testid="searchBoxDropdown"
                        id="searchBoxDropdown"
                        onSelect={handleSelect}
                    >
                        {menuElements}
                    </DropdownButton>}
                <Form.Control
                    value={props.value}
                    placeholder={props.placeholder}
                    aria-label={props.ariaLabel}
                    className={styles.searchInputContainer}
                    onChange={props.onChange}
                    ref={searchInputRef}
                />
                <InputGroup.Text className={styles.searchActionContainer} onClick={props.onClick} tabIndex={0} data-testid="action-icon-container">
                    <FaSearch />
                </InputGroup.Text>
            </InputGroup>
        </div>
    )
}

export default SearchBox
