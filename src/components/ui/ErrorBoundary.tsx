import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { hasError: boolean }

/**
 * Contains render/effect errors from a subtree (e.g. the WebGL 3D band) so a
 * failure on one device never blanks the whole page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Non-fatal: the fallback renders instead. Kept for debugging.
    if (typeof console !== 'undefined') console.warn('Contained UI error:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}
