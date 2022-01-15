import * as React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import { CoreAdminContext, testDataProvider } from 'ra-core';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { defaultTheme } from '../defaultTheme';
import { SimpleForm } from './SimpleForm';
import { TextInput } from '../input';

describe('<SimpleForm />', () => {
    it('should embed a form with given component children', () => {
        render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm>
                        <TextInput source="name" />
                        <TextInput source="city" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );
        expect(
            screen.queryByLabelText('resources.undefined.fields.name')
        ).not.toBeNull();
        expect(
            screen.queryByLabelText('resources.undefined.fields.city')
        ).not.toBeNull();
    });

    it('should display <Toolbar />', () => {
        render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm>
                        <TextInput source="name" />
                        <TextInput source="city" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );
        expect(screen.queryByLabelText('ra.action.save')).not.toBeNull();
    });

    // We should introduce a context for form config (submitOnEnter, variant, margin)
    it.skip('should pass submitOnEnter to <Toolbar />', () => {
        const Toolbar = ({ submitOnEnter }: any): any => (
            <p>submitOnEnter: {submitOnEnter.toString()}</p>
        );

        const { rerender } = render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm submitOnEnter={false} toolbar={<Toolbar />}>
                        <TextInput source="name" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );

        expect(screen.queryByText('submitOnEnter: false')).not.toBeNull();

        rerender(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm submitOnEnter toolbar={<Toolbar />}>
                        <TextInput source="name" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );

        expect(screen.queryByText('submitOnEnter: true')).not.toBeNull();
    });

    it('should not alter default margin or variant', () => {
        render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm>
                        <TextInput source="name" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );
        const inputElement = screen.queryByLabelText(
            'resources.undefined.fields.name'
        );
        expect(inputElement.classList).toContain('MuiFilledInput-input');
        expect(inputElement.parentElement.parentElement.classList).toContain(
            'MuiFormControl-marginDense'
        );
    });

    it('should pass variant and margin to child inputs', () => {
        render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm variant="outlined" margin="normal">
                        <TextInput source="name" />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );
        const inputElement = screen.queryByLabelText(
            'resources.undefined.fields.name'
        );
        expect(inputElement.classList).toContain('MuiOutlinedInput-input');
        expect(inputElement.parentElement.parentElement.classList).toContain(
            'MuiFormControl-marginNormal'
        );
    });

    it('should allow input children to override variant and margin', () => {
        render(
            <ThemeProvider theme={createTheme(defaultTheme)}>
                <CoreAdminContext dataProvider={testDataProvider()}>
                    <SimpleForm variant="standard" margin="none">
                        <TextInput
                            source="name"
                            variant="outlined"
                            margin="normal"
                        />
                    </SimpleForm>
                </CoreAdminContext>
            </ThemeProvider>
        );
        const inputElement = screen.queryByLabelText(
            'resources.undefined.fields.name'
        );
        expect(inputElement.classList).toContain('MuiOutlinedInput-input');
        expect(inputElement.parentElement.parentElement.classList).toContain(
            'MuiFormControl-marginNormal'
        );
    });
});
