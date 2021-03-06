import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { CurrencySettings } from '../store/model';

interface QuantityProps {
  quantity: number;
  currency?: CurrencySettings;
}

type PriceProps = QuantityProps & TypographyProps;

export const Price: React.ComponentType<PriceProps> = (props: PriceProps) => {
  const { quantity, currency, ...typoProps } = props;
  return (
    <Typography {...typoProps} component="span">
      {formatNumber({ quantity, currency })}
    </Typography>
  );
};

function formatNumber({ quantity, currency }: QuantityProps): string {
  if (quantity === undefined) return '';

  let str =
    currency && typeof currency.decimals !== 'undefined'
      ? quantity.toFixed(currency.decimals)
      : String(quantity);
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!currency || !currency.text) {
    return str;
  }

  return currency.prepend
    ? `${currency.text} ${str}`
    : `${str} ${currency.text}`;
}
