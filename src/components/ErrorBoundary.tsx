import React from 'react'

export type ErrorProps = { error:  Error | null}
type Props = React.PropsWithChildren<{ fallbackRender: FallbackRender }>
type FallbackRender = (props: ErrorProps) => React.ReactElement

export class ErrorBoundary extends React.Component<Props, ErrorProps> {
    state = {
        error: null
    }

    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props
        if (error) {
            return fallbackRender({error})
        }
        return children
    }
}