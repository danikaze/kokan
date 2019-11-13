import React, { useState } from 'react';
import { TextField, Button, ButtonGroup } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import { getIsGpsAllowed } from '../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addOrEditExpense } from '../store/actions/trips';
import { Expense } from '../store/model';
import { WithTranslation } from 'next-i18next';
import { setSetting } from '../store/actions/settings';

type InputRef = React.RefObject<HTMLInputElement>;
type TextAreaRef = React.RefObject<HTMLTextAreaElement>;

function usePriceInputForm(tripId: number) {
  const dispatch = useDispatch();
  const [needShrink, setNeedShrink] = useState<boolean>();
  const foreignRef = React.createRef() as InputRef;
  const localRef = React.createRef() as InputRef;
  const commentRef = React.createRef() as TextAreaRef;
  let gpsAllowed = useSelector(getIsGpsAllowed);

  function addExpense() {
    const expense: Pick<Expense, 'foreignPrice' | 'localPrice' | 'comment'> = {
      foreignPrice: Number(foreignRef.current.value),
      localPrice: Number(localRef.current.value),
      comment: commentRef.current.value || undefined,
    };

    if (isNaN(expense.foreignPrice) || isNaN(expense.localPrice)) {
      return;
    }

    foreignRef.current.value = '';
    localRef.current.value = '';
    commentRef.current.value = '';
    dispatch(addOrEditExpense(tripId, expense));
  }

  function toggleGps() {
    gpsAllowed = 'geolocation' in navigator ? !gpsAllowed : false;
    if (gpsAllowed) {
      navigator.geolocation.getCurrentPosition(() => {
        dispatch(setSetting('gps', gpsAllowed));
      });
      return;
    }
    dispatch(setSetting('gps', gpsAllowed));
  }

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const foreignChange = ev.target === foreignRef.current;
    const value = ev.target.value;

    if (foreignChange) {
      localRef.current.value = value
        ? (Number(value) * rate).toFixed(localDecimals)
        : '';
    } else {
      foreignRef.current.value = value
        ? (Number(value) / rate).toFixed(foreignDecimals)
        : '';
    }

    setNeedShrink(value !== '');
  }

  // TODO: Get this values from the State
  const rate = 112;
  const foreignDecimals = 2;
  const localDecimals = 0;

  return {
    gpsAllowed,
    addExpense,
    toggleGps,
    foreignRef,
    localRef,
    commentRef,
    handleChange,
    needShrink,
  };
}

interface Props extends WithTranslation {
  tripId: number;
}

const BasePriceInput = ({ t, tripId }: Props) => {
  const {
    gpsAllowed,
    addExpense,
    toggleGps,
    localRef,
    foreignRef,
    commentRef,
    handleChange,
    needShrink,
  } = usePriceInputForm(tripId);

  return (
    <>
      <PriceInputField
        autoFocus
        label={t('foreignValueInput')}
        onChange={handleChange}
        inputRef={foreignRef}
        shrink={needShrink}
      />
      <PriceInputField
        label={t('localValueInput')}
        onChange={handleChange}
        inputRef={localRef}
        shrink={needShrink}
      />
      <TextField
        multiline
        fullWidth
        placeholder={t('commentPlaceholder')}
        inputRef={commentRef}
      />

      <Buttons
        fullWidth
        variant="contained"
        size="large"
        aria-label="split button"
      >
        <Button onClick={addExpense}>{t('addExpenseButton')}</Button>
        <Button onClick={toggleGps}>
          {gpsAllowed ? <LocationOnIcon /> : <LocationOffIcon />}
        </Button>
      </Buttons>
    </>
  );
};

const CSSTextField = withStyles({
  root: {
    '& input': {
      fontSize: '200%',
    },
  },
})(TextField);

const Buttons = withStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))(ButtonGroup);

function PriceInputField(props: {
  autoFocus?: boolean;
  label: string;
  inputRef: InputRef;
  shrink?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  const { shrink, ...textFieldProps } = props;
  return (
    <CSSTextField
      {...textFieldProps}
      fullWidth
      type="number"
      variant="outlined"
      margin="normal"
      placeholder="123"
      InputLabelProps={{ shrink }}
    />
  );
}

// tslint:disable-next-line: no-any
export const PriceInput = withTranslation('page-trip')(BasePriceInput);
