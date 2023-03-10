import React from 'react'
import { JsonViewer } from '@textea/json-viewer'

import styles from './jsonView.module.scss'

export interface JsonViewProps {
    rootName?: string
    maxHeight?: string
    enableClipboard?: boolean
    displayDataTypes?: boolean
    quotesOnKeys?: boolean
    displayObjectSize?: boolean
    indentWidth?: number
    groupArraysAfterLength?: number
    data: unknown
}

const JsonView: React.FC<JsonViewProps> = (props) => {
    const { rootName, enableClipboard, displayDataTypes, quotesOnKeys, displayObjectSize, indentWidth, groupArraysAfterLength, data } = props
    const maxHeight = props.maxHeight !== null && props.maxHeight !== undefined ? props.maxHeight : '500px'
    let src = {}
    if (data !== null && data !== undefined && data !== '') {
        try {
            if (typeof data === 'string') {
                src = JSON.parse(data)
            } else {
                src = { ...data }
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error('JsonView data is not valid JSON', err.message)
                return null
            }
        }
    }

    return (
        <div data-testid='recordRawContainer' className={styles.recordRawContainer} style={{ maxHeight }}>
            <JsonViewer
                rootName={rootName}
                value={src}
                enableClipboard={enableClipboard}
                displayDataTypes={displayDataTypes}
                quotesOnKeys={quotesOnKeys}
                displayObjectSize={displayObjectSize}
                indentWidth={indentWidth}
                groupArraysAfterLength={groupArraysAfterLength}
            />
        </div>
    )
}

export default JsonView
