import { loadData } from '../store/actions/storage';
import { useEffect } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from '../store';

// we only want to load data once
let dataLoaded = false;

export async function initPage(dispatch: ThunkDispatch<Action>) {
  if (!IS_SERVER) {
    useEffect(() => {
      if (!dataLoaded) {
        dataLoaded = true;
        dispatch(loadData());
      }
    }, []);
  }
}
