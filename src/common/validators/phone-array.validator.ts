import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';

export const phoneRegExp = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

@ValidatorConstraint({ name: 'isValidPhoneArray', async: false })
export class IsValidPhoneArray implements ValidatorConstraintInterface {
    validate(phoneArray: any[]) {
        if (!Array.isArray(phoneArray)) {
            return false;
        }

        for (const phone of phoneArray) {
            if (!this.isValidPhone(phone)) {
                return false;
            }
        }

        return true;
    }

    private isValidPhone(phone: string): boolean {
        return phoneRegExp.test(phone);
    }
}

export function IsArrayValidPhone(validationOptions?: any) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidPhoneArray,
        });
    };
}
