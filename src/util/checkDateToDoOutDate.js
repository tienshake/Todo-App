export const checkDateToDoOutDate = (item) => {
    return new Promise((resolve, reject) => {
        try {
            if (new Date(item.endDate).getTime() < new Date().getTime()) {
                resolve(item);
            }
        } catch (e) {
            reject(e);
        }
    });
};
