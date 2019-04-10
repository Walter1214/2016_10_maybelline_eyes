if (!device.desktop()) {
    // window.location.href = "m_index.html" + location.search;
    const arr = location.href.split("/").pop()
    console.log(arr);
    window.location.href = 'm_' + arr;
}