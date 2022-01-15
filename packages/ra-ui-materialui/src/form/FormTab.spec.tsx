import * as React from 'react';
import expect from 'expect';
import { CoreAdminContext, testDataProvider } from 'ra-core';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TabbedForm } from './TabbedForm';
import { FormTab } from './FormTab';
import { TextInput } from '../input';
import { defaultTheme } from '../defaultTheme';

describe('<FormTab label="foo" />', () => {
    it('should display <Toolbar />', () => {
        render(
            <CoreAdminContext dataProvider={testDataProvider()}>
                <ThemeProvider theme={createTheme(defaultTheme)}>
                    <TabbedForm>
                        <FormTab label="foo">
                            <TextInput source="name" />
                            <TextInput source="city" />
                        </FormTab>
                    </TabbedForm>
                </ThemeProvider>
            </CoreAdminContext>
        );
        expect(screen.queryByLabelText('ra.action.save')).not.toBeNull();
    });

    it('should not alter default margin or variant', () => {
        render(
            <CoreAdminContext dataProvider={testDataProvider()}>
                <ThemeProvider theme={createTheme(defaultTheme)}>
                    <TabbedForm>
                        <FormTab label="foo">
                            <TextInput source="name" />
                        </FormTab>
                    </TabbedForm>
                </ThemeProvider>
            </CoreAdminContext>
        );
        const inputElement = screen.queryByLabelText(
            'resources.undefined.fields.name'
        );
        expect(inputElement.classList).toContain('MuiFilledInput-input');
        expect(inputElement.parentElement.parentElement.classList).toContain(
            'MuiFormControl-marginDense'
        );
    });

    it('should render a TabbedForm with FormTabs having custom props without warnings', () => {
        let countWarnings = 0;
        const spy = jest
            .spyOn(console, 'error')
            .mockImplementation((message: string) => {
                if (!message.includes('a test was not wrapped in act')) {
                    countWarnings++;
                }
            });

        const record = { id: 'gazebo', name: 'foo' };

        const { container } = render(
            <CoreAdminContext dataProvider={testDataProvider()}>
                <ThemeProvider theme={createTheme(defaultTheme)}>
                    <TabbedForm>
                        <FormTab
                            label="First"
                            basePath="/posts"
                            resource="posts"
                            record={record}
                            margin="none"
                            variant="standard"
                        >
                            <TextInput source="name" />
                        </FormTab>
                        <FormTab
                            label="Second"
                            basePath="/posts"
                            resource="posts"
                            record={record}
                            margin="dense"
                            variant="filled"
                        >
                            <TextInput source="name" />
                        </FormTab>
                        <FormTab
                            label="Third"
                            basePath="/posts"
                            resource="posts"
                            record={record}
                            margin="normal"
                            variant="outlined"
                        >
                            <TextInput source="name" />
                        </FormTab>
                    </TabbedForm>
                </ThemeProvider>
            </CoreAdminContext>
        );
        expect(countWarnings).toEqual(0);
        expect(container).not.toBeNull();

        spy.mockRestore();
    });

    it('should pass variant and margin to child inputs', () => {
        render(
            <CoreAdminContext dataProvider={testDataProvider()}>
                <ThemeProvider theme={createTheme(defaultTheme)}>
                    <TabbedForm>
                        <FormTab label="foo" variant="outlined" margin="normal">
                            <TextInput source="name" />
                        </FormTab>
                    </TabbedForm>
                </ThemeProvider>
            </CoreAdminContext>
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
            <CoreAdminContext dataProvider={testDataProvider()}>
                <ThemeProvider theme={createTheme(defaultTheme)}>
                    <TabbedForm>
                        <FormTab label="foo" variant="standard" margin="none">
                            <TextInput
                                source="name"
                                variant="outlined"
                                margin="normal"
                            />
                        </FormTab>
                    </TabbedForm>
                </ThemeProvider>
            </CoreAdminContext>
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
