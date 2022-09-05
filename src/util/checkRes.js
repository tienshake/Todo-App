export const checkRes = (res, status) => {
    let check = false;
    if (res && res.status === status) {
        check = true;
    } else {
        check = false;
    }
    return check;
};
