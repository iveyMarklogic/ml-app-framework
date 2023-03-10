import type { Meta, StoryObj } from '@storybook/react'

import JsonView from './JsonView'

const data = {
    personId: 10054,
    nameGroup: {
        givenName: {
            value: 'Uri'
        },
        surname: {
            value: 'Capponeer'
        }
    },
    emails: {
        email: {
            value: 'twhannel0@toplist.cz',
            classification: 'C',
            restricted: false
        }
    },
    phone: '803-271-2715',
    ssn: {
        value: '172-35-0546',
        classification: '(S)'
    },
    images: {
        image: {
            url: 'https://cdn1.marklogic.com/wp-content/uploads/2021/02/1612313387205.jpeg',
            source: {
                name: 'New York Times',
                ts: '2020-01-19T19:18:19Z',
                uploadedBy: 'fshine0'
            }
        }
    },
    addresses: {
        address: [
            {
                street: '09537 Becker Junction',
                city: 'Evanston',
                state: 'IL',
                postal: 60208,
                country: 'United States',
                latitude: 42.0586,
                longitude: -87.6845
            },
            {
                street: '09537 Becker Junction',
                city: 'Kalamazoo',
                state: 'MI',
                postal: 49006,
                country: 'United States',
                latitude: 42.2922,
                longitude: -85.633
            },
            {
                street: '09537 Becker Junction',
                city: 'Odessa',
                state: 'TX',
                postal: 79769,
                country: 'United States',
                latitude: 31.7466,
                longitude: -102.567
            }
        ]
    }
}
const meta = {
    title: 'ML-Application-Framework/JsonView',
    component: JsonView,
    tags: ['autodocs'],
    argTypes: {
        data: {
            defaultValue: { summary: '{}' },
            description: 'The JSON data to display.'
        },
        rootName: {
            defaultValue: { summary: 'root' },
            description: 'Name of the root node.'
        },
        maxHeight: {
            defaultValue: { summary: '500px' },
            description: 'Maximum height of the container. Content that exceeds this height will scroll.'
        },
        enableClipboard: {
            defaultValue: { summary: 'true' },
            description: 'Show clickable icons for copying object and array data.'
        },
        displayDataTypes: {
            defaultValue: { summary: 'true' },
            description: 'Show data types as prefixes to values.'
        },
        quotesOnKeys: {
            defaultValue: { summary: 'true' },
            description: 'Include quotes around keys (eg. "name": vs. name:).'
        },
        displayObjectSize: {
            defaultValue: { summary: 'true' },
            description: 'Show size of objects and arrays.'
        },
        indentWidth: {
            defaultValue: { summary: '4' },
            description: 'Indent width for nested objects.'
        },
        groupArraysAfterLength: {
            defaultValue: { summary: '100' },
            description: ' Display array values in groups based on the value. Groups are displayed with bracket notation and can be expanded and collapsed by clicking the brackets.'
        }
    }
} satisfies Meta<typeof JsonView>
export default meta
type Story = StoryObj<typeof meta>

export const Actions: Story = {
    args: {
        data,
        rootName: 'person',
        maxHeight: '480px',
        enableClipboard: true,
        displayDataTypes: true,
        quotesOnKeys: true,
        displayObjectSize: true,
        indentWidth: 4,
        groupArraysAfterLength: 100
    }
}
