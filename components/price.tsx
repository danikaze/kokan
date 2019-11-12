import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { CurrencySettings } from '../store/model';

interface QuantityProps {
  quantity: number;
  currency: CurrencySettings;
}

type PriceProps = QuantityProps & TypographyProps;

export const Price: React.ComponentType<PriceProps> = (props: PriceProps) => {
  const { quantity, currency, ...typoProps } = props;
  return (
    <Typography {...typoProps}>
      {formatNumber({ quantity, currency })}
    </Typography>
  );
};

function formatNumber({ quantity, currency }: QuantityProps): string {
  if (!quantity) return '';

  let str =
    typeof currency.decimals !== 'undefined'
      ? quantity.toFixed(currency.decimals)
      : String(quantity);
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!currency) {
    return str;
  }

  return currency.prepend
    ? `${currency.text} ${str}`
    : `${str} ${currency.text}`;
}
