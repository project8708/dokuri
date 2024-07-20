
export const parseMenuData = (menuText) => {
    const lines = menuText.split('\n');
    const categories = {};
    let currentCategory = null;

    lines.forEach(line => {
        if (line.startsWith('[') && line.endsWith(']')) {
            currentCategory = line.substring(1, line.length - 1);
            categories[currentCategory] = [];
        } else if (line.trim()) {
            const [name, price] = line.split(/\t+/);
            if (currentCategory) {
                categories[currentCategory].push({ name: name.trim(), price: parseInt(price.replace(/,/g, ''), 10) });
            }
        }
    });

    return categories;
};
