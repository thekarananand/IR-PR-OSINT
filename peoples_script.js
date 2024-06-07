const remove_queries = [
    'img',
    'button',
    'footer',
    '.artdeco-entity-lockup__image',
    '.artdeco-entity-lockup__badge',
    '.artdeco-entity-lockup__caption',
    '.mt2',
];

const ul = document.querySelector('ul.display-flex.list-style-none.flex-wrap')
const listElements = ul.querySelectorAll('li');

for (const query of remove_queries) {
    const elementsToRemove = ul.querySelectorAll(query);

    for (let i = elementsToRemove.length - 1; i >= 0; i--) {
        elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
    }
}

const Dir = {};

for (const listElement of listElements) {
    const titleElement = listElement.querySelector('.artdeco-entity-lockup__title');
    const subtitleElement = listElement.querySelector('.artdeco-entity-lockup__subtitle');

    if (titleElement && subtitleElement) {
        const name = titleElement.textContent.trim();
        const linkElement = listElement.querySelector('.artdeco-entity-lockup__title > a');

        if (linkElement) {
            const link = linkElement.href.split('?')[0];
            const bio = subtitleElement.textContent.trim();

            Dir[name] = {
                'link': link,
                'bio': bio
            };
        }
    }
}

// console.log(Dir);

const table = document.createElement('table');
const tbody = document.createElement('tbody');
const script = document.createElement('textarea');

for (const entry in Dir) {
    const row = document.createElement('tr');

    const linkCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = Dir[entry].link;
    link.textContent = entry;
    linkCell.appendChild(link);

    const bioCell = document.createElement('td');
    bioCell.textContent = Dir[entry].bio;

    script.value += `firefox ${ Dir[entry].link }\n` 

    row.appendChild(linkCell);
    row.appendChild(bioCell);

    tbody.appendChild(row);
}

table.setAttribute( 'style', 'margin: 5rem;box-sizing: border-box;' )
script.setAttribute( 'style', 'margin: 5rem;box-sizing: border-box; width: calc(100vw - 10rem)' )

table.appendChild(tbody);

document.body.innerHTML = ''
document.body.appendChild(table);
document.body.appendChild(script);
