const convertFromGMTToDate = (dt) => {
    const date = new Date(dt * 1000);
    return date;
};

export { convertFromGMTToDate };