import { memo, useContext } from 'react';
import { Container, Subtitle, Title, Wrapper } from './styles';
import { Form } from './components/Form';
import { AnimatedBackground } from './components/AnimatedBackground';
import { MainContext, MainProvider } from './main-context';

import { UrlItems } from './components/url-items';

const App = memo(() => {
  const { urlItems } = useContext(MainContext);

  return (
    <AnimatedBackground duration={3000}>
      <Container>
        <div>
          <Title>Shrinkle</Title>
          <Subtitle>Eliminate those long hard-to-remember links</Subtitle>
        </div>
        <Wrapper>
          <Form />
          <UrlItems items={urlItems} />
        </Wrapper>
      </Container>
    </AnimatedBackground>
  );
});

const AppWrapper: React.FC = () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  );
};

export default AppWrapper;
