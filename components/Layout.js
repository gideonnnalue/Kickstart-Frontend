import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout = ({children}) => {
  return (
    <Container>
      <Header/>
      {children}
      {/* <h1>I'm a footer</h1> */}
    </Container>
  )
}

export default Layout