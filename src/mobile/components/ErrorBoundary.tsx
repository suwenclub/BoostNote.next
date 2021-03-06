import React from 'react'
import TopBarLayout from './layouts/TopBarLayout'
import GlobalStyle from '../../components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import styled from '../../lib/styled'
import { darkTheme } from '../../themes/dark'
import { SectionPrimaryButton } from '../../components/PreferencesModal/styled'

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
`
interface ErrorBoundaryState {
  errorStack: string | null
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  state = {
    errorStack: null
  }

  static getDerivedStateFromError(error: Error) {
    return {
      errorStack: error.stack
    }
  }

  handleError = (event: ErrorEvent) => {
    this.setState({
      errorStack: event.error.stack!
    })
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError)
  }

  reset = () => {
    this.setState({
      errorStack: null
    })
  }

  render() {
    if (this.state.errorStack != null) {
      return (
        <ThemeProvider theme={darkTheme}>
          <AppContainer>
            <GlobalStyle />
            <TopBarLayout title='Error'>
              <div style={{ padding: '15px' }}>
                <h1>Error!</h1>
                <p>Please click button</p>
                <SectionPrimaryButton onClick={this.reset}>
                  Restart App
                </SectionPrimaryButton>
                <pre>
                  <code>{this.state.errorStack}</code>
                </pre>
              </div>
            </TopBarLayout>
          </AppContainer>
        </ThemeProvider>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
