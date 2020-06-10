import React, { createRef } from 'react';
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import FactoryForm from './factoryForm';
import { buildFactory } from './factories.mock';

const factoryFormRef = createRef();

let api;
let factory;

const openFormDialog = () => act(() => factoryFormRef.current.openFactoryForm());
const closeFormDialog = () => act(() => factoryFormRef.current.closeFactoryForm());

const buildFactoryForm = (api, factory) => {
  render(<div role='parent'>
    <FactoryForm api={api} factory={factory} ref={factoryFormRef} />
  </div>);
  openFormDialog();
};

describe('FactoryForm', () => {
  beforeEach(() => {
    factory = buildFactory(1);
    api = {
      factoryService: {
      },
    };
  });

  test('should show FactoryForm with empty state', async () => {
    factory = undefined;
    await buildFactoryForm(api, factory);
    expect(screen.getByText('Factory')).toBeInTheDocument();

    expect(screen.getByLabelText(/Contract/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Contract/i).value).toEqual('');
    expect(screen.getByLabelText(/Business Id/i).value).toEqual('');
    expect(screen.getByLabelText(/Name/i).value).toEqual('');
  });

  test('should open and close FactoryForm', async () => {
    await buildFactoryForm(api, factory);
    expect(await screen.findByText('Factory')).toBeInTheDocument();
    closeFormDialog();
    await waitForElementToBeRemoved(() => screen.queryByText('Factory'));
  });
});
