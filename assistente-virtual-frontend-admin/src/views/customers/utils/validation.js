
export const validate = (values) => {
    const errors = {};

    if (values.cus_name) {
        errors.cus_name = true;
    }

    if (values.cus_email) {
        errors.cus_email = true;
    }

}
