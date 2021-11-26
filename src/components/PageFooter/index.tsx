import { GithubFilled } from '@ant-design/icons';
import { Container } from './styles';

export const PageFooter = () => {
  return (
    <Container>
      <div>
        developer: kuit, Rain7
      </div>
      <div>
        <a
          rel="noreferrer"
          href="https://github.com/Mania-Visualization-Project/mania-render-website"
          target="_blank"
        >
          Github: <GithubFilled />
        </a>
      </div>
    </Container>
  );
};
