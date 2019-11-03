import NextLink, { LinkProps } from 'next/link';
import { Page } from '../store/model';
import { useDispatch } from 'react-redux';
import { changePage } from '../store/actions/nav';

export interface Props extends LinkProps {
  page: Page;
}

export function Link(props: Props) {
  const { page, ...linkProps } = props;
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(changePage(page));
  }

  return (
    <span onClick={handleClick}>
      <NextLink {...linkProps} />
    </span>
  );
}
