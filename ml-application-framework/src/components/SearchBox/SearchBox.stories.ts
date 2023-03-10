import type { Meta, StoryObj } from '@storybook/react'

import SearchBox from './SearchBox'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'ML-Application-Framework/SearchBox',
    component: SearchBox,
    tags: ['autodocs'],
    argTypes: {
        menuVariant: {
            defaultValue: { summary: '"primary"' }
        },
        rightButtonVariant: {
            defaultValue: { summary: '"default"' }
        }

    }
} satisfies Meta<typeof SearchBox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Actions: Story = {
    args: {
        menuItems: [
            {
                value: ['person', 'organization'],
                label: 'All Entities'
            },
            {
                value: ['person'],
                label: 'Person'
            },
            {
                value: ['organization'],
                label: 'Organization'
            }
        ]
    }
}
