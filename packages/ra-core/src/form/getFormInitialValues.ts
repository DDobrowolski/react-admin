import merge from 'lodash/merge';
import { Record } from '../types';

export default function getFormInitialValues(
    defaultValues: DefaultValue,
    record: Partial<Record>
) {
    const finalInitialValues = merge(
        {},
        getValues(defaultValues, record),
        record
    );
    return finalInitialValues;
}

function getValues(values, record) {
    if (typeof values === 'object') {
        return values;
    }

    if (typeof values === 'function') {
        return values(record);
    }

    return {};
}

interface DefaultValueObject {
    [key: string]: any;
}
type DefaultValueFunction = (record: Record) => DefaultValueObject;
type DefaultValue = DefaultValueObject | DefaultValueFunction;
