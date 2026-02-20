import CopyToClipboard from 'react-copy-to-clipboard';
import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { useContext } from 'react';
import { MainContext } from '../main-context';
import { UrlItem } from '../types';
import { useMediaQuery } from 'react-responsive';
import media from 'styled-media-query';
import copySvgFile from '../../public/copy-icon.svg';

const OriginalUrl = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 10px; /* Space between URL and short URL */
  flex: 1;
  ${media.lessThan('medium')`
    flex-basis: 95%;
    max-width: 90%;
    white-space: nowrap;
  `}
`;

const ShortUrlLink = styled.a`
  font-family: monospace; /* Use a monospace font for clarity */
  margin-right: 10px; /* Space between short URL and buttons */
  font-size: 1.5em;
  flex-basis: 25%;
  ${media.lessThan('medium')`
    flex-basis: 95%;
    max-width: 90%;
    white-space: nowrap;
  `}
`;

const ResultShortLinkContainer = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.45);
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 1em;
  width: 100%;
  flex-basis: 95%;
  position: relative;
  > a {
    font-size: 0.7em;
  }
  @media (max-width: 768px) {
    flex-flow: column;
    align-items: flex-start;
    flex-basis: 100%;
  }
`;

const ActionsContainer = styled.div`
  ${media.lessThan('medium')`
  bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  right: 4px;
  top: 10px;
  `}
`;

const CopyIcon = styled.div`
  background-image: url(${copySvgFile});
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  flex: 1;
`;

interface IUrlItems {
  items: UrlItem[];
}

export const UrlItems = ({ items }: IUrlItems) => {
  const { deleteItem } = useContext(MainContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const CopyButton = ({ shortUrl }: { shortUrl: string }) => {
    return (
      <CopyToClipboard text={shortUrl}>
        {isTabletOrMobile ? (
          <CopyIcon />
        ) : (
          <span
            style={{
              cursor: 'pointer',
            }}
          >
            copy
          </span>
        )}
      </CopyToClipboard>
    );
  };

  return items?.map((item) => {
    return (
      <div
        key={item.shortCode}
        style={{ display: 'flex', marginBottom: '16px', width: '100%' }}
      >
        <ResultShortLinkContainer>
          <OriginalUrl>{item?.originalUrl}</OriginalUrl>
          <ShortUrlLink
            href={item.shortUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'flex',
              justifyContent: 'right',
              flex: 1,
              fontSize: '1em',
            }}
          >
            {item.shortUrl}
          </ShortUrlLink>
          <ActionsContainer>
            <CopyButton shortUrl={item.shortUrl} />
          </ActionsContainer>
        </ResultShortLinkContainer>
        {!isTabletOrMobile && (
          <div
            onClick={() => deleteItem(item.shortCode)}
            style={{ padding: '1em', cursor: 'pointer' }}
          >
            x
          </div>
        )}
      </div>
    );
  });
};
