function canBrowserShareData(data) {
    if (!navigator.share || !navigator.canShare) {
        return false;
    }

    return navigator.canShare(data);
}