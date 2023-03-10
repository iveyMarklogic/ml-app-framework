import React from 'react'
import { render } from '@testing-library/react'
import JsonView from './JsonView'

describe('JsonView', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        })
    })
    test('Check renders RecordRaw component', () => {
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
        const { getByTestId, getByText } = render(
            <JsonView rootName={'results'}
                maxHeight={'480px'}
                enableClipboard={false}
                displayDataTypes={false}
                quotesOnKeys={false}
                displayObjectSize={false}
                indentWidth={5}
                groupArraysAfterLength={10}
                data={data} />)
        const recordRawContainer = getByTestId('recordRawContainer')
        expect(recordRawContainer).toBeInTheDocument()
        expect(getByText('10054')).toBeInTheDocument()
    })
    test('Check invalid JSON data', () => {
        const data = '<p>Wrong data</p>'

        const { queryByTestId } = render(
            <JsonView rootName={'results'}
                maxHeight={'480px'}
                enableClipboard={false}
                displayDataTypes={false}
                quotesOnKeys={false}
                displayObjectSize={false}
                indentWidth={5}
                groupArraysAfterLength={10}
                data={data} />)
        const nonExistentElement = queryByTestId('recordRawContainer')

        expect(nonExistentElement).toBeNull()
    })
})
